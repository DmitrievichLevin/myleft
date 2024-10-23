import dayjs, { Dayjs } from 'dayjs';
import {
  DateTimeString,
  Minutes,
  TimeString,
  TwoDigitMonthDateYear,
} from '../types';
import { time } from 'console';

// Extend Dayjs formatter
var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

export type GridFill = { min: number; max: number; idx: number };

function timeLabel(minutes: Minutes): TimeString {
  return dayjs().startOf('day').add(minutes, 'minutes').format('h:mm a');
}

function dateTimeLabel(
  date: TwoDigitMonthDateYear,
  minutes: Minutes
): DateTimeString {
  return dayjs(date)
    .startOf('day')
    .add(minutes, 'minutes')
    .format('M/D h:mm a');
}

export type TimeFrameString = string;

function timeFrameLabel(
  startDate: TwoDigitMonthDateYear,
  startTime: number,
  endDate: TwoDigitMonthDateYear,
  endTime: Minutes
): any {
  const [s_time, s_mid] = timeLabel(startTime).split(' ');
  const [e_time, e_mid] = timeLabel(endTime).split(' ');
  return (
    <tspan>
      <tspan className="number-font">{s_time}</tspan>
      {s_mid}
      {' - '}
      <tspan className="number-font">{e_time}</tspan>
      {e_mid}
    </tspan>
  );
}

export const timeUntil = (date: Dayjs) => {
  const now = dayjs();
  let remainder = now.diff(date, 'minutes') * -1;
  const units = [
    { unit: 'd', div: 1440 },
    { unit: 'hr', div: 60 },
    { unit: 'm', div: 1 },
  ];
  let time_until = '';

  let count = 0;
  while (count < 3) {
    const { unit, div } = units[count];
    let quotient = Math.floor(remainder / div);
    remainder = remainder % div;
    console.log('track until', quotient, remainder, unit);
    if (quotient) time_until += `${time_until ? ' ' : ''}${quotient}${unit}`;

    if (!remainder) break;
    count += 1;
  }

  return time_until.trim();
};

export type ReducerAction = {
  [key: string]: any;
};

export { timeLabel, timeFrameLabel };
