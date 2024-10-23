import { ReactElement } from 'react';
type IconListItem = {
    icon?: string;
    component: ReactElement;
};
export declare const IconList: ({ items }: {
    items: IconListItem[];
}) => import("react/jsx-runtime").JSX.Element;
export {};
