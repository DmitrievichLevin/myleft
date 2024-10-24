import { MutableRefObject, ReactNode, useCallback, useMemo } from 'react';
import './countdown.css';
import dayjs from 'dayjs';
import { CountdownNum } from './countdownNum';

export type ICountDownCallback = {
  container: MutableRefObject<HTMLDivElement | null>;
  base: MutableRefObject<HTMLDivElement | null>;
  flapRef: MutableRefObject<Array<HTMLDivElement | null>>;
  next?: (n?: number) => void;
};

export const CountDown = ({}) => {
  const startTimes = useCallback(() => {
    const end = dayjs('2024-11-05').startOf('day').format();
    var remaining = dayjs(end).unix() - dayjs().unix();

    // days
    var days: any = Math.floor(remaining / 86400);
    remaining -= days * 86400;
    days = days > 9 ? [Math.floor(days / 10), days % 10] : [0, days];

    // hours
    var hours: any = Math.floor(remaining / 3600);
    remaining -= hours * 3600;
    hours = hours > 9 ? [Math.floor(hours / 10), hours % 10] : [0, hours];

    // minutes
    var minutes: any = Math.floor(remaining / 60);
    remaining -= minutes * 60;
    minutes =
      minutes > 9 ? [Math.floor(minutes / 10), minutes % 10] : [0, minutes];

    // seconds
    var seconds = [Math.floor(remaining / 10), remaining % 10];

    return [...days, ...hours, ...minutes, ...seconds];
  }, []);

  return (
    <div className="cd-wrapper flex flex-col gap-2">
      <p className="text-[#dddddd] m-0 mt-1 font-[Balto] cd-msg">
        🇺🇸 Limited-time offer! Sale ends in
      </p>
      <div className="cd-cn">
        {startTimes().reduce(
          (temp, value, idx) => {
            let max = [undefined, undefined, 2, 24, 6, 60, 6, 60];
            let measure = ['Days', 'Hours', 'Minutes', 'Seconds'];
            const [Elem, cb] = CountdownNum({
              start: value,
              next: temp.cb,
              max: max[idx],
              measure: measure?.[Math.floor(idx / 2)],
              paused: idx !== 7,
            });
            temp.cb = cb;
            temp.elems.push(
              <Elem key={`cd-el-${idx}-${measure?.[Math.floor(idx / 2)]}`} />
            );
            if (idx === 7) return temp.elems;
            return temp;
          },
          { cb: null, elems: [] }
        )}
      </div>
    </div>
  );
};
