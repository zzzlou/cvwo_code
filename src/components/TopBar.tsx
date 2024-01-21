import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog, TextField } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CloseIcon from "@mui/icons-material/Close";
import LoggedinMenu from "./LoggedinMenu";
const TopBar = () => {
  const [username, setUsername] = useState(""); //username is for the login process, loggedInUsername is for storing username after successful login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [open, setOpen] = useState(false); //this is for login form
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");

  const handleClickLogin = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSignUp = () => {
    setSignUpOpen(true);
  };
  const handleCloseSignUp = () => {
    setSignUpOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `/api/v1/login`;
    const loginData = { username: username };
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            setIsLoggedIn(true);
            setLoggedInUsername(username);
            handleClose();
            setUsername("");
          });
        } else if (response.status === 401) {
          alert("Username not found");
          throw new Error("Unauthorized");
        } else {
          throw new Error("Failed to log in");
        }
      })
      .catch((error) => console.error("Error logging in", error));
  };

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `/api/v1/logout`;
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            setIsLoggedIn(false);
            setLoggedInUsername("");
            handleClose();
            setUsername("");
          });
        } else {
          throw new Error("Failed to log out");
        }
      })
      .catch((error) => console.error("Error logging out", error));
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const signUpURL = `/api/v1/users`;
    const signUpData = {
      username: signUpUsername,
    };
    fetch(signUpURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          alert(`Username ${signUpUsername} has been successfully signed up`);
        } else {
          throw new Error("Failed to sign up");
        }
      })
      .catch((error) => console.error("Failed to sign up", error));
    setSignUpUsername("");
    setSignUpOpen(false);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      fetch("/api/v1/check-session", { credentials: "include" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to check login status");
          }
          return response.json();
        })
        .then((data) => {
          if (data.logged_in) {
            setIsLoggedIn(true);
            setLoggedInUsername(data.user.username);
          }
        })
        .catch((error) => console.error("Error checking login status", error));
    };
    checkLoginStatus();
  }, []);

  return (
    <>
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
          ></div>
          {isLoggedIn ? (
            <LoggedinMenu
              loggedInUsername={loggedInUsername}
              handleLogout={handleLogout}
            />
          ) : (
            <>
              <Button onClick={handleClickSignUp} color="inherit">
                Sign up
              </Button>
              <Button onClick={handleClickLogin} color="inherit">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        id="login form"
        open={open}
        sx={{
          "& .MuiDialog-paper": {
            height: "17%",
            width: "40%",
            maxWidth: "600px",
          },
        }}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleClose();
          }
        }}
      >
        <DialogContent>
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              size="small"
              value={username}
              label="Please type your username here"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 3,
                "& .MuiInputBase-root": {
                  width: "100%",
                },
              }}
            />
            <IconButton
              onClick={handleClose}
              style={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Button style={{ marginLeft: "auto" }} type="submit">
              Log in
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        id="sign up form"
        open={signUpOpen}
        sx={{
          "& .MuiDialog-paper": {
            height: "17%",
            width: "40%",
            maxWidth: "600px",
          },
        }}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleCloseSignUp();
          }
        }}
      >
        <DialogContent>
          <form
            onSubmit={handleSignUp}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              size="small"
              value={signUpUsername}
              label="Please type your username here"
              onChange={(e) => {
                setSignUpUsername(e.target.value);
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 3,
                "& .MuiInputBase-root": {
                  width: "100%",
                },
              }}
            />
            <IconButton
              onClick={handleCloseSignUp}
              style={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Button style={{ marginLeft: "auto" }} type="submit">
              Sign Up
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TopBar;
