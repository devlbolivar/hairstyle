export const addDecimals = (num: number): number => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state: any) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    )
  );

  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  state.taxPrice = addDecimals(state.itemsPrice * 0.15);
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );

  localStorage.setItem("cart", JSON.stringify(state));
};
