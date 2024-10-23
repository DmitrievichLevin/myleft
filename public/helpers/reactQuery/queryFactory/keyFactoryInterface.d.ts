import { QueryClient, QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import { QueryKeyFilters, QueryParams } from '../queryTypes';
import { Resource } from '../hooks/useArbitraryQuery';
import { ID } from '../../../types';
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
    queryKey: Array<string | {
        [key: string]: any;
    }>;
    queryFn: QueryFunction;
} & QueryKeyFactoryOptions;
type IQFnConstructor = (params?: QueryParams) => QueryFunction;
export declare class QueryKeyFactory {
    constructor(base: string | string[], options: QueryKeyFactoryOptions | undefined, API: any);
    get queryOptions(): {
        refetchOnMount: boolean;
        refetchOnWindowFocus: boolean;
        refetchOnReconnect: boolean;
        retry: boolean;
        enabled: boolean;
    };
    get base(): string[];
    get all(): IQFKResult;
    owner(id: ID, filters?: QueryKeyFilters): IQFKResult;
    list(filters: QueryKeyFilters): IQFKResult;
    /**
     * Subkey
     * @summary - Pending Successful Deletion Response
     */
    get trash(): string[];
    get API(): any;
    __error_callback(e: any, filters?: QueryKeyFilters): Promise<void>;
    __QFnConstructor: IQFnConstructor;
    queryFn(filters?: QueryKeyFilters, ...rest: any[]): Promise<any>;
    client: QueryClient;
    filters: QueryKeyFilters | null;
    __onError: ((e: Error, filters?: QueryKeyFilters) => Promise<void> | void) | undefined;
    __base: string[];
    __api: any;
    __queryOptions: {
        refetchOnMount: boolean;
        refetchOnWindowFocus: boolean;
        refetchOnReconnect: boolean;
        retry: boolean;
        enabled: boolean;
    };
}
export declare class ChunkedQueryFactory extends QueryKeyFactory {
    constructor(base: string | string[], options: QueryKeyFactoryOptions | undefined, API: any);
    get all(): {
        refetchOnMount: boolean;
        refetchOnWindowFocus: boolean;
        refetchOnReconnect: boolean;
        retry: boolean;
        enabled: boolean;
        queryKey: string[];
        queryFn: () => Promise<Resource[] | null>;
    };
    owner(id: ID): {
        enabled: boolean;
        refetchOnMount: boolean;
        refetchOnWindowFocus: boolean;
        refetchOnReconnect: boolean;
        retry: boolean;
        queryKey: string[];
        queryFn: () => Promise<Resource[] | null>;
    };
    list(filters: QueryKeyFilters): {
        refetchOnMount: boolean;
        refetchOnWindowFocus: boolean;
        refetchOnReconnect: boolean;
        retry: boolean;
        enabled: boolean;
        queryKey: string[];
        queryFn: () => Promise<Resource[] | null>;
    };
    __setBaseQueryData: (data: any[]) => void;
    queryFn(filters?: QueryKeyFilters, queryKey?: QueryKey): Promise<Resource[] | null>;
}
export {};
