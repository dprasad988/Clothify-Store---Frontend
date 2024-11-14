import React, { useEffect, useState } from 'react';
import NewArrivalCard from './new-arrival-card';
import { Button, Grid2, Typography } from '@mui/material';
import AOS from 'aos';
import { useGetProducts } from '../../../Api/product/getProductApi';

function NewArrivals() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  const {data: products = [], isLoading, isError} = useGetProducts();

  const newProducts = products.filter(
    product => product.isNewArrival === true 
  );
  

  return (
    <div className='mb-3 py-1' style={{backgroundColor: '#FBE9E7',}}>
      <Typography variant="h4" align="center" className='mt-4' data-aos="fade-right" 
        style={{fontSize: '50px', fontWeight: 'bolder'}}
      >
        NEW ARRIVALS
      </Typography>
      <p className='text-center'>Let's explore what is the new-in our store.</p>

      <Grid2 container spacing={2} justifyContent="center">
        {newProducts.slice(0, 4).map((product, index) => (
          <Grid2 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={index} 
            container 
            justifyContent="center"
            data-aos='slide-right'
            data-aos-delay={index * 100}
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

export default NewArrivals;
