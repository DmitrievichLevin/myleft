import { MouseEventHandler, ReactNode } from 'react';
import './base.css';
export type ButtonType = 'button' | 'submit' | 'reset' | undefined;
export type BaseButtonProps = {
    onClick: MouseEventHandler;
    styles?: {
        [key: string]: string;
    };
    className?: string;
    title?: string;
    children?: ReactNode;
    name?: string;
    type?: ButtonType;
    disabled?: boolean;
    forwardRef?: HTMLInputElement;
};
export declare const BaseButton: ({ onClick, styles, className, title, children, name, type, disabled, forwardRef, }: BaseButtonProps) => import("react/jsx-runtime").JSX.Element;
