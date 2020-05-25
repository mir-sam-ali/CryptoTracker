import React from "react";
import "./SearchBar.css";
import TextField from "@material-ui/core/TextField";

const SearchBar = (props) => {
  return (
    <div className="SearchDiv">
      <TextField
        className="Search"
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={(e) => {
          props.searchCurrency(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
