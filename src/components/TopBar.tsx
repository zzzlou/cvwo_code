import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "./SearchBar";
import CssBaseline from "@mui/material/CssBaseline";
function TopBar() {
  return (
    <AppBar position="fixed">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Forum
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifySelf: "center",
            justifyContent: "center",
            position: "absolute",
          }}
        >
          <SearchBar />
        </div>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
