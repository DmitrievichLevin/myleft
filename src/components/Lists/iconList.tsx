import { ReactElement } from 'react';
import Image from '../Image/image';

type IconListItem = {
  icon?: string;
  component: ReactElement;
};
export const IconList = ({ items }: { items: IconListItem[] }) => {
  return (
    <ul className="flex flex-col gap-2 list-none pl-0 m-0">
      {items.map(({ icon, component }, idx) => {
        const key = `icon-list-elem-${idx}`;
        return (
          <li className="flex gap-3 items-center whitespace-nowrap" key={key}>
            {icon ? (
              <Image
                className="w-[15px] h-[15px] inline-block"
                src={icon}
                alt={key}
              />
            ) : (
              <></>
            )}
            {component}
          </li>
        );
      })}
    </ul>
  );
};
