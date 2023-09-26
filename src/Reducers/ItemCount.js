
import { createSlice } from "@reduxjs/toolkit";

const itemCountSlice = createSlice({
  name: "itemCount",
  initialState: {},
  reducers: {
    setItemCount: (state, action) => {
      const { itemId, count } = action.payload;
      state[itemId] = count;
    },
    incrementItemCount: (state, action) => {
      const { itemId } = action.payload;
      if (state[itemId]) {
        state[itemId]++;
      } else {
        state[itemId] = 1;
      }
    },
    decrementItemCount: (state, action) => {
      const { itemId } = action.payload;
      if (state[itemId] > 1) {
        state[itemId]--;
      } else {
        delete state[itemId];
      }
    },
  },
});

export const { setItemCount, incrementItemCount, decrementItemCount } =
  itemCountSlice.actions;

export default itemCountSlice.reducer;

