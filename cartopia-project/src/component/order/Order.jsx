import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OrderItem } from "./OrderItem";
import { getOrder } from "../../api/apiHandler";
import TablePagination from "@mui/material/TablePagination";

export const Order = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [slicedOrders, setSlicedOrders] = useState([]);

  const [orders, setOrders] = useState([]);
  // const { token } = UseAuth();

  useEffect(() => {
    getOrder().then((res) => {
      setOrders(res.data.OrderDetails);
    });
  }, []);

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setSlicedOrders(orders.slice(startIndex, endIndex));
  }, [orders, page, rowsPerPage]);
  console.log(orders, "ORDERS");
  return (
    <div style={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        color="text-primary"
        sx={{
          textAlign: "center",
          paddingTop: "20px",
          letterSpacing: "1em",
          textTransform: "uppercase",
        }}
      >
        {" "}
        Order History
      </Typography>

      <div>
        <Grid container spacing={3}>
          {slicedOrders.length > 0 ? (
            slicedOrders.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Paper
                  key={item.id}
                  elevation={3}
                  style={{ boxShadow: "none" }}
                >
                  <OrderItem
                    id={item.id}
                    orderDate={item.order_date}
                    status={item.status}
                    totalPrice={item.total_price}
                    products={item.products}
                  />
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h4"
              color="secondary"
              sx={{
                textAlign: "center",
                paddingTop: "20px",
                letterSpacing: "0.25em",
                textTransform: "capitalize",
              }}
            >
              No orders Found
            </Typography>
          )}
        </Grid>
      </div>

      {slicedOrders.length > 0 ? (
        <TablePagination
          component="div"
          count={orders.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          sx={{ color: "#323031" }}
        />
      ) : (
        <h1></h1>
      )}
    </div>
  );
};
