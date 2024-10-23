import React, { MouseEventHandler } from 'react';
import cntl from 'cntl';
import { BaseButton, ButtonType } from '../base';
import './primaryButton.css';

const primaryCN = (className: string) => cntl`
primary-button
${className}
`;

export const PrimaryButton = ({
  onClick,
  title,
  className = '',
  type,
  disabled = false,
}: {
  onClick: MouseEventHandler;
  className?: string;
  title: string;
  type?: ButtonType;
  disabled?: boolean;
}) => {
  return (
    <BaseButton
      className={primaryCN(className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {title}
    </BaseButton>
  );
};
