import { IconButton } from '../iconButton';
import userIcon from '../../../res/Icons/userIcon.svg';
import cntl from 'cntl';

const buttonCN = (className: string) => cntl`
!rounded-full
${className}
`;

export const ProfileButton = ({ className = '' }: { className?: string }) => {
  return (
    <IconButton
      icon={userIcon}
      onClick={() => alert('Imagine a dropdown list')}
      iconClassName="rounded-full bg-gray-200"
      className={buttonCN(className)}
    />
  );
};
