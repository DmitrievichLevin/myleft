import { ApplePay, CashAppPay, GooglePay } from 'react-square-web-payments-sdk';
import cardIcon from '../../../res/Icons/cardIconWhite.svg';
import './selectPaymentMethod.css';

export const SelectPaymentMethod = () => {
  return (
    <div className="pay-select-cn">
      <h2>Select Payment Method</h2>
      <button className="pay-select-cd-opt-btn" type="submit">
        <img src={cardIcon} alt="credit-debt-icon" />
        Credit / Debit Card
      </button>
      <div className="pay-select-hr">
        <hr />
        <span>OR</span>
        <hr />
      </div>
      <ApplePay />
      <GooglePay />
      <CashAppPay shape="semiround" size="medium" width="full" />
    </div>
  );
};
