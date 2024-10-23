import { AppState, MutationAction } from './appState';
export type AppStateMutationFN = (state: AppState, action: MutationAction) => AppState;
type AppStateMutationFactory = {
    [key: string]: AppStateMutationFN;
};
export declare const appStateMutations: AppStateMutationFactory;
export {};
