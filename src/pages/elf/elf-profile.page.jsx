import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAuthToken,
  updateUserAsync,
  updateAddressAsync,
  selectUser,
} from "../../store/user/userSlice";
import { SignUpGoodChildBehavior } from "../../features/authentication";
import { selectItems } from "../../store/registration/registrationSlice";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";

const defaultFormFields = {
  email: "",
  password: " ",
  name: "",
  surname: "",
  age: "",
  street: "",
  house: "",
  floor: "",
};

const ProfilePage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [file, setFile] = useState();
  const { email, password, name, surname, age, street, house, floor } =
    formFields;
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const user = useSelector(selectUser);
  const items = useSelector(selectItems);

  useEffect(() => {
    setFormFields({
      ...user.address,
      age: user.age,
      email: user.email,
      name: user.name,
      surname: user.surname,
      password: "",
    });
  }, []);

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
        street,
        house,
        floor,
      })
    );

    if (res.type === "user/fetchCreateAddress/fulfilled") {
      const res = await dispatch(
        updateUserAsync({
          token,
          email,
          password,
          name,
          surname,
          age,
          avatar: file,
        })
      );
      if (res.type === "user/fetchUpdateUser/fulfilled") {
        resetFormFields();
        const res = await dispatch(updateUserAsync({ token, items }));

        if (res.type === "user/fetchUpdateUser/fulfilled") {
          console.log("Update success");
          window.location.reload(false);
        }
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
          }}
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <h2
            style={{
              textDecoration: "underline",
              textDecorationColor: "green",
            }}
          >
            Change Account Data
          </h2>
          <Grid xs={6}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoFocus
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              margin="normal"
              fullWidth
              name="password"
              value={password}
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid
          sx={{
            width: "50%",
          }}
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12}>
            <h2
              style={{
                textDecoration: "underline",
                textDecorationColor: "green",
              }}
            >
              Change User Data
            </h2>
          </Grid>
          <Grid xs={4}>
            <TextField
              label="Name"
              onChange={handleChange}
              name="name"
              value={name}
            />
          </Grid>
          <Grid xs={8}>
            <TextField
              label="Surname"
              onChange={handleChange}
              name="surname"
              value={surname}
            />
          </Grid>
          <Grid xs={4}>
            <TextField
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
              label="Street"
              onChange={handleChange}
              name="street"
              value={street}
            />
          </Grid>
          <Grid xs={8}>
            <TextField
              label="House"
              onChange={handleChange}
              type="number"
              name="house"
              value={house}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
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
          ></Grid>
        </Grid>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SignUpGoodChildBehavior isProfileEdit={true} />
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          sx={{ width: "unset", height: "fit-content" }}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default ProfilePage;
