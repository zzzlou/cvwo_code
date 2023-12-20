import React from "react";
import TopBar from "../components/TopBar";
import { singleThread } from "../App";
import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DetailedThreadCard from "../components/DetailedThreadCard";
import CommentBar from "../components/CommentBar";
import CommentCard from "../components/CommentCard";
const useStyles = makeStyles({});

const CommentPage: React.FC<{
  thread: singleThread;
  handleComment: Function;
}> = ({ thread, handleComment }) => {
  return (
    <Container style={{ marginTop: "100px", width: "50%" }}>
      <DetailedThreadCard thread={thread} />
      <CommentBar thread={thread} handleComment={handleComment} />
      {thread.comments.map((comment) => (
        <CommentCard comment={comment} />
      ))}
    </Container>
  );
};

export default CommentPage;
