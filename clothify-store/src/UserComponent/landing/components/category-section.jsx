import React, { useEffect } from 'react';
import AOS from 'aos';
import { Grid2, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function CategorySection() {

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className='m-2'>
        <div className='mb-3 py-1 m-2' >
        <Typography variant="h4" align="center" className='mt-4' data-aos="fade-right" 
          style={{ fontSize: '50px', fontWeight: 'bolder' }}
        >
          Choose By Categories
        </Typography>
        <p className='text-center'>Discover the latest arrivals and exciting finds in our store!</p>
        </div>

      <Grid2 container spacing={2} sx={{ mt: 3 }}>

        {/* Row 1 */}
        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} position="relative" data-aos="flip-right">
          <Link to='/category-men'>
          <img
            src="men-ca.png"
            alt="Men"
            style={{ height: '450px', objectFit: 'contain', width: '100%' }}
          />
          </Link>
        </Grid2>
        
        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} position="relative" data-aos="flip-up">
         <Link to='/category-women'>
          <img
            src="women-ca.png"
            alt="Women"
            style={{ height: '450px', objectFit: 'contain', width: '100%' }}
          />
          </Link>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} position="relative" data-aos="flip-up">
         <Link to='/category-teens'>
          <img
            src="teen-ca.png"
            alt="teen"
            style={{ height: '450px', objectFit: 'contain', width: '100%' }}
          />
          </Link>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 , md: 3 }} position="relative" data-aos="flip-up">
         <Link to='/category-kids'>
          <img
            src="kids-ca.png"
            alt="Women"
            style={{ height: '450px', objectFit: 'contain', width: '100%' }}
          />
          </Link>
        </Grid2>

      </Grid2>
    </div>
  );
}

export default CategorySection;
