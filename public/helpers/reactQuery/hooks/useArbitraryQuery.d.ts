import { QueryKeyFactoryInterface, QueryOpts } from '../queryTypes';
import { CrudResource } from '../../../components/CardView/CrudView/useCrudViewData';
/**
 * install @types/bevor_api
 */
type API = any;
export type Resource = {
    [key: string]: any;
} & CrudResource;
export interface ResourceError extends Error {
    tempId: string;
}
export declare const useArbitraryQuery: (keys: QueryKeyFactoryInterface, API: API, opts?: QueryOpts) => {
    addResource: import("@tanstack/react-query").UseMutateFunction<{
        resource: any;
        tempId: string;
    }, ResourceError, Resource, unknown>;
    deleteResource: import("@tanstack/react-query").UseMutateFunction<string, import("../decorators").MutationFNError, {
        [key: string]: any;
    }, unknown>;
    patchResource: import("@tanstack/react-query").UseMutateFunction<Resource, import("../decorators").MutationFNError, Resource[], unknown>;
    resources: any;
    disableCRUD: boolean;
};
export default useArbitraryQuery;
