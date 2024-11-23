import React, { useEffect, useMemo, useState } from "react";
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
import { useCart } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";

function AddToCart({ open, close, product }) {
  const [selectedColor, setSelectedColor] = useState("Orange");
  const [selectedSize, setSelectedSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const [availableSizes, setAvailableSizes] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(product.price);
  // const [uniqueColors, setUniqueColors] = useState([]);
  // const [availableQty, setAvailableQty] = useState(0);
  const [selectedVariantImages, setSelectedVariantImages] = useState([]);
  const navigate = useNavigate();

  const { cartCount, updateCartCount, setBillingData } = useCart();

  const uniqueColors = useMemo(
    () => [...new Set(product.variants?.map((variant) => variant.color))],
    [product.variants]
  );

  // Set eken duplicate values remove krnawa
  // ... spread operator eken back to convert to array

  // Update available sizes and images when the selected color changes
  useEffect(() => {
    if (!selectedColor || !product.variants) return;

    const selectedVariants = product.variants.filter(
      (variant) => variant.color === selectedColor
    );
    setAvailableSizes(
      [...new Set(selectedVariants.map((variant) => variant.size))] || []
    );

    // Update images for the selected color
    const variantWithImages = selectedVariants.find(
      (variant) => variant.imageUrl && variant.imageUrl.length > 0
    );
    setSelectedVariantImages(variantWithImages?.imageUrl || []);
  }, [selectedColor, product.variants]);

  // Calculate available quantity and reset quantity when size changes
  const availableQty = useMemo(() => {
    const selectedVariant = product.variants?.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );
    return selectedVariant?.quantity || 0;
  }, [selectedColor, selectedSize, product.variants]);

  // Auto-select the first color and size when the dialog opens
  useEffect(() => {
    if (uniqueColors.length) {
      setSelectedColor(uniqueColors[0]);
    }
    if (availableSizes.length) {
      setSelectedSize(availableSizes[0]);
    }
  }, [uniqueColors, availableSizes]);


  // Calculate the total price directly
  const totalPrice = useMemo(
    () => product.price * quantity,
    [product.price, quantity]
  );

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
      billingId: null,
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

    const totalCount = existingCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    updateCartCount(totalCount);

    message.success("Product item successfully added to cart");
    close();
  };

  const handlePassAddToCart = () => {
    const orderData = {
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      products: [
        {
          productId: product.productId,
          productName: product.productName,
          color: selectedColor,
          size: selectedSize,
          quantity: quantity,
          totalPrice: totalPrice,
          coverPhotoUrl: product.coverPhotoUrl,
          billingId: null,
        },
      ],
    };

    // setAddToCartData({buyNowOrderData, close})
    setBillingData({ orderData, close });
    navigate("/billing");
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
                          borderRadius: '0 5px 0 5px'
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
                      borderRadius: '0 5px 0 5px'
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
                        borderRadius: '0 5px 0 5px'
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
                        backgroundColor: "#FF9800",
                        height: "30px",
                        marginRight: "10px",
                        cursor: "pointer",
                        borderRadius: '0 5px 0 5px'
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
                    <div
                      onClick={handleDecrement}
                      className="text-center"
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </div>
                    <div
                      style={{
                        width: "30px",
                        backgroundColor: "#FF9800",
                        height: "30px",
                        borderRadius: '10px',
                        textAlign: 'center'

                      }}
                    >
                      {quantity}
                    </div>
                    <div
                      onClick={handleIncrement}
                      className="text-center"
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <button
                    onClick={handlePassAddToCart}
                    className="mt-4 btn btn-primary w-100 me-3"
                    style={{borderRadius: '0 10px 0 10px',  backgroundColor: '#FF9800', fontWeight: 'bold'}}
                  >
                    <ShoppingOutlined/> Buy Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="mt-4 btn btn-primary w-100 "
                    style={{borderRadius: '0 10px 0 10px', backgroundColor: '#FF9800',  fontWeight: 'bold'}}
                  >
                    <ShoppingCartOutlined/> Add To Cart
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
