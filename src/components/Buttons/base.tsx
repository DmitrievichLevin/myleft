import cntl from 'cntl';
import React, { MouseEventHandler, ReactNode } from 'react';
import './base.css';

export type ButtonType = 'button' | 'submit' | 'reset' | undefined;
export type BaseButtonProps = {
  onClick: MouseEventHandler;
  styles?: { [key: string]: string };
  className?: string;
  title?: string;
  children?: ReactNode;
  name?: string;
  type?: ButtonType;
  disabled?: boolean;
  forwardRef?: HTMLInputElement;
};

const buttonCN = (className: string) => cntl`
rounded-md
button-lg
cursor-pointer
${className}
`;

export const BaseButton = ({
  onClick,
  styles,
  className = '',
  title,
  children,
  name = '',
  type = 'button',
  disabled = false,
  forwardRef,
}: BaseButtonProps) => {
  return (
    <button
      className={buttonCN(className)}
      style={{ ...styles, boxSizing: 'border-box', width: 'fit-content' }}
      onClickCapture={(e: any) => {
        if (type !== 'submit') {
          e.preventDefault();
          e.stopPropagation();
        }
        onClick(e);
      }}
      // role="button"
      name={name}
      // type={type}
      disabled={disabled}
      //@ts-ignore
      ref={forwardRef}
    >
      {children ?? title}
    </button>
  );
};
