import { ReactNode, Dispatch } from 'react';
export interface AppState {
    modal: string | null;
    modalData?: {
        [key: string]: any;
    };
}
export interface MutationAction {
    type: string;
    subtype?: string;
    [key: string]: any;
}
export declare const AppContext: import("react").Context<[AppState, Dispatch<MutationAction>]>;
type ProviderProps = {
    children: Iterable<ReactNode> | ReactNode;
};
export declare const AppStateProvider: (props: ProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare const useAppState: () => [AppState, Dispatch<MutationAction>];
export {};
