import { useCallback } from 'react';
import { US_STATES } from '../../../constants';
import { insertIn } from '../../Form/useFormData';
import { DropdownList } from '../Dropdown/dropdown';
import { TextInput, TextInputProps } from '../textInput';
import './shipping.css';

type IShipping = {
  value: { [key: string]: any };
  name: string;
  onChange?: (value: { [key: string]: any }) => void;
  required?: boolean;
  disabled?: boolean;
  forwardRef?: any;
  errorMessage?: string;
};

export const ShippingInfo = ({
  name,
  value = {},
  onChange = () => {},
  disabled = false,
  forwardRef,
  errorMessage,
}: IShipping) => {
  const mutateInfo = useCallback(
    (k: string) => {
      return (v: any) => onChange(insertIn(value, k, v?.value ?? v));
    },
    [value, onChange]
  );

  return (
    <div className="shipping-fields">
      <h2>Customer information</h2>
      <TextInput
        name="buyer_email_address"
        value={value?.buyer_email_address}
        placeholder="Email"
        className="!col-span-2 !max-w-[100%]"
        onChange={mutateInfo('buyer_email_address')}
        required
      />
      <h2>Shipping address</h2>
      <TextInput
        name="shipping_address.first_name"
        value={value?.shipping_address?.first_name}
        placeholder="First name"
        onChange={mutateInfo('shipping_address.first_name')}
        required
      />
      <TextInput
        name="shipping_address.last_name"
        value={value?.shipping_address?.last_name}
        placeholder="Last name"
        onChange={mutateInfo('shipping_address.last_name')}
        required
      />
      <TextInput
        name="shipping_address.address_line_1"
        value={value?.shipping_address?.address_line_1}
        placeholder="Address 1"
        onChange={mutateInfo('shipping_address.address_line_1')}
        className="!col-span-2 !max-w-[none]"
        required
      />

      <TextInput
        name="shipping_address.address_line_2"
        value={value?.shipping_address?.address_line_2}
        placeholder="Address 2"
        onChange={mutateInfo('shipping_address.address_line_2')}
        className="!col-span-2 !max-w-[none]"
      />

      <TextInput
        name="shipping_address.locality"
        value={value?.shipping_address?.locality}
        placeholder="City"
        onChange={mutateInfo('shipping_address.locality')}
        required
      />

      <DropdownList
        name="address-level1"
        value={value?.shipping_address?.administrative_district_level_1}
        placeholder="State"
        onChange={mutateInfo(
          'shipping_address.administrative_district_level_1'
        )}
        required
        opts={US_STATES}
        multi={false}
      />
      <TextInput
        name="shipping_address.country"
        value={'US'}
        onChange={mutateInfo('shipping_address.country')}
        required
        disabled
      />
      <TextInput
        name="shipping_address.postal_code"
        value={value?.shipping_address?.postal_code}
        placeholder="ZIP code"
        pattern={'^([0-9]{5})$'}
        onChange={mutateInfo('shipping_address.postal_code')}
        required
      />
    </div>
  );
};
