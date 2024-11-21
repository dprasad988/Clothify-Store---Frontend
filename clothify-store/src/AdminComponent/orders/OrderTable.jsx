import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button as MuiButton,
  TextField,
} from '@mui/material';
import orderData from './orderData';
import { useGetOrders } from '../../Api/order/getOrdersApi';
import { updateOrderStatusApi } from '../../Api/order/updateOrderStatusApi';
import { Row, Col, Pagination } from "antd";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";

function OrderTable() {
  const [orders, setOrders] = useState(orderData);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [key, setKey] = useState(0);
  const [filters, setFilters] = useState({
    orderId: "",
    productName: "",
    date: "",
    status: "",
  });

  const { data, isLoading, isError } = useGetOrders();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    if (data) {
      // Sort orders by orderId in descending order
      const sortedOrders = [...data].sort((a, b) => b.orderId - a.orderId);
      setOrders(sortedOrders);
      setFilteredOrders(sortedOrders);
    }
  }, [data]);

  const filteredOrdersMemo = useMemo(() => {
    let filtered = [...orders];

    // Filter by Order ID
    if (filters.orderId) {
      filtered = filtered.filter((order) =>
        order.orderId.toString().includes(filters.orderId)
      );
    }

    // Filter by Product Name
    if (filters.productName) {
      filtered = filtered
        .map((order) => {
          const filteredProducts = order.products.filter((product) =>
            product.productName
              .toLowerCase()
              .includes(filters.productName.toLowerCase())
          );
          return filteredProducts.length > 0
            ? { ...order, products: filteredProducts }
            : null; // Exclude orders with no matching products
        })
        .filter(Boolean); // Remove null values
    }

    // Filter by Date
    if (filters.date) {
      const now = new Date();
      if (filters.date === "today") {
        filtered = filtered.filter(
          (order) => new Date(order.date).toDateString() === now.toDateString()
        );
      } else if (filters.date === "thisWeek") {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Set to the first day of the week (Sunday)
        startOfWeek.setHours(0, 0, 0, 0); // Reset time to midnight
        filtered = filtered.filter(
          (order) => new Date(order.date) >= startOfWeek
        );
      } else if (filters.date === "thisMonth") {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        filtered = filtered.filter(
          (order) => new Date(order.date) >= startOfMonth
        );
      }
    }

    if (filters.status) {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    return filtered;
  }, [filters, orders]);

  useEffect(() => {
    setFilteredOrders(filteredOrdersMemo);
  }, [filteredOrdersMemo]);

  const handleBatchFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      orderId: "",
      productName: "",
      date: "",
      status: "",
    });
    setKey((prev) => prev + 1);
    setFilteredOrders(orders);
  };

  // Helper function to determine color based on order status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Processing":
        return { color: "#ffb84d", backgroundColor: "#fff5e6" }; 
      case "Shipped":
        return { color: "#66a3ff", backgroundColor: "#e6f3ff" };
      case "Delivered":
        return { color: "#80e0a7", backgroundColor: "#e6fff3" }; 
      default:
        return { color: "#d3d3d3", backgroundColor: "#f9f9f9" }; 
    }
  };

  // Function to handle status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatusApi(orderId, newStatus);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

   // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the orders to display for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + pageSize);

  return (
    <Box sx={{ maxWidth: { xs: 380, sm: "100%" }, bgcolor: "#b0b0b0", p: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Order Details
      </Typography>

      {/* Filter section */}

      <Row
        align="middle"
        gutter={[10, 10]}
        style={{
          padding: "16px",
          background: "#f9f9f9",
          borderRadius: "8px",
          maxWidth: "1000px",
          margin: "0 auto",
          marginBottom: "20px",
        }}
      >
        <Col xs={2} md={1}>
          <FilterOutlined style={{ fontSize: "18px" }} />
        </Col>

        {/* Filter by Order ID */}
        <Col xs={8} md={4}>
          <TextField
            size="small"
            label="Order ID"
            value={filters.orderId}
            onChange={(e) => handleBatchFilterChange({ orderId: e.target.value })}
          />
        </Col>

        {/* Filter by Product Name */}
        <Col xs={14} md={6}>
          <TextField
            size="small"
            label="Product Name"
            value={filters.productName}
            onChange={(e) => handleBatchFilterChange({ productName: e.target.value })}
          />
        </Col>

        {/* Date Select */}
        <Col xs={12} md={5}>
          <FormControl size="small" sx={{ width: '100%' }}>
            <InputLabel>Date</InputLabel>
            <Select
              value={filters.date}
              onChange={(e) => handleBatchFilterChange({ date: e.target.value })}
              label="Date"
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="thisWeek">This Week</MenuItem>
              <MenuItem value="thisMonth">This Month</MenuItem>
            </Select>
          </FormControl>
        </Col>

        {/* Order Status Select */}
        <Col xs={12} md={5} >
          <FormControl size="small" sx={{ width: '100%' }}>
            <InputLabel>Order Status</InputLabel>
            <Select
              key={key}
              value={filters.status}
              onChange={(e) => handleBatchFilterChange({ status: e.target.value })}
              label="Order Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        </Col>

        {/* Reset Button */}
        <Col xs={24} md={3}>
          <MuiButton
            variant="text"
            startIcon={<ReloadOutlined style={{ color: "red" }} />}
            onClick={resetFilters}
            sx={{ color: "red" }}
          >
            Reset
          </MuiButton>
        </Col>
      </Row>

      <TableContainer
        component={Paper}
        sx={{ width: "100%", overflow: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{backgroundColor: '#f9f9f9'}}>
              <TableCell>Order ID</TableCell>
              <TableCell>Product Details</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Billing Address</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => {
              const totalOrderPrice = order.products.reduce(
                (sum, product) => sum + product.totalPrice,
                0
              );

              return order.products.map((product, index) => (
                <TableRow key={`${order.orderId}-${product.productId}`}>
                  <TableCell>
                    {index === 0 && (
                      <div rowSpan={order.products.length}>{order.orderId}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="d-flex">
                      <div className="me-2">
                        <img
                          src={product.coverPhotoUrl}
                          alt={product.productName}
                          style={{
                            width: "70px",
                            height: "90px",
                            objectFit: "cover",
                            borderRadius: "0 10px 10px 10px",
                          }}
                        />
                      </div>

                      <div>
                        {product.productName}
                        <br />
                        {product.color} | {product.size}
                        <br />
                        {product.quantity}
                        <br />
                        Rs. {product.totalPrice}.00
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {index === 0 && (
                      <div rowSpan={order.products.length}>
                        {order.cusFirstName} {order.cusLastName}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {index === 0 && (
                      <div rowSpan={order.products.length}>
                        {order.billingAddress}
                        <br />
                        {order.billingCity}
                        <br />
                        {order.postalCode}
                        <br />
                        {order.billingCountry}
                        <br />
                        {order.phoneNumber}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {index === 0 && (
                      <div rowSpan={order.products.length}>
                        <strong>Rs. {totalOrderPrice}.00</strong>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {index === 0 && (
                      <div rowSpan={order.products.length}>{order.date}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {index === 0 && (
                      <div rowSpan={order.products.length}>
                        <Select
                          value={order.status || "Pending"}
                          size="small"
                          onChange={(e) =>
                            handleStatusChange(order.orderId, e.target.value)
                          }
                          sx={{
                            color: getStatusStyles(order.status).color,
                            backgroundColor: getStatusStyles(order.status)
                              .backgroundColor,
                            fontWeight: "bold",
                            borderRadius: 5,
                          }}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Processing">Processing</MenuItem>
                          <MenuItem value="Shipped">Shipped</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                        </Select>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredOrders.length}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' , marginBottom: '20px', justifyContent: 'flex-end'}}
      />
    </Box>
  );
}

export default OrderTable;
