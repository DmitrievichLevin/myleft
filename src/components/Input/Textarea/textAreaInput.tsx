import {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';
import cntl from 'cntl';
import './textarea.css';

export type TextInputProps = {
  value: string;
  name: string;
  onChange?: (value: string) => void;
  required?: boolean;
  pattern?: RegExp;
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
};

const inputCN = (className: string) => cntl`
textarea-input-cn
rounded-sm
text-[1rem]
flex
items-center
${className}
`;

type TextAreaProps = {
  value: string;
  name: string;
  onChange?: (value: string) => void;
  required?: boolean;
  cols?: number;
  rows?: number;
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
  datatype?: string;
  onKeyUp?: KeyboardEventHandler;
  onBlur?: FocusEventHandler;
  placeholder?: string;
  forwardRef?: any;
};

export const TextAreaInput = ({
  name,
  value = '',
  onChange = () => {},
  required = false,
  disabled = false,
  cols = 20,
  rows = 5,
  onKeyUp,
  onBlur,
  className = '',
  readOnly = false,
  datatype = 'text',
  placeholder = '',
  forwardRef,
}: TextAreaProps) => {
  return (
    <div aria-label="text-input-cn" className={inputCN(className)}>
      <textarea
        className="textarea-input flex-auto"
        cols={cols}
        rows={rows}
        id={name}
        name={name}
        value={value}
        required={required}
        onKeyUp={onKeyUp}
        onChange={(e) => {
          e.preventDefault();
          onChange(e.target.value);
        }}
        onBlur={onBlur}
        disabled={disabled}
        datatype={datatype}
        readOnly={readOnly}
        placeholder={placeholder}
        ref={forwardRef}
        autoCapitalize={'sentences'}
        autoComplete="on"
        autoCorrect="on"
        maxLength={200}
        minLength={10}
        spellCheck={true}
        wrap="hard"
      />
    </div>
  );
};
