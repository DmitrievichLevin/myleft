import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

export const CountdownNum = ({
  start = 9,
  paused = true,
  next,
  max = 9,
  measure,
}: {
  start?: number;
  paused: boolean;
  next?: (args?: any) => void;
  max?: number;
  measure?: string;
}): any[] => {
  const container = useRef<HTMLDivElement>(null);
  const base = useRef<HTMLDivElement>();
  const flapRef = useRef<
    [
      // front
      HTMLDivElement | null,
      // back
      HTMLDivElement | null,
      // under
      HTMLDivElement | null,
    ]
  >([null, null, null]);

  const increment = useCallback(async () => {
    var b = parseInt(base?.current?.dataset?.content as string, 10);

    var n = b - Math.floor(b / 10) * 10;

    if (b === 0) {
      n = max - Math.floor(max / 10) * 10;
      if (n === 0) {
        n = 9;
        (base.current as HTMLDivElement).dataset.content = `${b - 1}`;
      } else {
        (base.current as HTMLDivElement).dataset.content = `${max - 1}`;
        n -= 1;
      }
      if (next) next();
    } else if (n === 0) {
      n = 9;
      (base.current as HTMLDivElement).dataset.content = `${b - 1}`;
      if (next) next();
    } else {
      n -= 1;
      (base.current as HTMLDivElement).dataset.content = `${b - 1}`;
    }

    (flapRef.current[1] as HTMLDivElement).dataset.content = `${n}`;
    (flapRef.current[2] as HTMLDivElement).dataset.content = `${n}`;

    // Front
    (flapRef.current[0] as HTMLDivElement).style.display = 'inline-block';

    // Back
    (flapRef.current[1] as HTMLDivElement).style.display = 'inline-block';

    // Under
    (flapRef.current[2] as HTMLDivElement).style.display = 'inline-block';

    Promise.all(
      (container.current as HTMLDivElement)
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished)
    )
      .then(() => {
        (base.current as HTMLDivElement).textContent = `${n}`;
        (flapRef.current[0] as HTMLDivElement).style.display = 'none';
        (flapRef.current[1] as HTMLDivElement).style.display = 'none';
        (flapRef.current[2] as HTMLDivElement).style.display = 'none';
        (flapRef.current[0] as HTMLDivElement).dataset.content = `${n}`;
      })
      .catch((e) => {});
  }, [max]);

  useEffect(() => {
    if (
      base.current &&
      flapRef.current[0] &&
      flapRef.current[1] &&
      flapRef.current[2] &&
      !paused
    ) {
      const interval = setInterval(increment, 1000);

      return () => {
        clearInterval(interval);
      };
    }
    return () => {};
  }, []);

  return [
    () => (
      <div
        className="cd-item-value-cn"
        ref={container}
        data-content={measure || ''}
      >
        <div className="cd-item-value">
          <div
            className="cd-item-value-base"
            data-content={`${start}`}
            ref={(el) => {
              base.current = el as HTMLDivElement;
            }}
          >
            {start}
          </div>

          <div
            className="cd-item-value-flap cd-item-value-flap-over cd-item-value-flap-front"
            data-content={`${start}`}
            ref={(el: any) => {
              flapRef.current[0] = el;
            }}
          />

          <div
            className="cd-item-value-flap cd-item-value-flap-over cd-item-value-flap-back"
            data-content={`${start + 1}`}
            ref={(el: any) => {
              flapRef.current[1] = el;
            }}
          />

          <div
            className="cd-item-value-flap cd-item-value-flap-under"
            ref={(el: any) => {
              flapRef.current[2] = el;
            }}
            data-content={`${start}`}
          />
        </div>
      </div>
    ),
    increment,
  ];
};
