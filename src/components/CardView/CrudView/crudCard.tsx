import { MouseEventHandler, ReactElement } from 'react';
import { SecondaryButton } from '../../Buttons/Secondary/secondaryButton';
import { PrimaryButton } from '../../Buttons/Primary/primaryButton';
import './crudCard.css';
import cntl from 'cntl';

const crudCardCN = (className: string) => cntl`
flex
flex-col
gap-3
py-2
bg-white
card-shdw
rounded-md
rud-actions-cn
cursor-pointer
${className}
`;

export const CrudCard = ({
  children,
  update,
  del,
  disabled = false,
  className = '',
}: {
  children: ReactElement | ReactElement[];
  key?: string;
  update?: MouseEventHandler;
  del?: MouseEventHandler;
  disabled: boolean;
  className?: string;
}) => {
  return (
    <div className={crudCardCN(className)} tabIndex={-1}>
      {children}
      <div id="rud-actions" className="flex gap-3 justify-end">
        {update && (
          <SecondaryButton
            title="Edit"
            className="button-md"
            onClick={update}
            disabled={disabled}
          />
        )}
        {del && (
          <PrimaryButton
            title="Delete"
            className="button-md"
            onClick={del}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};
