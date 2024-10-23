import { MutableRefObject, useCallback, useRef, useState } from 'react';
import './phoneInput.css';
import cntl from 'cntl';

const phCN = (i: number = 0) =>
  cntl`
  phn-input-cn 
  text-center 
  col-span-1 
  ${i === 6 || i === 3 ? 'col-start-' + (i / 3 + 1 + i) : ''}`;

export const PhoneNumberInput = ({
  value = {},
  onChange,
  name = 'phone-number',
  disabled = true,
}: {
  value: any;
  onChange: (val: string) => void;
  name: string;
  disabled?: boolean;
}) => {
  const [number, setNumber] = useState<Array<string>>(
    Array.from((value?.[name] || '').split(''))
  );
  const phoneNumberElem = useRef<HTMLInputElement>();

  const onKeyDown = useCallback(
    (e: any, idx: number) => {
      const { target: _target, key } = e;
      const target = _target as HTMLInputElement;

      let nextTarget = target.nextSibling as HTMLInputElement;
      let prevTarget = target.previousSibling as HTMLInputElement;

      // Handle AutoComplete
      if (idx === 0) {
        nextTarget = target.parentElement?.nextSibling as HTMLInputElement;
        prevTarget = target.parentElement?.previousSibling as HTMLInputElement;
      } else if (idx === 1) {
        prevTarget = prevTarget.children.item(0) as HTMLInputElement;
      }

      const phoneValueElem = phoneNumberElem.current as HTMLInputElement;
      let num;

      switch (key) {
        case 'Backspace':
          switch (true) {
            case !target.value && !!prevTarget:
              num = [...number.slice(0, idx - 1)];

              phoneValueElem.value = num.join('');
              setNumber(num);
              prevTarget.value = '';
              prevTarget.focus();
              break;
            case target.value && idx === 9:
              target.value = '';
              break;
            default:
              num = [...number.slice(0, idx)];

              phoneValueElem.value = num.join('');
              setNumber([...number.slice(0, idx)]);
              target.value = '';
              if (prevTarget) prevTarget.focus();
          }
          break;
        case 'Tab':
          return;
        default:
          if (/[0-9]/g.test(key) && !target.value) {
            e.preventDefault();
            num = [...number, key];

            phoneValueElem.value = num.join('');
            setNumber(num);
            target.value = key;

            if (nextTarget) {
              nextTarget.focus();
            }
          } else {
            e.preventDefault();
          }
      }
    },
    [setNumber, number, phoneNumberElem]
  );

  const phoneWrapper = useRef<HTMLDivElement>();

  const onInputFocus = useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (!phoneWrapper.current) return;
      const idx = number.length ? (number.length > 8 ? 9 : number.length) : 0;
      let inputElem = phoneWrapper.current.children.item(idx);

      // Handle AutoComplete
      if (idx === 0) {
        inputElem = inputElem?.children.item(0) as HTMLInputElement;
      }

      (inputElem as HTMLElement).focus();
      (inputElem as HTMLInputElement).setSelectionRange(1, 1);
    },
    [phoneWrapper.current, number]
  );

  const getTabIndex = useCallback(
    (i: number) => {
      if (number.length === 10 && i === 9) return 0;
      if (number.length === i) return 0;
      return -1;
    },
    [number]
  );

  const handleAutofill = useCallback(
    (e: any) => {
      if (
        (e.target as HTMLInputElement).matches(':autofill') ||
        (e.target as HTMLInputElement).matches(':-webkit-autofill')
      ) {
        let len = e.target.value.length;
        let start = len >= 10 ? (10 - e.target.value.length) * -1 : 0;
        let value = e.target.value.substring(start);

        (phoneNumberElem.current as HTMLInputElement).value = value;
        const sub = value.split('');
        setNumber(sub);

        if (!phoneWrapper.current) {
          e.target.blur();
        } else {
          let idx = len >= 10 ? 9 : sub.length;
          let inputElem = phoneWrapper.current.children.item(idx);
          (inputElem as HTMLElement).focus();
          (inputElem as HTMLInputElement).setSelectionRange(1, 1);
        }
      }
    },
    [phoneWrapper, setNumber]
  );

  return (
    <div
      className="phn-wrapper-cn relative flex flex-col items-center justify-center h-[400px]"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <p className="phn-country-code" data-dial-code="1" data-country-code="us">
        +1<span>US</span>
      </p>
      <div className="phn-grid-wrapper">
        <div
          ref={phoneWrapper as MutableRefObject<HTMLDivElement>}
          className="phn-grid-cn"
        >
          {Array.from({ length: 10 }, (_, i: number) => {
            const tabIndex = getTabIndex(i);
            const inElem = (
              <input
                type="text"
                className={phCN(i)}
                min={1}
                max={1}
                required
                key={`phn-digit-num-${i}`}
                tabIndex={tabIndex}
                value={number[i] || ''}
                onChange={handleAutofill}
                disabled={disabled}
                autoComplete="tel"
                onKeyDown={(e: any) => {
                  onKeyDown(e, i);
                  return e;
                }}
                onMouseUp={onInputFocus}
              />
            );

            // Handle autofill
            if (i === 0)
              return (
                <div
                  className="phn-input-autofill-cn"
                  key={`phn-digit-num-${i}`}
                >
                  {inElem}
                  <div className="phn-input-autofill-bg" />
                </div>
              );

            return inElem;
          })}
        </div>
        <div className="absolute left-[50%] pointer-events-none" tabIndex={-1}>
          <div className="phn-grid-cn relative left-[-50%] z-[99]">
            <span className="phn-input-cursor">
              <hr />
            </span>
          </div>
        </div>
      </div>
      <p id="sms-express-written-consent-msg" className="phn-consent">
        By clicking next, you consent to receive communications via
        <br />
        email or SMS from us.
      </p>
      <input
        type="tel"
        id="phn-num-input-value"
        name={name}
        pattern="^[0-9]{10}$"
        min={10}
        max={10}
        onChange={(e: any) => onChange(e.target.value)}
        required
        ref={phoneNumberElem as MutableRefObject<HTMLInputElement>}
        readOnly
        hidden
      />
    </div>
  );
};

export const formatPhoneNumber = (value: string = '') =>
  value.replace(
    /(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/,
    '$1$2$3-$4$5$6-$7$8$9$10'
  );

export const formatPhoneNumberArea = (value: string = '') =>
  value.replace(
    /(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)/,
    '($1$2$3) $4$5$6-$7$8$9$10'
  );
