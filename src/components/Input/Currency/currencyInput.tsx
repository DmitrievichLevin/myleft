import { useCallback, useLayoutEffect, useRef } from 'react';
import { formatCurrency } from '../helpers';
import { TextInput } from '../textInput';

export const CurrencyInput = ({
  name = 'currency',
  value = '',
  onChange,
  required = false,
}: {
  name: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const viewRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    formatCurrencyInput();
  }, [inputRef]);

  const formatCurrencyInput = useCallback(
    (blur = false) => {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.
      const input = inputRef?.current as any;
      const hidden = viewRef?.current as any;

      if (input) {
        // get input value
        var input_val = input.value;

        // don't validate empty input
        if (input_val === '') {
          return;
        }

        // original length
        var original_len = input_val.length;

        // initial caret position
        var caret_pos = input.selectionStart;

        // check for decimal
        if (input_val.indexOf('.') >= 0) {
          // get position of first decimal
          // this prevents multiple decimals from
          // being entered
          var decimal_pos = input_val.indexOf('.');

          // split number by decimal point
          var left_side = input_val.substring(0, decimal_pos);
          var right_side = input_val.substring(decimal_pos);

          // add commas to left side of number
          left_side = formatCurrency(left_side);

          // validate right side
          right_side = formatCurrency(right_side);

          // On blur make sure 2 numbers after decimal
          if (blur) {
            right_side += '00';
          }

          // Limit decimal to only 2 digits
          right_side = right_side.substring(0, 2);

          // join number by .
          input_val = '$' + left_side + '.' + right_side;
        } else {
          // no decimal entered
          // add commas to number
          // remove all non-digits
          input_val = formatCurrency(input_val);
          input_val = '$' + input_val;

          // final formatting
          if (blur) {
            input_val += '.00';
          }
        }

        // send updated string to input
        input.value = input_val;
        hidden.value = parseFloat(input_val.replace(/[\$\,]/g, ''));
        onChange(input.value);

        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input.setSelectionRange(caret_pos, caret_pos);
      }
    },
    [inputRef, viewRef]
  );

  return (
    <>
      <TextInput
        datatype="currency"
        name={'currency-input-view'}
        value={value}
        pattern={/^\$\d{1,3}(,\d{3})*(\.\d+)?$/}
        onKeyUp={(_) => formatCurrencyInput()}
        onBlur={(_) => formatCurrencyInput(true)}
        onChange={onChange}
        required={required}
        forwardRef={inputRef}
        errorMessage="Dollar amount must be greater than 0."
        placeholder="$100.00"
      />
      <input
        type="number"
        name={name}
        min={0}
        step="0.01"
        ref={viewRef}
        className="h-0 w-0 overflow-hidden border-0 outline-0 pointer-events-none"
        aria-errormessage="Dollar amount cannot be negative."
        readOnly
      />
    </>
  );
};
