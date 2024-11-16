import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Load the cart count from localStorage on initial load
  useEffect(() => {
    const savedCartCount = localStorage.getItem("cartCount");
    if (savedCartCount) {
      setCartCount(parseInt(savedCartCount));
    }
  }, []);

  // Function to update the cart count
  const updateCartCount = (newCount) => {
    setCartCount(newCount);
    localStorage.setItem("cartCount", newCount);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, }}>
      {children}
    </CartContext.Provider>
  );
};
