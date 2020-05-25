import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import "./SortSelect.css";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
const SortSelect = (props) => {
  let [selectValue, setSelectValue] = useState("A-Z");
  return (
    <div className="SortSelectDiv">
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={(e) => {
            setSelectValue(e.target.value);
            props.changeHandler(e.target.value);
          }}
          value={selectValue}
          label="Sort"
        >
          <MenuItem value={"A-Z"}>A-Z</MenuItem>
          <MenuItem value={"PRICE_HIGH"}>Price: High To Low</MenuItem>
          <MenuItem value={"PRICE_LOW"}>Price: Low To High</MenuItem>
          <MenuItem value={"PERCENTAGE_HIGH"}>
            Percentage Change: High To Low
          </MenuItem>
          <MenuItem value={"PERCENTAGE_LOW"}>
            Percentage Change: Low To High
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortSelect;
