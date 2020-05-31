import React from "react";
import "./SearchBar.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  Searchbar: {
    width: "100%",
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  return (
    <div className="SearchDiv">
      <TextField
        className={classes.Searchbar}
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
