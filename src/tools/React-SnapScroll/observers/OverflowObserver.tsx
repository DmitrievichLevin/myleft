import { debounce } from 'lodash';
import { SnapObserverOptions, SnapScroll, SnapScrollPosition } from '../types';
import {
  enforceIntWidth,
  getPadding,
  isIntersecting,
  snapObserverFn,
} from '../callbacks/snapObserverFn';
import { v4 as uuidv4 } from 'uuid';

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
export class SnapObserver extends IntersectionObserver {
  constructor(root: HTMLElement, options: SnapObserverOptions) {
    super(snapObserverFn, { root: root.parentElement });

    const { duration = 500, initial = 'start' } = options;

    // Track SnapObserver(Debugging)
    this.id = uuidv4();

    // Initial Snap Position
    this.initial = initial;

    // Disable overscroll-behavior-x (html,body)
    const html = document.getElementsByTagName('html')[0] as HTMLElement;
    html.style.overscrollBehaviorX = 'none';
    document.body.style.overscrollBehaviorX = 'none';

    // Set Root Parent OverflowX: hidden
    (root.parentElement as HTMLElement).style.overflowX = 'hidden';

    this.__scrollDuration = duration;

    // Bind Debounced Scroll Method
    this.scroll = this.__scroll(this.__scrollDuration);

    // Save Reference to root (IntersectionObserver.root = root.parentElement)
    this.__snapContainer = root;

    const observed = this.children;

    const visible = this.__init_observed();

    // Option: initial
    let pos = 0;
    let len = observed.length;
    switch (this.initial) {
      case 'start':
        pos = 0;
        break;
      case 'end':
        pos = this.__getViewStart(len - 1, visible);
        break;
      default:
        if (typeof this.initial !== 'number') {
          console.error(
            `Expected SnapObserverOptions.intial<"start" | "end" | number>, but found ${typeof this.initial}`
          );
        } else {
          pos = this.__getViewStart(this.initial, visible);
        }
    }

    // Set Initial Scroll Position
    this.__playScroll(pos, pos, 1);

    // Get root.parent padding (required to accurately trigger callbacks)
    var padding_left = window
      .getComputedStyle(root.parentElement as HTMLElement, null)
      .getPropertyValue('padding-left')
      .replace('px', '');
    var padding_right = window
      .getComputedStyle(root.parentElement as HTMLElement, null)
      .getPropertyValue('padding-left')
      .replace('px', '');

    this.__offsetPaddingX = [
      parseInt(padding_left, 10),
      parseInt(padding_right, 10),
    ];
  }

  /**
   * Fit
   * @summary Resize Wrapper to View Size.
   */
  fit() {
    const root = this.root as HTMLElement;

    const observed = this.children;

    const visible = this.__init_observed();
    // Resize Wrapper to fit only fully visible
    try {
      const lastElemX = observed[visible - 1].offsetLeft;
      const width = observed[visible - 1].offsetWidth;

      const { left: root_left_padding, right: root_right_padding } =
        getPadding(root);
      const pixelWidth = `${lastElemX + width + root_left_padding + root_right_padding}px`;

      root.style.width = pixelWidth;
      root.style.maxWidth = pixelWidth;
      root.style.alignSelf = 'center';
    } catch (e) {
      console.error('Unable to resize snap overflow root.', e);
    }
  }

  __getViewStart(idx: number, visible: number): number {
    const children = this.children.length;
    const offSet = (children + 1) % visible;

    var start_idx = Math.floor(idx / visible) * visible - 1;
    if (offSet > 0) {
      start_idx -= visible - offSet;
    }

    var pos = this.children[start_idx]?.offsetLeft || 0;
    pos *= -1;
    return pos;
  }

  async __playScroll(start: number, end: number, duration: number) {
    const ani = this.__snapContainer.animate(
      [
        {
          left: `${start}px`,
        },
        {
          left: `${end}px`,
        },
      ],
      {
        duration,
        iterations: 1,
        fill: 'forwards',
      }
    );

    return ani.finished;
  }

