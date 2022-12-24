import { useSelector } from "react-redux";

import { SignUpForm } from "../../features/authentication";
import { SignUpLeftBar } from "../../features/authentication";

import { selectStep } from "../../store/registration/registrationSlice";
import { SignUpChildInfo } from "../../features/authentication";
import { SignUpGoodChildBehavior } from "../../features/authentication";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

export const SignUp = () => {
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
          <Grid
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <SignUpLeftBar />
          </Grid>
          <Grid xs={6}>
            {step === 0 ? (
              <SignUpForm />
            ) : step === 1 ? (
              <SignUpChildInfo />
            ) : (
              <SignUpGoodChildBehavior />
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
