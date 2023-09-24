import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./ProductAction";

import { addItemToCart } from "./CartAction";


import { closeCart } from "./openReducer";


import { removeItemFromCart } from "./CartAction";


import { incrementCartCount, decrementCartCount } from "./CartCount";

import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductList = () => {
  const products = useSelector((state) => state.products.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const searchQuery = useSelector((state) => state.search.searchQuery);

  const openSlider = useSelector((state) => state.openSlider);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    setCartItems([...cartItems, product]);

    dispatch(incrementCartCount());
  };
  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId)); // Dispatch the action with the product ID
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    dispatch(decrementCartCount());
  };
  const cartCount = useSelector((state) => state.cartCount);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!Array.isArray(products)) {
    return <div>Loading...</div>;
  }


  const filteredProducts = products.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || categoryMatch;
  })

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("filteredProducts:", filteredProducts);
  console.log("searchQuery:", searchQuery);

  return (
    <div>
      <div className="container">
        <Grid container spacing={2} alignItems="stretch">
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  className="product_image"
                  sx={{ height: 140 }}
                  image={product.thumbnail}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography
                    style={{ fontSize: "16px", fontWeight: "600" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Price: ${product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    Category: {product.category}
                  </Typography>
                </CardContent>
                <CardActions style={{ padding: "14px" }}>
                  <Button
                    style={{ color: "#fff", background: "black" }}
                    size="small"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Drawer
        sx={{ padding: "1rem" }}
        anchor="right"
        open={openSlider}
        onClose={() => dispatch(closeCart())}
      >
        <div>
          <Typography variant="h6">Shopping Cart</Typography>
          {cartItems.map((item) => (
            <div key={item.id}>
              {item.title} - ${item.price}
              <DeleteIcon
                onClick={() => handleRemoveFromCart(item.id)} 
                style={{ cursor: "pointer", marginLeft: "1rem" }}
              />
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default ProductList;
