import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const AuthPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.location.pathname === "/sign-up") setValue(1);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signInTab = (event) => {
    event.preventDefault();
    navigate("/sign-in");
  };

  const signUpTab = (event) => {
    event.preventDefault();
    navigate("/sign-up");
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          "& .MuiTabs-flexContainer": {
            justifyContent: "center",
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <Tab label="Sign In" onClick={signInTab} />
          <Tab label="Sign Up" onClick={signUpTab} />
        </Tabs>
      </Box>
      <Outlet />
    </>
  );
};

export default AuthPage;
