import { createSlice } from "@reduxjs/toolkit";

const CartCount = createSlice({
  name: "cartCount",
  initialState: 0,
  reducers: {
    incrementCartCount: (state) => state + 1,
    decrementCartCount: (state) => state - 1,
  },
});

export const { incrementCartCount, decrementCartCount } = CartCount.actions;
export default CartCount.reducer;
