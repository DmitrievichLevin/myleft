import cntl from 'cntl';
import './article.css';
import { ReactNode } from 'react';

type IArticle = {
  children: string | ReactNode | ReactNode[];
  title?: string;
  className?: string;
};

const articleCN = (className: string) => cntl`
atcl-cn
${className}
`;

export const Article = ({ children, title, className = '' }: IArticle) => {
  return (
    <article className={articleCN(className)}>
      {title && <p className="atcl-title">{title}</p>}
      <span className="atcl-chldrn">{children}</span>
    </article>
  );
};
