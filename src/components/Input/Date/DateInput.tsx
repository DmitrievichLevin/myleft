import React, { MouseEventHandler } from 'react';
import cntl from 'cntl';
import '../textInput.css';

export type DateInputProps = {
  value: string;
  name: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
};

const inputCN = (className: string) => cntl`
text-input-cn
rounded-sm
text-[1rem]
flex
items-center
${className}
`;

export const DateInput = ({
  name,
  value = '',
  onChange = () => {},
  required = false,
  disabled = false,
  className = '',
  readOnly = false,
}: DateInputProps) => {
  return (
    <div aria-label="text-input-cn" className={inputCN(className)}>
      <input
        className="text-input flex-auto"
        type="date"
        id={name}
        name={name}
        value={value}
        required={required}
        onChange={(e) => {
          e.preventDefault();
          onChange(e.target.value);
        }}
        disabled={disabled}
        readOnly={readOnly}
      />
    </div>
  );
};
