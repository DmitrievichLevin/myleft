import { Resource, ResourceError } from './hooks/useArbitraryQuery';
import { QueryKeyFactoryInterface } from './queryTypes';
type Entry = {
    [key: string]: any;
};
export interface MutationFNError extends Error {
    tempId: string;
}
/**
 * useMutation Callback Decorator
 * @summary - For dictionary state objects
 * removes properties pending deletion
 * until successful api response.
 * @param queryKey
 * @param API
 * @param name
 * @returns - useMutation Callback functions.
 */
export declare const DeleteEntry: (queryKey: QueryKeyFactoryInterface, API: any) => {
    mutationFn: (entry: Entry) => Promise<any>;
    onSuccess: (id: string) => Promise<void>;
    onError: (err: MutationFNError) => Promise<void>;
};
export declare const AddEntry: (qKeys: QueryKeyFactoryInterface, API: any) => {
    mutationFn: (resource: Resource) => Promise<{
        resource: any;
        tempId: string;
    }>;
    onSuccess: ({ resource, tempId, }: {
        resource: Resource;
        tempId: string;
    }) => Promise<void>;
    onError: (err: ResourceError) => Promise<void>;
};
export declare const PatchEntry: (queryKey: QueryKeyFactoryInterface, API: any) => {
    mutationFn: (resources: Array<Resource>) => Promise<any>;
    onSuccess: (patch: Resource) => Promise<void>;
    onError: (err: MutationFNError) => Promise<void>;
};
export {};
