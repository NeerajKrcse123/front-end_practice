import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../Actions/Actions";
import { setSelectedCategory, clearSelectedCategory } from "../Actions/Actions";
import { openCart, closeCart } from "../Reducers/OpenReducer";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify"
import debounce from "lodash.debounce";;
const Header = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const cartCount = useSelector((state) => state.cartCount);

  const openSlider = useSelector((state) => state.openSlider);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  const debouncedHandleOpenCart = debounce(() => {
    if (cartCount === 0) {
     
      toast.warn("No items in the cart. Add items to your cart to view them.");
    } else {
      dispatch(openCart());
    }
  }, 1000); 
  const handleOpenCart = () => {
    debouncedHandleOpenCart();
  };
  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ];
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );

  const handleCategoryClick = (category) => {
    if (category === "All") {
      dispatch(clearSelectedCategory());
    } else {
      dispatch(setSelectedCategory(category));
    }
  };

  useEffect(() => {
    if (cartCount === 0 && openSlider) {
      dispatch(closeCart());
    }
  }, [cartCount, openSlider, dispatch]);

  return (
    <div style={{width:"100%"}}>
    <div
      className="container"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <Box sx={{ maxWidth: "100%" }}>
          <TextField
            fullWidth
            label="Search Product"
            id="fullWidth"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
       </div>
       <div onClick={handleOpenCart}>
        <Badge
          style={{ cursor: "pointer" }}
          badgeContent={cartCount}
          color="primary"
          onClick={handleOpenCart}
        >
          <ShoppingCartIcon />
        </Badge>
      </div>
      </div>

        <div
          className="category-buttons"
          // style={{
          //   display: "flex",
          //   gap: "1rem",
          //   marginTop: "1rem",
        
          //   overflowX: "scroll", // Enable horizontal scrolling
          //   width: "100%", // Fixed container width
          //   whiteSpace: "nowrap", // Prevent line breaks
          //   // overflow: "hidden", // Hide overflowing content
          // }}
        >
          {categories.map((category) => (
            <button
              id="filter-btn"
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
          <button onClick={() => handleCategoryClick("All")} id="filter-btn">
            Clear Category
          </button>
        </div>
       </div>

      /* <div onClick={handleOpenCart}>
        <Badge
          style={{ cursor: "pointer" }}
          badgeContent={cartCount}
          color="primary"
          onClick={handleOpenCart}
        >
          <ShoppingCartIcon />
        </Badge>
      </div> */
    // </div>
  
  );
};

export default Header;
