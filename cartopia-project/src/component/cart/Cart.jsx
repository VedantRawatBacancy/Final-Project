import { Grid, Typography, Button } from "@mui/material";
import "./Cart.css";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeAllItemsFromCart } from "../../store/cartSlice";
import { useEffect } from "react";
import { addOrder } from "../../api/apiHandler";
import { getCartCount } from "../../api/apiHandler";

export const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();

  const handleCheckout = () => {
    const data = {
      shipping: {
        street: "street",
        city: "city",
        zipCode: "zipCode",
      },
      paymentMethod: "cash",
    };
    addOrder(data)
      .then((res) => {
        console.log("Order added successfully", res);
        return dispatch(removeAllItemsFromCart());
      })
      .then(() => {
        console.log("All items removed from the cart");
        navigate("/checkout");
      })
      .catch((err) => {
        console.log("Error in adding order or removing items", err);
      });
  };
  const handleRemoveAll = () => {
    dispatch(removeAllItemsFromCart())
      .then((response) => {
        console.log("removed successful", response);
      })
      .catch((error) => {
        console.log("error in removing", error);
      });
  };

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        color="secondary"
        sx={{
          textAlign: "center",
          paddingTop: "20px",
          letterSpacing: "1em",
          textTransform: "uppercase",
        }}
      >
        Shopping Cart
      </Typography>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <>
            <CartItem
              key={item.ProductId}
              id={item.ProductId}
              name={item.ProductName}
              quantity={item.quantity}
              price={item.ProductPrice}
              image={item.image}
            />
          </>
        ))
      ) : (
        <Typography
          variant="h4"
          gutterBottom
          color="#3A3E3B"
          sx={{ textAlign: "center", paddingTop: "20px" }}
        >
          Cart is empty
        </Typography>
      )}

      <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
        <Typography
          variant="h6"
          gutterBottom
          color="secondary"
          align="center"
          sx={{
            backgroundColor: "#edb31c",
            borderRadius: "0.25em",
            padding: "1em",
          }}
        >
          Price: {totalPrice} | Number of Items: {totalQuantity}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          color="secondary"
          align="center"
        ></Typography>
        <div className="fl1">
          <div className="pad-1">
            <Button
              variant="contained"
              color="fail"
              onClick={handleRemoveAll}
              disabled={cartItems.length <= 0}
            >
              RemoveAll
            </Button>
          </div>
          <div className="pad-1">
            <Button
              variant="contained"
              color="success"
              disabled={cartItems.length <= 0}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </div>
      </Grid>
    </div>
  );
};
