export type FormDDUploadProps = {
    value?: {
        url: string;
    };
    name?: string;
    className?: string;
    fallback?: string;
    onChange: (...args: any[]) => void;
    maxFileSize: number;
    required?: boolean;
    disabled?: boolean;
};
declare const _default: ({ onChange, maxFileSize, disabled }: FormDDUploadProps, inputRef: React.RefObject<HTMLInputElement>) => {
    dragOver: boolean;
    onClick: () => void;
    handleDrop: (e: any) => void;
    handleDragExit: (e: any) => void;
    handleSelectFiles: (e: any) => void;
    handleOnDragOver: (e: any) => void;
    removeFile: (fileName: string) => void;
    files: any[];
};
export default _default;
