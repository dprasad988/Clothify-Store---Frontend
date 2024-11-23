import React, { useEffect, useState } from 'react';
import NewArrivalCard from './new-arrival-card';
import { Button, Grid2, Typography } from '@mui/material';
import AOS from 'aos';
import { useGetProducts } from '../../../Api/product/getProductApi';
import { useGetOrders } from '../../../Api/order/getOrdersApi';

function TrendingProducts() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  const {data: products = [], isLoading, isError} = useGetProducts();
  const {data: orders = [], isLoading: ordersLoading, isError: ordersError } = useGetOrders();
  
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    if (orders.length > 0) {
      const productOrderCount = {};

      // Count the number of orders for each product
      orders.forEach((order) => {
        order.products.forEach((product) => {
          const productId = product.productId;
          productOrderCount[productId] = (productOrderCount[productId] || 0) + 1;
        });
      });

      // Sort products by the number of orders
      const sortedProductIds = Object.entries(productOrderCount)
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([productId]) => parseInt(productId));

      // Map the sorted product IDs to their corresponding product details
      const detailedProducts = sortedProductIds.map((productId) => {
        const product = products.find((p) => p.productId === productId && !p.isNewArrival);
        return product ? { ...product, orderCount: productOrderCount[productId] } : null;
      }).filter(Boolean); // Remove any null values (if product is not found in products)

      setTopProducts(detailedProducts.slice(0, 5)); // Take the top 5 products
    }
  }, [orders, products]);



  return (
    <div className='mb-3 py-1'>
      <Typography variant="h4" align="center" className='mt-4' data-aos="fade-right" 
        style={{fontSize: '50px', fontWeight: 'bolder'}}
      >
        TRENDING NOW
      </Typography>
      <p className='text-center' data-aos="fade-left">Emphasizes exclusivity and current trends.</p>

      <Grid2 container spacing={2} justifyContent="center">
        {topProducts.slice(0, 4).map((product, index) => (
          <Grid2 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={index} 
            container 
            justifyContent="center"
            data-aos='fade-right'
            data-aos-delay={index * 100}
            data-aos-offset="0"
          >
            {/* // pass data to NewArrivalCard */}
            <NewArrivalCard product={product} />

          </Grid2>
        ))}
      </Grid2>
      <div style={{display: 'flex', justifyContent: 'center' , padding: '20px'}}>
        <Button variant='outlined' color='#FF9800' sx={{
          color: '#FF9800',
          borderColor: '#FF9800',
          borderRadius: '30px',
          borderWidth: '2px',
          fontWeight: 'bold',
          width: '130px',
          textTransform: 'none',
          '&:hover': {
            borderColor: '#FF9800',
            backgroundColor: 'rgba(255, 152, 0, 0.1)'
          }
        }}>View All</Button>
      </div>
    </div>
  );
}

export default TrendingProducts
