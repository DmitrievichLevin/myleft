import { FormField } from '../../types';
import { ReactNode, SetStateAction } from 'react';
import { SubmitProp } from './useFormData';
export type MultiFormPage = {
    suggestions?: Array<string | ReactNode>;
    fields: FormField[];
};
export declare const MultiForm: ({ pages, submit, className, atnsClassName, formClassName, formData, setFormData, }: {
    pages: MultiFormPage[];
    submit: SubmitProp;
    className?: string;
    atnsClassName?: string;
    formClassName?: string;
    formData: {
        [key: string]: any;
    };
    setFormData: SetStateAction<any>;
}) => import("react/jsx-runtime").JSX.Element;
