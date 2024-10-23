import './segmentedCtrl.css';
import { useCallback, useEffect, useRef, useState } from 'react';

export default ({
  opts,
  value,
  onChange,
}: {
  opts: string[];
  value: string;
  onChange: (val: string) => void;
}) => {
  const sgtWrapper = useRef<HTMLDivElement>();
  const sgtCtrl = useRef<HTMLDivElement>();

  const [observer, setObserver] = useState<ResizeObserver>();

  useEffect(() => {
    if (sgtWrapper?.current && sgtCtrl?.current) {
      const resObsvr = new ResizeObserver((entries) => {
        translate(sgtCtrl.current as HTMLDivElement);
      });
      resObsvr.observe(sgtWrapper?.current);
      setObserver(resObsvr);
    }
    return () => {
      if (observer) {
        observer.disconnect();

        setObserver(undefined);
      }
    };
  }, [sgtWrapper?.current]);

  const translate = useCallback(
    (elem: HTMLDivElement) => {
      let i = opts.findIndex((val) => val === value);

      if (!elem?.parentElement || !elem?.parentElement?.children?.length)
        return;

      const { width: p_w } = (
        elem.parentElement as HTMLDivElement
      ).getBoundingClientRect();

      const {
        height: childHeight,
        width: childWidth,
        left,
      } = (
        elem.parentElement.children[0] as HTMLElement
      ).getBoundingClientRect();

      const padding_left = parseInt(
        window
          .getComputedStyle(elem.parentElement as HTMLElement, null)
          .getPropertyValue('padding-left')
          .replace('px', ''),
        10
      );

      // Assuming padding left/right are equal
      const parentWidth = p_w - padding_left * 2;

      const pct = parseInt(((i / opts.length) * parentWidth).toFixed(0), 10);

      elem.style.transform = `translateX(${padding_left + pct}px)`;

      elem.style.width = `${childWidth}px`;

      elem.style.height = `${childHeight}px`;

      sgtCtrl.current = elem;

      return elem;
    },
    [value, opts]
  );

  return (
    // @ts-ignore
    <div className="sgt-ctrl-wrapper" ref={sgtWrapper}>
      {opts.map((item, i) => {
        let id = `sgt-ctrl-rad-${i}-${item}`;
        return (
          <div key={id}>
            <input
              id={id}
              className="sgt-ctrl-rad"
              type="radio"
              checked={item === value}
              onClick={() => {
                onChange(item);
              }}
            />
            <label className="sgt-ctrl-opt capitalize" htmlFor={id}>
              {item}
            </label>
          </div>
        );
      })}
      <div className="sgt-ctrl-bg" ref={translate} />
    </div>
  );
};
