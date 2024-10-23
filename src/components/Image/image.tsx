import cntl from 'cntl';
import fallback from '../../res/Icons/fallbackImg.svg';
import { ReactNode } from 'react';

const imageCN = (className: string) => cntl`
w-20
h-20
relative
${className}
`;

export default ({
  src,
  alt,
  className = '',
  inline = false,
  fallbackImg,
  children,
}: {
  src: string;
  className?: string;
  alt: string;
  inline?: boolean;
  fallbackImg?: string;
  children?: ReactNode;
}) => {
  return (
    <>
      {!inline ? (
        <div className={imageCN(className)}>
          <picture>
            {/* @ts-ignore */}
            <source srcSet={src} type="image/jpeg" />
            {/* @ts-ignore */}
            <source srcSet={src} type="image/png" />
            {/* @ts-ignore */}
            <source srcSet={src} type="image/svg+xml" />
            <img
              alt={alt}
              className="w-full h-full object-cover"
              src={fallbackImg || fallback}
            />
          </picture>
          {children}
        </div>
      ) : (
        <span className={imageCN(className + ' inline-block')}>
          <picture>
            {/* @ts-ignore */}
            <source srcSet={src} type="image/jpeg" />
            {/* @ts-ignore */}
            <source srcSet={src} type="image/png" />
            {/* @ts-ignore */}
            <source srcSet={src} type="image/svg+xml" />
            <img
              alt={alt}
              className="w-full h-full object-cover"
              src={fallbackImg || fallback}
            />
          </picture>
          {children}
        </span>
      )}
    </>
  );
};
