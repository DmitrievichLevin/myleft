import {
  useContext,
  useReducer,
  createContext,
  ReactNode,
  Reducer,
  Dispatch,
} from 'react';
import { appStateMutations } from './mutationFactory';
import { MODAL_KEY } from '../constants';

export interface AppState {
  modal: string | null;
  modalData?: { [key: string]: any };
}

export interface MutationAction {
  type: string;
  subtype?: string;
  [key: string]: any;
}

const initialStates = {
  // Dev
  modal: null,
  modalData: undefined,
} as AppState;

export const AppContext = createContext<[AppState, Dispatch<MutationAction>]>([
  initialStates,
  () => {},
] as [AppState, Dispatch<MutationAction>]);

const reducer: Reducer<AppState, MutationAction> = (
  state: AppState,
  action: MutationAction
) => {
  try {
    const mutationFN = appStateMutations[action.type];
    return mutationFN(state, action);
  } catch (e: any) {
    console.error('Invalid AppState mutation.\n', e.message);
  }
  return state;
};

type ProviderProps = {
  children: Iterable<ReactNode> | ReactNode;
};

export const AppStateProvider = (props: ProviderProps) => {
  const value = useReducer(reducer, initialStates);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppContext);
};
