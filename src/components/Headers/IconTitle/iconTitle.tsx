import cntl from 'cntl';
import { ReactNode } from 'react';

const iconTitleCN = (className: string) => cntl`
relative
flex
gap-2
items-center
w-fit
${className}
`;

export const IconTitle = ({
  title,
  icon,
  bubbleText,
  className = '',
  alt = 'icon-title-img',
  children,
  pulse = false,
}: {
  title?: string;
  icon?: string;
  bubbleText?: string;
  className?: string;
  alt?: string;
  children?: ReactNode | ReactNode[];
  pulse?: boolean;
}) => {
  return (
    <span className={iconTitleCN(className)}>
      {bubbleText && (
        <span
          id="icon-title-bubble"
          className="absolute px-1 right-[-8px] top-[-12px] text-[8px] rounded-full bg-white text-primaryBlue leading-[16px]"
        >
          {bubbleText}
        </span>
      )}
      {icon && (
        <div className="w-[32px] h-[32px] object-contain relative">
          {pulse && (
            <div className="absolute flex w-full h-full overflow-visible items-center justify-center">
              <span className="block w-[75%] h-[75%] bg-glorySecondaryBlue animate-ping rounded-full" />
            </div>
          )}
          <img src={icon} className="inline-block" alt={alt} />
        </div>
      )}
      <span id="icon-title-text" className="text-[28px]">
        {children || title}
      </span>
    </span>
  );
};
