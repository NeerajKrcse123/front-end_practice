// reducers.js

import { createReducer } from '@reduxjs/toolkit';
import { SET_SELECTED_CATEGORY, CLEAR_SELECTED_CATEGORY } from '../Actions/Actions';

const initialState = {
  selectedCategory: null,
};

 const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_SELECTED_CATEGORY, (state, action) => {
      state.selectedCategory = action.payload;
    })
    .addCase(CLEAR_SELECTED_CATEGORY, (state) => {
      state.selectedCategory = null;
    });
});
export default categoryReducer;