import { useMemo } from 'react';
import Image from '../../Image/image';
import { CrudResource } from '../CrudView/useCrudViewData';
import './serviceCard.css';
import { RadioButton } from '../../Buttons/Radio/radioButton';

export const ServiceCard = (props: CrudResource) => {
  // const { fname, lname, phone, email = '' } = props;
  const { name, image, description: desc, active } = props;

  const description = useMemo(() => {
    if (desc.length > 50) {
      return desc.slice(0, 47) + '...';
    }
    return desc;
  }, [desc]);

  return (
    <div className="flex flex-col gap-2 w-[200px] h-[225px] relative justify-end p-2 service-cn">
      <div
        id="radio-active-btn-cn"
        className="flex items-start justify-end flex-1 z-[2]"
        title="Service active?"
      >
        <RadioButton
          id={`service-${name}-active-toggle`}
          name={`service-${name}-active-toggle`}
          value={active}
          className="shadow-md"
          onChange={(_) => console.log(_)}
        />
      </div>
      <Image
        src={image?.thumbnail}
        alt={`service-${name}-preview`}
        className="service-card-preview absolute top-0 left-0 w-full h-full"
      />
      <div className="service-card-preview-grad" />
      <p
        className="inline-grid grid-rows-3 gap-1 m-0 text-white z-10"
        title={`service-${name}`}
      >
        <span className="font-bold text-md inline-block row-span-1 w-full truncate text-shadow-sm">
          {name}
        </span>
        <span className="row-span-2 text-xs inline-block w-full">
          {description}
        </span>
      </p>
    </div>
  );
};
