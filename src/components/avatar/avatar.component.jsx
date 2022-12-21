import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import { logOutUserAsync, selectAvatar } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

export const ImageAvatar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const avatar = useSelector(selectAvatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => (prev ? false : true));
  };

  const handleSignOut = async () => {
    const res = await dispatch(logOutUserAsync());
    if (res.type === "user/fetchLogOut/fulfilled") {
      navigate("/sign-in");
    }
  };

  return (
    <>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={"bottom-end"}
        transition
        sx={{ zIndex: 1101 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Button onClick={() => handleSignOut()} variant="outlined">
                Sign Out
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Avatar onClick={handleClick()} src={avatar} />
      </ClickAwayListener>
    </>
  );
};
