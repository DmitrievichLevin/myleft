import { useCallback, useMemo, useState } from 'react';
import cntl from 'cntl';
import { DropdownList, DropDownOpt } from '../dropdown';
import { Durations } from '../../../../constants';
import clock from '../../../../res/Icons/clockIcon.svg';

type DurationInputProps = {
  value: number;
  name: string;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
};

const durationCN = (className: string) => cntl`
text-input-cn
grid
grid-cols-7
rounded-sm
items-center
justify-between
!w-[181px]
${className}
`;

export const DurationInput = ({
  name,
  value = 60,
  onChange = () => {},
  disabled = false,
  className = '',
}: DurationInputProps) => {
  const [cumulative, setCumulative] = useState(value);
  const dropdownValue = useMemo((): {
    minutes: DropDownOpt;
    hours: DropDownOpt;
  } => {
    let m = cumulative % 60;
    let h = Math.floor(cumulative / 60);
    return {
      minutes: Durations.minutes.find(
        ({ value }) => value === m
      ) as DropDownOpt,
      hours: Durations.hours.find(
        ({ value }) => value === h * 60
      ) as DropDownOpt,
    };
  }, [cumulative]);

  const onMinChange = useCallback(
    ({ value }: DropDownOpt) => {
      const sum = Math.min(dropdownValue.hours.value + value, 1440);
      setCumulative(sum);
      onChange(sum);
    },
    [dropdownValue?.hours?.value]
  );

  const onHrChange = useCallback(
    ({ value }: DropDownOpt) => {
      const sum = Math.min(dropdownValue.minutes.value + value, 1440);
      setCumulative(sum);
      onChange(sum);
    },
    [dropdownValue?.minutes?.value]
  );

  return (
    <div aria-label="duration-input-cn" className={durationCN(className)}>
      <img
        role="button"
        className="cursor-pointer col-span-1 justify-self-center opacity-[0.6] w-4 h-4"
        src={clock}
      />
      <DropdownList
        name={`duration-input-${name}-hrs`}
        opts={Durations.hours}
        formatLabel={({ label, value }) => (
          <span className="text-sm text-textGray">
            {label}{' '}
            <span className="text-xs font-bold font-mono tracking-tighter">
              {value / 60 === 1 ? 'hr' : 'hrs'}
            </span>
          </span>
        )}
        value={dropdownValue.hours as DropDownOpt}
        onChange={onHrChange}
        containerStyle={{ gridColumn: 'span 3 / span 3' }}
        controlStyle={{
          boxShadow: '0 !important',
          justifyContent: 'end',
          minHeight: '28px',
        }}
        indicatorStyle={{ padding: '0px' }}
        valueStyle={{ padding: '0px', display: 'inline-flex', flex: 'none' }}
        separator={false}
        disabled={disabled}
        required={cumulative < 15}
      />
      <DropdownList
        name={`duration-input-${name}-minutes`}
        opts={Durations.minutes}
        value={dropdownValue.minutes as DropDownOpt}
        formatLabel={({ label, value }) => (
          <span className="text-sm">
            {label}{' '}
            <span className="text-xs font-bold tracking-tight">{'mins'}</span>
          </span>
        )}
        onChange={onMinChange}
        containerStyle={{ gridColumn: 'span 3 / span 3' }}
        controlStyle={{
          boxShadow: '0 !important',
          justifyContent: 'end',
          minHeight: '25px',
        }}
        indicatorStyle={{ padding: '0px' }}
        valueStyle={{ padding: '0px', display: 'inline-flex', flex: 'none' }}
        separator={false}
        disabled={disabled}
        required={cumulative < 15}
      />

      <input
        type="number"
        name={name}
        min={15}
        max={1440}
        value={cumulative}
        className="h-0 w-0 overflow-hidden border-0 outline-0 pointer-events-none"
        onInvalid={(e) => {
          e.currentTarget.setCustomValidity(
            'Duration must be atleast 15 mins.'
          );
        }}
        aria-errormessage="Duration must be atleast 15 mins."
        readOnly
      />
    </div>
  );
};
