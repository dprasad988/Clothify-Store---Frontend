import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';
import orderData from '../../AdminComponent/orders/orderData';
import { useGetOrders } from '../../Api/order/getOrdersApi';

function CustomerOrders() {
  const [orders, setOrders] = useState(orderData);
  const {data, isLoading, isError} = useGetOrders();

  // Helper function to determine color based on order status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'orange';
      case 'Shipped':
        return 'blue';
      case 'Delivered':
        return 'green';
      default:
        return 'gray';
    }
  };

  useEffect(() => {
    const cus_id = localStorage.getItem('cus_id')

    if (data && cus_id) {
        const filteredData = data.filter((order) => String(order.cusId) === cus_id);
        setOrders(filteredData);
    }
  }, [data])
  
  
  return (
    <Box sx={{ maxWidth: { xs: 380, sm: '100%' }, bgcolor: '#b0b0b0', p: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Order Details
      </Typography>
      <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) =>
              order.products.map((product) => (
                <TableRow key={`${order.orderId}-${product.productId}`}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>
                    <img
                      src={product.coverPhotoUrl}
                      alt={product.productName}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.totalPrice}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: getStatusColor(order.status),
                        fontWeight: 'bold'
                      }}
                    >
                      {order.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CustomerOrders;
