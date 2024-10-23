import { v4 as uuidv4 } from 'uuid';
import { entrySortCallback } from './entrySort';
import { SnapObserver } from '../observers/OverflowObserver';

export const snapObserverFn: IntersectionObserverCallback = async (
  entries: IntersectionObserverEntry[],
  obs: IntersectionObserver
): Promise<any> => {
  const observer = obs as SnapObserver;

  // For Async
  observer.__loading = true;

  // Reset Flag
  var pending_reset = false;

  for (var entry of entries) {
    const {
      isIntersecting,
      target: t,
      rootBounds,
      boundingClientRect: { width, x: e_x },
    } = entry;

    const target = t as HTMLElement;

    const { parentElement, parentNode } = target;

    // Reset Observer if element is removed
    if (parentElement === null && parentNode === null) {
      observer.reset();
      return;
    }

    if (!target.id.includes('react-snscroll-'))
      target.id = 'react-snscroll-' + uuidv4();

    const r_x = rootBounds?.x || 0;

    // Added Func Scroll on Tab Last Element
    target.addEventListener('keydown', (e) => {
      const { code } = e;
      const { target: last_target } = observer.__visible[observer.viewsize - 1];
      var nextSibling = target.nextElementSibling as HTMLElement;

      switch (code) {
        case 'Tab':
          if (nextSibling) {
            e.preventDefault();
            e.stopPropagation();
            nextSibling.focus({ preventScroll: true });
            if (target.id === last_target.id) {
              observer.scroll(1, (overscroll: boolean) => {});
            }
          }
          break;
        default:
          return;
      }
    });

    switch (true) {
      case isIntersecting:
        target.tabIndex = 0;
        observer.__remove(observer.__underflow, entry);
        observer.__remove(observer.__overflow, entry);
        observer.__visible.push(entry);
        observer.__visible.sort(entrySortCallback);
        break;
      case e_x < r_x:
        target.tabIndex = -1;
        observer.__remove(observer.__visible, entry);
        observer.__underflow.push(entry);
        observer.__underflow.sort(entrySortCallback);
        break;
      default:
        target.tabIndex = 0;
        observer.__remove(observer.__visible, entry);
        observer.__overflow.push(entry);
        observer.__overflow.sort(entrySortCallback);
    }
  }
  observer.__loading = false;
};

export const isIntersecting = (elem1: HTMLElement, elem2: HTMLElement) => {
  const x1_l = elem1.offsetLeft;
  const { left: left_padding, right: right_padding } = getPadding(elem1);
  const w_1 = elem1.offsetWidth - left_padding - right_padding;
  const [containerLeft, containerRight] = [x1_l, x1_l + w_1];

  const x2_l = elem2.offsetLeft + x1_l;
  const w_2 = elem2.offsetWidth;
  const [elementLeft, elementRight] = [x2_l, x2_l + w_2];

  return elementLeft >= containerLeft && elementRight <= containerRight;
};

export const enforceIntWidth = (target: HTMLElement) => {
  const width = target.clientWidth;

  if (!Number.isInteger(width)) {
    var int_width = `${parseInt(`${width}`, 10)}px !important`;

    target.style.width = int_width;
  }
};

const parsePadding = (pad_value: string) => {
  if (!/^\d+(%|px)$/.test(pad_value)) return 0;

  switch (true) {
    case pad_value.includes('%'):
      return parseInt(pad_value.replace('%', ''), 10);
    default:
      return parseInt(pad_value.replace('px', ''), 10);
  }
};

export const getPadding = (target: HTMLElement) => {
  try {
    const pad_val = window
      .getComputedStyle(target, null)
      .getPropertyValue('padding');

    const values = pad_val.split(' ');

    switch (values.length) {
      case 1:
        let o_p = parsePadding(values[0]);
        return { left: o_p, right: o_p, top: o_p, bottom: o_p };
      case 2:
        let y_p = parsePadding(values[0]);
        let x_p = parsePadding(values[1]);
        return { left: x_p, right: x_p, top: y_p, bottom: y_p };
      case 3:
        let t_p = parsePadding(values[0]);
        let lr_p = parsePadding(values[1]);
        let b_p = parsePadding(values[2]);
        return { left: lr_p, right: lr_p, top: t_p, bottom: b_p };
      case 4:
        let tt_p = parsePadding(values[0]);
        let rr_p = parsePadding(values[1]);
        let bb_p = parsePadding(values[2]);
        let ll_p = parsePadding(values[3]);
        return { left: ll_p, right: rr_p, top: tt_p, bottom: bb_p };
      default:
        throw Error(`Invalid Padding value: ${pad_val}`);
    }
  } catch (e) {
    console.error('Unable to parse root padding.', e);
    return { left: 0, right: 0, top: 0, bottom: 0 };
  }
};
