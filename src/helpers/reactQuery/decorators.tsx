import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../constants';
import {
  ErrorNotification,
  SuccessNotification,
} from '../../components/toast/toastMessages';
import { Resource, ResourceError } from './hooks/useArbitraryQuery';
import { v4 as uuidv4 } from 'uuid';
import { QueryKeyFactoryInterface } from './queryTypes';

type Entry = { [key: string]: any };

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
export const DeleteEntry = (queryKey: QueryKeyFactoryInterface, API: any) => {
  const client = useQueryClient();
  const qKeys = QUERY_KEY.trash;

  const mutationFn = async (entry: Entry) => {
    const { id } = entry;
    try {
      await client.invalidateQueries({
        queryKey: [...queryKey.all, { id }],
      });

      // Add Record to Trash Can (Pending Permanent Deletion)
      await client.setQueryData(queryKey.trash, (prev: Object = {}) => {
        return { ...prev, [id]: entry };
      });

      // Optimistically Delete Record
      await client.setQueryData(queryKey.all, (prev: any[] = []) => {
        return prev.filter((item) => !item.id === id);
      });

      // Delete Request
      await API.delete(id);

      // Return Id to Empty Trash
      return id;
    } catch (err: any) {
      const resourceError: MutationFNError = new Error(err) as MutationFNError;
      resourceError.tempId = id;

      throw resourceError;
    }
  };

  const onSuccess = async (id: string) => {
    SuccessNotification(`Deleted ${API.name}`);
    // Remove record pending permanent deletion
    await client.setQueryData(
      queryKey.trash,
      (prev: { [key: string]: any } = {}) => {
        delete prev[id];
        return prev;
      }
    );
  };

  const onError = async (err: MutationFNError) => {
    const { tempId } = err;
    ErrorNotification(err.message);

    await client.setQueryData(
      queryKey.trash,
      (prev_trash: { [key: string]: any } = {}) => {
        // Restore Deleted Record(all)
        client.setQueryData(queryKey.all, (prev: any[] = []) => {
          return [...prev, prev_trash[tempId]];
        });

        // Remove Deleted record from Trash
        delete prev_trash[tempId];
        return prev_trash;
      }
    );
  };

  return { mutationFn, onSuccess, onError };
};

export const AddEntry = (qKeys: QueryKeyFactoryInterface, API: any) => {
  const client = useQueryClient();

  /**
   * Add Arbitrary Resource
   * @param resource - Parsed FormData from <Form/>
   * @returns - Optimistically created resource.
   * @throws {ResourceError} - Error subclass with tempId
   * to remove optimistic update
   */
  const mutationFn = async (resource: Resource) => {
    // Optimistic Updates
    const tempId = uuidv4();
    await client.setQueryData(qKeys.all, (records: any[] = []) => [
      ...records,
      {
        ...resource,
        id: tempId,
      },
    ]);

    try {
      const newResource = await API.put(resource);
      return { resource: newResource?.data, tempId };
    } catch (err: any) {
      const resourceError: ResourceError = new Error(err) as ResourceError;
      resourceError.tempId = tempId;

      throw resourceError;
    }
  };

  const onSuccess = async ({
    resource,
    tempId,
  }: {
    resource: Resource;
    tempId: string;
  }) => {
    // Overwrite Optimistic Update w/ response
    await client.setQueryData(qKeys.all, (records: any[] = []) =>
      records.map((item) => {
        if (item.id === tempId) return resource;
        return item;
      })
    );
  };

  const onError = async (err: ResourceError) => {
    ErrorNotification(err.message);
    // Extract tempId from error
    const { tempId } = err;

    // Remove optimistic update
    await client.setQueryData(qKeys.all, (records: any[] = []) =>
      records.filter((item) => item.id !== tempId)
    );
  };

  return { mutationFn, onSuccess, onError };
};

export const PatchEntry = (queryKey: QueryKeyFactoryInterface, API: any) => {
  const client = useQueryClient();

  const mutationFn = async (resources: Array<Resource>) => {
    const [orig, patch] = resources;
    const { id } = orig;
    try {
      // Optimistically Update Cache w/ Patch
      await client.setQueryData(queryKey.all, (prev: any[] = []) =>
        prev.map((item) => {
          // Find Original
          if (item.id === id) {
            // Queue Original in Trash
            client.setQueryData(
              queryKey.trash,
              (prev: { [key: string]: any } = {}) => ({ ...prev, [id]: item })
            );
            return patch;
          }
          return item;
        })
      );

      // Patch Request
      const patched = await API.patch(orig, patch);

      // Return Id to Empty Trash
      return patched;
    } catch (err: any) {
      const resourceError: MutationFNError = new Error(err) as MutationFNError;
      resourceError.tempId = id;

      throw resourceError;
    }
  };

  const onSuccess = async (patch: Resource) => {
    SuccessNotification(`Update Successful`);
    const id = patch['id'];

    // Remove record pending patch
    await client.setQueryData(
      queryKey.trash,
      (prev: { [key: string]: any } = {}) => {
        delete prev[id];
        return prev;
      }
    );
  };

  const onError = async (err: MutationFNError) => {
    const { tempId } = err;
    ErrorNotification(err.message);
    // Remove record pending patch
    await client.setQueryData(
      queryKey.trash,
      (prev_trash: { [key: string]: any } = {}) => {
        // Restore Original Resource
        client.setQueryData(queryKey.all, (prev: any[] = []) =>
          prev.map((item) => {
            if (item.id === tempId) return prev_trash[tempId];
            return item;
          })
        );
        // Remove record from trash
        delete prev_trash[tempId];
        return prev_trash;
      }
    );
  };

  return { mutationFn, onSuccess, onError };
};
