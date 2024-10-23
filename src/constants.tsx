import { ColorCodes } from './components/Tags/ColorCodeTag';
import greenCheckMark from './res/Icons/greenCheckmark.svg';
import circledXMark from './res/Icons/circledXMark.svg';
import circledPartial from './res/Icons/circledPartial.svg';
import { FieldComponents as Components } from './types';
import { RadioButton } from './components/Buttons/Radio/radioButton';
import { TextInput } from './components/Input/textInput';
import { LocationInput } from './components/Input/Location/locationInput';
import { SubDomain } from './components/Input/Subdomain/subdomain';
import { Password } from './components/Input/Password/passwordInput';
import { PhoneNumberInput } from './components/Input/Contact/phoneInput';
import { DateInput } from './components/Input/Date/DateInput';
import { CurrencyInput } from './components/Input/Currency/currencyInput';
import { TextAreaInput } from './components/Input/Textarea/textAreaInput';
import { FormImageUpload } from './components/Input/FormImage/formImageUpload';
import { DropdownList } from './components/Input/Dropdown/dropdown';
import { DurationInput } from './components/Input/Dropdown/Duration/durationInput';
import {
  ConstructKeyFactory,
  QueryKeyFactoryInterface,
} from './helpers/reactQuery/queryTypes';
import Cookies from 'js-cookie';
import { DragDropInput } from './components/Input/DragDrop/dragdrop';
import salted from '../public/media/salted_ml_nuts_front.png';
import unsalted from '../public/media/unsalted_ml_nuts_front.png';
import { ReactNode } from 'react';
import { SelectPaymentMethod } from './components/Input/PaymentMethod/selectPaymentMethod';
import { ShippingInfo } from './components/Input/Shipping/shipping';
import { Checkout } from './components/Input/Checkout/checkout';

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

export const PRODUCTS: IProduct[] = [
  {
    label: 'Salted Cashews',
    name: 'Salted Cashews',
    value: 0,
    catalog_object_id: 'O6ZJ6WGMP3QEK642U7DTOZ6T',
    src: salted,
    alt: 'salted',
    item_type: 'ITEM',
    price: 0.01,
    stock: 56,
    desc: (
      <span>
        These aren't just a delicious treat; they're an ode to{' '}
        <span className="!font-[500]">America's favorite nut</span>. Whether you
        wish to collect memorabilia to commemorate{' '}
        <span className="!font-[500]">45</span>, or express that you've
        exhausted just about every mental faculty trying to figure out what{' '}
        <i>"non-binary"</i> means. One things for certain, another four years of{' '}
        <i>Sleepy Joe & Co.</i> and we won't be able to identify as{' '}
        <span className="!font-[500]">America</span>. This{' '}
        <span className="!font-[500]">limited edition</span> offering is the{' '}
        <span className="!font-[500]">best gift</span> for your liberal
        constituents.
      </span>
    ),
  },
  {
    label: 'Unsalted Cashews',
    name: 'Unsalted Cashews',
    catalog_object_id: 'MIWYHLJ3YDEO7HYC2GPDLTGR',
    item_type: 'ITEM',
    price: 0.01,
    value: 1,
    src: unsalted,
    alt: 'unsalted',
    stock: 98,
    desc: (
      <span>
        These aren't just a delicious treat; they're an ode to{' '}
        <span className="!font-[500]">America's favorite nut</span>. Whether you
        wish to collect memorabilia to commemorate{' '}
        <span className="!font-[500]">45</span>, or express that you've
        exhausted just about every mental faculty trying to figure out what{' '}
        <i>"non-binary"</i> means. One things for certain, another four years of{' '}
        <i>Sleepy Joe & Co.</i> and we won't be able to identify as{' '}
        <span className="!font-[500]">America</span>. This{' '}
        <span className="!font-[500]">limited edition</span> offering is the{' '}
        <span className="!font-[500]">best gift</span> for your liberal
        constituents.
      </span>
    ),
  },
];

const clockHours = [
  ['12', 'am'],
  ['1', 'am'],
  ['2', 'am'],
  ['3', 'am'],
  ['4', 'am'],
  ['5', 'am'],
  ['6', 'am'],
  ['7', 'am'],
  ['8', 'am'],
  ['9', 'am'],
  ['10', 'am'],
  ['11', 'am'],
  ['12', 'pm'],
  ['1', 'pm'],
  ['2', 'pm'],
  ['3', 'pm'],
  ['4', 'pm'],
  ['5', 'pm'],
  ['6', 'pm'],
  ['7', 'pm'],
  ['8', 'pm'],
  ['9', 'pm'],
  ['10', 'pm'],
  ['11', 'pm'],
];

export const CALENDAR_WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const CALENDAR_VIEWS = ['month', 'week', 'day'];

// export const testAppointment: AppointmentData = {
//   requiredSign: true,
//   id: 47202308,
//   businessId: 110292,
//   invoiceId: 121565426,
//   repeat: 0,
//   status: 2,
//   appointmentStatus: 2,
//   checkInTime: 1717772564,
//   checkOutTime: 1717783138,
//   appointmentDate: '2024-06-07',
//   appointmentEndDate: '2024-06-07',
//   appointmentStartTime: 480,
//   appointmentEndTime: 540,
//   createTime: 1717701314,
//   updatedTime: 134046,
//   isPaid: 1,
//   noShow: 2,
//   cancelReason: null,
//   customerInfo: {
//     customerId: 16002688,
//     lastName: 'Alvarez',
//     firstName: 'Emily',
//     phoneNumber: '6025826570',
//     address: null,
//     email: null,
//     preferredFrequencyDay: 28,
//     preferredFrequencyType: 1,
//     isNewCustomer: false,
//     referralSourceId: 0,
//     preferredDay: [0, 1, 2, 3, 4, 5, 6],
//     preferredTime: [0, 1435],
//     autoEmail: 0,
//     autoMessage: 1,
//   },
//   discountCode: 'TAKE$5OFF',
//   additionalNote: null,
//   paidAmount: 78,
//   totalAmount: 180,
//   prepaidStatus: false,
//   isAutoAccept: false,
//   addOns: [1],
// };

