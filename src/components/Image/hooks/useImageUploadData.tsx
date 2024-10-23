import { useCallback, useState } from 'react';
import imageDefault from '../../../res/Icons/imageIcon.svg';
import { HTMLInputEvent } from '../../../types';
import { UseMutateFunction } from '@tanstack/react-query';
import { Resource } from '../../../helpers/reactQuery/hooks/useArbitraryQuery';
import { MutationFNError } from '../../../helpers/reactQuery/decorators';

export type ImageUploadProps = {
  src?: string;
  className?: string;
  fallback?: string;
  mutationFn: UseMutateFunction<Resource, MutationFNError, Resource, unknown>;
  alt: string;
};

export default (
  props: ImageUploadProps,
  inputRef: React.RefObject<HTMLInputElement>
) => {
  const { src = '', fallback = imageDefault, mutationFn } = props;

  const [source, setSource] = useState(src || fallback);
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  const handleImageSelected = useCallback(
    async (event: HTMLInputEvent) => {
      event.preventDefault();
      setLoading(true);
      const files = event.target.files as FileList;
      const file: any = files[0];
      const fileUrl = URL.createObjectURL(file);
      setSource(fileUrl);
      try {
        // Media Upload Mutation
        await mutationFn(file);
      } catch (e) {
        console.error(e);
        setSource(fallback);
      }
      setLoading(false);
    },
    [source, setSource]
  );

  return { src: source, onChange: handleImageSelected, onClick, loading };
};
