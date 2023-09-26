
import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Reducers/ProductReducer";
import SearchReducer from "./Reducers/SearchReducer";
import cartCountReducer from "./Reducers/CartCountReducer";
import itemCountReducer from "./Reducers/ItemCount"; 
import openReducer from "./Reducers/OpenReducer";
import categoryReducer from "./Reducers/CatgoryReducer";
const store = configureStore({
  reducer: {
    products: ProductReducer,
    search: SearchReducer,
    cartCount: cartCountReducer,
    itemCount: itemCountReducer, 
    openSlider: openReducer,
    category: categoryReducer,
    itemCounts: itemCountReducer, 
  },
});

export default store;

