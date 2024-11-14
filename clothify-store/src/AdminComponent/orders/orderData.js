const orderData = [
    {
      orderId: '12345',
      status: 'Shipped',
      date: '2024-11-14',
      products: [
        {
          productId: '001',
          productName: 'Product A',
          totalPrice: 50,
          color: 'Red',
          size: 'M',
          quantity: 2,
          coverPhotoUrl: "https://res.cloudinary.com/dvw0hnvbs/image/upload/v1731547841/zlhvcoediya9daahd7g2.png"
        },
        {
          productId: '002',
          productName: 'Product B',
          totalPrice: 30,
          color: 'Blue',
          size: 'L',
          quantity: 1,
          coverPhotoUrl: "https://res.cloudinary.com/dvw0hnvbs/image/upload/v1731547841/zlhvcoediya9daahd7g2.png"
        },
      ],
    },
];
  

export default orderData;
