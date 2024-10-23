import { HTMLInputEvent } from '../../../types';
import { UseMutateFunction } from '@tanstack/react-query';
import { Resource } from '../../../helpers/reactQuery/hooks/useArbitraryQuery';
import { MutationFNError } from '../../../helpers/reactQuery/decorators';
export type ImageUploadProps = {
    src?: string;
    className?: string;
    fallback?: string;
    mutationFn: UseMutateFunction<Resource, MutationFNError, Resource, unknown>;
    alt: string;
};
declare const _default: (props: ImageUploadProps, inputRef: React.RefObject<HTMLInputElement>) => {
    src: string;
    onChange: (event: HTMLInputEvent) => Promise<void>;
    onClick: () => void;
    loading: boolean;
};
export default _default;
