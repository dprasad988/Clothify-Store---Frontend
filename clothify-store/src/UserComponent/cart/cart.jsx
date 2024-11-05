import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

const Cart = ({ open, close }) => {
  // Initial quantity state for each product
  const [quantities, setQuantities] = useState({
    1: 2, // Initial quantity for product with id 1
    2: 1, // Initial quantity for product with id 2
    3: 3, // Initial quantity for product with id 3
  });

  // Sample data for the table
  const rows = [
    { id: 1, brand: 'Modano', name: 'Modano Womens Modern Fit Long Sleeve Casual Top - Orange / XS', price: 20, image: 'https://zigzag.lk/cdn/shop/files/cottonshirts_26_470x.progressive.jpg?v=1728975573', description: 'This is a sample product description.' },
    { id: 2, brand: 'Modano', name: 'Product 2', price: 40, image: 'https://via.placeholder.com/50', description: 'This is another sample description.' },
    { id: 3, brand: 'Modano', name: 'Product 3', price: 15, image: 'https://via.placeholder.com/50', description: 'Yet another sample product description.' },
  ];

  // Function to handle quantity decrement for each product
  const handleDecrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 1),
    }));
  };

  // Function to handle quantity increment for each product
  const handleIncrement = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  // Calculate the grand total for all products
  const grandTotal = rows.reduce(
    (total, row) => total + row.price * (quantities[row.id] || 1),
    0
  );

  return (
    <div>
      <Dialog open={open} onClose={close} maxWidth="md" fullWidth>
        <DialogTitle className="text-center fs-3">Shopping Cart</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ width: '450px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={row.image}
                          alt={row.name}
                          style={{ marginRight: '10px', width: '70px', height: '80px' }}
                        />
                        <div>
                          <Typography variant="body1" fontWeight="bold">
                            {row.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {row.brand}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Rs. {row.price}
                          </Typography>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <button
                          onClick={() => handleDecrement(row.id)}
                          className="text-center"
                          style={{ width: '30px', backgroundColor: 'lightblue', height: '30px' }}
                        >
                          -
                        </button>
                        <div
                          style={{
                            width: '30px',
                            textAlign: 'center',
                            lineHeight: '30px',
                            backgroundColor: 'lightblue',
                            height: '30px',
                          }}
                        >
                          {quantities[row.id] || 1}
                        </div>
                        <button
                          onClick={() => handleIncrement(row.id)}
                          className="text-center"
                          style={{ width: '30px', backgroundColor: 'lightblue', height: '30px' }}
                        >
                          +
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>Rs. {(row.price * (quantities[row.id] || 1)).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
        <div className="d-flex justify-content-between w-100 align-items-center">
            <Typography variant="h6" color='red' sx={{ ml: 2 }}>Total: Rs. {grandTotal.toFixed(2)}</Typography>
            <div>
            <Button onClick={close} color="primary" variant="outlined" sx={{ marginRight: '10px' }}>
                Close
            </Button>
            <Button color="primary" variant="contained" sx={{ marginRight: '15px' }}>
                Checkout
            </Button>
            </div>
        </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
