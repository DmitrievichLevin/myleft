import { ReactNode, useCallback, useRef, useState } from 'react';
import cntl from 'cntl';
import './dropdown.css';
import Select, { StylesConfig, AriaOnFocus, components } from 'react-select';

export type DropdownProps = {
  value: [] | DropDownOpt | undefined;
  formatLabel?: (obj: DropDownOpt) => any;
  getOptionValue?: (item: DropDownOpt) => any;
  className?: string;
  opts: any[];
  name: string;
  id?: string;
  onChange?: (value: any) => void;
  required?: boolean;
  disabled?: boolean;
  multi?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  containerStyle?: { [key: string]: string | { [key: string]: string } };
  controlStyle?: { [key: string]: string | { [key: string]: string } };
  valueStyle?: { [key: string]: string | { [key: string]: string } };
  singleValueStyle?: { [key: string]: string | { [key: string]: string } };
  indicatorStyle?: {
    [key: string]: string | { [key: string]: string };
  };
  separator?: boolean;
  // For HTMLInputElements (Serializing Forms)
  children?: Iterable<ReactNode> | ReactNode;
  placeholder?: string;
};

export type DropDownOpt = {
  label: string | number;
  value: any;
};

const inputCN = (className: string) => cntl`
dropdown-cn
rounded-sm
text-[1rem]
flex
items-center
relative
${className}
`;

const OptionCN = (className: string) => cntl`
flex
w-full
bg-white
text-textGray
items-center
text-normal
px-2
py-3
hover:bg-secondaryBlue
hover:text-white
${className}
`;

const OptionsCN = (open: boolean) => cntl`
absolute 
top-[100%] 
left-0 
flex 
w-full 
overflow-overlay 
flex-col
dropdown-opts
${open ? 'visible' : 'collapse'}  
`;

export const DropdownList = ({
  name,
  value,
  opts = [],
  id,
  formatLabel = (item: DropDownOpt) => item.label,
  getOptionValue = (item: DropDownOpt) => item.value,
  onChange = () => {},
  required = false,
  disabled = false,
  multi = false,
  searchable = false,
  clearable = false,
  containerStyle = {},
  children,
  controlStyle = {
    maxWidth: '200px',
    outline: '1px solid #ccc',
    border: 'none',
  },
  valueStyle = {},
  singleValueStyle = {},
  indicatorStyle = {},
  separator = true,
  placeholder,
}: DropdownProps) => {
  const styles: StylesConfig<any, true> = {
    container: (styles) => {
      return { ...styles, ...containerStyle };
    },
    control: (styles) => {
      return {
        ...styles,
        border: 'none',
        ...controlStyle,
      };
    },
    valueContainer: (styles) => {
      return { ...styles, ...valueStyle };
    },
    singleValue: (styles) => {
      return { ...styles, ...singleValueStyle };
    },
    indicatorSeparator: (styles) => {
      return { ...styles, display: separator ? '' : 'none' };
    },
    dropdownIndicator: (style) => {
      return { ...style, ...indicatorStyle };
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? '#ccc'
          : isSelected
            ? '#007ABC'
            : isFocused
              ? '#0090DA'
              : undefined,
        color: isDisabled
          ? '#333'
          : isSelected
            ? 'white'
            : isFocused
              ? 'white'
              : '#333',
        cursor: isDisabled ? 'not-allowed' : 'default',
        borderBottom: '1px #ddd solid',
        overflow: 'hidden',

        ':active': {
          ...styles[':active'],
          color: !isDisabled ? 'white' : '#333',
        },
        ':hover': {
          ...styles[':hover'],
          backgroundColor: !isDisabled
            ? isSelected
              ? '#007ABC'
              : '#0090DA'
            : undefined,
          color: 'white',
        },
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: '#5e249d',
        borderRadius: '9999px',
        paddingLeft: '3px',
        color: 'white',
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    menuPortal: (styles) => ({
      ...styles,
      zIndex: 999999,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: 'white',
      ':hover': {
        background:
          'linear-gradient(-90deg, rgba(219,9,91,1) 0%, rgba(94,36,157,1) 100%)',
        color: 'white',
        borderRadius: '0% 50% 50% 0%',
      },
    }),
  };
  const [ddOpen, setDdOpen] = useState(false);

  const handleAutofill = useCallback(
    (e: any) => {
      if (
        (e.target as HTMLInputElement).matches(':autofill') ||
        (e.target as HTMLInputElement).matches(':-webkit-autofill')
      ) {
        let val = e.target.value;

        const auto = opts.find(
          ({ value: v, label }: DropDownOpt) => v === val || val === label
        );
        onChange(auto);
      }
    },
    [onChange, opts]
  );

  return (
    <Select
      options={opts}
      value={opts?.find(({ value: optv }) => optv === value)}
      classNamePrefix={name}
      className="autofill-input"
      formatOptionLabel={formatLabel}
      onChange={onChange}
      styles={styles}
      getOptionValue={getOptionValue}
      required={required}
      isDisabled={disabled}
      id={(id || name) + '-react-select-input'}
      name={name}
      placeholder={placeholder}
      menuPortalTarget={document.body}
      components={{
        Control: (props) => {
          /**
           * React-Select Bug:
           * @summary - default Control second child focuses first
           * on menu open.
           * - Added Children Input Elements(name must be same as form-field for serialization)
           */

          return (
            <>
              <components.Control {...props} />
              <input
                name={name}
                autoComplete={name}
                type="text"
                onChange={handleAutofill}
                className="autofill-input"
                tabIndex={-1}
              />
              {children}
            </>
          );
        },
      }}
      // @ts-ignore
      isMulti={multi}
      menuIsOpen={ddOpen}
      onMenuClose={(...args) => {
        setDdOpen(false);
      }}
      onMenuOpen={(...args) => {
        setDdOpen(true);
      }}
      aria-live="off"
      isClearable={clearable}
      blurInputOnSelect
      menuShouldScrollIntoView
      isSearchable={searchable}
    />
  );
};
