import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {}; 

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart: (state, action) => {
      const { itemId } = action.payload;
      if (state[itemId]) {
      
        state[itemId]++;
      } else {
        state[itemId] = 1;
      }
    },
    removeItemFromCart: (state, action) => {
      const { itemId } = action.payload;
      if (state[itemId] > 1) {
        state[itemId]--;
      } else {
        delete state[itemId];
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
