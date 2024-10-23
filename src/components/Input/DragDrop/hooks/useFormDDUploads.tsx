import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { ONE_MB } from '../../../../constants';
import { ErrorNotification } from '../../../toast/toastMessages';

export type FormDDUploadProps = {
  value?: { url: string };
  name?: string;
  className?: string;
  fallback?: string;
  onChange: (...args: any[]) => void;
  maxFileSize: number;
  required?: boolean;
  disabled?: boolean;
};

export default (
  { onChange, maxFileSize, disabled }: FormDDUploadProps,
  inputRef: React.RefObject<HTMLInputElement>
) => {
  const [dragOver, setDragOver] = useState(false);
  const [temp, setTemp] = useState<ReturnType<(args: any[]) => any[]>>([]);

  /**
   * Concat Unique File[]
   */
  const addFiles = useCallback(
    (files: File[]) => {
      const inputElem = inputRef.current as HTMLInputElement;

      setTemp((prev) =>
        _.uniqBy(
          [...prev, ...files].filter(({ size, name }) => {
            // Limit Upload size
            if (size > maxFileSize * ONE_MB) {
              ErrorNotification(
                `${name} exceeds maximum file size: ${maxFileSize} MB`
              );
              return false;
            }
            return true;
          }),
          'name'
        )
      );

      // Create new List from files
      const fileList = new DataTransfer();
      for (const file of files) fileList.items.add(file);

      inputElem.files = fileList.files;
    },
    [temp, setTemp, inputRef?.current?.files]
  );

  const removeFile = useCallback(
    (fileName: string) => {
      setTemp((prev) => prev.filter(({ name }) => name !== fileName));
      addFiles([]);
    },
    [temp, setTemp, addFiles]
  );

  /**
   * On File Input Button Click
   */
  const onClick = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  /**
   * Handle Browser Native Select
   */
  const handleSelectFiles = useCallback((e: any) => {
    addFiles(e.target.files);
  }, []);

  /**
   * Handle Drop Files
   * @param {File[]} Dragged files to add to Input FileList
   */
  const handleDrop = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        addFiles(e.dataTransfer.files);

        onChange(inputRef.current?.files);
        setDragOver(false);
      }
    },
    [inputRef, setDragOver, disabled]
  );

  const handleOnDragOver = useCallback(
    (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      if (!disabled) setDragOver(true);
    },
    [setDragOver, disabled]
  );

  const handleDragExit = useCallback(
    (e: any) => {
      if (dragOver && !disabled) setDragOver(false);
    },
    [dragOver, disabled]
  );

  /**
   * Prevent Browser from openning file on drag&drop outside of element
   */
  const preventBrowserDropDefault = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    window.addEventListener('dragover', preventBrowserDropDefault, false);
    window.addEventListener('drop', preventBrowserDropDefault, false);
    return () => {
      window.removeEventListener('dragover', preventBrowserDropDefault);
      window.removeEventListener('drop', preventBrowserDropDefault);
    };
  }, [preventBrowserDropDefault]);

  return {
    dragOver,
    onClick,
    handleDrop,
    handleDragExit,
    handleSelectFiles,
    handleOnDragOver,
    removeFile,
    files: temp,
  };
};
