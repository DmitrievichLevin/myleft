import { MouseEventHandler } from 'react';
import { ButtonType } from '../base';
import './primaryButton.css';
export declare const PrimaryButton: ({ onClick, title, className, type, disabled, }: {
    onClick: MouseEventHandler;
    className?: string;
    title: string;
    type?: ButtonType;
    disabled?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
