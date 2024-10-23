import { ComponentType, ReactElement } from 'react';
export declare const Protected: ({ children }: {
    children: ReactElement;
}) => ReactElement<any, string | import("react").JSXElementConstructor<any>>;
export declare const ProtectedRoute: (Elem: ComponentType) => () => import("react/jsx-runtime").JSX.Element;
