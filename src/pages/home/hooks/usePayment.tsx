import { useCallback, useMemo, useState } from 'react';
import { useModalActions } from '../../../components/Modals/modalFactory';
import { IProduct, MODAL_KEY } from '../../../constants';

const emptyOrder = {
  line_items: [],
  shipping_address: {
    address_line_1: '',
    address_line_2: '',
    administrative_district_level_1: '',
    country: '',
    first_name: '',
    last_name: '',
    locality: '',
    postal_code: '',
  },
  accept_partial_authorization: false,
  buyer_email_address: '',
  phone: '',
  order_id: '',
  countryCode: 'US',
  currencyCode: 'USD',
};

export const usePayment = (props: { order?: any[] } = { order: [] }) => {
  const { openModal } = useModalActions(MODAL_KEY.PAYMENT_PORTAL);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<
    Array<{
      catalog_object_id: string;
      quantity: string;
      price: number;
      variations: { value: string }[];
    }>
  >(props?.order as any[]);

  const onBuyNow = useCallback(async () => {
    setLoading(true);
    openModal({ ...emptyOrder, line_items: order });
  }, [openModal, setLoading, order]);

  const addProduct = useCallback(
    (amount: string, product: IProduct) => {
      setOrder((prev: Array<any>) => {
        const inCart = prev.findIndex(
          (v) => v.catalog_object_id === product.catalog_object_id
        );

        if (inCart > -1) prev[inCart].quantity = amount;
        else prev = [...prev, { ...product, quantity: amount }];

        const dynamicStyles = document.getElementById(
          `psuedo-cart`
        ) as HTMLStyleElement;
        dynamicStyles.textContent = prev?.reduce(
          (st, { catalog_object_id, quantity }) => {
            st += ` #${catalog_object_id}:before{
              content: '${quantity}';
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              border-radius: 99999px;
              left: 0;
              top: 0;
              font-size: 0.7rem;
              width: 1rem;
              height: 1rem;
              background: #154fd7;
              color: white;
              z-index: 3;
              font-family: Arial;
              font-weight: 400;
            }`;
            return st;
          },
          ''
        );

        return [...prev];
      });
    },
    [setOrder]
  );

  const disableBuy = useMemo(() => {
    if (order.length === 0) return true;
    const selected = order.find(({ quantity }) => parseInt(quantity, 10) > 0);
    return selected === undefined;
  }, [order]);

  return { order, onBuyNow, addProduct, disableBuy, loading };
};
