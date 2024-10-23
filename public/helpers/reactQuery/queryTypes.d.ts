import { DefinedInitialDataOptions, FetchNextPageOptions, FetchPreviousPageOptions, InfiniteQueryObserverResult, UseMutateFunction } from '@tanstack/react-query';
import { Resource } from './hooks/useArbitraryQuery';
import { MutationFNError } from './decorators';
export type QueryOpts<T = {}> = ({
    id?: string;
    enabled?: boolean;
} & T) | undefined;
export type QueryHookProperties<T, S> = {
    add?: UseMutateFunction<Resource, MutationFNError, Resource[], unknown>;
    patch?: UseMutateFunction<Resource, MutationFNError, Resource[], unknown>;
    delete?: UseMutateFunction<Resource, MutationFNError, Resource[], unknown>;
    uploadMedia?: UseMutateFunction<Resource, MutationFNError, Resource, unknown>;
    disableCRUD?: boolean;
    resource: T;
    loading?: boolean;
} & S;
/**
 * Query Hook Interface
 */
export interface QueryHook<T, S = {}, A = {}> {
    (opts?: QueryOpts<A>): QueryHookProperties<T, S>;
    (opts: QueryOpts<A>, id?: string): QueryHookProperties<T, S>;
}
/**
 * Infinite Query Hook Interface
 */
export type InfiniteQueryHook<T, R = {}, P = {}> = QueryHook<T, {
    page: string;
    fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<unknown, Error>>;
    fetchPreviousPage: (options?: FetchPreviousPageOptions) => Promise<InfiniteQueryObserverResult<unknown, Error>>;
} & R, P>;
/**
 * Get Query Hook Interface
 */
export interface GetQueryHook<T> {
    (...args: any[]): {
        resource: T;
        loading: boolean;
    };
}
/**
 * Resource Hash
 */
export interface ResourceHash<T> {
    [key: string]: T;
}
type AllQueryView = string[];
type ListQueryView<T extends string[]> = [
    ...T,
    '__list',
    {
        [key: string]: any;
    } | undefined
];
type TrashQueryView<T extends string[]> = [...T, '__trash'];
export interface QueryKeyFactoryInterface {
    all: AllQueryView;
    list: (filter?: Object) => ListQueryView<AllQueryView>;
    owner: (id: string) => DefinedInitialDataOptions;
    trash: TrashQueryView<AllQueryView>;
}
export type QueryKeyFilters = {
    [key: string]: any;
};
export type QueryParams = {
    [key: string]: any;
};
export interface KeyFactoryContructor {
    (key: string): QueryKeyFactoryInterface;
    (key: string[]): QueryKeyFactoryInterface;
}
export declare const ConstructKeyFactory: KeyFactoryContructor;
export {};
