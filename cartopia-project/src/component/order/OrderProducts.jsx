import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";

export const OrderProducts = (props) => {
  const { productName, productPrice } = props;

  return (
    <TableRow>
      <TableCell>
        <Typography variant="body2">{productName}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{productPrice}</Typography>
      </TableCell>
    </TableRow>
  );
};
