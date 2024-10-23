import './phoneInput.css';
export declare const PhoneNumberInput: ({ value, onChange, name, disabled, }: {
    value: any;
    onChange: (val: string) => void;
    name: string;
    disabled?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export declare const formatPhoneNumber: (value?: string) => string;
export declare const formatPhoneNumberArea: (value?: string) => string;
