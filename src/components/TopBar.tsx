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
import { Link } from "react-router-dom";
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            My Forum
          </Link>
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
