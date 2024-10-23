import { Page } from '../container/pageCn';
import Image from '../../components/Image/image';

import trumpForce from '../../res/Icons/trumpForce.svg';
import americanPecans from '../../res/Icons/apecans.svg';
import freeShipping from '../../res/Icons/freeShipping.svg';
import barcode from '../../res/Icons/barcodeIcon.svg';
import inStock from '../../res/Icons/inStock.svg';
import './homepage.css';
import '../../components/Form/form.css';
import { ImageSelector } from '../../components/Image/selector/imageSelector';
import { useCallback, useMemo, useState } from 'react';
import FerrisSelect from '../../components/Input/FerrisSelect/ferrisSelect';
import { ImageLink } from '../../components/Image/ImageLink/imageLink';
import { IconTitle } from '../../components/Headers/IconTitle/iconTitle';
import { IconButton } from '../../components/Buttons/iconButton';
import { AmountInput } from '../../components/Input/Amount/amountInput';
import { IProduct, MODAL_KEY, PRODUCTS } from '../../constants';
import { useModalActions } from '../../components/Modals/modalFactory';
import { useAppState } from '../../context/appState';
import { usePayment } from './hooks/usePayment';

export const Homepage = () => {
  const [flavor, setFlavor] = useState(0);
  const [accessway, setAccessway] = useState('enter');

  const { order, addProduct, onBuyNow, disableBuy, loading } = usePayment();

  const imgCN = useMemo(() => {
    return `product-preview multi-form-${accessway}`;
  }, [accessway]);

  const onChange = useCallback(
    (v: number) => {
      setAccessway('exit');
      const timeout = setTimeout(() => {
        setFlavor(v);
        setAccessway('enter');
        clearTimeout(timeout);
      }, 500);
    },
    [setAccessway, setFlavor]
  );

  const amount = useMemo(
    () =>
      order.find(
        ({ catalog_object_id }) =>
          catalog_object_id === PRODUCTS[flavor].catalog_object_id
      )?.quantity,
    [order, flavor]
  );

  const onChangeAmount = useCallback(
    (val: string) => addProduct(val, PRODUCTS[flavor]),
    [flavor, addProduct]
  );

  return (
    <Page contentClassName="main-pg">
      <div className="product-info">
        <p className="product-title">
          <span className="product-actions-info limited-tag">
            Limited Edition
          </span>
          <span className="product-brand">My Left Nuts®</span>
          {PRODUCTS[flavor].name}{' '}
        </p>
        <p className="product-desc">{PRODUCTS[flavor].desc}</p>

        <p className="text-white made-in">
          <span>100% MADE IN THE USA. NOT CHINA.</span>
        </p>

        <div
          className="external-links-container"
          aria-label="external-links-container"
        >
          <ImageLink
            src={trumpForce}
            alt="join-trump-force"
            href="https://trumpforce47.com/"
            title="Join Tump Force 47"
          />
          <ImageLink
            src={americanPecans}
            alt="american-pecan-council"
            href="https://americanpecan.com/"
            title="Produced by passionate growers and shellers apart of The American Pecan Council."
          />
        </div>
        <div className="product-actions">
          <IconTitle
            icon={freeShipping}
            alt="free-shipping-reqs"
            title="Free shipping on orders over $100"
            className="product-actions-info pl-[0.5rem]"
          />
        </div>
      </div>
      <div className="product-col">
        <Image
          src={PRODUCTS[flavor].src}
          alt={PRODUCTS[flavor].alt}
          className={imgCN}
        >
          <IconTitle
            icon={inStock}
            alt="remaining-stock"
            className="product-actions-info product-stock"
            pulse
          >
            <span>
              {PRODUCTS[flavor].stock} Left / 🔥 {200 - PRODUCTS[flavor].stock}{' '}
              Sold
            </span>
          </IconTitle>
        </Image>
        {/* <ImageSelector
          value={flavor}
          imgs={PRODUCTS}
          onChange={onChange}
          className="product-col-img-select"
        /> */}
      </div>
      <div className="flex flex-col w-full h-full">
        <FerrisSelect opts={PRODUCTS} onChange={onChange} name="flavor" />

        <div className="buy-now-cn">
          <AmountInput
            max={PRODUCTS[flavor].stock}
            value={amount}
            onChange={onChangeAmount}
          />
          <IconButton
            icon={barcode}
            text="Buy Now"
            className="font-Arial buy-now"
            disabled={disableBuy}
            onClick={onBuyNow}
          />
        </div>
      </div>
    </Page>
  );
};
