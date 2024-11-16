import React from "react";
import Checkbox from "@mui/material/Checkbox";

const CustomCheckBox = () => {
  return (
    <Checkbox
      disabled
      sx={{
        "&.Mui-disabled": {
          width: "18px",
          height: "18px",
          color: "#292222",
        },
      }}
    />
  );
};

export default CustomCheckBox;
