import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ImageAvatar } from "../components/avatar/avatar.component";
import { isLoggedOut, selectStatus, selectUser } from "../store/user/userSlice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RedeemRoundedIcon from "@mui/icons-material/RedeemRounded";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";
import Progress from "../components/progress/progress.component";
import { getChildGiftsAsync, setModel } from "../store/child/childSlice";
import Modal from "../components/modal/modal.component";

const drawerWidth = 240;

const Root = (props) => {
  const dispatch = useDispatch();
  const isNotLogged = useSelector(isLoggedOut);
  const status = useSelector(selectStatus);
  const user = useSelector(selectUser);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    dispatch(getChildGiftsAsync());
  }, [dispatch]);

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
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <RedeemRoundedIcon color="error" />
            </ListItemIcon>
            <ListItemText primary={"List of gifts"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => handleWishModel()}>
            <ListItemIcon>
              <RedeemRoundedIcon color="success" />
            </ListItemIcon>
            <ListItemText primary={"Write a wish"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
          container={container}
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
