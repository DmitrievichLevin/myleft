import React from 'react';
import cntl from 'cntl';

const baseTagStyle = (className: string) => cntl`
text-xs
rounded-md
flex
gap-1
p-[0.25rem]
m-0
w-fit
${className}
`;

export type TagProps = {
  title: string;
  className?: string;
  id?: string;
  icon?: string;
};

export const BaseTag = ({
  title,
  className = '',
  id = 'tag',
  icon,
}: TagProps) => {
  return (
    <p id={id} className={baseTagStyle(className)}>
      {icon && <img src={icon} />}
      {title}
    </p>
  );
};
