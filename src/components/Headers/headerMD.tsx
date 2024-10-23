import cntl from 'cntl';
import React, { ReactNode } from 'react';

const headerCN = (className: string) => cntl`
header-md
${className}
`;

export const HeaderMD = ({
  children,
  className = '',
}: {
  children: string | ReactNode;
  className?: string;
}) => {
  return <h2 className={headerCN(className)}>{children}</h2>;
};
