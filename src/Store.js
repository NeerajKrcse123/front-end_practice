
import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from "../src/Components/ProductReducer";
import SearchReducer from '..//src/Components/SearchReducer';
import cartCountReducer from '../src/Components/CartCount'; 
import openReducer from '../src/Components/openReducer'; 

const store = configureStore({
  reducer: {
    products: ProductReducer,
    search: SearchReducer,
    cartCount: cartCountReducer,
    openSlider: openReducer,
    
  },
});

export default store;
