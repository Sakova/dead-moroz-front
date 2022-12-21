import { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  createChildGiftAsync,
  selectIsModelOpen,
  setModel,
} from "../../store/child/childSlice";
import SnackbarMessage from "../snackbar/snackbar-message.component";

import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import Grid from "@mui/material/Unstable_Grid2";

const BackdropUnstyled = forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const ModalContainer = styled(ModalUnstyled)(`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &.MuiModal-hidden {
    visibility: hidden;
  }
`);

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  width: 400,
  bgcolor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  border: "2px solid currentColor",
  padding: "16px 32px 24px 32px",
  borderRadius: "15px",
});

const defaultFormField = "";

const Modal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => dispatch(setModel());
  const modelState = useSelector(selectIsModelOpen);
  const [file, setFile] = useState();
  const [formField, setFormField] = useState(defaultFormField);
  const [send, setSend] = useState(false);

  const resetFormField = () => {
    setFormField(defaultFormField);
    setFile(null);
    setSend(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;

    setFormField(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetFormField();
    dispatch(setModel());

    const res = await dispatch(
      createChildGiftAsync({
        description: formField,
        photo: file,
      })
    );

    if (res.type === "child/fetchCreateGift/fulfilled") {
      setSend(true);
    }
  };

  useEffect(() => {
    setOpen(modelState);
  }, [modelState]);

  return (
    <div>
      <ModalContainer
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: Backdrop }}
        keepMounted
      >
        <Box
          sx={style}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid xs={12}>
              <h2
                style={{ textAlign: "center", color: "green" }}
                id="keep-mounted-modal-title"
              >
                Write the desired gift
              </h2>
            </Grid>
            <Grid
              xs={8}
              sx={{
                dysplay: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                color="success"
                label="Description"
                required
                variant="outlined"
                onChange={handleChange}
                value={formField}
              />
            </Grid>
            <Grid
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                startIcon={
                  file ? <DoneOutlineRoundedIcon /> : <AddPhotoAlternateIcon />
                }
                component="label"
              >
                Img
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
            <Grid
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: "5px",
              }}
            >
              <Button type="submit" variant="contained" color="success">
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ModalContainer>
      {send ? (
        <SnackbarMessage
          message={"Add a wish successfully!"}
          type={"success"}
        />
      ) : null}
    </div>
  );
};

export default Modal;
