export declare const useModalActions: (key?: string) => {
    closeModal: () => void;
    openModal: (data?: any) => void;
    open: boolean;
    modalData: {
        [key: string]: any;
    } | undefined;
};
export declare const ModalFactory: () => import("react/jsx-runtime").JSX.Element;
