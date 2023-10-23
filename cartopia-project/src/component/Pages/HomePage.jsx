import { useEffect, useState } from "react";
import { getCurrentUser, getOrder } from "../../api/apiHandler";
import { UseAuth } from "../../context/AuthContext";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { token } = UseAuth();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrder().then((res) => {
      setOrders(res.data.OrderDetails);
    });
  }, []);
  const [user, setUser] = useState([]);
  useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res.data.user);
    });
  }, []);

  const orderSize = orders.length;

  console.log(user);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <Typography color="secondary" variant="h2" align="center">
        {token
          ? `Welcome ${user.first_name} ${user.last_name}`
          : "Welcome Guest"}
      </Typography>
      <h1> </h1>
      <Typography
        color="secondary"
        variant="h4"
        align="center"
        sx={{
          backgroundColor: "#edb31c",
          padding: "1em",
          borderRadius: "0.5em",
          color: "#323031",
        }}
      >
        {token ? (
          `Total Number of Orders : ${orderSize}`
        ) : (
          <Button
            color="signIn"
            variant="contained"
            component={Link}
            to="signIn"
          >
            Please Sign In
          </Button>
        )}
      </Typography>
    </div>
  );
};
