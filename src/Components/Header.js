
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "./SearchAction";


import { openCart, closeCart } from "./openReducer";



import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Header = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const cartCount = useSelector((state) => state.cartCount);

  const openSlider = useSelector((state) => state.openSlider);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleOpenCart = () => {
    dispatch(openCart());
  };
  useEffect(() => {
    if (cartCount === 0 && openSlider) {
      dispatch(closeCart());
    }
  }, [cartCount, openSlider, dispatch]);

  return (
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
  );
};

export default Header;
