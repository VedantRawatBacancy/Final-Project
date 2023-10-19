/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";

export const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { id, name, price, description, image } = props;
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { token } = UseAuth();

  const handleAddToCart = () => {
    const data = {
      ProductId: id,
      quantity: 1,
    };

    dispatch(addItemToCart(data))
      .then((response) => {
        console.log("Item added to cart", response);
        setIsSnackbarOpen(true);
      })
      .catch((err) => {
        console.log("Error in adding item to cart", err);
      });
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Card sx={{ width: "90%", padding: "1em" }}>
      <CardMedia sx={{ height: "150px" }} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="small" color="primary" sx={{ fontWeight: "bold" }}>
          ₹{price}
        </Button>
        <Button
          size="small"
          onClick={handleAddToCart}
          color="primary"
          sx={{ fontWeight: "bold", backgroundColor: "green", color: "white" }}
        >
          Add to Cart
        </Button>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/product/${id}`}
          sx={{ fontWeight: "bold", backgroundColor: "blue", color: "white" }}
        >
          View Product
        </Button>
      </CardActions>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {token ? (
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product added to cart
          </Alert>
        ) : (
          <Alert
            onClose={handleSnackbarClose}
            severity="info"
            sx={{ width: "100%" }}
          >
            Please sign in to add the product to the cart.
          </Alert>
        )}
      </Snackbar>
    </Card>
  );
};
