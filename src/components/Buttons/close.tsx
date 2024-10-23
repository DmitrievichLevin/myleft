import { BaseButton, BaseButtonProps } from './base';
import xMark from '../../res/Icons/xMark.svg';
import './Primary/primaryButton.css';

export const CloseButton = ({
  onClick,
  className = '',
  icon,
}: BaseButtonProps & { icon?: string }) => {
  return (
    <BaseButton
      onClick={(e) => onClick(e)}
      className={`primary-button close-btn ${className}`}
      name="close"
    >
      <img src={xMark} alt="close-btn" className="w-full h-full" />
    </BaseButton>
  );
};
