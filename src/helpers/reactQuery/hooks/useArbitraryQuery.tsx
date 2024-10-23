import { useMutation, useQuery } from '@tanstack/react-query';
import { AddEntry, DeleteEntry, PatchEntry } from '../decorators';
import { useMemo } from 'react';
import { QueryKeyFactoryInterface, QueryOpts } from '../queryTypes';
import { CrudResource } from '../../../components/CardView/CrudView/useCrudViewData';

/**
 * install @types/bevor_api
 */
type API = any;

export type Resource = { [key: string]: any } & CrudResource;

export interface ResourceError extends Error {
  tempId: string;
}

export const useArbitraryQuery = (
  keys: QueryKeyFactoryInterface,
  API: API,
  opts: QueryOpts = { enabled: false }
) => {
  const { data: arbitraryData, isLoading } = useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<any> => {
      if (!arbitraryData) {
        const fetched = await API.get();

        if (fetched?.data) return fetched.data;
        return {};
      }
      return arbitraryData;
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    ...opts,
  });

  const { mutate: addResource, status: createStatus } = useMutation({
    ...AddEntry(keys, API),
  });

  const { mutate: deleteResource, status: deleteStatus } = useMutation({
    ...DeleteEntry(keys, API),
  });

  const { mutate: patchResource, status: patchStatus } = useMutation({
    ...PatchEntry(keys, API),
  });

  const disableCRUD = useMemo(() => {
    return (
      [createStatus, deleteStatus, patchStatus].includes('pending') || isLoading
    );
  }, [createStatus, deleteStatus, isLoading]);

  return {
    addResource,
    deleteResource,
    patchResource,
    resources: arbitraryData,
    disableCRUD,
  };
};

export default useArbitraryQuery;
