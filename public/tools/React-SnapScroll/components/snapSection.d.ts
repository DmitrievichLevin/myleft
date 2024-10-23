import { ReactNode } from 'react';
import '../snapscroll.css';
import { SnapScrollCallback, SnapScrollOptions } from '../types';
export declare const SnapSection: ({ children, title, className, titleClassName, snapOptions, id, }: {
    children: ReactNode | ReactNode[];
    title: string | ReactNode;
    className?: string;
    titleClassName?: string;
    snapOptions?: SnapScrollOptions;
    onOverScroll?: SnapScrollCallback;
    id?: string;
}) => import("react/jsx-runtime").JSX.Element;
