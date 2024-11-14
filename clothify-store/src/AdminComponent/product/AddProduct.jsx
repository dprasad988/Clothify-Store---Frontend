import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  ListItemText,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { AddProductApi } from "../../Api/product/addProductApi";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const sizes = ["S", "M", "L", "XL"];
const colors = ["Blue", "Red", "Orange", "Yellow", "Black", "Pink", "Green"];
const categoryNames = ["Men", "Women", "Teen", "Kids"];
const subCategoryNames = ["Jeans", "Blouse", "Shirt", "T-shirt"];
const brands = ["Moose", "Gucci"];

function AddProduct({ onSubmit, open, close }) {
  const queryClient = useQueryClient();
  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    pieces: "",
    status: "",
    isNewArrival: false,
    description: "",
    categoryName: [],
    subCategoryName: "",
    coverPhotoUrl: "",
    brand: "",
    variants: [],
  });

  const clear = () => {
    setProductData({
      productName: "",
      price: "",
      pieces: "",
      status: "",
      isNewArrival: false,
      description: "",
      categoryName: [],
      subCategoryName: "",
      coverPhotoUrl: "",
      brand: "",
      variants: [],
    });
    setCoverPhotoFile(null); 
    setSelectedFiles([]); 
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProductData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (Array.isArray(value)) {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name) => (event) => {
    const { value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Helper function to check if a duplicate variant exists
  const isDuplicateVariant = (size, color, indexToIgnore) => {
    return productData.variants.some(
      (variant, index) =>
        variant.size === size &&
        variant.color === color &&
        index !== indexToIgnore // Ignore the current variant to allow updating its own values
    );
  };

  // Function to handle changes for size, color, and quantity
  const handleVariantChange = (index, field) => (event) => {
    const updatedVariants = [...productData.variants];
    updatedVariants[index][field] = event.target.value;

    const { size, color } = updatedVariants[index];

    // Check for duplicates only if both size and color are selected
    if (size && color && isDuplicateVariant(size, color, index)) {
      // Remove duplicate automatically
      const newVariants = updatedVariants.filter(
        (variant, i) =>
          !(variant.size === size && variant.color === color && i !== index)
      );
      setProductData({ ...productData, variants: newVariants });
      message.error(
        "You can not add variant for same size and color as duplicate."
      );
    } else {
      // Update the state if there's no duplicate
      setProductData({ ...productData, variants: updatedVariants });
    }
  };

  const addVariant = () => {
    setProductData((prevData) => ({
      ...prevData,
      variants: [
        ...prevData.variants,
        { color: "", size: "", quantity: "", imageUrl: [] },
      ],
    }));
  };

  const deleteVariant = (index) => {
    const newVariants = productData.variants.filter((_, idx) => idx !== index);
    setProductData((prevData) => ({
      ...prevData,
      variants: newVariants,
    }));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ClothifyStore");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dvw0hnvbs/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const isColorAlreadyUploaded = (color) => {
    return productData.variants.some(
      (variant) =>
        variant.color === color && variant.images && variant.images.length > 0
    );
  };

  const handleImageUpload = (event, index) => {
    const files = Array.from(event.target.files);
    const updatedVariants = [...productData.variants];
    const selectedColor = updatedVariants[index].color;

    // Check if images already exist for this color
    if (isColorAlreadyUploaded(selectedColor)) {
      return;
    }

    // If no images are uploaded for this color, proceed with the upload
    updatedVariants[index].images = files;
    setProductData({ ...productData, variants: updatedVariants });
  };

  const handleCoverPhotoUpload = (e) => {
    setCoverPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    if (
      !productData.productName ||
      !productData.price ||
      !productData.pieces ||
      !productData.status
    ) {
      console.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);

    try {
      const coverPhotoUrl = coverPhotoFile
      ? await uploadImage(coverPhotoFile)
      : "";

    // Upload images for each variant
    const variantsWithImageUrls = await Promise.all(
      productData.variants.map(async (variant) => {
        if (variant.images && variant.images.length > 0) {
          // Upload each image and get URLs
          const imageUrls = await Promise.all(
            variant.images.map((file) => uploadImage(file))
          );
          return { ...variant, imageUrl: imageUrls }; // Update variant with image URLs
        }
        return variant;
      })
    );

      const newProductData = {
        ...productData,
        variants: variantsWithImageUrls,
        coverPhotoUrl: coverPhotoUrl,
      };

      const isAdded = await AddProductApi(newProductData);
      console.log("Product added successfully:", isAdded);

      if (isAdded) {
        message.success("Product added successfully");
        clear();
        queryClient.invalidateQueries(["products"]);
      } else if (!isAdded){
        message.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      message.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
        <DialogTitle variant="h5" align="center">
          Add New Product
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 500,
              margin: "auto",
            }}
          >
            {/* Cover Photo Upload */}
            <Button variant="outlined" component="label">
              Upload Cover Photo
              <input
                type="file"
                name="coverPhoto"
                accept="image/*"
                onChange={handleCoverPhotoUpload}
                hidden
              />
            </Button>
            {coverPhotoFile && (
              <Box mt={2}>
                <img
                  src={URL.createObjectURL(coverPhotoFile)}
                  alt="Cover Photo Preview"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              </Box>
            )}

            <TextField
              label="Product Name"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              required
            />

            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                label="Brand"
                required
              >
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    <ListItemText primary={brand} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              required
            />

            <TextField
              label="Pieces"
              name="pieces"
              type="number"
              value={productData.pieces}
              onChange={handleChange}
              required
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={productData.status}
                label="Status"
                onChange={handleChange}
                required
              >
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={productData.isNewArrival}
                  onChange={handleChange}
                  name="isNewArrival"
                />
              }
              label="New Arrival"
            />

            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              value={productData.description}
              onChange={handleChange}
            />

            {/* ////////////////////////////////////////////////////////////////// */}

            <Typography variant="h6">Product Variants</Typography>
            {productData.variants.map((variant, index) => (
              <Box key={index} mt={2}>
                {/* First Row: Size, Color, Quantity, and Delete Icon */}
                <Box display="flex" gap={2} mb={2}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Size</InputLabel>
                    <Select
                      value={variant.size}
                      onChange={handleVariantChange(index, "size")}
                      label="Size"
                    >
                      {sizes.map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl size="small" fullWidth>
                    <InputLabel>Color</InputLabel>
                    <Select
                      value={variant.color}
                      onChange={handleVariantChange(index, "color")}
                      label="Color"
                    >
                      {colors.map((color) => (
                        <MenuItem key={color} value={color}>
                          {color}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    size="small"
                    label="Quantity"
                    type="number"
                    value={variant.quantity}
                    onChange={handleVariantChange(index, "quantity")}
                  />

                  <IconButton
                    onClick={() => deleteVariant(index)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                {/* Second Row: Upload Images for Variant */}
                <Box mb={2}>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    disabled={isColorAlreadyUploaded(variant.color)}
                  >
                    Upload Images For Variant
                    <input
                      type="file"
                      name="images"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)} // Pass index for specific variant
                      hidden
                    />
                  </Button>
                </Box>

                {/* Third Row: Show Image Previews */}
                {variant.images && variant.images.length > 0 && (
                  <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
                    {variant.images.map((file, fileIndex) => (
                      <Box
                        key={fileIndex}
                        sx={{
                          width: { xs: 80, sm: 100 }, // Responsive width: smaller for mobile, larger for desktop
                          height: { xs: 80, sm: 100 }, // Ensure consistent height
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${fileIndex + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}

            <Button variant="contained" onClick={addVariant}>
              Add Variant
            </Button>

            <FormControl fullWidth>
              <InputLabel>Sub Category Name</InputLabel>
              <Select
                name="subCategoryName"
                value={productData.subCategoryName}
                onChange={handleChange}
                label="Sub Category Name"
                required
              >
                {subCategoryNames.map((subCategoryName) => (
                  <MenuItem key={subCategoryName} value={subCategoryName}>
                    <ListItemText primary={subCategoryName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category Name</InputLabel>
              <Select
                name="categoryName"
                multiple
                value={productData.categoryName}
                label="Category Name"
                onChange={handleSelectChange("categoryName")}
                renderValue={(selected) => selected.join(", ")}
              >
                {categoryNames.map((categoryName) => (
                  <MenuItem key={categoryName} value={categoryName}>
                    <Checkbox
                      checked={
                        productData.categoryName.indexOf(categoryName) > -1
                      }
                      className="me-3"
                    />
                    <ListItemText primary={categoryName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            endIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Adding Product" : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddProduct;
