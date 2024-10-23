export type ColorCode = {
    label: string;
    color: string;
    fontColor?: string;
    icon?: string;
};
export type ColorCodes = {
    [key: number]: ColorCode;
};
export declare const ColorCodeTag: ({ label, color, fontColor, icon, }: ColorCode) => import("react/jsx-runtime").JSX.Element;
