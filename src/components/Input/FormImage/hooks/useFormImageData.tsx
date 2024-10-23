import { useCallback, useState } from 'react';
import imageDefault from '../../../../res/Icons/imageIcon.svg';
import { HTMLInputEvent } from '../../../../types';

export type FormImageUploadProps = {
  value?: { url: string };
  name: string;
  className?: string;
  fallback?: string;
  onChange: (...args: any[]) => void;
  required?: boolean;
  disabled?: boolean;
};

export default (
  props: FormImageUploadProps,
  inputRef: React.RefObject<HTMLInputElement>
) => {
  const {
    value = {} as { url: string },
    fallback = imageDefault,
    onChange,
  } = props;

  const [source, setSource] = useState(
    /**
     * Edge: Persisting selected image in form.
     */
    //@ts-ignore
    value?.type
      ? //@ts-ignore
        URL.createObjectURL(value)
      : //@ts-ignore
        value?.url || fallback
  );

  const onClick = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  const handleImageSelected = useCallback(
    async (event: HTMLInputEvent) => {
      event.preventDefault();
      const files = event.target.files as FileList;
      const file: any = files[0];
      const fileUrl = URL.createObjectURL(file);
      setSource(fileUrl);
      onChange(files[0]);
    },
    [source, setSource]
  );

  return { src: source, onChange: handleImageSelected, onClick };
};
