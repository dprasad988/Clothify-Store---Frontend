import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import orderData from './orderData';

function OrderTable() {
  const [orders, setOrders] = useState(orderData);

  return (
    <Box sx={{ maxWidth: { xs: 380, sm: '100%' }, bgcolor: '#b0b0b0', p: 3 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Order Details
        </Typography>
      <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              order.products.map((product) => (
                <TableRow key={`${order.orderId}-${product.productId}`}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <img
                      src={product.coverPhotoUrl}
                      alt={product.productName}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.totalPrice}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrderTable;
