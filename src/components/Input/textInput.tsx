import React, {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useMemo,
} from 'react';
import cntl from 'cntl';
import './textInput.css';

export type TextInputProps = {
  value: string;
  name: string;
  onChange?: (value: string) => void;
  required?: boolean;
  pattern?: RegExp | string;
  min?: number;
  max?: number;
  disabled?: boolean;
  icon?: string;
  onIconClick?: MouseEventHandler;
  className?: string;
  readOnly?: boolean;
  type?: string;
  datatype?: string;
  onKeyUp?: KeyboardEventHandler;
  onBlur?: FocusEventHandler;
  placeholder?: string;
  forwardRef?: any;
  errorMessage?: string;
};

const inputCN = (className: string) => cntl`
text-input-cn
rounded-sm
text-[1rem]
flex
items-center
${className}
`;

export const TextInput = ({
  name,
  value = '',
  onChange = () => {},
  required = false,
  pattern = /(.*?)/,
  min,
  max,
  disabled = false,
  icon,
  onIconClick = () => {},
  onKeyUp,
  onBlur,
  className = '',
  readOnly = false,
  type = 'text',
  datatype = 'text',
  placeholder = '',
  forwardRef,
  errorMessage,
}: TextInputProps) => {
  return (
    <div aria-label="text-input-cn" className={inputCN(className)}>
      <input
        className="text-input flex-auto"
        type={type}
        id={name}
        name={name}
        value={value}
        required={required}
        minLength={min}
        maxLength={max}
        pattern={pattern.toString().replaceAll('/', '')}
        onKeyUp={onKeyUp}
        onChange={(e) => {
          e.preventDefault();
          // Reset Validity so it doesn't block form submit
          e.currentTarget.setCustomValidity('');
          onChange(e.target.value);
        }}
        onBlur={onBlur}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        onInvalid={(e) => {
          if (errorMessage) e.currentTarget.setCustomValidity(errorMessage);
        }}
        ref={forwardRef}
      />
      {icon && (
        <img
          role="button"
          className="text-input-icon cursor-pointer"
          src={icon}
          onClick={(e: React.MouseEvent) => onIconClick(e)}
        />
      )}
    </div>
  );
};
