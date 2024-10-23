import {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import './checkSelect.css';
import {
  defaultCheckSelectStyle,
  useCheckSelectData,
} from './useCheckSelectData';
import CheckSelectOptBtn from './checkSelectOptBtn';

type ICheckSelect = {
  opts: Array<{ value: any; label: string; [key: string]: any }>;
  name: string;
  onChange: (v: any) => void;
  value: any;
};

export default ({ opts, name = '', onChange, value }: ICheckSelect) => {
  const [used, setUsed] = useState<boolean>(false);
  const selectRef = useRef<HTMLSelectElement>();
  const { handleSelect } = useCheckSelectData({
    onChange,
    forwardRef: selectRef as MutableRefObject<HTMLSelectElement>,
    name,
    value,
  });

  const onOptClick = useCallback(
    (v: any, idx: number) => {
      if (!used) setUsed(true);
      handleSelect(v, idx);
    },
    [used]
  );

  const defaultStyle = useMemo(
    () =>
      !used ? (
        <style id={`ml-select-${name}-default-style`}>
          {defaultCheckSelectStyle(name, 1)}
        </style>
      ) : (
        ''
      ),
    [used]
  );

  return (
    <>
      {defaultStyle}
      <style id={`ml-select-${name}-style`} />
      <div
        role="select"
        aria-roledescription="html select"
        className={`check-select ml-select-${name}`}
      >
        {opts.map(({ value: v, label }, idx) => (
          <CheckSelectOptBtn
            key={`ml-select-${name}-opt-${label}-btn`}
            title={label}
            name={name}
            onClick={() => onOptClick(v, idx)}
          />
        ))}
        <select
          id={`ml-select-${name}`}
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
          <option key={`ml-select-${name}-opt-placeholder`} value={undefined} />
          {opts.map(({ value: v }) => (
            <option key={`ml-select-${name}-opt-${v}`} value={value} />
          ))}
        </select>
      </div>
    </>
  );
};
