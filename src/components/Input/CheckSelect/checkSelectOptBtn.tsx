import checked from '../../../res/icons/whiteCheckMark.svg';
import './checkSelect.css';

type ICheckSelectOpt = {
  onClick: () => void;
  title: string;
  name: string;
};

export default ({ title, onClick, name = '' }: ICheckSelectOpt) => {
  return (
    <div
      role="button"
      aria-roledescription="html select option button"
      className={`check-select-opt ml-select-${name}-opt capitalize cursor-pointer`}
      onClick={onClick}
    >
      <img
        src={checked}
        alt="selected-identifier"
        className="rounded-full w-4 h-4"
      />
      {title}
    </div>
  );
};
