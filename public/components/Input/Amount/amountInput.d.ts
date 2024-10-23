import './amountInput.css';
type IAmountInput = {
    max?: number;
    name?: string;
    onChange: (val: string) => void;
    value?: string;
    sm?: boolean;
};
export declare const AmountInput: ({ max, name, onChange, value, sm, }: IAmountInput) => import("react/jsx-runtime").JSX.Element;
export {};
