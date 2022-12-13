import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectItems,
  selectStep,
} from "../../store/registration/registrationSlice";
import { selectAuthToken, updateUserAsync } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    label: 'Enter your email and password',
    description: `To access the application, you first need to register (enter your email and password).
              You will then be able to access the second registration step.`,
  },
  {
    label: 'Fill in information about yourself',
    description: `Fill in all the fields so that the Dead Moroz can find you and bring you a gift.
              Until you fill in all the fields, the spirit of the Dead Moroz will follow you.`,
  },
  {
    label: 'Write what you did well this year',
    description: `Write down the things you did well this year.
            The number of items is not limited.
            Dead Moroz will draw a conclusion about your good deeds this year and give an appropriate gift.
            But remember: no one has managed to deceive him yet!`,
  },
];

const SignUpBar = () => {
  const activeStep = useSelector(selectStep);
  const items = useSelector(selectItems);
  const token = useSelector(selectAuthToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = () => {
    dispatch(updateUserAsync({ token, items })).then((res) => {
      navigate("/");
    });
  };

  return (
    <Box sx={{ maxWidth: 400, marginTop: 14, marginLeft: "auto" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}></Box>
              {items.length ? (
                <Button
                  onClick={handleFinish}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, width: "25%" }}
                >
                  Finish
                </Button>
              ) : null}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SignUpBar;
