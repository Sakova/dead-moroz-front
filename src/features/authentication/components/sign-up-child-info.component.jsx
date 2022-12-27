import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseStep,
  photoPresent,
} from "../../../store/registration/registrationSlice";
import {
  selectAuthToken,
  updateUserAsync,
  updateAddressAsync,
} from "../../../store/user/userSlice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";

const defaultFormFields = {
  name: "",
  surname: "",
  age: "",
  street: "",
  house: "",
  floor: "",
};

export const SignUpChildInfo = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [file, setFile] = useState();
  const { name, surname, age, street, house, floor } = formFields;
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await dispatch(
      updateAddressAsync({
        token,
        street,
        house,
        floor,
      })
    );

    if (res.type === "user/fetchCreateAddress/fulfilled") {
      const res = await dispatch(
        updateUserAsync({
          token,
          name,
          surname,
          age,
          avatar: file,
        })
      );
      if (res.type === "user/fetchUpdateUser/fulfilled") {
        resetFormFields();
        if (file) {
          dispatch(photoPresent());
        }
        dispatch(increaseStep());
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        marginTop: 8,
      }}
    >
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12}>
          <h2>Write your info</h2>
        </Grid>
        <Grid xs={4}>
          <TextField
            required
            id="outlined-required"
            label="Name"
            onChange={handleChange}
            name="name"
            value={name}
          />
        </Grid>
        <Grid xs={8}>
          <TextField
            required
            id="outlined-required"
            label="Surname"
            onChange={handleChange}
            name="surname"
            value={surname}
          />
        </Grid>
        <Grid xs={4}>
          <TextField
            required
            id="outlined-number"
            label="Age"
            type="number"
            onChange={handleChange}
            name="age"
            value={age}
          />
        </Grid>
        <Grid
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            startIcon={
              file ? <DoneOutlineRoundedIcon /> : <AddPhotoAlternateIcon />
            }
            component="label"
          >
            Upload avatar
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleFileChange}
            />
          </Button>
        </Grid>
        <Grid xs={12}></Grid>
        <Grid xs={4}>
          <TextField
            required
            id="outlined-required"
            label="Street"
            onChange={handleChange}
            name="street"
            value={street}
          />
        </Grid>
        <Grid xs={8}>
          <TextField
            required
            id="outlined-number"
            label="House"
            onChange={handleChange}
            type="number"
            name="house"
            value={house}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            required
            id="outlined-number"
            label="Floor"
            onChange={handleChange}
            type="number"
            name="floor"
            value={floor}
          />
        </Grid>
        <Grid xs={4} />
        <Grid
          xs={3}
          sx={{
            display: "inline-grid",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <Button type="submit" fullWidth variant="contained">
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
