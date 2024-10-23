import { MouseEventHandler } from 'react';
export type IconButtonProps = {
    icon?: string;
    onClick: MouseEventHandler;
    className?: string;
    iconClassName?: string;
    text?: string;
    name?: string;
    forwardRef?: HTMLInputElement;
    disabled?: boolean;
};
export declare const IconButton: ({ onClick, icon, iconClassName, className, text, name, forwardRef, disabled, }: IconButtonProps) => import("react/jsx-runtime").JSX.Element;
