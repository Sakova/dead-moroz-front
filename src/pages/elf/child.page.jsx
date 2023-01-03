import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAuthToken,
  updateUserAsync,
  updateAddressAsync,
  selectUser,
  selectUserRole,
} from "../../store/user/userSlice";
import {
  selectChosenUser,
  selectChosenUserGifts,
  selectChosenUserItems,
  createAssessmentAsync,
  createFeedbackAsync,
  updateAssessmentAsync,
  updateFeedbackAsync,
} from "../../store/elf/elfSlice";
import MasonryItems from "../../components/masonry-items/masonry-items.component";
import MasonryGifts from "../../components/masonry-gifts/masonry-gifts.component";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";

import {
  selectPopoverAnchorEl,
  setPopoverAnchorEl,
} from "../../store/child/childSlice";
import PopoverCard from "../../components/popover-card/popover-card.component";
import Rating from "@mui/material/Rating";

import Popover from "@mui/material/Popover";

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

const defaultElfFormFields = {
  comment: "",
  feedback: "",
};

const ChildPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [elfFormFields, setElfFormFields] = useState(defaultElfFormFields);
  const { email, password, name, surname, age, street, house, floor } =
    formFields;
  const { comment, feedback } = elfFormFields;
  const dispatch = useDispatch();
  const user = useSelector(selectChosenUser);
  const items = useSelector(selectChosenUserItems);
  const userRole = useSelector(selectUserRole);
  const gifts = useSelector(selectChosenUserGifts);

  const [gift, setGift] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorElement = useSelector(selectPopoverAnchorEl);
  const [value, setValue] = useState(0);

  const starVal = user.assessments[0]?.star;
  const commentVal = user.assessments[0]?.comment;
  const feedbackVal = user.feedbacks[0]?.review;

  const handleClick = (event) => {
    dispatch(setPopoverAnchorEl(true));
    setAnchorEl(event.currentTarget);
    setGift(event.currentTarget.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setFormFields({
      ...user.address,
      age: user.age,
      email: user.email,
      name: user.name,
      surname: user.surname,
      password: "",
    });

    setValue(starVal ? starVal : 0);

    setElfFormFields({
      ...elfFormFields,
      comment: commentVal,
      feedback: feedbackVal,
    });
  }, []);

  useEffect(() => {
    if (anchorElement === null) {
      setAnchorEl(null);
    }
  }, [anchorElement]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user?.assessments[0]) {
      const res = await dispatch(
        createAssessmentAsync({
          star: value,
          comment,
          userId: user.id,
        })
      );
    } else {
      await dispatch(
        updateAssessmentAsync({
          star: value,
          comment,
          assessmentId: user.assessments[0].id,
        })
      );
    }

    if (!user?.feedbacks[0]) {
      await dispatch(
        createFeedbackAsync({
          review: feedback,
          userId: user.id,
        })
      );
      window.location.reload();
    } else {
      await dispatch(
        updateFeedbackAsync({
          review: feedback,
          feedbackId: user.feedbacks[0].id,
        })
      );
      window.location.reload();
    }
  };

  const CustomTextField = styled(TextField)({
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
      WebkitTextFillColor: "green",
    },
    "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled": {
      color: "green",
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setElfFormFields({ ...elfFormFields, [name]: value });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "40px",
          }}
        >
          <h2
            style={{
              textDecoration: "underline",
              textDecorationColor: "green",
            }}
          >
            Child Good Behavior
          </h2>
          <Box
            component="div"
            sx={{
              minHeight: "597px",
            }}
          >
            <Box>
              <Box
                component="div"
                sx={{
                  minWidth: 499,
                  maxWidth: 500,
                  maxHeight: 480,
                  overflow: "auto",
                }}
              >
                <Masonry columns={4} spacing={2}>
                  {items.map((item, index) => (
                    <MasonryItems
                      key={index}
                      item={item}
                      index={index}
                      userRole={userRole}
                    />
                  ))}
                </Masonry>
              </Box>
            </Box>
          </Box>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
              marginRight: "40px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                textDecoration: "underline",
                textDecorationColor: "green",
              }}
            >
              User Data
            </h2>

            <CustomTextField label="Name" disabled name="name" value={name} />

            <CustomTextField
              label="Surname"
              disabled
              name="surname"
              value={surname}
            />

            <CustomTextField
              label="Age"
              type="number"
              disabled
              name="age"
              value={age}
            />

            <CustomTextField
              label="Email Address"
              type="email"
              disabled
              name="email"
              value={email}
            />

            <CustomTextField
              label="Street"
              disabled
              name="street"
              value={street}
            />

            <CustomTextField
              label="House"
              disabled
              type="number"
              name="house"
              value={house}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "40px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              textDecoration: "underline",
              textDecorationColor: "green",
            }}
          >
            Child Gifts
          </h2>
          <Box
            component="div"
            sx={{
              minHeight: "597px",
            }}
          >
            <Box>
              <Box
                component="div"
                sx={{
                  minWidth: 499,
                  maxWidth: 500,
                  maxHeight: 480,
                  overflow: "auto",
                }}
              >
                <Masonry columns={4} spacing={0}>
                  {gifts.map((gift, index) => (
                    <Button
                      sx={{
                        display: "block",
                        "&:hover": {
                          backgroundColor: "#fff",
                        },
                      }}
                      key={gift.id}
                      value={JSON.stringify(gift)}
                      disableRipple={true}
                      onClick={handleClick}
                    >
                      <MasonryGifts
                        key={index}
                        gift={gift}
                        index={index}
                        userRole={userRole}
                      />
                    </Button>
                  ))}
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <PopoverCard gift={gift} />
                  </Popover>
                </Masonry>
              </Box>
            </Box>
          </Box>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "40px",
            minWidth: "450px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              textDecoration: "underline",
              textDecorationColor: "green",
            }}
          >
            Elf conclusion
          </h2>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Rating
              name="customized-10"
              defaultValue={2}
              max={10}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="standard-comment-textarea"
              label="Elf comment"
              placeholder="Comment"
              multiline
              variant="standard"
              color="success"
              sx={{ width: "100%" }}
              name="comment"
              onChange={handleChange}
              value={comment}
            />
            <TextField
              id="standard-feedback-textarea"
              label="Elf feedback about child"
              placeholder="Feedback"
              multiline
              variant="standard"
              color="success"
              sx={{ width: "100%", marginTop: "20px" }}
              name="feedback"
              onChange={handleChange}
              value={feedback}
            />
          </Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
              marginTop: "10px",
            }}
          >
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="success"
              sx={{ width: "unset", height: "fit-content" }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChildPage;
