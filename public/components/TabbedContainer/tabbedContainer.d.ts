import { ReactNode } from 'react';
import './tabbedContainer.css';
export type Tab = {
    title: string;
    icon?: string;
    component?: ReactNode | (() => JSX.Element);
    buttonClassName?: string;
    filter?: Function;
};
type TabExtra = {
    id: string;
    node: ReactNode;
};
export declare const TabbedContainer: ({ tabs, tabsClassName, newContent, children, extras, }: {
    tabs: Tab[];
    tabsClassName?: string;
    newContent?: boolean;
    children?: Function;
    /**
     * Extra Tab Navigation components
     * - unrelated to navigation
     */
    extras?: TabExtra[];
}) => import("react/jsx-runtime").JSX.Element;
export {};
