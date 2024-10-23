import { MutableRefObject } from 'react';
export declare const useFerrisSelectData: ({ onChange, forwardRef: selectRef, name, }: {
    onChange: (v: any) => void;
    forwardRef: MutableRefObject<HTMLSelectElement>;
    name: string;
}) => {
    handleSelect: (deg: any, val: any, idx: number) => void;
    clearSelection: () => number;
};
