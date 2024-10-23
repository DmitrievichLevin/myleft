import { MutableRefObject } from 'react';
import './countdown.css';
export type ICountDownCallback = {
    container: MutableRefObject<HTMLDivElement | null>;
    base: MutableRefObject<HTMLDivElement | null>;
    flapRef: MutableRefObject<Array<HTMLDivElement | null>>;
    next?: (n?: number) => void;
};
export declare const CountDown: ({}: {}) => import("react/jsx-runtime").JSX.Element;
