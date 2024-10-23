import { ReactNode } from 'react';
import './dropdown.css';
export type DropdownProps = {
    value: [] | DropDownOpt | undefined;
    formatLabel?: (obj: DropDownOpt) => any;
    getOptionValue?: (item: DropDownOpt) => any;
    className?: string;
    opts: any[];
    name: string;
    id?: string;
    onChange?: (value: any) => void;
    required?: boolean;
    disabled?: boolean;
    multi?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    containerStyle?: {
        [key: string]: string | {
            [key: string]: string;
        };
    };
    controlStyle?: {
        [key: string]: string | {
            [key: string]: string;
        };
    };
    valueStyle?: {
        [key: string]: string | {
            [key: string]: string;
        };
    };
    singleValueStyle?: {
        [key: string]: string | {
            [key: string]: string;
        };
    };
    indicatorStyle?: {
        [key: string]: string | {
            [key: string]: string;
        };
    };
    separator?: boolean;
    children?: Iterable<ReactNode> | ReactNode;
    placeholder?: string;
};
export type DropDownOpt = {
    label: string | number;
    value: any;
};
export declare const DropdownList: ({ name, value, opts, id, formatLabel, getOptionValue, onChange, required, disabled, multi, searchable, clearable, containerStyle, children, controlStyle, valueStyle, singleValueStyle, indicatorStyle, separator, placeholder, }: DropdownProps) => import("react/jsx-runtime").JSX.Element;
