import React, { useEffect, useState } from 'react';
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
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
// import { handleBuyFromCart } from '../../Config/payherePaymentCart';

  const Cart = ({ open, close }) => {

    const [rows, setRows] = useState([]);
    const { cartCount, updateCartCount, setBillingData } = useCart();
    const navigate = useNavigate();


    const clearCart = () => {
      localStorage.removeItem("cart");
      setRows([]);
      updateCartCount(0);
    };

    useEffect(() => {
      if (open) {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
  
        // Ensure that savedCart is an array
        if (Array.isArray(savedCart)) {
          setRows(savedCart);
        } else if (savedCart && typeof savedCart === 'object') {
          setRows([savedCart]); // Wrap single object in an array
        } else {
          setRows([]); // Default to an empty array if savedCart is undefined or null
        }
      }
    }, [open]);
    
    const handleRemove = (id, color, size) => {
      const itemToRemove = rows.find(
        (item) => item.id === id && item.color === color && item.size === size
      );
    
      if (itemToRemove) {
        const updatedRows = rows.filter(
          (item) => !(item.id === id && item.color === color && item.size === size)
        );
    
        setRows(updatedRows);
        localStorage.setItem("cart", JSON.stringify(updatedRows));
    
        // Update the cart count by subtracting the quantity of the removed item
        const newCartCount = cartCount - itemToRemove.quantity;
        updateCartCount(newCartCount);
      }
    };
    

    // Handle quantity change
    const handleQuantityChange = (row, increment) => {
      const updatedRows = rows.map((item) => {
        if (item.id === row.id && item.color === row.color && item.size === row.size) {
          // Ensure quantity does not exceed availableQty and does not go below 1
          const newQuantity = item.quantity + increment;
          if (newQuantity <= item.availableQty && newQuantity >= 1) {

            const newCartCount = cartCount + increment;
            updateCartCount(newCartCount);
            
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      });

      setRows(updatedRows);
      localStorage.setItem("cart", JSON.stringify(updatedRows));
    };

  const calculateTotal = () => {
    return rows.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    const orderData = {
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
      products: rows.map(row => ({
        productId: row.id,
        productName: row.name,
        color: row.color,
        size: row.size,
        quantity: row.quantity,
        totalPrice: row.price * row.quantity,
        coverPhotoUrl: row.coverPhotoUrl,
        billingId: null,
      }))
    };

    // try {
      
    //   await handleBuyFromCart(orderData, close, clearCart);

    //   // close(); // Close the dialog after successful checkout
    // } catch (error) {
    //   console.error("Error submitting order:", error);
    // }

    setBillingData({ orderData, close, clearCart });

    navigate('/billing');

  };

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
                          src={row.coverPhotoUrl}
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
                          onClick={() => row.quantity > 1 && handleQuantityChange(row, -1)}
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
                          {row.quantity}
                        </div>
                        <button
                          onClick={() => row.quantity < row.availableQty && handleQuantityChange(row, 1)}
                          className="text-center"
                          style={{ width: '30px', backgroundColor: 'lightblue', height: '30px' }}
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <button onClick={() => handleRemove(row.id, row.color, row.size)} style={{cursor: 'pointer', border: 'none'}}>
                            remove
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>Rs. {(row.price * row.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <Typography variant="h6" color="red" sx={{ ml: 2 }}>
              Total: Rs. {calculateTotal().toFixed(2)}
            </Typography>
            <div>
              <Button onClick={close} color="primary" variant="outlined" sx={{ marginRight: '10px' }}>
                Close
              </Button>
              <Button onClick={handleCheckout} color="primary" variant="contained" sx={{ marginRight: '15px' }}>
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
