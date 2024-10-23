import React, { MouseEventHandler } from 'react';
import cntl from 'cntl';
import { BaseButton, ButtonType } from '../base';
import './secondaryButton.css';

const secondaryCN = (className: string) => cntl`
secondary-button
${className}
`;

export const SecondaryButton = ({
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
      className={secondaryCN(className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {title}
    </BaseButton>
  );
};
