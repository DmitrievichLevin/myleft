import { ReactNode } from 'react';
export declare const ErrorNotification: (message: string) => import("react-toastify").Id;
export declare const SuccessNotification: (message: string) => import("react-toastify").Id;
type ToastUpdateOptions = {
    render: string | ReactNode;
    progress?: number;
    delay?: number;
    callback?: () => void;
    error?: string;
};
export declare const UpdateToast: (id: any, opts: ToastUpdateOptions) => void;
export {};
