import { UseAuth } from "../../context/AuthContext";
import { Typography } from "@mui/material";

export const HomePage = () => {
  const { token } = UseAuth();

  return (
    <Typography color="secondary">
      {token ? "Welcome User" : "Welcome Guest"}
    </Typography>
  );
};
