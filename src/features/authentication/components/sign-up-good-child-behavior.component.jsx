import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  selectItems,
  selectPhoto,
} from "../../../store/registration/registrationSlice";
import SnackbarMessage from "../../../components/snackbar/snackbar-message.component";

import MasonryItems from "../../../components/masonry/masonry.component";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TextField from "@mui/material/TextField";
import Masonry from "@mui/lab/Masonry";

const defaultFormField = "";

export const SignUpGoodChildBehavior = () => {
  const dispatch = useDispatch();
  const [formField, setFormField] = useState(defaultFormField);
  const item = formField;
  const items = useSelector(selectItems);
  const isPhotoPresent = useSelector(selectPhoto);

  const resetFormFields = () => {
    setFormField(defaultFormField);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addItem(item));

    resetFormFields();
  };

  const handleChange = (event) => {
    const { value } = event.target;

    setFormField(value);
  };

  const addItemButton = (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        sx={{ mb: 1 }}
        required
        id="outlined-required"
        label="Item"
        onChange={handleChange}
        name="item"
        value={item}
      />
      <Button variant="contained" startIcon={<AddRoundedIcon />} type="submit">
        Add item
      </Button>
    </Box>
  );

  return (
    <Box sx={{ marginTop: 5 }}>
      {!isPhotoPresent ? (
        <SnackbarMessage
          message={"You didn't add avatar, it will auto generate!"}
          type={"info"}
        />
      ) : null}
      {addItemButton}
      <Box sx={{ mt: 1 }}>
        <Box
          component="div"
          sx={{
            minWidth: 499,
            maxWidth: 500,
            maxHeight: 393,
            overflow: "auto",
          }}
        >
          <Masonry columns={4} spacing={2}>
            {items.map((item, index) => (
              <MasonryItems key={index} item={item} index={index} />
            ))}
          </Masonry>
        </Box>
      </Box>
    </Box>
  );
};
