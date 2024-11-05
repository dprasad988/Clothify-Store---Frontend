import React, { useState } from 'react';
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
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import { AddProductApi } from '../../Api/product/addProductApi';
import { message } from 'antd';

const sizes = ['S', 'M', 'L', 'XL'];
const colors = ['Blue', 'Red', 'Orange', 'Yellow'];
const categoryNames = ['Men', 'Women', 'Teen', 'Kids'];
const subCategoryNames = ['Jeans', 'Blouse', 'Shirt', 'T-shirt'];

function AddProduct({ onSubmit }) {
  const [productData, setProductData] = useState({
    productName: '',
    price: '',
    pieces: '',
    status: '',
    isNewArrival: false,
    description: '',
    size: [], 
    color: [], 
    categoryName: [],
    subCategoryName: '',
    imageUrl: [] 
  });

  const clear = () => {
    setProductData({
        productName: '',
        price: '',
        pieces: '',
        status: '',
        isNewArrival: false,
        description: '',
        size: [], 
        color: [], 
        categoryName: [],
        subCategoryName: '',
        imageUrl: [] 
    })
  }

  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [loading , setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ClothifyStore'); 
  
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  
    if (!productData.productName || !productData.price || !productData.pieces || !productData.status) {
      console.error("Please fill in all required fields.");
      return; 
    }
    setLoading(true)
  
    try {
      const imageUrls = await Promise.all(selectedFiles.map(file => uploadImage(file)));
      console.log("Uploaded image URLs:", imageUrls); 
  
      const newProductData = {
        ...productData,
        imageUrl: imageUrls, 
      };
  
      const response = await AddProductApi(newProductData);
      console.log("Product added successfully:", response);
      if (onSubmit) {
        onSubmit(response);
      }
      message.success('Product added successfully')
      clear();
    } catch (error) {
      console.error("Failed to add product:", error);
      message.error('Failed to add product. Please try again.');
    } finally{
        setLoading(false)
    }
  };
  

  return (
    <div>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 500,
        margin: 'auto',
      }}
    >
      <Typography variant="h5" align="center">Add New Product</Typography>

      <Button
        variant="outlined"
        component="label"
      >
        Upload Images
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          hidden
        />
      </Button>

      {selectedFiles.length > 0 && ( 
        <Box mt={2}>
          <Box display="flex" gap={1} flexWrap="wrap">
            {Array.from(selectedFiles).map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)} 
                alt={`Preview ${index + 1}`}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
              />
            ))}
          </Box>
        </Box>
      )}

      <TextField
        label="Product Name"
        name="productName"
        value={productData.productName}
        onChange={handleChange}
        required
      />

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
          <MenuItem value="Available">Available</MenuItem>
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

      <FormControl fullWidth>
        <InputLabel>Size</InputLabel>
        <Select
          name="size"
          multiple
          label="Size"
          value={productData.size}
          onChange={handleSelectChange('size')}
          renderValue={(selected) => selected.join(', ')} 
        >
          {sizes.map((size) => (
            <MenuItem key={size} value={size}>
              <Checkbox checked={productData.size.indexOf(size) > -1} className='me-3'/>
              <ListItemText primary={size} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Color</InputLabel>
        <Select
          label="Color"
          name="color"
          multiple
          value={productData.color}
          onChange={handleSelectChange('color')}
          renderValue={(selected) => selected.join(', ')} 
        >
          {colors.map((color) => (
            <MenuItem key={color} value={color}>
              <Checkbox checked={productData.color.indexOf(color) > -1} className='me-3'/>
              <ListItemText primary={color} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
          onChange={handleSelectChange('categoryName')}
          renderValue={(selected) => selected.join(', ')}
        >
          {categoryNames.map((categoryName) => (
            <MenuItem key={categoryName} value={categoryName}>
              <Checkbox checked={productData.categoryName.indexOf(categoryName) > -1} className='me-3'/>
              <ListItemText primary={categoryName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button 
        variant="contained" 
        type="submit" 
        disabled={loading}
        endIcon={loading ? <CircularProgress size={20}/> : null} 
      >
        {loading ? 'Adding Product' : 'Add Product'}
      </Button>
    </Box>
    </div>
  );
}

export default AddProduct;
