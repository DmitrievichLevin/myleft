import { MouseEventHandler } from 'react';
import { ButtonType } from '../base';
import './secondaryButton.css';
export declare const SecondaryButton: ({ onClick, title, className, type, disabled, }: {
    onClick: MouseEventHandler;
    className?: string;
    title: string;
    type?: ButtonType;
    disabled?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
