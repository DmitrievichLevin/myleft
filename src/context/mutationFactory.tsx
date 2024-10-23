import { AppState, MutationAction } from './appState';

export type AppStateMutationFN = (
  state: AppState,
  action: MutationAction
) => AppState;

type AppStateMutationFactory = {
  [key: string]: AppStateMutationFN;
};

export const appStateMutations: AppStateMutationFactory = {
  // Example
  example: (state: AppState, action: MutationAction): AppState => {
    alert('This is an Example.');
    return state;
  },
  openModal: (state: AppState, action: MutationAction): AppState => {
    return { ...state, modal: action.modal, modalData: action?.modalData };
  },
  closeModal: (state: AppState, action: MutationAction): AppState => {
    return { ...state, modal: null, modalData: undefined };
  },
};
