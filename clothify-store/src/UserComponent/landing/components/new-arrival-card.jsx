import React, { useState } from "react";
import { Card, Tooltip } from 'antd';
import AddToCart from '../../addToCart/AddToCart';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const { Meta } = Card;

function NewArrivalCard({ product }) {

  const [open, setOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false);

  const handleOpenAddToCart = () => {
    setOpen(true)
  }
  const handleCloseAddToCart = () => {
      setOpen(false)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite); 
    console.log(`${product.productName} has been ${!isFavorite ? "added to" : "removed from"} favorites.`);
  };

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

        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <div
            style={{
              position: 'absolute',
              top: '400px',
              right: '10px',
              cursor: 'pointer',
              color: isFavorite ? 'red' : 'gray',
              fontSize: '24px',
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card's onClick
              toggleFavorite();
            }}
          >
            {isFavorite ? <HeartFilled /> : <HeartOutlined />}
          </div>
        </Tooltip>
        
      </Card>

      <AddToCart open={open} close={handleCloseAddToCart} product={product}/>

    </div>



  );
}

export default NewArrivalCard;
