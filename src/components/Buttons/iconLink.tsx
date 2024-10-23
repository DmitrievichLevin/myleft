import React, { MouseEventHandler } from 'react';
import { BaseButton } from './base';
import cntl from 'cntl';

const iconCN = (className: string) => cntl`
w-[0.625rem]
h-[0.625rem]
${className}
`;

const linkCN = (className: string) => cntl`
!p-0
flex
items-center
text-[0.75rem]
no-underline
hover:underline
text-[#333]
gap-1
${className}
`;

export const IconLink = ({
  icon,
  iconClassName = '',
  className = '',
  text,
  alt,
  href,
}: {
  icon: string;
  className?: string;
  iconClassName?: string;
  text?: string;
  alt: string;
  href: string;
}) => {
  return (
    <a title={text} className={linkCN(className)} href={href} target="_blank">
      <img alt={alt} src={icon} className={iconCN(iconClassName)} />
      {text && <span>{text}</span>}
    </a>
  );
};
