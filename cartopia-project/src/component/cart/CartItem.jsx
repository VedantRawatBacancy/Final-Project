import {
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  CardActions,
} from "@mui/material";

import { removeItemFromCart, updateItemOfCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
export const CartItem = (props) => {
  const { id, name, quantity, price, image } = props;
  console.log(props, "PROPS");

  const dispatch = useDispatch();

  const handleRemove = () => {
    const ProductId = id;

    dispatch(removeItemFromCart(ProductId))
      .then(() => {
        console.log("Item removed from cart");
      })
      .catch((error) => {
        console.log("Error removing item from cart:", error);
      });
  };

  const handleUpdateQty = (id, quantity) => {
    const data = {
      ProductId: id,
      quantity: quantity,
    };
    dispatch(updateItemOfCart(data))
      .then((response) => {
        console.log("item updated to cart", response);
      })
      .catch((err) => {
        console.log("Error in updating the cart", err);
      });
  };

  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: "1em",
      }}
    >
      <Paper
        elevation={3}
        sx={{ bgcolor: "#fefefe", width: "100%", padding: "1em" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <img src={image} height={"auto"} />
          </Grid>
          <Grid
            item
            xs={24}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body2" color="secondary">
              Price: {price}
            </Typography>
            <Typography variant="body2" color="secondary">
              Quantity: {quantity}
            </Typography>
            <CardActions>
              <Button
                size="small"
                color="success"
                variant="contained"
                onClick={() => handleUpdateQty(id, quantity + 1)}
              >
                +
              </Button>
              <Button
                size="small"
                color="fail"
                variant="contained"
                onClick={() => handleUpdateQty(id, quantity - 1)}
              >
                -
              </Button>
              <Button variant="outlined" color="fail" onClick={handleRemove}>
                Remove
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
