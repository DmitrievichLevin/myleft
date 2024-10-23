import { DebouncedFunc } from 'lodash';
export type CityState = {
    city: string;
    state: string;
};
export declare const useLocationInputData: (onChange: (val: string) => void) => {
    getLocation: DebouncedFunc<() => void>;
    loading: boolean;
};
