import React from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

let Preloader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <CircularProgress size={25} />
    </Box>
  );
};

export default Preloader;
