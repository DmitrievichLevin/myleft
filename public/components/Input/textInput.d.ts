import { FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';
import './textInput.css';
export type TextInputProps = {
    value: string;
    name: string;
    onChange?: (value: string) => void;
    required?: boolean;
    pattern?: RegExp | string;
    min?: number;
    max?: number;
    disabled?: boolean;
    icon?: string;
    onIconClick?: MouseEventHandler;
    className?: string;
    readOnly?: boolean;
    type?: string;
    datatype?: string;
    onKeyUp?: KeyboardEventHandler;
    onBlur?: FocusEventHandler;
    placeholder?: string;
    forwardRef?: any;
    errorMessage?: string;
};
export declare const TextInput: ({ name, value, onChange, required, pattern, min, max, disabled, icon, onIconClick, onKeyUp, onBlur, className, readOnly, type, datatype, placeholder, forwardRef, errorMessage, }: TextInputProps) => import("react/jsx-runtime").JSX.Element;