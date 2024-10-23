import './payment.css';
import { Modal } from '../modal';
import { useModalActions } from '../modalFactory';
import { COMPLETE_ORDER, MODAL_KEY } from '../../../constants';
import { MultiForm, MultiFormPage } from '../../Form/multipageForm';
import { SubmitProp } from '../../Form/useFormData';
import { PaymentForm } from 'react-square-web-payments-sdk';
import { useCallback, useState } from 'react';
import { ErrorNotification } from '../../toast/toastMessages';
import { useNavigate } from 'react-router-dom';
import cntl from 'cntl';

export const checkoutFields: MultiFormPage[] = [
  /**
   * @todo - Validate Phone w/ text + Add big phone design
   * [+1] [000] [000] [0000]
   */
  {
    fields: [
      {
        type: 'phone',
        id: 'user-phone',
        name: 'phone',
        label: 'Phone',
        required: true,
      },
    ],
  },
  {
    fields: [
      {
        type: 'selectPayment',
        id: 'method',
        name: 'paymentMethod',
        label: 'Payment Method',
        required: true,
      },
    ],
  },
  {
    fields: [
      {
        type: 'shipping',
        id: 'shipping-info',
        name: 'shipping',
        label: 'shipping',
        required: true,
      },
    ],
  },
  {
    fields: [
      {
        type: 'checkout',
        id: 'complete-checkout',
        name: 'checkout',
        label: 'checkout',
        required: true,
      },
    ],
  },
];

// {
//     "payment": {
//         "card_details": {
//             "avs_status": "AVS_ACCEPTED",
//             "auth_result_code": "949184",
//             "entry_method": "KEYED",
//             "cvv_status": "CVV_ACCEPTED",
//             "card_payment_timeline": {
//                 "captured_at": "2024-10-19T09:51:53.593Z",
//                 "authorized_at": "2024-10-19T09:51:53.057Z"
//             },
//             "card": {
//                 "last_4": "3218",
//                 "payment_account_reference": "V0010014621307598855402391382",
//                 "bin": "440393",
//                 "card_brand": "VISA",
//                 "fingerprint": "sq-1-WIqHDmqSr44jhCzadtWaxlVxJEL_lPfdaPNgDpcWiNhYuC3rWN1hUIfhM_9Yf7giDQ",
//                 "exp_month": 7,
//                 "prepaid_type": "PREPAID",
//                 "exp_year": 2027,
//                 "card_type": "DEBIT"
//             },
//             "status": "CAPTURED",
//             "statement_description": "SQ *MY LEFT NUTS? GOSQ.C"
//         },
//         "buyer_email_address": "jhowar39@emich.edu",
//         "delay_action": "CANCEL",
//         "created_at": "2024-10-19T09:51:52.116Z",
//         "application_details": {
//             "square_product": "ECOMMERCE_API",
//             "application_id": "sq0idp-y-_u0g63-2oWr6GlRWIz0g"
//         },
//         "amount_money": {
//             "amount": 1,
//             "currency": "USD"
//         },
//         "source_type": "CARD",
//         "location_id": "LTQWW02K3H9RZ",
//         "delayed_until": "2024-10-26T09:51:52.116Z",
//         "receipt_number": "ZYUF",
//         "receipt_url": "https://squareup.com/receipt/preview/ZYUFvgyxu1EpEJuOLhuDUoxsfhQZY",
//         "updated_at": "2024-10-19T09:51:53.593Z",
//         "version_token": "qgQQKbq5ENMcJZlSM28ONsq8cBJ2udAkJUtM5Oqpid65o",
//         "id": "ZYUFvgyxu1EpEJuOLhuDUoxsfhQZY",
//         "shipping_address": {
//             "country": "US",
//             "address_line_1": "1040 Huff NW Rd #3211",
//             "locality": "Atlanta",
//             "last_name": "Howard",
//             "address_line_2": "",
//             "administrative_district_level_1": "GA",
//             "postal_code": "30318",
//             "first_name": "Jalin"
//         },
//         "total_money": {
//             "amount": 1,
//             "currency": "USD"
//         },
//         "delay_duration": "PT168H",
//         "order_id": "Z4o4ZM60gsieLcCa29yQM5W5b0PZY",
//         "approved_money": {
//             "amount": 1,
//             "currency": "USD"
//         },
//         "status": "COMPLETED",
//         "risk_evaluation": {
//             "risk_level": "NORMAL",
//             "created_at": "2024-10-19T09:51:53.492Z"
//         }
//     }
// }

const modalCN = (loading: boolean) => cntl`
payment-modal-cn
${loading ? 'cs-loader-center' : ''}
`;
export const PaymentModal = () => {
  const { closeModal, modalData } = useModalActions(MODAL_KEY.PAYMENT_PORTAL);
  const [formData, setFormData] = useState(modalData);

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const completePayment = useCallback(
    async (token: any) => {
      setLoading(true);
      if (!token.token) {
        ErrorNotification('Unable to process payment');
        setLoading(false);
        return;
      }
      const res = await fetch(
        'https://asiikkfd4b5nepqgoah7ukpfwy0xzcyo.lambda-url.us-west-1.on.aws/order',
        {
          body: JSON.stringify({ ...formData, source_id: token.token }),
          method: 'POST',
        }
      )
        .then((r) => r.json())
        .then((r) => {
          if (r?.payment?.errors) {
            ErrorNotification('Payment failed');
          } else {
            closeModal();
            navigate(COMPLETE_ORDER);
          }
          setLoading(false);
        })
        .catch(() => {
          ErrorNotification('Unable to process payment');
          setLoading(false);
        });
    },
    [formData]
  );
  return (
    <Modal
      className={modalCN(loading)}
      modalKey={MODAL_KEY.PAYMENT_PORTAL}
      title="Checkout"
    >
      <PaymentForm
        applicationId="sq0idp-y-_u0g63-2oWr6GlRWIz0g"
        locationId="LTQWW02K3H9RZ"
        cardTokenizeResponseReceived={completePayment}
        createPaymentRequest={() => formData as any}
      >
        <MultiForm
          pages={checkoutFields}
          submit={{} as SubmitProp}
          formClassName="payment-form-pg"
          className="payment-form-cn"
          atnsClassName="payment-form-atns"
          formData={formData as any}
          setFormData={setFormData}
        />
        {/* <CreditCard /> */}
      </PaymentForm>
    </Modal>
  );
};
