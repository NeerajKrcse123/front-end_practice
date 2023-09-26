import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { fetchProducts } from "../Actions/Actions";
import { addItemToCart } from "../Actions/Actions";
import { closeCart } from "../Reducers/OpenReducer";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { removeItemFromCart} from "../Actions/Actions";
import { setSelectedCategory, clearSelectedCategory } from "../Actions/Actions";
import {
  incrementCartCount,
  decrementCartCount,
} from "../Reducers/CartCountReducer";
import { incrementItemCount, decrementItemCount } from "../Reducers/ItemCount";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";

const ProductList = () => {
  const products = useSelector((state) => state.products.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const itemCount = useSelector((state) => state.itemCount);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const openSlider = useSelector((state) => state.openSlider);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );

  const [itemCounts, setItemCounts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setItemCounts((prevItemCounts) => ({
        ...prevItemCounts,
        [product.id]: (prevItemCounts[product.id] || 0) + 1,
      }));
    } else {
      dispatch(addItemToCart(product));
      setCartItems([...cartItems, product]);
      setItemCounts((prevItemCounts) => ({
        ...prevItemCounts,
        [product.id]: 1,
      }));
      dispatch(incrementCartCount());
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    setItemCounts((prevItemCounts) => {
      const updatedCounts = { ...prevItemCounts };
      delete updatedCounts[productId];
      return updatedCounts;
    });
    dispatch(decrementCartCount());
  };

  const cartCount = useSelector((state) => state.cartCount);
  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      const itemCount = itemCounts[item.id] || 0;
      total += item.price * itemCount;
    }
    return total;
  };

  useEffect(() => {
    const newTotalPrice = calculateTotalPrice();
    setTotalPrice(newTotalPrice);
  }, [cartItems, itemCounts]);

  const itemIncrease = (itemId) => {
    dispatch(incrementItemCount(itemId));
    setItemCounts((prevItemCounts) => ({
      ...prevItemCounts,
      [itemId]: (prevItemCounts[itemId] || 0) + 1,
    }));
  };

  const itemDecrease = (itemId) => {
    dispatch(decrementItemCount(itemId));
    if (itemCounts[itemId] > 0) {
      setItemCounts((prevItemCounts) => ({
        ...prevItemCounts,
        [itemId]: prevItemCounts[itemId] - 1,
      }));
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!Array.isArray(products)) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "3rem",
        }}
      >
        <CircularProgress/>
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const titleMatch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch =
      !selectedCategory || product.category === selectedCategory;

    return titleMatch && categoryMatch;
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="container">
        {filteredProducts.length === 0 ? (
          <Typography variant="h6">No result found</Typography>
        ) : (
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
        )}
      </div>

      <Drawer
        sx={{ padding: "1rem" }}
        anchor="right"
        open={openSlider}
        onClose={() => dispatch(closeCart())}
      >
        <div   className ="cartcard">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Shopping Cart</Typography>
            <IconButton
              onClick={() => dispatch(closeCart())}
              style={{ color: "black" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {cartItems.map((item) => (
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                marginBottom: "10px",
              }}
              key={item.id}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <CardMedia
                  sx={{ height: 80, width: 80 }}
                  image={item.thumbnail}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    style={{ fontSize: "10px", fontWeight: "600" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Price: ${item.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ fontSize: "10px", fontWeight: "600" }}
                  >
                    Category: {item.category}
                  </Typography>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      {" "}
                      <RemoveIcon onClick={() => itemDecrease(item.id)} />
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      {itemCounts[item.id] || 0}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      <AddIcon onClick={() => itemIncrease(item.id)} />
                    </Typography>
                  </div>
                </CardContent>
              </div>
              <CardActions
                style={{
                  background: "black",
                  cursor: "pointer",
                  justifyContent: "center",
                  padding: "4px",
                }}
                onClick={() => handleRemoveFromCart(item.id)}
              >
                <Button
                  style={{
                    color: "#fff",
                    background: "black",
                    fontSize: "10px",
                  }}
                  size="small"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
          <div>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ProductList;
