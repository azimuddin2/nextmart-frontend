import { IProduct } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ICartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: ICartProduct[];
}

const initialState: InitialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id,
      );

      if (existingProduct) {
        existingProduct.orderQuantity += 1;
      } else {
        state.products.push({ ...action.payload, orderQuantity: 1 });
      }
    },
  },
});

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
