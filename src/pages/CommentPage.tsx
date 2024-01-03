import React, { FormEvent } from "react";
import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import { singleThread, singleComment } from "../App";
import { Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DetailedThreadCard from "../components/DetailedThreadCard";
import CommentBar from "../components/CommentBar";
import CommentCard from "../components/CommentCard";
const useStyles = makeStyles({});

const CommentPage: React.FC<{
  thread: singleThread;
}> = ({ thread }) => {
  const [comments, setComments] = useState<singleComment[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0); //this is a trigger to ensure comment list is updated every time a new comment is posted

  let api = `http://127.0.0.1:3000/api/v1/posts/${thread.id}/comments`;

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments", error));
  }, [thread.id, updateTrigger]);

  const handleComment = (e: FormEvent, newCommentContent: string) => {
    e.preventDefault();
    const url = `http://127.0.0.1:3000/api/v1/posts/${thread.id}/comments/`;
    const commentData = {
      name: "test",
      content: newCommentContent,
      likes: 0,
    };
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        if (response.ok) {
          setUpdateTrigger((n: number) => n + 1); // Increment updateTrigger to refetch comments
        } else {
          throw new Error("Failed to post comment");
        }
      })
      .catch((error) => console.error("Error posting comment", error));
  };
  return (
    <Container style={{ marginTop: "100px", width: "50%" }}>
      <DetailedThreadCard thread={thread} />
      <CommentBar thread={thread} handleComment={handleComment} />

      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </Container>
  );
};

export default CommentPage;
