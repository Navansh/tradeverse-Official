// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
}

const getInitialCartItems = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }
  return [];
};

const initialState: CartState = {
  items: getInitialCartItems(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    updateQuantity: (state, action: PayloadAction<{ itemId: number; quantity: number }>) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity = quantity;
        if (typeof window !== 'undefined') {
          localStorage.setItem('cartItems', JSON.stringify(state.items));
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cartItems');
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;