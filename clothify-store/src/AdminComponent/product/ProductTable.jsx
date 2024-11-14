import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import productsData from "./productsData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { useGetProducts } from "../../Api/product/getProductApi";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { DeleteProductApi } from "../../Api/product/deleteProductApi";

function ProductTable() {
  const [products, setProducts] = useState(productsData);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // for edit
  const [productToDelete, setProductToDelete] = useState(null);
  const { data, isLoading, isError } = useGetProducts();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleOpenAddProductModal = () => {
    setOpenAddProduct(true);
  };
  const handleCloseAddProductModal = () => {
    setOpenAddProduct(false);
  };

  const handleOpenEditProductModal = (product) => {
    setSelectedProduct(product);
    setOpenEditProduct(true);
  };
  const handleCloseEditProductModal = () => {
    setSelectedProduct(null);
    setOpenEditProduct(false);
  };

  const handleOpenDeleteDialog = (product) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setProductToDelete(null);
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
        const isDeleted = await DeleteProductApi(productToDelete.productId);
        if (isDeleted) {
            queryClient.invalidateQueries(['products']); 
            message.success("Deleted successfully");
            console.log(`Product with ID ${productToDelete.productId} deleted successfully.`);
        } else {
            console.error(`Failed to delete product with ID ${productToDelete.productId}`);
            message.error("Failed to delete product.");
        }
        handleCloseDeleteDialog();
    }
};


  return (
    <div>
      <button
        className="btn btn-danger mb-3"
        onClick={handleOpenAddProductModal}
      >
        Add Product
      </button>
      {/* Add Product Modal */}
      <AddProduct open={openAddProduct} close={handleCloseAddProductModal} />

      {/* ////////////////////////////////////////Product table///////////////////////////////////////// */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Pieces</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>New Arrival</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub-Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Variants</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.pieces}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.isNewArrival ? "Yes" : "No"}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.categoryName.join(", ")}</TableCell>
                <TableCell>{product.subCategoryName}</TableCell>
                <TableCell>
                  <img
                    src={product.coverPhotoUrl}
                    alt={product.productName}
                    style={{ width: "100px", height: "auto" }}
                  />
                </TableCell>
                <TableCell>
                  {product.variants.map((variant, idx) => (
                    <div key={idx}>
                      {variant.color} - {variant.size} (Qty: {variant.quantity})
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {/* Edit and Delete icons */}
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEditProductModal(product)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteDialog(product)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Product Modal */}
      {selectedProduct && (
        <EditProduct
          open={openEditProduct}
          close={handleCloseEditProductModal}
          editProductData={selectedProduct}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the product "
          {productToDelete?.productName}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductTable;
