import '../textInput.css';
export type DateInputProps = {
    value: string;
    name: string;
    onChange?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    readOnly?: boolean;
};
export declare const DateInput: ({ name, value, onChange, required, disabled, className, readOnly, }: DateInputProps) => import("react/jsx-runtime").JSX.Element;
