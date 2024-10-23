import dayjs from 'dayjs';
import _ from 'lodash';
import { MutableRefObject, useCallback, useEffect } from 'react';

export const defaultCheckSelectStyle = (name: string, nth: number) => `
    .ml-select-${name} > :nth-child(${nth}) {
    border: 2px solid var(--glory-blue);
    color: var(--glory-blue);
    font-weight: 600;
    }
    .ml-select-${name} > :nth-child(${nth}) > img {
    background: var(--glory-blue);
    border-color: var(--glory-blue);
    }`;

export const useCheckSelectData = ({
  onChange,
  forwardRef: selectRef,
  value,
  name,
  selectedStyle = defaultCheckSelectStyle,
}: {
  onChange: (v: any) => void;
  value: any;
  forwardRef: MutableRefObject<HTMLSelectElement>;
  name: string;
  selectedStyle?: (name: string, nth_child: number) => string;
}) => {
  const onSelectChange = useCallback(
    (v: any) => {
      onChange(v);
    },
    [onChange, value]
  );

  const clearSelection = useCallback(() => {
    const _select = selectRef.current as HTMLSelectElement;
    if (_select) {
      [..._select.children].forEach((ch: any) => {
        ch.selected = false;
      });

      /**
       * @TODO - See useDaySelectorData.tsx line: 92
       */
      const dynamicStyles = document.getElementById(
        `ml-select-${name}-style`
      ) as HTMLStyleElement;
      dynamicStyles.textContent = ``;
    }
  }, [selectRef, name]);

  useEffect(() => {
    return () => {
      if (selectRef?.current?.value) clearSelection();
    };
  }, [clearSelection]);

  const handleSelect = useCallback(
    (v: any, idx: number) => {
      if (selectRef.current) {
        onSelectChange(v);
        clearSelection();
        // First Option.value = undefined for required select
        (
          selectRef.current.children.item(idx + 1) as HTMLOptionElement
        ).selected = true;

        const dynamicStyles = document.getElementById(
          `ml-select-${name}-style`
        ) as HTMLStyleElement;
        dynamicStyles.textContent = `
        ${selectedStyle(name, idx + 1)}`;
      }
    },
    [selectRef, onSelectChange, clearSelection, name, selectedStyle]
  );

  return {
    handleSelect,
    clearSelection,
  };
};
