
export const addItemToCart = (product) => {
  return {
    type: "ADD_ITEM_TO_CART",
    payload: product, 
  };
};

export const removeItemFromCart = (productId) => {
  return {
    type: "REMOVE_ITEM_FROM_CART",
    payload: productId, 
  };
};
