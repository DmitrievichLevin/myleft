import { MutationFunction } from '@tanstack/react-query';
import { FormField } from '../../../types';
import { useCallback, useMemo, useState } from 'react';
import { CrudCard } from './crudCard';
import { TabbedContainer } from '../../TabbedContainer/tabbedContainer';
import { useModalActions } from '../../Modals/modalFactory';
import { Resource } from '../../../helpers/reactQuery/hooks/useArbitraryQuery';

export type CrudResource = {
  id: string;
  [key: string]: any | undefined;
};

type CrudViewFilter = {
  title: string;
  filter: (...args: any[]) => boolean;
};

export type CrudViewProps = {
  fields: FormField[];
  data?: Array<CrudResource | Resource>;
  className?: string;
  /**
   * Custom Card View Component
   * @param {props} - {...resourceProperties}
   */
  Component: (props: any) => JSX.Element;
  filters?: CrudViewFilter[];
  cardClassName?: string;
  elemsClassName?: string;
  disabled?: boolean;
  tab?: number;
  /**
   * Enables Creating Resource
   */
  modalKey?: string;
};

export const useCrudViewData = ({
  fields,
  data = [],
  Component,
  disabled = false,
  cardClassName = '',
  filters = [],
  tab = 0,
  ...props
}: CrudViewProps) => {
  const { modalKey = '' } = props;
  const { openModal } = useModalActions(modalKey);

  const Elems = useCallback(
    (tab: number) => {
      let _data = data;
      if (filters.length) {
        _data = data.filter(filters[tab].filter);
      }
      return _data.map((item: CrudResource) => (
        <CrudCard
          key={`crud-card-${item.id}`}
          update={
            modalKey
              ? () => openModal({ action: 'update', resource: item })
              : undefined
          }
          del={
            modalKey
              ? () => openModal({ action: 'delete', resource: item })
              : undefined
          }
          disabled={disabled}
          className={cardClassName}
        >
          <Component {...item} />
        </CrudCard>
      ));
    },
    [data, fields, disabled]
  );

  return {
    Elems,
    openModal,
  };
};
