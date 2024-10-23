import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { SnapObserver } from '../observers/OverflowObserver';
import { ISnapScroll, SnapScrollOptions } from '../types';

export const useSnapScroll = (
  ref: MutableRefObject<HTMLElement>,
  options: SnapScrollOptions = {}
): ISnapScroll => {
  const {
    enabled = false,
    duration = 250,
    onOverScroll = null,
    onScrollFinished = null,
  } = options;

  const [scrolling, setScrolling] = useState(false);

  const [observer, setObserver] = useState<SnapObserver>();

  useEffect(() => {
    if (ref && enabled) {
      const snapObsvr = new SnapObserver(ref?.current, { duration });
      setObserver(snapObsvr);
    }
    return () => {
      if (observer) {
        observer.disconnect();

        setObserver(undefined);
      }
    };
  }, [ref, enabled]);

  useEffect(() => {
    if (observer && document.readyState === 'complete') {
      observer.fit();
    }
    return () => {};
  }, [observer, document.readyState]);

  const wheelSnap = useCallback(
    (e: any) => {
      if (
        e.target !== observer?.root &&
        e.target !== ref?.current &&
        !ref?.current.contains(e.target)
      )
        return;

      const { deltaX } = e;

      e.stopPropagation();
      setScrolling(true);

      observer?.scroll(deltaX, (overScroll: boolean) => {
        setScrolling(false);
        const dir = deltaX < 0 ? -1 : 1;

        if (onScrollFinished && !overScroll) onScrollFinished(observer, dir);
        if (onOverScroll && overScroll) onOverScroll(observer, dir);
      });
    },
    [ref, setScrolling, onScrollFinished, onOverScroll, observer]
  );

  useEffect(() => {
    if (enabled && ref) {
      document.addEventListener('wheel', wheelSnap);

      return () => {
        document.removeEventListener('wheel', wheelSnap);
      };
    }
  }, [ref?.current, wheelSnap]);

  return {
    loading: scrolling,
    observer,
  };
};
