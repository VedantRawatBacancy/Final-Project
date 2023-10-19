import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { OrderProducts } from "./OrderProducts";

export const OrderItem = (props) => {
  const { orderDate, status, totalPrice, products } = props;
  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "10px" }}>
      <Typography variant="h5" gutterBottom>
        Order Date: {orderDate}
      </Typography>
      <Typography variant="body2">Status: {status}</Typography>
      <Typography variant="body2">Total Price: {totalPrice}</Typography>
      <Typography variant="h6" gutterBottom>
        Products:
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item, index) => (
              <OrderProducts
                key={index}
                id={index}
                productName={item.name}
                productPrice={item.price}
                productImage={item.image}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
