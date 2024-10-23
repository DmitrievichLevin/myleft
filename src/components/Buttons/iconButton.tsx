import React, { MouseEventHandler } from 'react';
import { BaseButton } from './base';
import cntl from 'cntl';

const iconCN = (className: string) => cntl`
w-[1rem]
h-[1rem]
${className}
`;

const buttonCN = (className: string) => cntl`
py-3
px-4
text-[0.9rem]
font-[550]
text-textGray
flex
gap-2
items-center
justify-center
${className}
`;

export type IconButtonProps = {
  icon?: string;
  onClick: MouseEventHandler;
  className?: string;
  iconClassName?: string;
  text?: string;
  name?: string;
  forwardRef?: HTMLInputElement;
  disabled?: boolean;
};

export const IconButton = ({
  onClick,
  icon,
  iconClassName = '',
  className = '',
  text,
  name = '',
  forwardRef,
  disabled = false,
}: IconButtonProps) => {
  return (
    <BaseButton
      onClick={onClick}
      title={text}
      className={buttonCN(className)}
      name={name}
      forwardRef={forwardRef}
      disabled={disabled}
    >
      {icon && (
        <img alt="icon-button" src={icon} className={iconCN(iconClassName)} />
      )}
      {text && <span>{text}</span>}
    </BaseButton>
  );
};
