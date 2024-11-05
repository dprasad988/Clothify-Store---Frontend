import React, { useEffect } from 'react';
import NewArrivalCard from './new-arrival-card';
import { products } from './new-arrival';
import { Button, Grid2, Typography } from '@mui/material';
import AOS from 'aos';

function NewArrivals() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='mb-3 py-1 m-2' style={{backgroundColor: '#FBE9E7',}}>
      <Typography variant="h4" align="center" className='mt-4' data-aos="fade-right" 
        style={{fontSize: '50px', fontWeight: 'bolder'}}
      >
        NEW ARRIVALS
      </Typography>
      <p className='text-center'>Let's explore what is the new-in our store.</p>

      <Grid2 container spacing={2} justifyContent="center">
        {products.map((product, index) => (
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
            <NewArrivalCard
              image={product.image}
              price={product.price}
              name={product.name}
              brand={product.brand}
              inStock={product.inStock}
            />
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
