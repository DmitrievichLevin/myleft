import { MutableRefObject, useMemo, useRef } from 'react';
import './ferrisSelect.css';
import { useFerrisSelectData } from './useFerrisSelectData';

type IFerrisSelect = {
  opts: Array<{ value: any; label: string; [key: string]: any }>;
  name: string;
  onChange: (v: any) => void;
};

export default ({ opts, name = '', onChange }: IFerrisSelect) => {
  const selectRef = useRef<HTMLSelectElement>();

  const { handleSelect } = useFerrisSelectData({
    onChange,
    forwardRef: selectRef as MutableRefObject<HTMLSelectElement>,
    name,
  });

  const tempOpts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i: number) => {
        /**
         * @TODO - Fill Array for any amount of options
         * currently two
         */
        return opts[i % 2 === 0 ? 0 : 1];
      }),
    [opts]
  );

  return (
    <div className={`ferris-select-wrapper`}>
      <style id={`ferris-select-${name}-style`} />
      <div
        className={`ferris-select-wheel-perim`}
        ref={(wheel: any) => {
          if (!wheel) return;
          const w_height = parseInt(
            window
              .getComputedStyle(wheel as HTMLElement, null)
              .getPropertyValue('height')
              .replace('px', ''),
            10
          );
          const parent_w = parseInt(
            window
              .getComputedStyle(wheel.parentElement as HTMLElement, null)
              .getPropertyValue('width')
              .replace('px', ''),
            10
          );
          wheel.style.width = `${w_height}px`;
        }}
      >
        <div
          id="ferris-select-wheel"
          className={`ferris-select-wheel ferris-select-${name}-wheel`}
        >
          {tempOpts.map(({ src, alt, value: val }, idx) => {
            const angle = (idx / tempOpts.length) * 360;
            const offset_angle = angle - 90;
            const theta = ((offset_angle - 90) * Math.PI) / 180;
            const left = (50 * Math.cos(theta) + 50).toFixed(4);
            const top = (-50 * Math.sin(theta) + 50).toFixed(4);
            return (
              <div
                className={`ferris-select-opt ferris-select-${name}-opt-${idx} absolute rounded-full`}
                key={`ferris-select-${name}-opt-${idx}`}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  background: 'white',
                  objectFit: 'contain',
                }}
                onClick={() => handleSelect(angle, val, idx)}
              >
                <img className="w-full h-full" src={src} alt={alt} />
              </div>
            );
          })}
          <div id="ferris-select-ind-wheel" className="ferris-select-ind-wheel">
            {tempOpts.map(({ label }, idx) => {
              const angle = (idx / tempOpts.length) * 360;
              const offset_angle = angle - 90;
              const theta = ((offset_angle - 90) * Math.PI) / 180;
              const left = (50 * Math.cos(theta) + 50).toFixed(4);
              const top = (-50 * Math.sin(theta) + 50).toFixed(4);
              return (
                <div
                  className={`ferris-select-ind ferris-select-${name}-ind-${idx} absolute rounded-full`}
                  key={`ferris-select-${name}-ind-${idx}`}
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <select
        id={`ferris-select-${name}`}
        className="hidden-plain-sight"
        name={name}
        aria-readonly
        // TS/Browser - Complains Mutable/ReadOnly
        onChange={() => {}}
        ref={(elem: any) => {
          selectRef.current = elem;
        }}
        required
      >
        {tempOpts.map(({ value: v }, idx) => (
          <option key={`ferris-select-${name}-opt-${idx}`} value={v} />
        ))}
      </select>
    </div>
  );
};
