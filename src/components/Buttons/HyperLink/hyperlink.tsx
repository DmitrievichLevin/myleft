import cntl from 'cntl';
import { useCallback } from 'react';
import {
  useHref,
  useLinkClickHandler,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useModalActions } from '../../Modals/modalFactory';

const hyperLinkCN = (className: string) => cntl`
inline
no-underline
text-linkBlue
${className}
`;
export const HyperLink = ({
  text,
  href,
  onClick,
  newWindow = false,
  className = '',
  title,
}: {
  text: string;
  href: string;
  title: string;
  newWindow?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  const rHref = useHref(href);
  const linkClick = useLinkClickHandler(href);
  const { closeModal } = useModalActions();
  const handleLinkClick = useCallback(
    (e: any) => {
      closeModal();
      if (newWindow) {
        window.open(window.location.origin + href);
      } else {
        linkClick(e);
        if (onClick) {
          onClick();
        }
      }
    },
    [href, newWindow]
  );

  return (
    <a
      href={rHref}
      className={hyperLinkCN(className)}
      title={title}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleLinkClick(e);
      }}
    >
      {text}
    </a>
  );
};
