import React, { useState } from "react";
import "./ListUnit.css";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import AddButton from "../AddButton/AddButton";

const ListUnit = (props) => {
  let [displayAddButton, setDisplayAddButton] = useState(false);

  const percentageChange =
    props.oldValue !== 0
      ? (((props.value - props.oldValue) * 100) / props.oldValue).toFixed(2)
      : 0.0;

  let colorOfChangeRate = "rgba(108,117,125,.6)";
  let changeRate = "" + percentageChange;
  if (percentageChange < 0) {
    colorOfChangeRate = "#ff073a";
  } else if (percentageChange > 0) {
    colorOfChangeRate = "#26bd3c";
    changeRate = "+" + percentageChange;
  } else {
    changeRate = "0";
  }

  return (
    <ListItem
      alignItems="flex-start"
      className="shadow-drop-2-center"
      onMouseEnter={() => {
        setDisplayAddButton(true);
      }}
      onMouseLeave={() => {
        setDisplayAddButton(false);
      }}
    >
      <ListItemAvatar>
        <Avatar
          alt={props.currency.name + " icon"}
          src={props.currency.icon_url}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <span className="CurrencyName">{props.currency.name_full}</span>
            <span
              style={{
                color: colorOfChangeRate,
                fontFamily: "'Roboto Slab', 'serif'",
              }}
            >
              {" " + changeRate + "%"}
            </span>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {"₹ " + props.value}
            </Typography>
          </React.Fragment>
        }
      />
      <AddButton clicked={props.clicked} show={displayAddButton} />
    </ListItem>
  );
};

export default ListUnit;
