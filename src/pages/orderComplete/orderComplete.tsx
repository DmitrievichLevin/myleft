import { Page } from '../container/pageCn';
import checked from '../../res/Icons/circledCheckmark.svg';

export const OrderComplete = () => {
  return (
    <Page
      className="w-full h-full"
      contentClassName="flex flex-col w-full h-full justify-center items-center !text-white"
    >
      <h1 className="mb-0">🇺🇸 Order Complete 🇺🇸</h1>
      <p className="test-white text-lg">
        You should recieve an order confirmation email shortly.
      </p>
      <img className="w-10 h-10" alt="order complete check" src={checked} />
    </Page>
  );
};
