/* eslint-disable react/no-unescaped-entities */
import "./Custom.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";

import { userLogin } from "../../api/apiHandler";
import { UseAuth } from "../../context/AuthContext";
import { useState } from "react";
export const Login = () => {
  const { signIn } = UseAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(" ");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const onSubmit = (data) => {
    userLogin(data)
      .then((res) => {
        if (res.status === 200) {
          signIn(res.data.token);
          setSnackbarSeverity("success");
          setSnackbarMessage(res.data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        setSnackbarSeverity("error");
        setSnackbarMessage(err.response.data.message);
        setOpenSnackbar(true);
      });
  };
  return (
    <div className="flexer">
      <div className="element-center">
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            bgcolor: "rgba(190,190,190,0); padding: 1em; border-radius: 1em;",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <h1> </h1>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address format",
                  },
                })}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
              />
              <h1> </h1>
              <TextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 3,
                    message: "Password should be greater than 2 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password should be less than 20 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
                    message:
                      "minimum five characters, at least one letter and one number",
                  },
                })}
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
              />
              <h1> </h1>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="space-between">
                <Grid item xs></Grid>
                <Grid item>
                  <Button color="primary" component={Link} to="/register">
                    Don't have an account? Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert severity={snackbarSeverity}>
            {/* {snackbarSeverity === 'success' ? (
                <CheckCircleIcon fontSize="inherit" />

              ) : (
                <ErrorIcon fontSize="inherit" />
              )}  */}
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
