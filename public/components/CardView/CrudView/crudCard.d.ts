import { MouseEventHandler, ReactElement } from 'react';
import './crudCard.css';
export declare const CrudCard: ({ children, update, del, disabled, className, }: {
    children: ReactElement | ReactElement[];
    key?: string;
    update?: MouseEventHandler;
    del?: MouseEventHandler;
    disabled: boolean;
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
