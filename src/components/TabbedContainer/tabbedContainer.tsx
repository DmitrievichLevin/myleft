import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IconButton } from '../Buttons/iconButton';
import rKarat from '../../res/Icons/karatRightBlue.svg';
import './tabbedContainer.css';
import cntl from 'cntl';
import { debounce } from 'lodash';

export type Tab = {
  title: string;
  icon?: string;
  component?: ReactNode | (() => JSX.Element);
  buttonClassName?: string;
  filter?: Function;
};

const buttonCN = (
  className: string,
  active: boolean,
  newContent: boolean
) => cntl`
items-center
!px-2
!py-1
gap-1
shadow-none
self-center
relative
${active ? 'bg-primaryBlue text-white' : 'bg-transparent text-textGray'}
${newContent ? (!active ? 'new-tab-content' : 'new-tab-content-active') : ''}
${className}
`;

const buttonIconCN = (active: boolean) => cntl`
${active ? 'brightness-[10]' : ''}
`;

const tabsCN = (className: string) => cntl`
flex
w-full
overflow-scroll
gap-3
px-3
tab-cn
${className}
`;

type TabExtra = {
  id: string;
  node: ReactNode;
};

export const TabbedContainer = ({
  tabs,
  tabsClassName = '',
  newContent = false,
  children,
  extras,
}: {
  tabs: Tab[];
  tabsClassName?: string;
  newContent?: boolean;
  children?: Function;
  /**
   * Extra Tab Navigation components
   * - unrelated to navigation
   */
  extras?: TabExtra[];
}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [atEnd, setAtEnd] = useState(true);
  const lastTabRef = useRef<HTMLInputElement>(null);
  const tabCNRef = useRef<HTMLInputElement>(null);

  const currentNode = useMemo(() => {
    let Node = tabs[currentTab]?.component;
    Node = typeof Node === 'function' ? <Node /> : Node;

    switch (true) {
      case React.isValidElement(Node):
        return Node;
      default:
        <></>;
    }
  }, [currentTab, tabs]);

  const scrollEnd = useCallback(
    debounce(() => {
      //@ts-ignore
      const { width: cnWidth = 0 } =
        tabCNRef?.current?.getBoundingClientRect() || { width: 0 };
      //@ts-ignore
      const { x: l_tabX = 1 } =
        lastTabRef?.current?.getBoundingClientRect() || {
          x: 1,
        };
      if (l_tabX < cnWidth !== atEnd) setAtEnd(l_tabX < cnWidth);
    }, 250),
    [tabCNRef.current, lastTabRef.current, atEnd, setAtEnd]
  );

  useEffect(() => {
    window.addEventListener('resize', scrollEnd);
    scrollEnd();
    return () => window.removeEventListener('resize', scrollEnd);
  }, [scrollEnd]);

  const tabBtns = useMemo(() => {
    return tabs.map(({ icon = '', title, buttonClassName = '' }: Tab, idx) => (
      <IconButton
        icon={icon}
        text={title}
        //@ts-ignore
        forwardRef={idx === tabs.length - 1 ? lastTabRef : undefined}
        className={buttonCN(buttonClassName, currentTab === idx, newContent)}
        iconClassName={buttonIconCN(currentTab === idx)}
        key={`tab-nav-btn-${title}`}
        onClick={() => setCurrentTab(idx)}
      />
    ));
  }, [tabs, currentTab]);
  return (
    <div
      id="tabbed-container"
      className="flex flex-col w-full h-full relative overflow-hidden"
    >
      <div
        id="tab-navigation"
        className={tabsCN(tabsClassName)}
        ref={tabCNRef}
        onScroll={(_) => {
          scrollEnd();
        }}
      >
        {!atEnd && (
          <IconButton
            onClick={() =>
              lastTabRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
            iconClassName="!bg-white rounded-full !w-6 !h-6 drop-shadow-md"
            className="!w-auto !h-auto absolute top-3 tab-scrollto-btn rounded-full !bg-transparent shadow-none z-[3]"
            icon={rKarat}
          />
        )}
        {tabBtns}
        <div className="flex flex-1 justify-end gap-3">
          {extras?.map(({ node, id }) => (
            <div
              id={`extra-tab-action-${id}`}
              key={`extra-tab-action-${id}`}
              className="h-auto w-auto"
            >
              {node}
            </div>
          ))}
        </div>
      </div>
      <div id="tabbed-cn-content" className="flex flex-1 w-full">
        {children ? children(currentTab) : currentNode}
      </div>
    </div>
  );
};
