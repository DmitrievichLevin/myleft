import './ferrisSelect.css';
type IFerrisSelect = {
    opts: Array<{
        value: any;
        label: string;
        [key: string]: any;
    }>;
    name: string;
    onChange: (v: any) => void;
};
declare const _default: ({ opts, name, onChange }: IFerrisSelect) => import("react/jsx-runtime").JSX.Element;
export default _default;
