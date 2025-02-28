import { IProduct } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ICartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: ICartProduct[];
  city: string;
  shippingAddress: string;
}

const initialState: InitialState = {
  products: [],
  city: '',
  shippingAddress: '',
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
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
  },
});

// Product
export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    paymentMethod: 'Online',
  };
};

// Payment
export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const shippingCostSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === 'Dhaka' &&
    state.cart.products.length > 0
  ) {
    return 60;
  } else if (
    state.cart.city &&
    state.cart.city !== 'Dhaka' &&
    state.cart.products.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);

  return subTotal + shippingCost;
};

export const citySelector = (state: RootState) => {
  return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

export const {
  addToCart,
  incrementOrderQuantity,
  decrementOrderQuantity,
  cartToRemoveProduct,
  updateCity,
  updateShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
