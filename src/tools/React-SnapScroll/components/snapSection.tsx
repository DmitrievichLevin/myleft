import cntl from 'cntl';
import { MutableRefObject, ReactNode, useRef } from 'react';
import '../snapscroll.css';
import { useSnapScroll } from '../hooks/useSnapScroll';
import { SnapScrollCallback, SnapScrollOptions } from '../types';

const sectionCN = (className: string) => cntl;

const stnWrapperCN = cntl`
w-full
overflow-hidden
relative
snap-stn-wrapper
px-[10px]
`;

const titleCN = (className: string) => cntl`
inline-flex
justify-between
items-center
py-4
m-0
border-solid
!border-b-[1px]
!border-[#777777]
font-[Raleway]
font-semibold
flex-1
${className}
`;

export const SnapSection = ({
  children,
  title,
  className = '',
  titleClassName = '',
  snapOptions,
  id = 'snap-stn-wrapper',
}: {
  children: ReactNode | ReactNode[];
  title: string | ReactNode;
  className?: string;
  titleClassName?: string;
  snapOptions?: SnapScrollOptions;
  onOverScroll?: SnapScrollCallback;
  id?: string;
}) => {
  const childrenRef = useRef<HTMLDivElement | HTMLSelectElement>();

  const { loading: snapScrolling } = useSnapScroll(
    childrenRef as MutableRefObject<HTMLDivElement | HTMLSelectElement>,
    {
      enabled: true,
      ...snapOptions,
    }
  );

  return (
    <div className="relative flex flex-col w-full px-4 gap-4">
      <div className={titleCN(titleClassName)}>{title}</div>
      <div id={id} className={stnWrapperCN}>
        <div
          className={`flex gap-[12px] relative overflow-visible ${className}`}
          ref={childrenRef as MutableRefObject<HTMLDivElement>}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
