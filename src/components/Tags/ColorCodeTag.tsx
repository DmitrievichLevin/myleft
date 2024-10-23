import React from 'react';
import { BaseTag } from './baseTag';

export type ColorCode = {
  label: string;
  color: string;
  fontColor?: string;
  icon?: string;
};

export type ColorCodes = {
  [key: number]: ColorCode;
};

export const ColorCodeTag = ({
  label,
  color = 'light-grey',
  fontColor = '',
  icon,
}: ColorCode) => {
  return (
    <BaseTag
      title={label}
      icon={icon}
      className={`bg-${color} ${fontColor ? `text-${fontColor}` : ''}`}
    />
  );
};
