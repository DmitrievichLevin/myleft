import { CreditCard } from 'react-square-web-payments-sdk';
import './checkout.css';
import { useModalActions } from '../../Modals/modalFactory';
import { IProduct, MODAL_KEY } from '../../../constants';
import { usePayment } from '../../../pages/home/hooks/usePayment';
import { AmountInput } from '../Amount/amountInput';
import Image from '../../Image/image';
import { useMemo } from 'react';

type ICheckout = {
  value: { [key: string]: any };
  name: string;
  onChange?: (value: { [key: string]: any }) => void;

  disabled?: boolean;
  forwardRef?: any;
};

export const Checkout = ({
  name,
  value = {},
  onChange = () => {},
  disabled = false,
}: ICheckout) => {
  const { order, addProduct } = usePayment({
    order: (value?.line_items || []) as any[],
  });

  const itemTotal = useMemo(
    () => order.reduce((a, b) => parseInt(b.quantity || '0', 10) + a, 0),
    [order]
  );

  const itemTotalPrice = useMemo(
    () =>
      order.reduce((a, b) => parseInt(b.quantity || '0', 10) * b.price + a, 0),
    [order]
  );

  const shippingAddress = useMemo(() => {
    const {
      address_line_1,
      address_line_2,
      locality,
      administrative_district_level_1,
      postal_code,
    } = value.shipping_address;
    return `${address_line_1}${address_line_2 ? ' ' + address_line_2 : ''} ${locality}, ${administrative_district_level_1} ${postal_code}`;
  }, [value]);

  return (
    <div className="checkout-cn">
      <div className="line-items">
        {order?.map((prodct: any) => {
          const { label, quantity, src, alt, stock, price, catalog_object_id } =
            prodct;
          return (
            <div className="line-item" key={catalog_object_id}>
              <Image src={src} alt={alt} className="line-preview" />
              <div className="line-item-atn">
                <div className="line-item-info">
                  <h2>{label}</h2>
                  <p>
                    <span>{quantity}x</span>{' '}
                    <span>{(price * parseInt(quantity, 10)).toFixed(2)}</span>
                  </p>
                </div>
                <AmountInput
                  max={stock}
                  value={quantity}
                  sm
                  onChange={(val: string) => addProduct(val, prodct)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="line-total">
        <span>Shipping address:</span>
        <span>{shippingAddress}</span>
        <span>Subtotal {`(${itemTotal} item):`}</span>
        <span>
          {itemTotalPrice === 0 ? '' : `$${itemTotalPrice.toFixed(2)}`}
        </span>
        <span>Shipping cost</span>
        <span>
          {itemTotalPrice >= 100
            ? 'Free'
            : itemTotalPrice === 0
              ? ''
              : `$14.99`}
        </span>
        <span>Total</span>
        <span>
          {itemTotalPrice === 0 ? (
            ''
          ) : (
            <span>
              <span className="line-currency">USD</span>
              {` $${
                itemTotalPrice >= 100
                  ? itemTotalPrice.toFixed(2)
                  : itemTotalPrice + 14.99
              }`}
            </span>
          )}
        </span>
      </p>
      <div className="line-payment">
        <CreditCard
          buttonProps={{
            isLoading: itemTotal === 0,
            css: {
              backgroundColor: 'var(--glory-blue)',
              fontSize: '14px',
              color: '#fff',
              border: '1px solid white',
              fontWeight: '550',
              '&:hover': {
                backgroundColor: 'var(--glory-secondary-blue)',
              },
            },
          }}
        />
      </div>
    </div>
  );
};
