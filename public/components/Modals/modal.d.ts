import { ReactNode } from 'react';
import './modal.css';
export declare const Modal: ({ children, onRequestClose, modalKey, className, titleClassName, title, }: {
    children: Iterable<ReactNode> | ReactNode;
    className?: string;
    titleClassName?: string;
    onRequestClose?: () => void;
    modalKey: string;
    title?: string | ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
