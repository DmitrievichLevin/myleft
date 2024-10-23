import React, { FormEventHandler, ReactNode, useMemo } from 'react';

import { FormField } from '../../types';
import { SubmitProp, useFormData } from './useFormData';
import cntl from 'cntl';
import './form.css';
import '../Buttons/Primary/primaryButton.css';
import { PrimaryButton } from '../Buttons/Primary/primaryButton';
import { SecondaryButton } from '../Buttons/Secondary/secondaryButton';

const formCN = (className: string) => cntl`
flex
flex-col
gap-4
py-4
px-6
form-field-container
bg-white
rounded-md
${className}

`;

const primaryBtnCN = cntl`
primary-button
!text-[0.9rem] 
form-submit-button
w-fit
`;

const actionsCN = (className: string) => cntl`
w-full
flex
p-4
gap-2
justify-end
form-atns
${className}
`;

const formElemCN = (className: string) => cntl`
form-wrapper
${className}
`;

export const Form = ({
  fields,
  className = '',
  formClassName = '',
  atnsClassName = '',
  submit,
  disabled = false,
  initial,
  forwardRef,
  suggestions = [],
}: {
  fields: FormField[];
  suggestions?: Array<string | ReactNode>;
  className?: string;
  atnsClassName?: string;
  formClassName?: string;
  submit?: SubmitProp;
  disabled?: boolean;
  forwardRef?: HTMLInputElement;
  initial: { [key: string]: any };
}) => {
  const { onSubmit, title } = submit ?? { onSubmit: undefined, title: '' };
  const { Elements, handleSubmit, resetForm } = useFormData(
    fields,
    initial,
    onSubmit,
    disabled
  );

  const actionButtons = useMemo(() => {
    let btns = [];
    if (submit?.onSubmit) {
      if (submit?.onCancel) {
        var cancel = submit?.onCancel;
        btns.push(
          submit?.cancelElement ? (
            <submit.cancelElement
              key="form-cancel-button"
              onClick={() => {
                cancel();
                resetForm();
              }}
            />
          ) : (
            <SecondaryButton
              title="Cancel"
              key="form-cancel-button"
              className="!text-[0.9rem] font-normal !w-fit"
              onClick={() => {
                cancel();
                resetForm();
              }}
            />
          )
        );
      }

      btns.push(
        submit?.submitElement ? (
          <submit.submitElement
            onClick={(_) => {}}
            type="submit"
            key="form-submit-button"
          />
        ) : (
          <PrimaryButton
            onClick={(_) => {}}
            type="submit"
            key="form-submit-button"
            title={title}
            className={primaryBtnCN}
          />
        )
      );
    }
    return btns;
  }, [submit?.onCancel, submit?.onSubmit]);
  return (
    <>
      <form
        encType="text/plain"
        onSubmit={handleSubmit as FormEventHandler<HTMLFormElement>}
        aria-disabled={disabled}
        className={formElemCN(formClassName)}
        // @ts-ignore
        ref={forwardRef}
      >
        <div className="flex flex-1 overflow-hidden">
          <div id="form-elems-3asdfas3gdgt" className={formCN(className)}>
            {Elements}
          </div>
          {suggestions.length > 0 ? (
            <div className="pr-6 flex-1 mb-4 suggestions-list-cn">
              <ul className="bg-[#eee] rounded-lg flex-1 suggestions-list gap-2 flex flex-col">
                <p
                  id="form-suggestions-title"
                  className="font-semibold m-0 mb-1"
                >
                  Suggestions:
                </p>
                {suggestions.map((sug, idx) => (
                  <li key={`u-list-sug-${idx}`}>
                    <p>{sug}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ''
          )}
        </div>

        {submit?.onSubmit && actionButtons?.length > 0 && (
          <div className={actionsCN(atnsClassName)}>{actionButtons}</div>
        )}
      </form>
    </>
  );
};
