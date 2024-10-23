import cntl from 'cntl';
import { ReactNode } from 'react';
import { CloseButton } from '../Buttons/close';
import backArrow from '../../res/Icons/backArrowIcon.svg';
import { useModalActions } from './modalFactory';
import './modal.css';

const modalOverlayCN = (open: boolean) => cntl`
${open ? 'flex' : 'hidden'}
absolute
top-0 
left-0 
w-full
h-full
bg-[rgba(0,0,0,0.3)]
items-center
justify-center
z-[98]
`;

const modalCN = (className: string = '') => cntl`
relative
inline-flex
z-[99]
overflow-hidden
modal-cn
${className}
`;

const titleCN = (className: string) => cntl`
flex 
w-full 
items-center
modal-title
${className}
`;

export const Modal = ({
  children,
  onRequestClose = () => {},
  modalKey,
  className = '',
  titleClassName = '',
  title = '',
}: {
  children: Iterable<ReactNode> | ReactNode;
  className?: string;
  titleClassName?: string;
  onRequestClose?: () => void;
  modalKey: string;
  title?: string | ReactNode;
}) => {
  const { closeModal, open } = useModalActions(modalKey);
  return (
    <div
      id="modal-overlay-sdjh3284984"
      className={modalOverlayCN(open)}
      onClick={(e: any) => {
        if (e.target?.id !== 'modal-overlay-sdjh3284984') return;
        e.stopPropagation();
        e.preventDefault();
        onRequestClose();
        closeModal();
      }}
    >
      <div id="modal-cn-sdjh3284984" className={modalCN(className)}>
        <div
          id="modal-cn-sdjh3284984-title"
          className={titleCN(titleClassName)}
        >
          {title && (
            <p id="service-form-title-cn" className="m-0 self-start font-white">
              {title}
            </p>
          )}
          <CloseButton
            className="self-end"
            icon={backArrow}
            onClick={() => {
              closeModal();
              onRequestClose();
            }}
          />
        </div>

        <div
          id="modal-cn-sdjh3284984-content"
          className="modal-content-cn"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
