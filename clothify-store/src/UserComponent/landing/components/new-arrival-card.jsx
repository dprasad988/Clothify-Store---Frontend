import React, { useState } from "react";
import { Card } from 'antd';
import AddToCart from '../../addToCart/AddToCart';

const { Meta } = Card;

function NewArrivalCard({ product }) {

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
        cover={<img alt={product.productName} src={product.coverPhotoUrl} style={{ height: '300px', objectFit: 'cover', borderTopLeftRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}} />}
      >
        <Meta title={product.productName} description={`Brand: ${product.brand}`} />
        <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'column' }}>
          <h4>Price: Rs. {product.price}</h4>
          <p style={{ color: product.status ? 'green' : 'red' }}>
            {product.status ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </Card>

      <AddToCart open={open} close={handleCloseAddToCart} product={product}/>

    </div>



  );
}

export default NewArrivalCard;
