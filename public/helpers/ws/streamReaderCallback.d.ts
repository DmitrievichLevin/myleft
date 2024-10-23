import { Resource } from '../reactQuery/hooks/useArbitraryQuery';
export type StreamResponse = {
    progress: number;
    message: string | null;
    data?: string;
    error?: string;
};
export type PipeCallback = (chunk: StreamResponse, allChunks?: Resource[] | undefined) => void;
export type StreamReaderOptions = {
    notify?: boolean;
    onPipe?: PipeCallback;
};
/**
 * Stream Reader API Callback
 * @param res
 * @param notify Toast Each Chunk message/error
 * @returns
 */
export declare function StreamReaderCallback(res: any, opts?: StreamReaderOptions): Promise<any[] | null>;
