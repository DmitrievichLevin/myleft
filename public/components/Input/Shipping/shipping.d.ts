import './shipping.css';
type IShipping = {
    value: {
        [key: string]: any;
    };
    name: string;
    onChange?: (value: {
        [key: string]: any;
    }) => void;
    required?: boolean;
    disabled?: boolean;
    forwardRef?: any;
    errorMessage?: string;
};
export declare const ShippingInfo: ({ name, value, onChange, disabled, forwardRef, errorMessage, }: IShipping) => import("react/jsx-runtime").JSX.Element;
export {};
