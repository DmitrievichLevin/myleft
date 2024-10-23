import './checkout.css';
type ICheckout = {
    value: {
        [key: string]: any;
    };
    name: string;
    onChange?: (value: {
        [key: string]: any;
    }) => void;
    disabled?: boolean;
    forwardRef?: any;
};
export declare const Checkout: ({ name, value, onChange, disabled, }: ICheckout) => import("react/jsx-runtime").JSX.Element;
export {};
