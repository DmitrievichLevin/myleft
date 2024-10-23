import { HTMLInputEvent } from '../../../../types';
export type FormImageUploadProps = {
    value?: {
        url: string;
    };
    name: string;
    className?: string;
    fallback?: string;
    onChange: (...args: any[]) => void;
    required?: boolean;
    disabled?: boolean;
};
declare const _default: (props: FormImageUploadProps, inputRef: React.RefObject<HTMLInputElement>) => {
    src: string;
    onChange: (event: HTMLInputEvent) => Promise<void>;
    onClick: () => void;
};
export default _default;
