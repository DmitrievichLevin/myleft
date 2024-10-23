import { Dayjs } from 'dayjs';
import { Minutes, TimeString, TwoDigitMonthDateYear } from '../types';
export type GridFill = {
    min: number;
    max: number;
    idx: number;
};
declare function timeLabel(minutes: Minutes): TimeString;
export type TimeFrameString = string;
declare function timeFrameLabel(startDate: TwoDigitMonthDateYear, startTime: number, endDate: TwoDigitMonthDateYear, endTime: Minutes): any;
export declare const timeUntil: (date: Dayjs) => string;
export type ReducerAction = {
    [key: string]: any;
};
export { timeLabel, timeFrameLabel };
