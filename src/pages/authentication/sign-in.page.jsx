import { useState } from "react";
import { useDispatch } from "react-redux";

import { getRandomAvatar, logInUserAsync } from "../../store/user/userSlice";
import SnackbarMessage from "../../components/snackbar/snackbar-message.component";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";

import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    setShowSnackbar(false);
    event.preventDefault();
    const result = await dispatch(logInUserAsync({ email, password }));
    if (result.payload) {
      if (!result.payload.data.avatar) dispatch(getRandomAvatar());
      resetFormFields();
      navigate("/");
    } else {
      setShowSnackbar(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: green[500],
      },
      secondary: {
        main: red[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {showSnackbar ? (
        <SnackbarMessage message={"Invalid login data!"} type={"error"} />
      ) : null}
    </ThemeProvider>
  );
};
