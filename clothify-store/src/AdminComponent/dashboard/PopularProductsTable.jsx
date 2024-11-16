import React from "react";
import { Avatar, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";

const data = [
  {
    id: 1,
    coverPhotoUrl: "https://res.cloudinary.com/dvw0hnvbs/image/upload/v1731547841/zlhvcoediya9daahd7g2.png",
    name: "Classic T-Shirt",
    orders: 450,
  },
  {
    id: 2,
    coverPhotoUrl: "https://res.cloudinary.com/dvw0hnvbs/image/upload/v1731547841/zlhvcoediya9daahd7g2.png",
    name: "Denim Jeans",
    orders: 350,
  },
  {
    id: 3,
    coverPhotoUrl: "https://res.cloudinary.com/dvw0hnvbs/image/upload/v1731547841/zlhvcoediya9daahd7g2.png",
    name: "Hoodie",
    orders: 300,
  },
  {
    id: 4,
    coverPhotoUrl: "https://res.cloudinary.com/dvw0hnvbs/image/upload/v1731547841/zlhvcoediya9daahd7g2.png",
    name: "Sneakers",
    orders: 280,
  },
  {
    id: 5,
    coverPhotoUrl: "https://res.cloudinary.com/dvw0hnvbs/image/upload/v1731547841/zlhvcoediya9daahd7g2.png",
    name: "Baseball Cap",
    orders: 200,
  },
];

function PopularProductsTable() {
  return (
    <Box sx={{ padding: 2 }}>
    <h3 className="text-center mb-3">Popular Products by Orders</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Orders</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar
                    src={product.coverPhotoUrl}
                    alt={product.name}
                    sx={{ width: 64, height: 64 }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight="bold">
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{product.orders}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PopularProductsTable;
