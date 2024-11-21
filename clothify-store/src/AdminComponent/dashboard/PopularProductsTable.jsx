import React, { useEffect, useState } from "react";
import { Avatar, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
import { useGetOrders } from "../../Api/order/getOrdersApi";

function PopularProductsTable() {

  const { data: orders, isLoading, isError } = useGetOrders();
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const productMap = {};

      // Aggregate quantities for each product
      orders.forEach((order) => {
        order.products.forEach((product) => {
          if (productMap[product.productName]) {
            productMap[product.productName] += product.quantity;
          } else {
            productMap[product.productName] = product.quantity;
          }
        });
      });

      // Convert the map to an array of products and sort by quantity
      const sortedProducts = Object.entries(productMap)
        .map(([productName, totalQuantity]) => ({
          productName,
          totalQuantity,
          coverPhotoUrl: orders.find((order) =>
            order.products.some((p) => p.productName === productName)
          )?.products.find((p) => p.productName === productName)?.coverPhotoUrl || "",
        }))
        .sort((a, b) => b.totalQuantity - a.totalQuantity);

      // Set top 5 products
      setTopProducts(sortedProducts.slice(0, 5));
    }
  }, [orders]); 
  
  return (
    <Box sx={{ padding: 2 }}>
    <h3 className="text-center mb-3">Popular Products by Orders</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Total Orders</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar
                    src={product.coverPhotoUrl}
                    alt={product.productName}
                    sx={{ width: 64, height: 64 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight="bold">
                    {product.productName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{product.totalQuantity}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PopularProductsTable;
