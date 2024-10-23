import cntl from 'cntl';
import { ReactNode, useState } from 'react';
import './list.css';
import karat from '../../res/Icons/KaratRightGray.svg';

const listCN = (open: boolean) => cntl`
${!open ? 'toggle-list' : 'toggle-list-open'}
list-none
p-0
`;

const karatCN = (open: boolean) => cntl`
w-[10px]
h-[10px]
${!open ? 'karat-list' : 'karat-list-open'}
`;

export const ToggleList = ({
  children,
  items,
  itemClassName = '',
}: {
  children: Iterable<ReactNode> | ReactNode;
  items: string[] | ReactNode[];
  itemClassName?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div id="toggle-list-cn">
      <button
        role="button"
        id="toggle-list-toggle"
        className="bg-transparent border-none cursor-pointer flex gap-2 items-center p-0"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
      >
        {children}
        <img src={karat} className={karatCN(open)} />
      </button>
      <ul className={listCN(open)}>
        {items.map((item: string | ReactNode, idx: number) => (
          <li key={`toggle-list-item-${item}-${idx}`} className={itemClassName}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
