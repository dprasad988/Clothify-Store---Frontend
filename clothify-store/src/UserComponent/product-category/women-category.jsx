import React, { useEffect, useState } from "react";
import { Row, Col, Avatar, Typography , Pagination, Select, Slider} from "antd";
import menSubCategories from "./menSubCategoryData";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid2 } from '@mui/material';
import NewArrivalCard from "../landing/components/new-arrival-card";
import Aos from "aos";
import ShoppingFeatures from "../landing/components/shopping-features";
import { useGetProducts } from "../../Api/product/getProductApi";

function WomenCategory() {

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const {data: products = [], isLoading, isError} = useGetProducts();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [subCategories, setSubCategories] = useState(menSubCategories)
    const [subCategoryNames, setSubCategoryNames] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [hoveredIndex, setHoveredIndex] = useState(null);
      // Filter states
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [sortOption, setSortOption] = useState(null);

    const womenProducts = products.filter(product => 
      Array.isArray(product.categoryName) && product.categoryName.includes("Women")
    );

     // Get unique subCategoryName values
     useEffect(() => {
      const uniqueSubCategories = [
        ...new Set(womenProducts.map((product) => product.subCategoryName)),
      ];
  
      setSubCategoryNames(uniqueSubCategories);
    }, [womenProducts]);

      // Filter logic
      const filteredProducts = womenProducts.filter((product) => {
      const matchesSubCategory = !selectedSubCategory || product.subCategoryName === selectedSubCategory;
      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSubCategory && matchesBrand && matchesPrice;
    });

    // Sort logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOption === "priceAsc") {
        return a.price - b.price;
      } else if (sortOption === "priceDesc") {
        return b.price - a.price;
      }
      return 0;
    });

    const paginatedProducts = sortedProducts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };
    
    const handlePriceChange = (value) => {
      setPriceRange(value);
    };

  return (
    <div>
    <div>
      {/* Background Image */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          height: isMobile ? "30vh" : "90vh", 
        }}
      >
        <img
          src="women.png"
          alt="women-category"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Circular Avatar Image inside Ant Design Grid */}
      <Row justify="center" gutter={[16]} style={{ marginTop: "24px", marginLeft: '10px', marginRight: '10px' , marginBottom: '20px'}}>
        {subCategories.map((subCategory, index) => (
        <Col xs={6} sm={12} md={4} key={index} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
          <Avatar
            src={subCategory.avatarImage}
            alt="Men"
            data-aos="flip-right"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              width: '100%',
              backgroundColor: "#ccc", 
              objectFit: 'contain',
              padding: '10px',
              height: "85%",
              boxShadow:
                  hoveredIndex === index
                    ? '0px 8px 20px 8px rgba(255, 152, 0, 0.5)' // Larger shadow on hover
                    : '0px 4px 12px rgba(255, 152, 0, 0.5)', // Default shadow
            }}
          >
          </Avatar>
          <Typography style={{fontSize: isMobile ? '10px' : '18px', fontWeight: 'bold',marginTop: '20px'}}>
            {subCategory.title}
          </Typography>
        </Col>
        ))}

      </Row>

      <div className="mb-4">
        <div style={{backgroundColor: 'black', height: '50px', width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
        <h5 style={{ color: 'white', textAlign: 'center' ,  fontSize: isMobile ? "15px" : "20px"}}>
            <span style={{ borderBottom: '2px solid white', paddingBottom: '5px' }}>
                CHECK OUT THE CLOTHIFY WOMEN'S COLLECTION!
            </span>
        </h5>
        </div>
      </div>


    {/* Filters */}
    <Row
          gutter={[16, 16]}
          justify="center"
          style={{ margin: "20px 0", padding: "0 10px" }}
        >
          <Col xs={24} sm={8} md={6}>
            <Select
              style={{ width: "100%" }}
              placeholder="Select Subcategory"
              onChange={(value) => {
                setSelectedSubCategory(value);
                setCurrentPage(1); // Reset to first page
              }}
              allowClear
            >
              {subCategoryNames.map((sub) => (
                <Select.Option key={sub} value={sub}>
                  {sub}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              style={{ width: "100%" }}
              placeholder="Select Brand"
              onChange={(value) => {
                setSelectedBrand(value);
                setCurrentPage(1); // Reset to first page
              }}
              allowClear
            >
              {Array.from(
                new Set(womenProducts.map((product) => product.brand))
              ).map((brand) => (
                <Select.Option key={brand} value={brand}>
                  {brand}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Slider
              range
              min={0}
              max={50000}
              value={priceRange}
              onChange={handlePriceChange}
              tooltip={{ formatter: (value) => `Rs ${value}` }}
            />
          </Col>
        </Row>
{/* //////////////////////////////////////////////////////////////////////////////// */}
      <Row
        gutter={[16, 16]}
        justify="center"
        align="middle"
        style={{
          borderBottom: "1px solid #ddd",
          marginBottom: "20px",
          margin: "20px 0", padding: "0 10px 20px 10px"
        }}
      >

        {/* Sort Dropdown */}
        <Col xs={24} sm={8} md={6}>
          <Select
            style={{ width: "100%" }}
            placeholder="Sort by Price"
            onChange={(value) => setSortOption(value)}
            allowClear
          >
            <Select.Option value="priceAsc">Price: Low to High</Select.Option>
            <Select.Option value="priceDesc">Price: High to Low</Select.Option>
          </Select>
        </Col>

        {/* Product Count */}
        <Col xs={24} sm={8} md={12} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography.Title level={5}>
            Showing {filteredProducts.length} products
          </Typography.Title>
        </Col>

      </Row>

      {/* Men Products */}
    <div>
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
            data-aos='slide-right'
            data-aos-delay={index * 100}
          >
          <NewArrivalCard product={product} />

          </Grid2>
        ))}
      </Grid2>
    </div>
        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredProducts.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
        </div>
    </div>
      <div className="mt-5 mb-5">
        <ShoppingFeatures />
      </div>
    </div>
  );
}

export default WomenCategory;
