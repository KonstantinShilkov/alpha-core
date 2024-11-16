import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const options = ["Да", "Нет"];

export default function SingleSelectCheckbox({ placeholder }) {
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getPlaceholder = () => {
    if (selectedOption === "Да") {
      return `${placeholder} +1`;
    }
    return placeholder;
  };

  return (
    <div>
      <FormControl sx={{ width: "180px", height: "30px" }}>
        <Select
          labelId="single-select-checkbox-label"
          id="single-select-checkbox"
          value={selectedOption}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem disabled value="">
            {getPlaceholder()}
          </MenuItem>

          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedOption === option} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
