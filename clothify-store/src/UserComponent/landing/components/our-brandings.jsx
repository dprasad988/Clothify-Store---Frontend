import React, { useState } from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const brandImages = [
  'kids.png',
  'kids.png',
  'kids.png',
  'kids.png',
  'kids.png',
];

const BrandingSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const imagesPerView = 3; 

  const visibleImages = brandImages.slice(startIndex, startIndex + imagesPerView);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < brandImages.length - imagesPerView ? prev + 1 : prev));
  };

  return (
    <div>
      <div className='mb-3 py-1 m-2' style={{ backgroundColor: '#FBE9E7' }}>
        <Typography variant="h4" align="center" className='mt-4' data-aos="fade-right" 
          style={{ fontSize: '50px', fontWeight: 'bolder' }}
        >
          OUR BRANDINGS
        </Typography>
        <p className='text-center'>Let's explore what is new in our store.</p>
        <div>
          <Grid container alignItems="center" justifyContent="center" spacing={2}>
            {/* Left Arrow */}
            <Grid item>
              <IconButton onClick={handlePrev} disabled={startIndex === 0}>
                <ArrowBackIosIcon />
              </IconButton>
            </Grid>

            {/* Brand Images */}
            <Grid item xs={8} container justifyContent="center">
              <Grid container spacing={2} justifyContent="center">
                {visibleImages.map((image, index) => (
                  <Grid item key={index} xs={4}>
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
            <Grid item>
              <IconButton onClick={handleNext} disabled={startIndex >= brandImages.length - imagesPerView}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default BrandingSection;
