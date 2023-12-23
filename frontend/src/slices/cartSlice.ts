import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const cartItem = localStorage.getItem("cart");
const initialState = cartItem
  ? JSON.parse(cartItem)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item: any) => item._id === newItem._id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((item: any) =>
          item._id === existingItem._id ? newItem : item
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      return updateCart(state);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item: any) => item._id !== id);
      return updateCart(state);
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions;
export default cartSlice.reducer;
