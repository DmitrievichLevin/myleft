import { FormField } from '../../../types';
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
export declare const useCrudViewData: ({ fields, data, Component, disabled, cardClassName, filters, tab, ...props }: CrudViewProps) => {
    Elems: (tab: number) => import("react/jsx-runtime").JSX.Element[];
    openModal: (data?: any) => void;
};
export {};
