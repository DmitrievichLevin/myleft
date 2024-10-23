import { useCallback, useMemo } from 'react';
import { useAppState } from '../../context/appState';
import { PaymentModal } from './payment/payment';
import { MODAL_KEY } from '../../constants';

export const useModalActions = (key?: string) => {
  const [{ modal, modalData }, dispatch] = useAppState();
  const closeModal = useCallback(() => {
    dispatch({
      type: 'closeModal',
    });
  }, []);

  const openModal = useCallback(
    (data: any = undefined) => {
      if (!modal)
        dispatch({
          type: 'openModal',
          modal: key,
          modalData: data,
        });
    },
    [modal, key]
  );

  const open = useMemo(() => {
    return modal === key;
  }, [key, modal]);

  return { closeModal, openModal, open, modalData };
};

export const ModalFactory = () => {
  const [{ modal }] = useAppState();
  const modals: { [key: string]: any } = {
    [MODAL_KEY.PAYMENT_PORTAL]: PaymentModal,
  };

  const OpenModal = useMemo(() => {
    if (modal) {
      const Modal = modals[modal];
      return Modal;
    }
    return undefined;
  }, [modal]);

  return <>{OpenModal ? <OpenModal id={modal + '--modal'} /> : ''}</>;
};
