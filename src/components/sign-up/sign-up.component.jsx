import { useSelector } from "react-redux";

import SignUpForm from "../sign-up-form/sign-up-form.component";
import SignUpBar from "../sign-up-bar/sign-up-bar.component";
import { selectStep } from "../../store/registration/registrationSlice";
import SingUpChildInfo from "../sign-up-child-info/sign-up-child-info.component";
import SignUpGoodChildBehavior from "../sign-up-good-child-behavior/sign-up-good-child-behavior.component";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple, red } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

const SignUp = () => {
  const step = useSelector(selectStep);

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
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            <SignUpBar />
          </Grid>
          <Grid
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {step === 0 ? (
              <SignUpForm />
            ) : step === 1 ? (
              <SingUpChildInfo />
            ) : (
              <SignUpGoodChildBehavior />
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
