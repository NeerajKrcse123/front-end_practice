
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsApi } from "../Url/api";
import axios from 'axios';


export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
    try {
      const response = await axios.get(ProductsApi);
      console.log("API Response:", response.data); 
      return response.data;
    } catch (error) {
      console.error("API Error:", error); 
      throw error;
    }
  });
