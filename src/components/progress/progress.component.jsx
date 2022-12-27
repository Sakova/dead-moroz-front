import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Progress = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "22%",
      }}
    >
      <CircularProgress color="success" size={80} />
    </Box>
  );
};

export default Progress;
