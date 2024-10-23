import { useRef } from 'react';
import { toast } from 'react-toastify';
import {
  ErrorNotification,
  UpdateToast,
} from '../../components/toast/toastMessages';
import dayjs from 'dayjs';
import { Resource } from '../reactQuery/hooks/useArbitraryQuery';

export type StreamResponse = {
  progress: number;
  message: string | null;
  data?: string;
  error?: string;
};

class CurlyQueue {
  constructor() {}

  get flush(): StreamResponse {
    const _flushed = this.bin;
    this.bin = '';
    return JSON.parse(_flushed);
  }

  get empty(): boolean {
    return this.store.length === 0;
  }

  pipe = (raw_chunk?: any): StreamResponse | undefined => {
    var decoder = new TextDecoder();
    let chunk = this.store;

    if (raw_chunk) chunk += decoder.decode(raw_chunk);

    let flushed: StreamResponse | undefined;
    for (let i = 0; i < chunk.length; i += 1) {
      var char = chunk.charAt(i);
      this.bin += char;

      if (/[{}]/.test(char)) {
        if (this.stack.length && this.stack?.[0] !== char) {
          this.stack.pop();
          if (this.stack.length === 0) {
            // flush
            flushed = this.flush;
            this.store = chunk.slice(i + 1);
            return flushed;
          }
        } else {
          this.stack.push(char);
        }
      }
    }

    if (!raw_chunk && this.stack.length) {
      throw new Error('Abrupt End of Stream Error.');
    }
    return flushed;
  };

  bin: string = '';

  store: string = '';

  stack: string[] = [];
}

export type PipeCallback = (
  chunk: StreamResponse,
  allChunks?: Resource[] | undefined
) => void;

export type StreamReaderOptions = {
  // Toast Chunk Result;
  notify?: boolean;
  // On Pipe Chunk
  onPipe?: PipeCallback;
};

const defaultStreamOptions = { notify: false, onPipe: (..._: any[]) => {} };

/**
 * Stream Reader API Callback
 * @param res
 * @param notify Toast Each Chunk message/error
 * @returns
 */
export async function StreamReaderCallback(
  res: any,
  opts: StreamReaderOptions = {}
) {
  const { notify, onPipe: __onPipe } = { ...defaultStreamOptions, ...opts };
  const onPipe = __onPipe as PipeCallback;

  var toastId: any = null;
  if (res.status === 204) return null;

  var contentType = res.headers.get('Content-Type');
  // - last Message
  var contentLength = res.headers.get('Content-Length') - 1;
  const reader = res.body.getReader();
  var data: any[] = [];
  const StreamQueue = new CurlyQueue();
  let last_toast_start: number = 0;

  let done = false;

  try {
    while (!done) {
      const { value, done: readerDone } = await reader.read();

      // Result objects contain two properties:
      // done  - true if the stream has already given you all its data.
      // value - some data. Always undefined when done is true.
      if (readerDone) {
        function flush_all() {
          if (!StreamQueue.empty) {
            const piped = StreamQueue.pipe() as StreamResponse;
            const {
              progress: r_progress,
              data: r_data = undefined,
              message: r_msg = undefined,
              error: r_error = undefined,
            } = piped;

            if (r_data) {
              data.push(r_data);
              onPipe(piped, data);
            }
            if (notify)
              UpdateToast(toastId, {
                progress: r_progress,
                render: r_msg,
                error: r_error,
                callback: () => {
                  if (!StreamQueue.empty) flush_all();
                },
                delay: 2000,
              });
          }
        }
        flush_all();
        done = true;
        continue;
      }

      var flush = StreamQueue.pipe(value);

      if (flush) {
        const {
          progress,
          data: _data = '',
          message = '',
          error = undefined,
        } = flush;

        if (_data) {
          data.push(_data);
          onPipe(flush, data.length === contentLength ? data : undefined);
        }

        if (notify) {
          if (toastId === null) {
            last_toast_start = dayjs().unix();
            toastId = toast(message, { progress, autoClose: false });
            continue;
          } else {
            var delay = (2 - (dayjs().unix() - last_toast_start)) * 1000;
            const toast_update = () =>
              new Promise((r) => {
                UpdateToast(toastId, {
                  progress,
                  render: message,
                  delay,
                  error,
                  callback: () => {
                    last_toast_start = dayjs().unix();
                    r('toasted');
                  },
                });
              });

            await toast_update();
          }
        }
      }
    }
  } catch (err: any) {
    if (notify)
      toast.update(toastId, {
        render: err?.message || 'Stream Error.',
        type: 'error',
        autoClose: 5000,
      });
    return null;
  }

  switch (contentType) {
    case 'application/stream+json':
      return data;
    default:
      throw new Error(`Stream Content-Type: ${contentType} not supported.`);
  }

  // const readJSONStream = () => {
  //   // read the data
  //   reader
  //     .read()
  //     .then(({ done, value }: { done: boolean; value: any }) => {

  //       // check if we already displayed a toast
  //     })
  //     .catch((err: any) => {
}
