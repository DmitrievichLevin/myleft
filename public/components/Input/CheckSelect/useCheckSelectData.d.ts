import { MutableRefObject } from 'react';
export declare const defaultCheckSelectStyle: (name: string, nth: number) => string;
export declare const useCheckSelectData: ({ onChange, forwardRef: selectRef, value, name, selectedStyle, }: {
    onChange: (v: any) => void;
    value: any;
    forwardRef: MutableRefObject<HTMLSelectElement>;
    name: string;
    selectedStyle?: (name: string, nth_child: number) => string;
}) => {
    handleSelect: (v: any, idx: number) => void;
    clearSelection: () => void;
};
