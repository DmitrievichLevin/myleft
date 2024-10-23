import './article.css';
import { ReactNode } from 'react';
type IArticle = {
    children: string | ReactNode | ReactNode[];
    title?: string;
    className?: string;
};
export declare const Article: ({ children, title, className }: IArticle) => import("react/jsx-runtime").JSX.Element;
export {};
