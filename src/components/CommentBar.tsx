import React, { FormEvent, useState } from "react";
import { singleComment, singleThread } from "../App";
import {
  Card,
  Button,
  IconButton,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CommentBar: React.FC<{
  thread: singleThread;
  handleComment: Function;
}> = ({ thread, handleComment }) => {
  const [comment, setComment] = useState("");
  const ultimateHandleComment = (e: FormEvent) => {
    handleComment(e, thread, comment);
    setComment("");
  };

  return (
    <Card style={{ marginTop: 20, marginBottom: 5 }} variant="outlined">
      <form
        onSubmit={ultimateHandleComment}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          size="small"
          variant="outlined"
          placeholder="Add a new comment"
          multiline
          onChange={(e) => setComment(e.target.value)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 1,
            "& .MuiInputBase-root": {
              width: "100%",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                style={{
                  alignSelf: "flex-end",
                  marginBottom: 12,
                  marginRight: -13,
                }}
              >
                <Button type="submit">Comment</Button>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Card>
  );
};

export default CommentBar;
