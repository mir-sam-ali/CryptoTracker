import React from "react";
import "./AddButton.css";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const AddButton = (props) => {
  let classes = "";
  if (!props.show) {
    classes += "Hide";
  }
  return (
    <div className={"addButton scale-up-center " + classes}>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        onClick={props.clicked}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default AddButton;
