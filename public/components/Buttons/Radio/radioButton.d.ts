import './radioButton.css';
export type RadioButtonProps = {
    id: string;
    value: boolean;
    name: string;
    className?: string;
    onChange: (value: boolean) => void;
};
export declare const RadioButton: ({ name, value, id, className, onChange, }: RadioButtonProps) => import("react/jsx-runtime").JSX.Element;
