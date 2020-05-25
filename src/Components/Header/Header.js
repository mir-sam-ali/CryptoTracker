import React from "react";
import "./Header.css";
import { AppBar, Toolbar } from "@material-ui/core";
const Header = () => {
  return (
    <AppBar position="static" className="nav">
      <Toolbar className="toolbar">
        <img
          src="https://img.icons8.com/dusk/64/000000/bitcoin.png"
          alt="Bitcoin Logo"
        />
        <p className="heading">CRYPTO TRACKER</p>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
