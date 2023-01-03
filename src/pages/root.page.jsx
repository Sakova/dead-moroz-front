import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ImageAvatar } from "../components/avatar/avatar.component";
import { isLoggedOut, selectStatus, selectUser } from "../store/user/userSlice";
import Progress from "../components/progress/progress.component";
import { getChildGiftsAsync, setModel } from "../store/child/childSlice";
import Modal from "../components/modal/modal.component";
import { getUsersAsync, selectChosenUser } from "../store/elf/elfSlice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RedeemRoundedIcon from "@mui/icons-material/RedeemRounded";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ChildCareIcon from "@mui/icons-material/ChildCare";

const drawerWidth = 240;

const Root = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNotLogged = useSelector(isLoggedOut);
  const status = useSelector(selectStatus);
  const user = useSelector(selectUser);
  const chosenUser = useSelector(selectChosenUser);
  const user_role = user.role;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (user_role === "user") dispatch(getChildGiftsAsync());
    if (user_role === "elf") dispatch(getUsersAsync());
    if (!chosenUser && window.location.pathname === "/child-page") {
      navigate("/elf-page");
    }
  }, [user_role]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleWishModel = () => {
    dispatch(setModel());
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{ color: "green", display: "flex", justifyContent: "center" }}
      >
        <Typography sx={{ color: "green" }} variant="h6" noWrap component="div">
          {`Hi, ${user.name} ${user.surname}`}
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        <Link
          to={user_role === "user" ? "/child-gifts" : "/elf-page"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {user_role === "user" ? (
                  <RedeemRoundedIcon color="error" />
                ) : (
                  <ChildCareIcon color="error" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  user_role === "user" ? "List of gifts" : "List of childrens"
                }
              />
            </ListItemButton>
          </ListItem>
        </Link>

        {user_role === "user" ? (
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleWishModel()}>
              <ListItemIcon>
                <RedeemRoundedIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={"Write a wish"} />
            </ListItemButton>
          </ListItem>
        ) : user_role === "elf" &&
          window.location.pathname === "/child-page" ? (
          <>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleWishModel()}>
                <ListItemIcon>
                  <RedeemRoundedIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={"Add alternative gift"} />
              </ListItemButton>
            </ListItem>
          </>
        ) : null}
      </List>

      <Divider />

      <Link to={"profile"} style={{ textDecoration: "none", color: "black" }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleRoundedIcon color="success" />
            </ListItemIcon>
            <ListItemText primary={"Profile page"} />
          </ListItemButton>
        </ListItem>
      </Link>
    </div>
  );

  const customTheme = createTheme({
    palette: {
      primary: {
        main: green[500],
      },
      secondary: {
        main: red[500],
      },
    },
  });

  return isNotLogged ? (
    <Progress />
  ) : (
    <Box sx={{ display: "flex" }}>
      <Modal />
      <CssBaseline />
      <ThemeProvider theme={customTheme}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            borderRadius: "12px",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
            <ImageAvatar />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {status === "loading" ? <Progress /> : <Outlet />}
      </Box>
    </Box>
  );
};

export default Root;
