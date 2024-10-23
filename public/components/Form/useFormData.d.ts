import { FormEventHandler, JSXElementConstructor } from 'react';
import { FormField } from '../../types';
import { MutationFunction } from '@tanstack/react-query';
export type SubmitProp = {
    title: string;
    onSubmit: (...args: any[]) => any | MutationFunction;
    onCancel?: (...args: any[]) => void;
    submitElement?: JSXElementConstructor<{
        onClick: (...args: any[]) => void;
        type: string;
        key: string;
    }>;
    cancelElement?: JSXElementConstructor<{
        onClick: (...args: any[]) => void;
        key: string;
    }>;
};
export declare const insertIn: (obj: {
    [key: string]: any;
}, key: string, value: any) => {
    [key: string]: any;
};
export declare const useFormData: (fields: FormField[], initial: {
    [key: string]: any;
}, onSubmit?: Function, disabled?: boolean) => {
    formState: {
        [key: string]: any;
    };
    Elements: import("react/jsx-runtime").JSX.Element[];
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
    resetForm: () => void;
};
