import React, {useState} from "react";
import {
  Button,
  Box,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog,
} from "@mui/material";
import Grid from '@mui/material/Grid2';

function AddToCart({ open, close }) {
    const [selectedColor, setSelectedColor] = useState('Orange');
    const [selectedSize, setSelectedSize] = useState('XS');
    const [quantity, setQuantity] = useState(1);


    const handleColorChange = (colorName) => {
        setSelectedColor(colorName);
    };
    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };
    const handleIncrement = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
    };

  return (
    <Dialog open={open} onClose={close} maxWidth="md" fullWidth >
      <DialogTitle className="text-center fs-4">Add To Cart</DialogTitle>
      <DialogContent>
        <Box>
          <Grid container spacing={1}>
            {/* Column 1 with 3 stacked images */}
            <Grid size={{ xs: 4, sm: 2 }}>
              <Grid container direction="column" spacing={1}>
                <Grid sx={{ height: '150px' }}>
                  <img
                    src="men.png"
                    alt="Men"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Grid>
                <Grid sx={{ height: '150px' }}>
                  <img
                    src="men.png"
                    alt="Men"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Grid>
                <Grid sx={{ height: '150px' }}>
                  <img
                    src="men.png"
                    alt="Men"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Column 2 with one large image */}
            <Grid size={{ xs: 8, sm: 4 }} sx={{ height: '465px' }}>
              <img
                src="men.png"
                alt="Men"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Grid>

{/* ///////////////////////////////////////////////////////////////////////////////////////// */}

            <Grid size={{ xs: 12, sm: 6 }} sx={{ height: '465px', paddingLeft: '10px' }}>
                <h4>
                    Modano Women's Modern Fit 
                    Long Sleeve Casual Top
                </h4>
                <h6>Modano</h6><hr/>
                <div className="d-flex">
                    <p style={{fontWeight: 'bold'}}>Color</p>
                    <p className="ms-3">{selectedColor}</p>
                </div>
                <div className="d-flex">
                    <div style={{width: "30px", height: "30px", backgroundColor: "red" , marginRight: '10px'}} onClick={() => handleColorChange('Red')}></div>
                    <div style={{width: "30px", height: "30px", backgroundColor: "green" , marginRight: '10px'}} onClick={() => handleColorChange('Green')}></div>
                    <div style={{width: "30px", height: "30px", backgroundColor: "yellow" , marginRight: '10px'}} onClick={() => handleColorChange('Yellow')}></div>
                    <div style={{width: "30px", height: "30px", backgroundColor: "blue" , marginRight: '10px'}} onClick={() => handleColorChange('Blue')}></div>
                </div>
                <div className="d-flex mt-3">
                    <p style={{fontWeight: 'bold'}}>Size</p>
                    <p className="ms-3">{selectedSize}</p>
                </div>
                <div className="d-flex">
                    <div className="text-center" style={{width: "30px", backgroundColor: 'lightblue', height: "30px", marginRight: '10px'}} onClick={() =>   handleSizeChange('XS')}>XS</div>
                    <div className="text-center" style={{width: "30px", backgroundColor: 'lightblue', height: "30px", marginRight: '10px'}} onClick={() => handleSizeChange('S')}>S</div>
                    <div className="text-center" style={{width: "30px", backgroundColor: 'lightblue', height: "30px", marginRight: '10px'}} onClick={() =>handleSizeChange('M')}>M</div>
                    <div className="text-center" style={{width: "30px", backgroundColor: 'lightblue', height: "30px", marginRight: '10px'}} onClick={() =>  handleSizeChange('L')}>L</div>
                    <div className="text-center" style={{width: "30px", backgroundColor: 'lightblue', height: "30px", marginRight: '10px'}} onClick={() =>  handleSizeChange('XL')}>XL</div>
                </div>
                <div className="d-flex mt-3 align-items-center">
                    <p style={{fontWeight: 'bold'}}>Price</p>
                    <p className="ms-3 fs-5 text-danger">Rs. 1890.0</p>
                </div>
                <div className="d-flex mt-2">
                    <p style={{fontWeight: 'bold'}}>Quantity</p>
                    <div className="d-flex ms-3">
                        <button onClick={handleDecrement} className="text-center" style={{width: "30px", backgroundColor: 'lightblue', height: "30px",}}>-</button>
                        <div className="text-center" style={{width: "30px", backgroundColor: 'lightblue', height: "30px",}}>{quantity}</div>
                        <button onClick={handleIncrement} className="text-center" style={{width: "30px", backgroundColor: 'lightblue', height: "30px",}}>+</button>
                    </div>
                </div>
                <button className="mt-4 btn btn-primary w-100 ">Add To Cart</button>

            </Grid>

          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Close</Button>
        <Button variant="outlined">Add To Cart</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddToCart;
