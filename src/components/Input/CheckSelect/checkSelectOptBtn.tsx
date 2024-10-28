import checked from '../../../res/Icons/whiteCheckMark.svg';
import './checkSelect.css';

type ICheckSelectOpt = {
  onClick: () => void;
  title: string;
  name: string;
  id?: string;
};

export default ({ title, onClick, name = '', id = '' }: ICheckSelectOpt) => {
  return (
    <div
      role="button"
      id={id}
      aria-roledescription="html select option button"
      className={`check-select-opt ml-select-${name}-opt capitalize cursor-pointer relative`}
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
