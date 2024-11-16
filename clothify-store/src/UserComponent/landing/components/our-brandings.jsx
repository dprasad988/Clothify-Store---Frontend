import React, { useState } from 'react';
import { Grid, Typography, IconButton, useMediaQuery } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const brandImages = [
  'moose.jpeg',
  'buddi.jpg',
  'gucci.jpg',
  'touche-logo.jpg',
  'fmlk.jpg',
  'dharmawardena-logo.jpg',
];

const BrandingSection = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [startIndex, setStartIndex] = useState(0);
  const imagesPerView = isMobile ? 1 : 5;

  const visibleImages = brandImages.slice(startIndex, startIndex + imagesPerView);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < brandImages.length - imagesPerView ? prev + 1 : prev));
  };

  return (
    <div>
      <div className='mb-3 py-1 m-2' >
        <Typography variant="h4" align="center" className='mt-4' data-aos="fade-right" 
          style={{ fontSize: '50px', fontWeight: 'bolder' }}
        >
          OUR BRANDINGS
        </Typography>
        <p className='text-center' data-aos="fade-left">Discover our brand with exclusive, fresh designs.</p>
        <div>
          <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
            {/* Left Arrow */}
            <Grid item xs={2} container justifyContent="center">
              <IconButton onClick={handlePrev} disabled={startIndex === 0} 
                sx={{
                    color: '#FF9800',
                    border: '3px solid #FF9800', 
                }}
              >
                <ArrowBackIosIcon
                    sx={{
                        color: '#FF9800', 
                    }}/>
              </IconButton>
            </Grid>

            {/* Brand Images */}
            <Grid item xs={8} container justifyContent="center">
              <Grid container spacing={2} justifyContent="center" alignItems={'center'}>
                {visibleImages.map((image, index) => (
                  <Grid item key={index} xs={12 / imagesPerView}>
                    <img 
                      src={image} 
                      alt={`Brand ${index}`} 
                      style={{ width: '100%', height: 'auto', objectFit: 'contain' }} 
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Right Arrow */}
            <Grid item xs={2} container justifyContent="center" >
              <IconButton onClick={handleNext} disabled={startIndex >= brandImages.length - imagesPerView}
                    sx={{
                        color: '#FF9800',
                        border: '3px solid #FF9800', 
                    }}
                >
                <ArrowForwardIosIcon 
                sx={{
                    color: '#FF9800', 
                }}/>
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default BrandingSection;
