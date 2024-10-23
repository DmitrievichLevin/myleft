import React, { useRef } from 'react';
import './radioButton.css';
import cntl from 'cntl';

export type RadioButtonProps = {
  id: string;
  value: boolean;
  name: string;
  className?: string;
  onChange: (value: boolean) => void;
};

const selectorCN = (value: boolean) => cntl`
rounded-full 
bg-white
radio-selector
${value ? `r-selected-0` : `r-selected-1`}
`;

const radioCN = (className: string) => cntl`
radio-cn
cursor-pointer
${className}
`;

export const RadioButton = ({
  name,
  value = false,
  id,
  className = '',
  onChange,
}: RadioButtonProps) => {
  return (
    <button
      id="radio-button-cn"
      className={radioCN(className)}
      aria-label={`${name}-radio button"`}
      type="button"
      value={`${value}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(!value);
      }}
    >
      <div className={selectorCN(value)} />
      <input type="radio" id={id} name={name} checked={value} readOnly />
    </button>
  );
};
