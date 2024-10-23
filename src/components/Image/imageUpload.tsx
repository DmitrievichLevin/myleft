import React, { MouseEventHandler, useCallback, useState } from 'react';
import Image from './image';
import cntl from 'cntl';

import crossIcon from '../../res/Icons/plusIconWhite.svg';
import './imageUpload.css';
import { IconButton } from '../Buttons/iconButton';
import useImageUploadData, {
  ImageUploadProps,
} from './hooks/useImageUploadData';

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
 * @name ImageUpload
 * @type React.Component
 * @param props ImageUploadProps
 */
export const ImageUpload = (props: ImageUploadProps) => {
  const { className = '', alt } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { src, onChange, onClick, loading } = useImageUploadData(
    props,
    inputRef
  );

  return (
    <div className={uploadCN(className)}>
      <Image className="w-full h-full" src={src} alt={alt} />
      <IconButton className={uploadBtnCN} icon={crossIcon} onClick={onClick} />
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        // @ts-ignore
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
