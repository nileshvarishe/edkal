import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";

function Header() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Avatar className="logo">Logo</Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
