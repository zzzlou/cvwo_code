import React, { FormEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Card, Container, DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import type { DialogProps } from "@mui/material";

const PostNewBar: React.FC<{ handleCreate: Function }> = ({ handleCreate }) => {
  const [post, setPost] = useState("");
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ultimateHandleCreate = () => {
    handleCreate(title, details);
    setTitle("");
    setDetails("");
    setOpen(false);
  };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          marginTop: 20,
          marginBottom: 5,
          width: "600px",
        }}
        variant="outlined"
      >
        <TextField
          size="small"
          variant="outlined"
          placeholder="Post a new thread"
          onClick={handleClickOpen}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 1,
            "& .MuiInputBase-root": {
              width: "100%",
            },
          }}
        />
      </Card>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleClose();
          }
        }}
        sx={{
          "& .MuiDialog-paper": {
            height: "50%",
            width: "80%",
            maxWidth: "600px",
          },
        }}
        disableEscapeKeyDown
      >
        <DialogTitle>
          Create New Post
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details of your new post.
          </DialogContentText>
          <TextField
            autoFocus
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            margin="dense"
            id="postTitle"
            label="Post Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="postContent"
            label="Post Content"
            type="text"
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
            fullWidth
            multiline
            rows={4}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <IconButton
            onClick={ultimateHandleCreate}
            style={{ marginLeft: "auto" }}
          >
            Create
          </IconButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default PostNewBar;
