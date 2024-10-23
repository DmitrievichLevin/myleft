import { ReactNode } from 'react';
import { FormField } from '../../types';
import { SubmitProp } from './useFormData';
import './form.css';
import '../Buttons/Primary/primaryButton.css';
export declare const Form: ({ fields, className, formClassName, atnsClassName, submit, disabled, initial, forwardRef, suggestions, }: {
    fields: FormField[];
    suggestions?: Array<string | ReactNode>;
    className?: string;
    atnsClassName?: string;
    formClassName?: string;
    submit?: SubmitProp;
    disabled?: boolean;
    forwardRef?: HTMLInputElement;
    initial: {
        [key: string]: any;
    };
}) => import("react/jsx-runtime").JSX.Element;
