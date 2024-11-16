import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { message } from "antd";
import { handleBuyNow } from "../../Config/payherePayment";
import { useCart } from "../cart/CartContext";

function AddToCart({ open, close, product }) {
  const [selectedColor, setSelectedColor] = useState("Orange");
  const [selectedSize, setSelectedSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [availableQty, setAvailableQty] = useState(0);
  const [selectedVariantImages, setSelectedVariantImages] = useState([]);

  const { cartCount, updateCartCount, } = useCart();


  useEffect(() => {
    const colors = [
      ...new Set(product.variants.map((variant) => variant.color)),
    ];
    setUniqueColors(colors.filter((color) => color));
    if (colors.length > 0) {
      setSelectedColor(colors[0]); // Set the initial color to the first one
    }
  }, [product.variants]);

  useEffect(() => {
    const selectedVariants = product.variants.filter(
      (variant) => variant.color === selectedColor
    );
    const sizes = [...new Set(selectedVariants.map((variant) => variant.size))];
    setAvailableSizes(sizes);
    setSelectedSize(sizes.length > 0 ? sizes[0] : ""); // Set initial size based on selected color
    
    // Find the first variant with images for the selected color
    const variantWithImages = selectedVariants.find((variant) => variant.imageUrl && variant.imageUrl.length > 0);
    
    if (variantWithImages) {
      setSelectedVariantImages(variantWithImages.imageUrl);
    } else {
      setSelectedVariantImages([]); // Clear images if no variant matches the selected color
    }
  }, [selectedColor, product.variants]);

  // Update available quantity based on selected size
  useEffect(() => {
    const selectedVariant = product.variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );
    const qty = selectedVariant ? selectedVariant.quantity : 0;
    setAvailableQty(qty);
    setQuantity(1); // Reset quantity when changing color or size
  }, [selectedColor, selectedSize, product.variants]);

  useEffect(() => {
    setTotalPrice(product.price * quantity);
  }, [quantity, product.price]);

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
  };
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };
  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      return prevQuantity < availableQty ? prevQuantity + 1 : prevQuantity;
    });
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.productId,
      name: product.productName,
      brand: product.brand,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: product.price,
      availableQty: availableQty,
      coverPhotoUrl: product.coverPhotoUrl,
    };

    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!Array.isArray(existingCart)) existingCart = [];

    // Check if the item with same id, color, and size already exists in the cart
    const existingItemIndex = existingCart.findIndex(
      (item) =>
        item.id === cartItem.id &&
        item.color === cartItem.color &&
        item.size === cartItem.size
    );

    if (existingItemIndex !== -1) {
      // If item exists, update its quantity
      existingCart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      // If item doesn't exist, add it to the cart
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    const totalCount = existingCart.reduce((total, item) => total + item.quantity, 0);
    updateCartCount(totalCount);

    message.success("Product item successfully added to cart");
    close();
  };

  return (
    <div>
      <Dialog open={open} onClose={close} maxWidth="md" fullWidth>
        <DialogTitle className="text-center fs-4">Add To Cart</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={1}>
              {/* Left Side: Small Images */}
              <Grid size={{ xs: 4, sm: 2 }}>
                <Grid container direction="column" spacing={1}>
                  {selectedVariantImages.slice(0, 3).map((url, index) => (
                    <Grid item key={index} sx={{ height: "150px" }}>
                      <img
                        src={url}
                        alt="Product Variant"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* Right Side: Large Image */}
              <Grid size={{ xs: 8, sm: 4 }} sx={{ height: "465px" }}>
                {selectedVariantImages.length > 0 && (
                  <img
                    src={selectedVariantImages[0]}
                    alt="Product Variant"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Grid>

              {/* ///////////////////////////////////////////////////////////////////////////////////////// */}

              <Grid
                size={{ xs: 12, sm: 6 }}
                sx={{ height: "465px", paddingLeft: "10px" }}
              >
                <h4>{product.productName}</h4>
                <h6>{product.brand}</h6>
                <hr />
                <div className="d-flex">
                  <p style={{ fontWeight: "bold" }}>Color</p>
                  <p className="ms-3">{selectedColor}</p>
                </div>
                <div className="d-flex">
                  {uniqueColors.map((variant, index) => (
                    <div
                      key={index}
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: variant
                          ? variant.toLowerCase()
                          : "gray",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleColorChange(variant)}
                    ></div>
                  ))}
                </div>

                <div className="d-flex mt-3">
                  <p style={{ fontWeight: "bold" }}>Size</p>
                  <p className="ms-3">{selectedSize}</p>
                </div>
                <div className="d-flex">
                  {availableSizes.map((size, index) => (
                    <div
                      key={index}
                      className="text-center"
                      style={{
                        width: "30px",
                        backgroundColor: "lightblue",
                        height: "30px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>

                <div className="d-flex mt-3">
                  <p style={{ fontWeight: "bold" }}>Available Quantity</p>
                  <p className="ms-3">{availableQty}</p>
                </div>

                <div className="d-flex mt-1 align-items-center">
                  <p style={{ fontWeight: "bold" }}>Price</p>
                  <p className="ms-3 fs-5 text-danger">Rs. {totalPrice}.00</p>
                </div>
                <div className="d-flex mt-2">
                  <p style={{ fontWeight: "bold" }}>Quantity</p>
                  <div className="d-flex ms-3">
                    <button
                      onClick={handleDecrement}
                      className="text-center"
                      style={{
                        width: "30px",
                        backgroundColor: "lightblue",
                        height: "30px",
                      }}
                    >
                      -
                    </button>
                    <div
                      className="text-center"
                      style={{
                        width: "30px",
                        backgroundColor: "lightblue",
                        height: "30px",
                      }}
                    >
                      {quantity}
                    </div>
                    <button
                      onClick={handleIncrement}
                      className="text-center"
                      style={{
                        width: "30px",
                        backgroundColor: "lightblue",
                        height: "30px",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="d-flex">
                <button
                    onClick={() => handleBuyNow(product, selectedColor, selectedSize, quantity, totalPrice, close)}
                    className="mt-4 btn btn-primary w-100 me-3"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="mt-4 btn btn-primary w-100 "
                  >
                    Add To Cart
                  </button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddToCart;
