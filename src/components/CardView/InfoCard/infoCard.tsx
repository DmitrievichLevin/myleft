import cntl from 'cntl';
import { ReactNode } from 'react';

const infoCardCN = (className: string) => cntl`
border-solid
!border-[1px]
border-gray-300
bg-white
p-2
rounded-md
${className}
`;

export const InfoCard = ({
  children,
  className = '',
}: {
  children: ReactNode | Iterable<ReactNode>;
  className?: string;
}) => {
  return <div className={infoCardCN(className)}>{children}</div>;
};
