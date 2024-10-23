import _, { set } from 'lodash';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';

function getDirection(
  from: number,
  to: number,
  array = Array.from({ length: 12 }, (_, i: number) => i)
) {
  if (from === to) {
    return 0;
  }
  var internal =
    Math.max(from, to) - Math.min(from, to) < array.length / 2 ? true : false;
  if ((internal && from < to) || (!internal && from > to)) {
    return 1;
  } else {
    return -1;
  }
}

export const useFerrisSelectData = ({
  onChange,
  forwardRef: selectRef,
  name,
}: {
  onChange: (v: any) => void;
  forwardRef: MutableRefObject<HTMLSelectElement>;
  name: string;
}) => {
  const [prevDeg, setPrevDeg] = useState(0);
  const [prevRot, setPrevRot] = useState(0);

  const selectedStyle = useCallback(
    (name: string, deg: number, idx: number, prev: number) => {
      let travel = 0;
      let prev_deg = prevDeg;
      const direction = getDirection(prev, idx);
      let left;
      switch (true) {
        case prev === 0:
          left = 12 - idx;
          break;
        case idx === 0:
          left = 12 - prev;
          break;
        case (prev - 10) * -1 === idx:
          left = 2;
          break;
        default:
          left = Math.abs(prev - 10 + idx);
      }
      let dist = Math.min(left, Math.abs(prev - idx));

      let optate = prevRot + direction * -30;

      travel = (dist / 12) * (direction * 360);

      setPrevDeg((pr) => pr + travel);
      setPrevRot(optate);
      return `
    .ferris-select-${name}-wheel {
    transform: rotate(${prev_deg}deg);
    }
    .ferris-select-${name}-wheel {
    transform: rotate(${prev_deg + travel}deg);
    transition: transform 1s;
    }


    .ferris-select-${name}-wheel > *:not(#ferris-select-ind-wheel) {
    transform: rotate(${optate}deg);
    transition: transform 1s;
    opacity: 50%;
    cursor: pointer;
    }

    .ferris-select-${name}-wheel > *:not(#ferris-select-ind-wheel):hover {
    opacity: 100% !important;
    }

    .ferris-select-${name}-opt-${idx}{
        transform: scale(3) rotate(-${Math.abs(deg)}deg) !important;
        transition: transform 1s;
        opacity: 100% !important;
    }

    .ferris-select-${name}-ind-${idx}{
    background: var(--glory-blue);
    border: solid 2px white;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    }

    `;
    },
    [setPrevDeg, prevDeg, prevRot, setPrevRot]
  );

  const onSelectChange = useCallback(
    (v: any) => {
      onChange(v);
    },
    [onChange]
  );

  const clearSelection = useCallback((): number => {
    const _select = selectRef.current as HTMLSelectElement;
    let selected = 0;
    if (_select) {
      [..._select.children].forEach((ch: any, idx: number) => {
        if (ch.selected) selected = idx;
        ch.selected = false;
      });

      /**
       * @TODO - See useDaySelectorData.tsx line: 92
       */
      const dynamicStyles = document.getElementById(
        `ferris-select-${name}-style`
      ) as HTMLStyleElement;
      dynamicStyles.textContent = ``;
    }
    return selected;
  }, [selectRef, name, setPrevDeg]);

  const handleSelect = useCallback(
    (deg: any, val: any, idx: number) => {
      let pre = 0;
      if (selectRef.current) {
        onSelectChange(val);
        pre = clearSelection();
        // First Option.value = undefined for required select
        (selectRef.current.children.item(idx) as HTMLOptionElement).selected =
          true;

        const dynamicStyles = document.getElementById(
          `ferris-select-${name}-style`
        ) as HTMLStyleElement;
        dynamicStyles.textContent = `
        ${selectedStyle(name, deg, idx, pre)}`;
      }
    },
    [selectRef, onSelectChange, clearSelection, name, selectedStyle, prevDeg]
  );

  useEffect(() => {
    handleSelect(0, 0, 0);
    return () => {
      if (selectRef?.current?.value) clearSelection();
    };
  }, [clearSelection]);

  return {
    handleSelect,
    clearSelection,
  };
};
