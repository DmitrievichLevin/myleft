import { IconButton, IconButtonProps } from '../iconButton';
import trClosed from '../../../res/Icons/trashIcon.svg';
import './trashButton.css';

export const TrashButton = ({
  onClick,
  iconClassName = '',
  className = '',
  name = '',
  forwardRef,
  disabled = false,
}: IconButtonProps) => {
  return (
    <IconButton
      iconClassName={iconClassName + ' trash-button'}
      className={className + ' trash-button-cn'}
      name={name}
      forwardRef={forwardRef}
      disabled={disabled}
      icon={trClosed}
      onClick={onClick}
    />
  );
};
