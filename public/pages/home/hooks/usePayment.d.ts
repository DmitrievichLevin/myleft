import { IProduct } from '../../../constants';
export declare const usePayment: (props?: {
    order?: any[];
}) => {
    order: {
        catalog_object_id: string;
        quantity: string;
        price: number;
    }[];
    onBuyNow: () => Promise<void>;
    addProduct: (amount: string, product: IProduct) => void;
    disableBuy: boolean;
    loading: boolean;
};
