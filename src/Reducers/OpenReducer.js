import { createSlice } from "@reduxjs/toolkit";

const openSlider = createSlice({
  name: "openSlider",
  initialState: false,
  reducers: {
    openCart: () => true,
    closeCart: () => false,
  },
});

export const { closeCart, openCart } = openSlider.actions;
export default openSlider.reducer;
