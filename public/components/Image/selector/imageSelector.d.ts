import './imageSelector.css';
type IImageSelector = {
    className?: string;
    onChange: (idx: number) => void;
    imgs: {
        src: string;
        alt: string;
    }[];
    value: number;
    max?: number;
};
export declare const ImageSelector: ({ className, onChange, imgs, value, max, }: IImageSelector) => import("react/jsx-runtime").JSX.Element;
export {};
