import { AppState } from './context/appState';
import { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { DropDownOpt } from './components/Input/Dropdown/dropdown';
export type ColumnLabel = {
    title: string;
    subtitle?: string;
    raw?: string;
    isToday?: boolean;
    rowLabels?: Array<string>;
};
export type DateColumnLabel = ColumnLabel & {
    appointmentKey: TwoDigitMonthDateYear;
};
export type EmailAddress = `${string}@${string}.${string}`;
export type WeekDayCode = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type StatusCode4 = 0 | 1 | 2 | 3;
export type StatusCode3 = 0 | 1 | 2;
export type StatusCode2 = 0 | 1;
export type NaturalNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Digit = NaturalNumber | 0;
export type DigitString<A, T extends string = ''> = A extends `${infer B}${infer C}` ? B extends `${Digit}` ? C extends string ? DigitString<C, `${T}${number}`> : never : never : T;
export type ThreeDigitString = DigitString<'123'>;
export type LengthOfString<S extends string, T extends string[] = []> = S extends `${string}${infer R}` ? LengthOfString<R, [...T, string]> : T['length'];
export type PhoneNumberString<A, T extends string = ''> = A extends `${2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${infer B}` ? B extends string ? LengthOfString<B> extends 9 ? `${NaturalNumber}${DigitString<B>}` : never : never : T;
type PhoneNumber = PhoneNumberString<'6021234567'>;
export type YYYY = `2${0 | 1}${Digit}${Digit}`;
export type MM = `0${NaturalNumber}` | `1${0 | 1 | 2}`;
export type DD = `${0}${NaturalNumber}` | `${1 | 2}${Digit}` | `3${0 | 1}`;
export type TwoDigitMonthDateYear = `${YYYY}-${MM}-${DD}`;
export type DateTimeString = string;
export type TimeString = string;
export type Minutes = number;
export type UnixTimeStamp = number;
export type TimeFrame = [Minutes, Minutes];
export type ID = string;
export type DiscountCode = `${string}$${string}`;
export type OpenHours = {
    start: number;
    end: number;
};
export type OpenDay = {
    active: boolean;
    hours: OpenHours;
};
export type VendorOpenSchedule = [
    OpenDay,
    OpenDay,
    OpenDay,
    OpenDay,
    OpenDay,
    OpenDay,
    OpenDay
];
export type VendorContact = {
    phone: PhoneNumberString<'8881234567'>;
    instagram: string | null;
    facebook: string | null;
    tiktok: string | null;
};
export type VendorAddress = {
    address1: string;
    address2: string;
};
/**
 * Vendor Location
 * @returns [City], [State | State Abbreviation]
 */
export type VendorLocation = string;
export type URLString = string;
/**
 * Mongo Model Name
 */
export type ModelName = string;
/**
 * Path to Object Property
 * @example 'one.two.3'
 * @summary '.' delimited string starting with alpha chars, and ending with either alpha or numeric, but not both.
 */
export type ObjectPath = string;
export type ImageMetadata = {
    owner: ID;
    parent: ModelName;
    path: ObjectPath;
    size: number;
    mime: string;
    created_at: UnixTimeStamp;
    type: string;
    parentId: ID;
};
export type ImageUpload = {
    thumbnail: URLString;
    metadata: ImageMetadata;
    id: ID;
    url: URLString;
};
export type ImageID = ID;
/**
 * User Document
 */
export type User = {
    firstName: string;
    lastName: string;
    email: EmailAddress;
    vendor: ID;
    settings: ID;
    id: ID;
    metadata: {
        created_at: number;
        updated_at: number;
        parent: null;
    };
};
/**
 * User Settings Document
 */
export type ISettings = {
    parent: string;
    vendorId: string;
    hideAddress: boolean;
    hidePhone: boolean;
    autoAccept: boolean;
    autoSMS: boolean;
    allow: {
        reschedule: boolean;
        overbooking: boolean;
        tips: boolean;
    };
};
/**
 * Vendor Document
 */
export type Vendor = {
    contact: VendorContact;
    address: VendorAddress;
    name: string;
    open: VendorOpenSchedule;
    location: VendorLocation;
    verified: boolean;
    category: string;
    id: ID;
    image: ImageUpload;
    metadata: {
        created_at: UnixTimeStamp;
        updated_at: UnixTimeStamp;
        parent: ID;
    };
};
export type CustomerInfo = {
    firstName: string;
    lastName: string;
    phoneNumber: PhoneNumber;
};
export type AppointmentData = {
    /**
     * Added on DFS
     */
    edges?: number;
    depth?: number;
    /**
     * Added on DFS
     */
    requiredSign: true;
    id: ID;
    businessId: ID;
    invoiceId: ID;
    serviceId: ID;
    repeat: number;
    status: StatusCode3;
    appointmentStatus: StatusCode4;
    checkInTime: number | null;
    checkOutTime: number | null;
    date: TwoDigitMonthDateYear;
    endDate: TwoDigitMonthDateYear;
    startTime: Minutes;
    endTime: Minutes;
    createdAt: UnixTimeStamp;
    updatedTime: UnixTimeStamp;
    /**
     * @TODO
     * isWaitingList: 0 | 1;
     * waitListId: ID | null;
     * Future Development
     */
    isPaid: StatusCode3;
    noShow: StatusCode3;
    cancelReason: string | null;
    customerInfo: CustomerInfo;
    discountCode: DiscountCode;
    additionalNote: string | null;
    paidAmount: number;
    prepaidStatus: boolean;
    totalAmount: number;
    /**
     * @TODO refundAmount: number
     * Future Development
     */
    isAutoAccept: boolean;
    addOns: Array<ID>;
};
export interface InfiniteQueryData<T> {
    data: T[];
    nextCursor: string;
    prevCursor: string;
}
export type InfiniteApptData = InfiniteQueryData<AppointmentData>;
export type AddOn = {
    id: number;
    name: string;
    price: number;
    description: string;
};
export type Service = {
    id: string;
    name: string;
    price: number;
    active: boolean;
    image: null | string | {
        [key: string]: string;
    };
    deposit?: number;
    description: string;
    included: Array<Service | AddOn>;
};
export interface CRUD<T> {
    create: (state: AppState, data: T) => AppState;
    update: (state: AppState, data: T) => AppState;
    del: (state: AppState, data: T) => AppState;
}
export type EmbeddedButton = {
    onClick: MouseEventHandler;
    icon: string;
};
export type FormField = {
    type: 'text' | 'file' | 'files' | 'radio' | 'dropdown' | 'location' | 'subdomain' | 'password' | 'phone' | 'date' | 'currency' | 'textarea' | 'image' | 'images' | 'duration' | 'schedule' | 'service' | 'selectPayment' | 'shipping' | 'checkout';
    id: string;
    label: string;
    name: string;
    autocomplete?: string;
    onButtonClick?: () => void;
    min?: number;
    max?: number;
    pattern?: RegExp;
    required?: boolean;
    disabled?: boolean;
    icon?: string;
    opts?: DropDownOpt[];
    multi?: boolean;
    errorMessage?: string;
    formatLabel?: (obj: DropDownOpt) => ReactNode;
    /**
     * RegExpression to format data onSubmit
     * @example value.replace(formatter, "")
     */
    formatter?: RegExp;
};
export type Form = {
    fields: FormField[];
    onSubmit: () => any;
};
export type FormInputElement = HTMLInputElement & {
    files: File[];
};
export type FieldComponents = {
    [key: string]: FunctionComponent<any>;
};
export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
export {};
