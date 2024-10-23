import { ColorCodes } from './components/Tags/ColorCodeTag';
import { FieldComponents as Components } from './types';
import { QueryKeyFactoryInterface } from './helpers/reactQuery/queryTypes';
import { ReactNode } from 'react';
export type IProduct = {
    label: string;
    name: string;
    value: number;
    catalog_object_id: string;
    src: string;
    alt: string;
    item_type: string;
    stock: number;
    desc: string | ReactNode;
    price: number;
};
export declare const PRODUCTS: IProduct[];
declare const clockHours: string[][];
export declare const CALENDAR_WEEK_DAYS: string[];
export declare const CALENDAR_VIEWS: string[];
export declare const APPOINTMENT_STATUS_COLORS: {
    [key: number]: {
        flag: string;
        body: string;
    };
};
declare const statusTagColorCodes: ColorCodes;
declare const FieldComponents: Components;
export declare const US_STATES: {
    label: string;
    value: string;
}[];
export declare const AUTH_TOKEN = "access-token";
export declare class UserQueryKey {
    static get base(): string[];
    static get guest(): string[];
    /**
     * @returns Authenticated | guest QueryKey
     */
    static get authenticated(): string[];
    static get isGuest(): boolean;
}
declare const QUERY_KEY: {
    [key: string]: QueryKeyFactoryInterface;
};
export declare const HOME = "/";
export declare const COMPLETE_ORDER = "/completed_order";
export declare const PRIVACY_POLICY = "/privacy_policy";
export declare const SCHEDULE = "/my";
export declare const LOGIN = "/login";
export declare const SIGNUP = "/signup";
export declare const MY_PROFILE = "/profile";
export declare const EDIT_SERVICES = "/services";
export declare const MY_SETTINGS = "/settings";
export declare const MODAL_KEY: {
    SIGN_UP: string;
    EDIT_SERVICE: string;
    DETAIL_SERVICE: string;
    NEW_APPT: string;
    PAYMENT_PORTAL: string;
};
export declare const Durations: {
    minutes: {
        label: number;
        value: number;
    }[];
    hours: {
        label: number;
        value: number;
    }[];
};
export declare const MIME_ABBR: {
    [key: string]: string;
};
export declare const ONE_MB = 1048576;
declare const dropDownPillStyles: {
    controlStyle: {
        borderRadius: string;
        minHeight: string;
        boxShadow: string;
    };
    valueStyle: {
        fontSize: string;
        paddingRight: string;
    };
    indicatorStyle: {
        padding: string;
    };
    separator: boolean;
};
export { clockHours, FieldComponents, statusTagColorCodes, QUERY_KEY, dropDownPillStyles, };
