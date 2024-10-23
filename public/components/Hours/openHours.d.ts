type OpenDay = {
    active: boolean;
    hours: {
        start: number;
        end: number;
    };
};
export declare const OpenHours: ({ open }: {
    open: OpenDay[];
}) => import("react/jsx-runtime").JSX.Element;
export {};