  reset = debounce(
    () => {
      this.__loading = true;
      this.disconnect();
      // Clear queues
      this.__underflow = [];
      this.__visible = [];
      this.__overflow = [];

      const observed = this.children;

      const visible = this.__init_observed();

      let pos = 0;

      if (this.initial === 'end') {
        pos = this.__getViewStart(observed.length - 1, visible);
      }

      // Reset Initial Position
      this.__playScroll(pos, pos, 1);
    },
    1000,
    {
      leading: true,
      trailing: false,
    }
  );

  /**
   * Get Children.display !== "none"
   */
  get children(): HTMLElement[] {
    var children = [];
    for (var _obs of this.__snapContainer.children) {
      const obs = _obs as HTMLElement;
      if (window.getComputedStyle(obs, null).display === 'none') {
        continue;
      }
      children.push(obs);
    }
    return children;
  }

  /**
   * Observe All Children
   * @param observed HTMLCollection
   * @returns Estimated View Size
   */
  __init_observed(): number {
    let visible = 0;

    for (var _obs of this.children) {
      const obs = _obs as HTMLElement;
      // Float Element Widths cause inaccuracies
      enforceIntWidth(obs);

      if (isIntersecting(this.root as HTMLElement, obs)) {
        visible += 1;
      }

      this.observe(obs);
    }

    return visible;
  }

  __remove(
    queue: IntersectionObserverEntry[],
    entry: IntersectionObserverEntry
  ) {
    const found = queue.findIndex(
      ({ target }) => target.id === entry.target.id
    );

    if (found > -1) {
      queue.splice(found, 1);
    }
  }

  get underflow() {
    return this.__underflow;
  }

  get overflow() {
    return this.__overflow;
  }

  get visible() {
    return this.__visible;
  }

  get viewsize() {
    return this.__visible.length;
  }

  scroll: SnapScroll;

  __scroll = (duration: number) =>
    debounce(
      async (
        delta: number,
        onScrollFinish: Function = (__overscroll: boolean) => {},
        distance?: number
      ) => {
        const start = this.__snapContainer.offsetLeft;

        const [end, overscroll] = this.__nextStart({ delta, distance });

        if (!overscroll)
          return this.__playScroll(start, end, duration).then(() =>
            onScrollFinish(overscroll)
          );
        else onScrollFinish(overscroll);
      },
      duration,
      {
        leading: true,
        trailing: false,
      }
    );

  __findNode(distance: number): [number, number] {
    const [u, _v, o] = this.queues;
    const o_len = o.length;
    const u_len = u.length;
    const size = this.viewsize;
    if (distance > 0) {
      let x = o_len >= size ? 2 : 1;
      let y = o_len >= size ? 0 : o_len;
      return [x, y];
    } else if (distance < 0) {
      let x = u_len > 0 ? 0 : 1;
      let y = u_len >= size ? u_len - size : 0;
      return [x, y];
    }

    return [1, 0];
  }

  __nextStart({
    delta,
    distance,
  }: {
    delta: number;
    distance?: number;
  }): [number, boolean] {
    let next_view = delta < 0 ? this.viewsize * -1 : this.viewsize;

    const [queue, idx] = this.__findNode(distance || next_view);

    const entryQueue = this.queues[queue];

    const entry = entryQueue?.[idx];

    let overscroll: boolean;

    switch (true) {
      // Left Edge
      case this.queues[0].length === 0 && queue + idx === 1:
        overscroll = true;
        break;
      // Right Edge
      case this.queues[2].length === 0 && queue + idx === 1:
        overscroll = true;
        break;
      default:
        overscroll = false;
    }

    if (entry) {
      return [(entry?.target as HTMLElement)?.offsetLeft * -1, overscroll];
    }
    return [0, overscroll];
  }

  get queues() {
    return [this.underflow, this.visible, this.overflow];
  }

  id: string;
  initial: SnapScrollPosition;

  __snapContainer: HTMLElement;
  __offsetPaddingX: [number, number] = [0, 0];

  __underflow: IntersectionObserverEntry[] = [];
  __visible: IntersectionObserverEntry[] = [];
  __overflow: IntersectionObserverEntry[] = [];
  __scrollDuration: number = 500;
  __loading: boolean = false;
}
