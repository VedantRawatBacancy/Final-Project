import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Badge,
} from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import "./Layout.css";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UseAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/apiHandler";

export const Header = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res.data.user);
    });
  }, []);
  const { token, signOut } = UseAuth();
  const navigate = useNavigate();

  const quantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="secondary"
          aria-label="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="../Logo.png"
            alt="Cartopia"
            style={{
              height: "1em",
              marginRight: "10px",
            }}
          />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          color="secondary"
          sx={{ flexGrow: 1 }}
        >
          Tech Mart
        </Typography>
        <Stack direction="row" spacing={2}>
          {!token ? (
            <>
              <Button color="textPrimary" component={Link} to="/product">
                Products
              </Button>

              <Button color="textPrimary" component={Link} to="signIn">
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Button color="textPrimary" component={Link} to="/product">
                Products
              </Button>
              <Button color="textPrimary" component={Link} to="/order">
                Orders
              </Button>
              <Button
                color="textPrimary"
                component={Link}
                to="/signIn"
                onClick={() => signOut()}
              >
                Log Out {user.first_name}
              </Button>
              <Button color="textPrimary" component={Link} to="/cart">
                <Badge
                  badgeContent={quantity}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  showZero
                  max={99} // Customize the maximum displayed value
                >
                  <ShoppingCartIcon sx={{ fontSize: 25 }} />
                </Badge>
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
