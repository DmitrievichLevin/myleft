import './checkSelect.css';
type ICheckSelect = {
    opts: Array<{
        value: any;
        label: string;
        [key: string]: any;
    }>;
    name: string;
    onChange: (v: any) => void;
    value: any;
};
declare const _default: ({ opts, name, onChange, value }: ICheckSelect) => import("react/jsx-runtime").JSX.Element;
export default _default;
