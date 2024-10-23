import {
  FormEventHandler,
  JSXElementConstructor,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { FormField } from '../../types';
import { useLocation } from 'react-router-dom';
import { FieldComponents } from '../../constants';
import { MutationFunction } from '@tanstack/react-query';
import { FormSerializer } from './helpers/serializeForm';
import { onChange } from 'react-toastify/dist/core/store';

export type SubmitProp = {
  title: string;
  onSubmit: (...args: any[]) => any | MutationFunction;
  onCancel?: (...args: any[]) => void;
  submitElement?: JSXElementConstructor<{
    onClick: (...args: any[]) => void;
    type: string;
    key: string;
  }>;
  cancelElement?: JSXElementConstructor<{
    onClick: (...args: any[]) => void;
    key: string;
  }>;
};

export const insertIn = (
  obj: { [key: string]: any },
  key: string,
  value: any
): { [key: string]: any } => {
  const updated = { ...obj };

  const levels = key.split('.');

  var pointer = updated;
  levels.forEach((l: string, idx: number) => {
    // Insert
    if (pointer?.[l] !== undefined && idx === levels.length - 1) {
      pointer[l] = value;
      pointer = updated;
    } else if (pointer?.[l]) pointer = pointer[l];
    else if (pointer?.[l] === undefined) {
      if (idx === levels.length - 1) {
        pointer[l] = value;
        pointer = updated;
      } else {
        pointer[l] = {};
        pointer = pointer[l];
      }
    }
  });

  return updated;
};

export const useFormData = (
  fields: FormField[],
  initial: { [key: string]: any },
  onSubmit?: Function,
  disabled?: boolean
) => {
  const [formState, setFormState] = useState(initial);

  const { key } = useLocation();

  const resetForm = useCallback(() => {
    setFormState(initial);
  }, [fields.length]);

  const mutateFormState = useCallback(
    (val: any) => {
      setFormState((prev) => ({ ...prev, ...val }));
    },
    [setFormState]
  );

  const handleSubmit = useMemo(
    () =>
      onSubmit
        ? async (e: SubmitEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const form_inputs = Object.values(
              (e.target as HTMLFormElement).elements
            ).filter((el: any) => ['INPUT'].includes(el?.tagName));

            var updated = { ...initial };

            form_inputs.forEach((el: any) => {
              const levels = el.name.split('.');

              var pointer = updated;
              levels.forEach((l: string, idx: number) => {
                // Insert
                if (pointer?.[l] !== undefined && idx === levels.length - 1) {
                  pointer[l] = el.value;
                  pointer = updated;
                } else if (pointer?.[l]) pointer = pointer[l];
                else pointer = updated;
              });
            });

            await onSubmit(initial, updated);
          }
        : undefined,
    [onSubmit, fields, initial]
  ) as FormEventHandler<HTMLFormElement> | undefined;

  const Elements = useMemo(() => {
    const fieldElements = fields.map(({ type, label, name, ...rest }, idx) => {
      let Comp = FieldComponents[type];
      return (
        <div
          key={`${key}-${name}-form-input-${idx}`}
          className="grid grid-cols-[200px_200px] items-center"
        >
          <Comp
            {...rest}
            name={name}
            value={formState}
            onChange={(val: any) => mutateFormState(val)}
            disabled={disabled}
          />
        </div>
      );
    });
    return fieldElements;
  }, [fields, mutateFormState, formState, disabled, initial]);

  return { formState, Elements, handleSubmit, resetForm };
};
