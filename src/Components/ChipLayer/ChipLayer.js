import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./ChipLayer.css";

const chipLayer = (props) => {
  return (
    <div className="ChipLayer">
      {props.currencies.map((name) => {
        return (
          <Chip
            key={name}
            style={{
              margin: "0.5rem",
            }}
            color="primary"
            label={name}
            onDelete={() => {
              props.deleteCurve(name);
            }}
            avatar={
              <Avatar
                alt={name + " icon"}
                src={props.cryptoList[name].icon_url}
              />
            }
            deleteIcon={<HighlightOffIcon />}
          />
        );
      })}
    </div>
  );
};

export default chipLayer;
