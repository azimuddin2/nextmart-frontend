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
        return;
      } else {
        state.products.push({ ...action.payload, orderQuantity: 1 });
      }
    },
    incrementOrderQuantity: (state, action: PayloadAction<string>) => {
      const productToIncrement = state.products.find(
        (product) => product._id === action.payload,
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action: PayloadAction<string>) => {
      const productToDecrement = state.products.find(
        (product) => product._id === action.payload,
      );

      if (productToDecrement && productToDecrement.orderQuantity > 1) {
        productToDecrement.orderQuantity -= 1;
        return;
      }
    },
    cartToRemoveProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload,
      );
    },
  },
});

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const {
  addToCart,
  incrementOrderQuantity,
  decrementOrderQuantity,
  cartToRemoveProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
