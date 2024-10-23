import { IconButton } from '../../Buttons/iconButton';
import plus from '../../../res/Icons/plusIconGray.svg';
import minus from '../../../res/Icons/minusIconGray.svg';
import { useCallback, useRef } from 'react';
import './amountInput.css';

type IAmountInput = {
  max?: number;
  name?: string;
  onChange: (val: string) => void;
  value?: string;
  sm?: boolean;
};
export const AmountInput = ({
  max = 100,
  name,
  onChange,
  value = '0',
  sm = false,
}: IAmountInput) => {
  const amountRef = useRef<HTMLInputElement>();

  const onClick = useCallback(
    (step: string) => {
      const _input = amountRef.current as HTMLInputElement;

      switch (step) {
        case '-':
          _input?.stepDown(1);
          break;
        default:
          _input?.stepUp(1);
      }
      onChange(_input.value);
    },
    [amountRef.current, onChange]
  );

  return (
    <div className={`amount-cn${sm ? '-sm' : ''}`}>
      <IconButton
        icon={minus}
        name="minus"
        className={`${sm ? 'amount-btn-sm' : 'amount-btn'} amount-btn-minus !p-0`}
        onClick={() => onClick('-')}
      />
      <p tabIndex={-1}>{value}</p>
      <IconButton
        icon={plus}
        name="plus"
        className={`${sm ? 'amount-btn-sm' : 'amount-btn'} amount-btn-plus !p-0`}
        onClick={() => onClick('+')}
      />
      <input
        type="number"
        name={name}
        id="amount-value-component"
        min={0}
        max={max}
        step="1"
        value={value}
        className="hidden-plain-sight"
        onChange={(val: any) => {}}
        required
        ref={(el: any) => {
          amountRef.current = el;
        }}
        aria-errormessage="Amount cannot be negative."
      />
    </div>
  );
};
