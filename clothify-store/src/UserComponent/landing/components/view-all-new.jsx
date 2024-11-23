import React, { useEffect, useState } from 'react';
import NewArrivalCard from './new-arrival-card';
import { Grid2, Typography } from '@mui/material';
import AOS from 'aos';
import { useGetProducts } from '../../../Api/product/getProductApi';
import { Pagination } from "antd";

function ViewAllNewArrivals() {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  const {data: products = [], isLoading, isError} = useGetProducts();

  const newProducts = products.filter(
    product => product.isNewArrival === true 
  );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate the products for the current page
  const paginatedProducts = newProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to the top when changing pages
  };
  

  return (
    <div className='mb-3 py-1' style={{backgroundColor: '#FBE9E7',}}>
      <Typography variant="h4" align="center" className='mt-4' data-aos="fade-right" 
        style={{fontSize: '50px', fontWeight: 'bolder',}}
      >
        NEW ARRIVALS
      </Typography>
      <p className='text-center' data-aos="fade-left">Let's explore what is the new-in our store.</p>

      <Grid2 container spacing={2} justifyContent="center">
        {paginatedProducts.map((product, index) => (
          <Grid2 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={index} 
            container 
            justifyContent="center"
            data-aos='fade-left'
            data-aos-delay={index * 100}
            data-aos-offset="0"
          >
            {/* // pass data to NewArrivalCard */}
            <NewArrivalCard product={product} />

          </Grid2>
        ))}
      </Grid2>
      
      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={newProducts.length}
          onChange={handlePageChange}
          showSizeChanger={false} // Disable page size change dropdown
        />
      </div>

    </div>
  );
}

export default ViewAllNewArrivals;
