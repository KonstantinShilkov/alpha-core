import React, { FC } from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

const Preloader: FC = () => {
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
      <CircularProgress size={35} />
    </Box>
  );
};

export default Preloader;




