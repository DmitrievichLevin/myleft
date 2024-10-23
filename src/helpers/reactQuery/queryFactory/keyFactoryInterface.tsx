import {
  DefinedInitialDataInfiniteOptions,
  InfiniteData,
  QueryClient,
  QueryFunctionContext,
  QueryKey,
  useQueryClient,
} from '@tanstack/react-query';
import { QueryKeyFilters, QueryParams } from '../queryTypes';
import { Resource } from '../hooks/useArbitraryQuery';
import { ID } from '../../../types';
import { StreamReaderCallback } from '../../ws/streamReaderCallback';

type QueryKeyFactoryOptions = {
  filters?: QueryKeyFilters | null;
  /**
   *
   * @param e QueryFn Error.
   * @param filters For scope of error.
   * @returns
   */
  onError?: (e: any, filters?: QueryKeyFilters) => Promise<void> | void;
  [key: string]: any;
};

type QueryFunction = (context: QueryFunctionContext) => Promise<any>;

type IQFKResult = {
  queryKey: Array<string | { [key: string]: any }>;
  queryFn: QueryFunction;
} & QueryKeyFactoryOptions;

type IQFnConstructor = (params?: QueryParams) => QueryFunction;

export class QueryKeyFactory {
  constructor(
    base: string | string[],
    options: QueryKeyFactoryOptions = {},
    API: any
  ) {
    const { filters = null, onError = undefined, ...opts } = options;
    this.client = useQueryClient();
    this.filters = filters;
    this.__queryOptions = { ...this.queryOptions, ...opts };
    this.__base = Array.isArray(base) ? base : [base];
    this.__api = API;

    // Bind external onError
    this.__onError = onError;
    this.__onError?.bind(this);
  }

  get queryOptions() {
    return this.__queryOptions;
  }

  get base() {
    return this.__base;
  }

  get all(): IQFKResult {
    return {
      queryKey: this.base,
      queryFn: this.__QFnConstructor(),
      ...this.queryOptions,
    };
  }

  owner(id: ID, filters?: QueryKeyFilters): IQFKResult {
    const params = filters ? { ...filters, id } : { id };

    var _key: Array<any> = [...this.base, '__owner'];

    if (filters) _key.push(filters);

    return {
      queryKey: _key,
      queryFn: this.__QFnConstructor(params),
      ...this.queryOptions,
      enabled: typeof id === 'string',
    };
  }

  list(filters: QueryKeyFilters): IQFKResult {
    return {
      queryKey: [...this.base, '__list', filters],
      queryFn: this.__QFnConstructor(filters),
      ...this.queryOptions,
    };
  }

  /**
   * Subkey
   * @summary - Pending Successful Deletion Response
   */
  get trash() {
    return [...this.base, '__trash'];
  }

  get API() {
    return this.__api;
  }

  async __error_callback(e: any, filters?: QueryKeyFilters) {
    console.error(e);
    if (this.__onError) {
      await this.__onError(e, filters);
    }
  }

  __QFnConstructor: IQFnConstructor = (_params = {}) => {
    const qFn = (context: QueryFunctionContext) => {
      const { pageParam = '' } = context;

      let params = pageParam ? { cursor: pageParam, ..._params } : _params;

      return this.queryFn(params);
    };

    return qFn;
  };

  async queryFn(filters?: QueryKeyFilters, ...rest: any[]) {
    try {
      const fetched = await this.API.get(filters).then(
        ({ data }: { data: any }) => data
      );

      if (!fetched) {
        await this.__error_callback(new Error('Empty Response.'), filters);
        return null;
      }

      if (filters && !filters?.cursor) {
        // Update AllQueryView (For useQuery not useInfiniteQuery)
        await this.client.setQueriesData(
          { queryKey: this.base },
          (prev: any[] = []) => {
            let idx = prev.findIndex((item) => item.id === fetched.id);
            if (idx > -1) {
              prev[idx] = fetched;
              return prev;
            }
            return [...prev, fetched];
          }
        );
      }

      return fetched;
    } catch (e: any) {
      await this.__error_callback(e, filters);
      return null;
    }
  }

  client: QueryClient;
  filters: QueryKeyFilters | null;
  __onError:
    | ((e: Error, filters?: QueryKeyFilters) => Promise<void> | void)
    | undefined;
  __base: string[];
  __api: any;
  __queryOptions = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  };
}

export class ChunkedQueryFactory extends QueryKeyFactory {
  constructor(
    base: string | string[],
    options: QueryKeyFactoryOptions = {},
    API: any
  ) {
    super(base, options, API);
  }

  get all() {
    return {
      queryKey: this.base,
      queryFn: () => this.queryFn(undefined, this.base),
      ...this.queryOptions,
    };
  }

  owner(id: ID) {
    var keys = [...this.base, '__owner', id];
    return {
      queryKey: keys,
      queryFn: () => this.queryFn({ id }, keys),
      ...this.queryOptions,
      enabled: typeof id === 'string',
    };
  }

  list(filters: QueryKeyFilters) {
    var keys = [...this.base, '__list', filters];
    return {
      queryKey: this.base,
      queryFn: () => this.queryFn(filters, keys),
      ...this.queryOptions,
    };
  }

  __setBaseQueryData = (data: any[]) => {
    this.client.setQueryData(this.base, (prev: any[] = []) => {
      data.forEach((dat) => {
        let idx = prev.findIndex((item) => item.id === dat.id);
        if (idx > -1) {
          prev[idx] = dat;
        } else {
          prev = [...prev, dat];
        }
      });
      return prev;
    });
  };

  async queryFn(filters?: QueryKeyFilters, queryKey?: QueryKey) {
    try {
      /**
       * Stream Query CallbackFn
       */
      var resolveStream: (value: Resource[]) => void;
      /**
       * Stream Query Promise
       * @summary Resolved in StreamReader after all chunks are consumed
       * Mutates Base QueryData with response.
       */
      const streamQuery: Promise<Resource[]> = new Promise((resolve) => {
        resolveStream = (args) => {
          // For non Base Queries
          if (filters) this.__setBaseQueryData(args);
          resolve(args);
        };
      });

      /**
       * StreamReader Pipe Callback
       * @param chunk
       * @param allChunks
       */
      const updateQueries = (chunk: any, allChunks?: any[]) => {
        if (allChunks) resolveStream(allChunks);

        const { data = undefined } = chunk;

        // Mutate Cache as chunks are piped.
        if (data)
          this.client.setQueryData(queryKey as QueryKey, (prev: any[] = []) => {
            let idx = prev.findIndex((item) => item.id === data?.id);
            if (idx > -1) {
              prev[idx] = data;
              return prev;
            }
            return [...prev, data];
          });
      };

      const res = await this.API.get(filters);
      // Use notify:true for debugging
      await StreamReaderCallback(res, {
        onPipe: updateQueries,
      });

      // Return Stream Query Promise
      return streamQuery;
    } catch (e: any) {
      await this.__error_callback(e, filters);
      return null;
    }
  }
}
