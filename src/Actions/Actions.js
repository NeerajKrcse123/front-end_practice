import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsApi } from '../Url/api'; // Adjust the path as needed
import axios from 'axios';
// ActionTypes.js (assuming you have a separate file for action types)
export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCTS_BY_PAGE = "FETCH_PRODUCTS_BY_PAGE";
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const CLEAR_SELECTED_CATEGORY = 'CLEAR_SELECTED_CATEGORY';

const apiError = (error) => ({
  type: 'API_ERROR',
  payload: error,
});


// Action creators
export const addItemToCart = (product) => ({
  type: ADD_ITEM_TO_CART,
  payload: product,
});

export const removeItemFromCart = (productId) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: productId,
});

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setTotalPages = (totalPages) => ({
  type: SET_TOTAL_PAGES,
  payload: totalPages,
});
export const setSelectedCategory = (category) => ({
  type: SET_SELECTED_CATEGORY,
  payload: category,
});

export const clearSelectedCategory = () => ({
  type: CLEAR_SELECTED_CATEGORY,
});

// Async action using createAsyncThunk for fetching products
export const fetchProducts = createAsyncThunk(FETCH_PRODUCTS, async () => {
  try {
    const response = await axios.get(ProductsApi);
    // console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    // dispatch(apiError(error.message));
    throw error;
  }
});
export const fetchProductsByPage = createAsyncThunk(
  FETCH_PRODUCTS,
  async ({ currentPage, itemsPerPage }) => {
    try {
      const skip = (currentPage - 1) * itemsPerPage;
      const response = await axios.get(
        `${ProductsApi}?limit=${itemsPerPage}&skip=${skip}`
        
      );
     
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
);

