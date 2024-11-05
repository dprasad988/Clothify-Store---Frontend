import React, { useEffect } from 'react';
import AOS from 'aos';
import { Grid2, Typography, Button } from '@mui/material';

function CategorySection() {

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className='m-2'>
      <Typography variant="h4" align="center" sx={{ py: 3 }} data-aos="fade-left">
        Choose By Categories
      </Typography>
      <Grid2 container spacing={2} sx={{ mt: 3 }}>
        {/* Row 1 */}
        <Grid2 size={{ xs: 4, sm: 6 , md: 4 }} position="relative" data-aos="flip-right">
          <img
            src="men.png"
            alt="Men"
            style={{ height: '450px', objectFit: 'cover', width: '100%' }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ position: 'absolute', bottom: '20px', left: '30px' }}
            data-aos="fade-left"
          >
            Men
          </Button>
        </Grid2>
        
        <Grid2 size={{ xs: 4, sm: 6 , md: 4 }} position="relative" data-aos="flip-up">
          <img
            src="women.png"
            alt="Women"
            style={{ height: '450px', objectFit: 'cover', width: '100%' }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ position: 'absolute', bottom: '20px', left: '30px' }}
            data-aos="fade-right"
          >
            Women
          </Button>
        </Grid2>

        <Grid2 size={{ xs: 4, sm: 6 , md: 4 }} position="relative" data-aos="fade-up">
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <img
              src="toys.png"
              alt="Toys"
              style={{ height: '215px', objectFit: 'cover', width: '100%' }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ position: 'absolute', bottom: '20px', left: '30px' }}
              data-aos="zoom-in-right"
            >
              Toys
            </Button>
          </div>
          <div style={{ position: 'relative' }} >
            <img
              src="kids.png"
              alt="Kids"
              style={{ height: '220px', objectFit: 'cover', width: '100%' }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ position: 'absolute', bottom: '20px', left: '30px' }}
              data-aos="flip-up"
            >
              Kids
            </Button>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default CategorySection;
