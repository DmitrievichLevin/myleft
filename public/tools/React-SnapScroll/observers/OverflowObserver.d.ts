import { SnapObserverOptions, SnapScroll, SnapScrollPosition } from '../types';
/**
 * @class SnapObserver
 * @summary - IntersectionObserver Extended to enable Snap Scroll Behavior.
 * Author: @DmitrievichLevin
 * @notes
 * - Default Scroll Duration: 500ms
 * - Disables Browser Overscroll X
 * - Prevents Default Scroll Behavior
 * - IntersectionObserver.root = root.parentElement
 * - Uses left CSS property to scroll root inside of parent
 * - Mutates Children Element id property 'react-snscroll-[uuidv4]'
 */
export declare class SnapObserver extends IntersectionObserver {
    constructor(root: HTMLElement, options: SnapObserverOptions);
    /**
     * Fit
     * @summary Resize Wrapper to View Size.
     */
    fit(): void;
    __getViewStart(idx: number, visible: number): number;
    __playScroll(start: number, end: number, duration: number): Promise<Animation>;
    reset: import("lodash").DebouncedFuncLeading<() => void>;
    /**
     * Get Children.display !== "none"
     */
    get children(): HTMLElement[];
    /**
     * Observe All Children
     * @param observed HTMLCollection
     * @returns Estimated View Size
     */
    __init_observed(): number;
    __remove(queue: IntersectionObserverEntry[], entry: IntersectionObserverEntry): void;
    get underflow(): IntersectionObserverEntry[];
    get overflow(): IntersectionObserverEntry[];
    get visible(): IntersectionObserverEntry[];
    get viewsize(): number;
    scroll: SnapScroll;
    __scroll: (duration: number) => import("lodash").DebouncedFuncLeading<(delta: number, onScrollFinish?: Function, distance?: number) => Promise<any>>;
    __findNode(distance: number): [number, number];
    __nextStart({ delta, distance, }: {
        delta: number;
        distance?: number;
    }): [number, boolean];
    get queues(): IntersectionObserverEntry[][];
    id: string;
    initial: SnapScrollPosition;
    __snapContainer: HTMLElement;
    __offsetPaddingX: [number, number];
    __underflow: IntersectionObserverEntry[];
    __visible: IntersectionObserverEntry[];
    __overflow: IntersectionObserverEntry[];
    __scrollDuration: number;
    __loading: boolean;
}
