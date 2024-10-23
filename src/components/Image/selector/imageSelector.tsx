import cntl from 'cntl';
import Image from '../image';
import './imageSelector.css';
import _ from 'lodash';
import { ReactNode, useCallback, useMemo, useState } from 'react';

type IImageSelector = {
  className?: string;
  onChange: (idx: number) => void;
  imgs: { src: string; alt: string }[];
  value: number;
  max?: number;
};

const selectorCN = (className: string, max: number | undefined) => cntl`
flex
w-full
items-center
justify-center
${max !== undefined ? 'flex-nowrap' : 'flex-wrap'}
${className}
`;

const btnCN = (selected: boolean) => cntl`
img-select-btn
border-none
bg-none
rounded-md
overflow-hidden
m-0
p-0
cursor-pointer
${selected ? 'img-select-active' : ''}
`;

export const ImageSelector = ({
  className = '',
  onChange,
  imgs,
  value = 0,
  max,
}: IImageSelector) => {
  return (
    <div className={selectorCN(className, max)}>
      {imgs.map(({ src, alt }, idx) => {
        return (
          <button
            key={`${alt}-${idx}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(idx);
            }}
            style={{ width: '4rem', height: '4rem' }}
            role="button"
            className={btnCN(idx === value)}
          >
            <Image
              src={src}
              alt={`img-select-${alt}`}
              className="!w-full !h-full"
            />
          </button>
        );
      })}
    </div>
  );
};
