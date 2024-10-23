import '../textInput.css';
import './dragdrop.css';
export type MB = number;
export type DragDropInputProps = {
    value?: string;
    name?: string;
    title?: string;
    innerText?: string;
    icon?: string;
    maxFileSize?: MB;
    onChange?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    forwardRef?: any;
    errorMessage?: string;
};
export declare const DragDropInput: ({ name, value, title, innerText, maxFileSize, icon, onChange, required, disabled, className, forwardRef, errorMessage, }: DragDropInputProps) => import("react/jsx-runtime").JSX.Element;
