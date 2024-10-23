import cntl from 'cntl';
import { ReactNode } from 'react';
import { Banner } from './banner/banner';
import Image from '../../components/Image/image';
import Footer from './footer/footer';

const pageCN = (className: string) => cntl`
h-full
flex
flex-1
flex-col
pg-cn
relative
${className}
`;

const pageContentCN = (className: string) => cntl`
flex
flex-1
flex-col
${className}
`;

export const Page = ({
  children,
  title = '',
  className = '',
  contentClassName = '',
  icon,
}: {
  children: Iterable<ReactNode> | ReactNode;
  title?: string;
  className?: string;
  contentClassName?: string;
  icon?: string;
}) => {
  return (
    <div id="page-cn" className={pageCN(className)}>
      <Banner />
      <main id="page-content-cn" className={pageContentCN(contentClassName)}>
        {title && (
          <p className="mt-0 mb-4 px-6 !py-10 inline-flex gap-2 text-lg items-center font-bold border-solid !border-b-[1px] border-gray-200">
            {icon ? (
              <Image
                src={icon}
                className="w-[32px] h-[32px]"
                inline
                alt={`${title}-page-header-icon`}
              />
            ) : (
              ''
            )}
            {title}
          </p>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};
