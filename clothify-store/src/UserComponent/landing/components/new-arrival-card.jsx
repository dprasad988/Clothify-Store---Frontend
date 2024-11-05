import React, { useState } from "react";
import { Card } from 'antd';
import AddToCart from '../../addToCart/AddToCart';

const { Meta } = Card;

function NewArrivalCard({ image, price, name, brand, inStock }) {

  const [open, setOpen] = useState(false)


  const handleOpenAddToCart = () => {
    setOpen(true)
  }
  const handleCloseAddToCart = () => {
      setOpen(false)
  }

  return (
    <div>
      <Card
        hoverable
        onClick={handleOpenAddToCart}
        style={{ width: 250, margin: '16px', height: '450px', border: 'none'}}
        cover={<img alt={name} src={image} style={{ height: '300px', objectFit: 'cover', borderTopLeftRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}} />}
      >
        <Meta title={name} description={`Brand: ${brand}`} />
        <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'column' }}>
          <h4>Price: Rs. {price}</h4>
          <p style={{ color: inStock ? 'green' : 'red' }}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </Card>

      <AddToCart open={open} close={handleCloseAddToCart} />

    </div>



  );
}

export default NewArrivalCard;
