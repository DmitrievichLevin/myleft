import { DebouncedFuncLeading } from 'lodash';
import { SnapObserver } from './observers/OverflowObserver';
export type ISnapScroll = {
    loading: boolean;
    observer?: SnapObserver;
};
/**
 * Direction of Scroll passed in callbacks
 * <-- (-1),
 * (1) -->
 */
export type SnapScrollDirection = 1 | -1;
export type SnapScroll = DebouncedFuncLeading<(delta: number, onScrollFinish: Function) => Promise<void>>;
export type SnapScrollCallback = (observer: SnapObserver, direction: SnapScrollDirection) => void;
/**
 * useSnapScroll Hook Options
 */
export type SnapScrollOptions = {
    /**
     * Enable Snap Scroll
     * Disabled by default
     */
    enabled?: boolean;
    /**
     * Callback fired when scroll animation finishes.
     * @param direction
     * @returns {void}
     */
    onScrollFinished?: SnapScrollCallback;
    /**
     * Callback fired when scrolling at bounds.
     * @param direction
     * @returns {void}
     */
    onOverScroll?: SnapScrollCallback;
    /**
     * Duration of scroll animation
     * default 500ms
     */
    duration?: number;
    /**
     * Initial Scroll Position
     */
    initial?: SnapScrollPosition;
};
export type SnapScrollPosition = 'start' | 'end' | number;
export type SnapObserverOptions = {
    /**
     * Duration of scroll animation
     * default 500ms
     */
    duration?: number;
    /**
     * Initial Scroll Position
     */
    initial?: SnapScrollPosition;
};
