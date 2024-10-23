import cntl from 'cntl';
import { SecondaryButton } from '../../Buttons/Secondary/secondaryButton';
import { Form } from '../../Form/form';
import { CrudViewProps, useCrudViewData } from './useCrudViewData';
import { IconButton } from '../../Buttons/iconButton';
import plusIcon from '../../../res/Icons/plusIconColor.svg';
import { TabbedContainer } from '../../TabbedContainer/tabbedContainer';
import { useCallback, useMemo } from 'react';

const crudViewCN = (className: string) => cntl`
w-full
h-full
flex
flex-col
relative
${className}
`;

const crudViewElemCN = (className: string) => cntl`
w-full
flex
gap-4
flex-wrap
py-2
${className}
`;

export const CrudView = (props: CrudViewProps) => {
  const { Elems, openModal } = useCrudViewData(props);

  const { className = '', elemsClassName = '', modalKey = null } = props;
  const crudViewTabbedExtras = useMemo(() => {
    let extras = [];

    if (modalKey) {
      extras.push({
        id: 'crud-view-create-btn',
        node: (
          <IconButton
            icon={plusIcon}
            className="self-end bg-transparent hover:scale-105 shadow-none !border-solid !border-[1px] border-gray-300 !rounded-full !p-1 transition-all"
            onClick={() => openModal()}
          />
        ),
      });
    }

    return extras;
  }, [modalKey]);

  return (
    <div id="crud-view-cn" className={crudViewCN(className)}>
      <TabbedContainer
        tabs={props?.filters || []}
        tabsClassName="border-solid !border-b-[1px] border-gray-200 pb-4 mb-2"
        extras={crudViewTabbedExtras}
      >
        {(currentTab: number) => (
          <div className={crudViewElemCN(elemsClassName)}>
            {Elems(currentTab)}
          </div>
        )}
      </TabbedContainer>
    </div>
  );
};
