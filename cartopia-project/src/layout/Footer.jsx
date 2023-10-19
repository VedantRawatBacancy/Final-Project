import { AppBar, Toolbar, Typography } from "@mui/material";
import "./Layout.css";
export const Footer = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography>
          &copy; Cartopia React Evaluation E-Commerce Platform
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
