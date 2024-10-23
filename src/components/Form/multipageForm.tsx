import { FormField } from '../../types';
import React, {
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Form } from './form';
import { SubmitProp } from './useFormData';
import cntl from 'cntl';
import { IconButton } from '../Buttons/iconButton';
import backArrow from '../../res/Icons/backArrowIcon.svg';

const multiFormCN = (className: string, page: number) => cntl`
w-full
${className}
`;

const multiFormWrapperCN = (className: string, page: number) => cntl`
${className}
${page ? 'multi-form-enter' : ''}
`;

const multiFormAtnsCN = (className: string, page: number) => cntl`
flex
w-full
gap-2
${page > 0 ? 'justify-between' : 'justify-end'}
${className}
`;

export type MultiFormPage = {
  suggestions?: Array<string | ReactNode>;
  fields: FormField[];
};

const BackButton = ({ onClick }: { onClick: any }) => {
  return (
    <IconButton
      onClick={onClick}
      icon={backArrow}
      className="shadow-none items-center !font-normal hover:underline text-2xs text-gray-500 bg-transparent"
      iconClassName="w-[1.25rem] h-[1.25rem] p-0 bg-transparent"
      text="Back"
    />
  );
};

export const MultiForm = ({
  pages,
  submit,
  className = '',
  atnsClassName = '',
  formClassName = '',
  formData,
  setFormData,
}: {
  pages: MultiFormPage[];
  submit: SubmitProp;
  className?: string;
  atnsClassName?: string;
  formClassName?: string;
  formData: { [key: string]: any };
  setFormData: SetStateAction<any>;
}) => {
  const [page, setPage] = useState(0);
  const [pauseForm, setPauseForm] = useState(false);
  const formRef = React.useRef<HTMLInputElement>(null);

  const resetMulti = useCallback(() => {
    setPage(0);
    setFormData({});
  }, []);

  const handleFormExit = useCallback(
    async (
      initial: { [key: string]: any } | null,
      data: { [key: string]: any } | null
    ): Promise<void> =>
      new Promise((resolve, _) => {
        formRef.current?.classList.add('multi-form-exit');
        setPauseForm(true);

        const pageTimeout = setTimeout(() => {
          setFormData((prev: any) => ({ ...prev, ...data }));
          setPage((prev) => prev + 1);
          setPauseForm(false);
          formRef.current?.classList.remove('multi-form-exit');
          resolve(clearTimeout(pageTimeout));
        }, 500);
      }),
    [page, formRef.current]
  );

  const multiSubmit = useMemo(() => {
    if (page < pages.length - 1) {
      return {
        title: 'Next',
        onSubmit: handleFormExit,
        onCancel:
          page > 0
            ? (...args: any[]) => setPage((prev) => prev - 1)
            : undefined,

        cancelElement: BackButton,
      };
    }
    return {
      title: submit.title,
      onSubmit: (_initial: any, data: any) => {
        submit.onSubmit({ ...formData, ...data });
        resetMulti();
      },
      onCancel: (...args: any[]) => setPage((prev) => prev - 1),
      cancelElement: BackButton,
    };
  }, [page, pages]);

  return (
    <div
      id="multi-form-cn"
      className="overflow-hidden w-full"
      style={{ display: 'contents' }}
    >
      <Form
        fields={pages[page].fields as FormField[]}
        submit={multiSubmit}
        // @ts-ignore
        forwardRef={formRef}
        disabled={pauseForm}
        suggestions={pages[page].suggestions as string[]}
        className={multiFormCN(className, page)}
        atnsClassName={multiFormAtnsCN(atnsClassName, page)}
        formClassName={multiFormWrapperCN(formClassName, page)}
        initial={formData}
      />
    </div>
  );
};
