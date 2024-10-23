import React from 'react';
import cntl from 'cntl';
import crossIcon from '../../../res/Icons/plusIconWhite.svg';
import './formImageUpload.css';
import { IconButton } from '../../Buttons/iconButton';
import useFormImageData, {
  FormImageUploadProps,
} from './hooks/useFormImageData';
import Image from '../../Image/image';

const uploadCN = (className: string) => cntl`
relative
w-20
h-20
img-up-cn
overflow-hidden
${className}
`;

const uploadBtnCN = cntl`
absolute
!w-full
!h-full
top-0
left-0
img-btn-cn
`;

/**
 * @name FormImageUpload
 * @type React.Component
 * @summary *Use as FormField only*
 * @returns
 */
export const FormImageUpload = (props: FormImageUploadProps) => {
  const { className = '', required, disabled, name } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { src, onChange, onClick } = useFormImageData(props, inputRef);

  return (
    <div className={uploadCN(className)} id={name}>
      <Image
        className="w-full h-full !object-cover overflow-hidden form-img-cn rounded-md"
        src={src}
        alt="form-image-upload"
      />
      <IconButton
        className={uploadBtnCN}
        icon={crossIcon}
        onClick={onClick}
        disabled={disabled}
      />
      <input
        type="file"
        className="hidden"
        name={name}
        required={required}
        ref={inputRef}
        // @ts-ignore
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
