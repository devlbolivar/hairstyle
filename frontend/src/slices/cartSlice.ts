import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
import { CartItem, ShippingAddress } from "../types";

const cartItem = localStorage.getItem("cart");
const initialState = cartItem
  ? JSON.parse(cartItem)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState as {
    cartItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((item: CartItem) =>
          item._id === existingItem._id ? newItem : item
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      return updateCart(state);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(
        (item: CartItem) => item._id !== id
      );
      return updateCart(state);
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems(state) {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