const paymentColorCodes: ColorCodes = {
  0: {
    label: 'Unpaid',
    color: 'gray-200',
    fontColor: 'gray-600',
    icon: circledXMark,
  },
  1: {
    label: 'Deposited',
    color: 'blue-100',
    fontColor: 'blue-600',
    icon: circledPartial,
  },
  2: {
    label: 'Paid',
    color: 'green-200',
    fontColor: 'green-700',
    icon: greenCheckMark,
  },
};

export const APPOINTMENT_STATUS_COLORS: {
  [key: number]: { flag: string; body: string };
} = {
  0: { flag: '#E5F27C', body: '#F7FBD1' },
  1: { flag: '#BEEAFA', body: '#E8F8FE' },
  2: { flag: '#F09979', body: '#FFDFD5' },
};

const statusTagColorCodes: ColorCodes = {
  0: {
    label: 'Upcoming',
    color: 'primaryBlue',
    fontColor: 'white',
  },
  1: {
    label: 'Servicing',
    color: 'secondaryBlue',
    fontColor: 'white',
  },
  2: {
    label: 'Finished',
    color: 'gray-200',
    fontColor: 'gray-600',
  },
  3: {
    label: 'Cancelled',
    color: 'errorRed',
    fontColor: 'white',
  },
};

const FieldComponents: Components = {
  radio: RadioButton,
  text: TextInput,
  textarea: TextAreaInput,
  location: LocationInput,
  subdomain: SubDomain,
  password: Password,
  phone: PhoneNumberInput,
  currency: CurrencyInput,
  date: DateInput,
  image: FormImageUpload,
  files: DragDropInput,
  dropdown: DropdownList,
  duration: DurationInput,
  selectPayment: SelectPaymentMethod,
  shipping: ShippingInfo,
  checkout: Checkout,
};

export const US_STATES = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' },
];

// Cookies
export const AUTH_TOKEN = 'access-token';

export class UserQueryKey {
  static get base() {
    return ['__user'];
  }

  static get guest() {
    return ['__guest'];
  }
  /**
   * @returns Authenticated | guest QueryKey
   */
  static get authenticated() {
    const token = Cookies.get(AUTH_TOKEN);
    if (!token) return this.guest;
    return [...this.base, token];
  }

  static get isGuest() {
    const token = Cookies.get(AUTH_TOKEN);
    if (!token) return true;
    return false;
  }
}

const QUERY_KEY: { [key: string]: QueryKeyFactoryInterface } = {
  contacts: ConstructKeyFactory('__contacts'),
  vendors: ConstructKeyFactory('__vendors'),
  services: ConstructKeyFactory('__services'),
  appts: ConstructKeyFactory('__appts'),
  events: ConstructKeyFactory('__events'),
};

// Routes
export const HOME = '/';
export const COMPLETE_ORDER = '/completed_order';
export const PRIVACY_POLICY = '/privacy_policy';
export const SCHEDULE = '/my';
export const LOGIN = '/login';
export const SIGNUP = '/signup';
export const MY_PROFILE = '/profile';
export const EDIT_SERVICES = '/services';
export const MY_SETTINGS = '/settings';

// Modals
export const MODAL_KEY = {
  SIGN_UP: 'signup',
  EDIT_SERVICE: 'service',
  DETAIL_SERVICE: 'service_detail',
  NEW_APPT: 'appt_new',
  PAYMENT_PORTAL: 'payment',
};

// Durations
export const Durations = {
  minutes: [
    { label: 0, value: 0 },
    { label: 15, value: 15 },
    { label: 30, value: 30 },
    { label: 45, value: 45 },
  ],
  hours: [
    { label: 0, value: 0 },
    { label: 1, value: 60 },
    { label: 2, value: 120 },
    { label: 3, value: 180 },
    { label: 4, value: 240 },
    { label: 5, value: 300 },
    { label: 6, value: 360 },
    { label: 7, value: 420 },
    { label: 8, value: 480 },
    { label: 9, value: 540 },
    { label: 10, value: 600 },
    { label: 11, value: 660 },
    { label: 12, value: 720 },
    { label: 13, value: 780 },
    { label: 14, value: 840 },
    { label: 15, value: 900 },
    { label: 16, value: 960 },
    { label: 17, value: 1020 },
    { label: 18, value: 1080 },
    { label: 19, value: 1140 },
    { label: 20, value: 1200 },
    { label: 21, value: 1260 },
    { label: 22, value: 1320 },
    { label: 23, value: 1380 },
    { label: 24, value: 1440 },
  ],
};

// Mime Abbr
export const MIME_ABBR: { [key: string]: string } = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/heic': 'heic',
};

export const ONE_MB = 1048576;

const dropDownPillStyles = {
  controlStyle: {
    borderRadius: '99999px',
    minHeight: '0px',
    boxShadow:
      'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px',
  },
  valueStyle: { fontSize: '12px', paddingRight: '0px' },
  indicatorStyle: { padding: '0px' },
  separator: false,
};

export {
  clockHours,
  paymentColorCodes,
  FieldComponents,
  statusTagColorCodes,
  QUERY_KEY,
  dropDownPillStyles,
};
