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
    const cus_id = localStorage.getItem('cus_id');
  
    if (data && cus_id) {
      // Filter orders by customer ID
      const filteredData = data.filter((order) => String(order.cusId) === cus_id);
      
      // Sort orders by orderId in descending order
      const sortedOrders = filteredData.sort((a, b) => b.orderId - a.orderId);
  
      setOrders(sortedOrders);
    }
  }, [data]);
  
  
  
  return (
    <Box sx={{ maxWidth: { xs: 380, sm: '100%' }, bgcolor: '#b0b0b0', p: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Order Details
      </Typography>
      <TableContainer component={Paper} sx={{ width: '100%', overflow: 'auto', maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{backgroundColor: '#f9f9f9'}}>
              <TableCell>Order ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const totalOrderPrice = order.products.reduce(
                (sum, product) => sum + product.totalPrice,
                0
              );
            
              return order.products.map((product, index) => (
                <TableRow key={`${order.orderId}-${product.productId}`}>
                  <TableCell>{index === 0 && (
                      <div rowSpan={order.products.length}>{order.orderId}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className='d-flex'>
                      <div>
                        <img
                          src={product.coverPhotoUrl}
                          alt={product.productName}
                          style={{ width: '70px', height: '80px', objectFit: 'cover', borderRadius: '0 10px 10px 10px' }}
                        />
                      </div>
                      <div className='ms-3'>
                        {product.productName}<br/>
                        {product.color} |  {product.size}<br/>
                        {product.quantity}<br/>
                        Rs. {product.totalPrice}.00
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{index === 0 && (
                      <div rowSpan={order.products.length}><strong>Rs. {totalOrderPrice}.00</strong></div>
                    )}
                  </TableCell>
                  <TableCell>{index === 0 && (
                      <div rowSpan={order.products.length}>{order.date}</div>
                    )}</TableCell>
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
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CustomerOrders;
