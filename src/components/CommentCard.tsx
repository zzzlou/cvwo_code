import React from "react";
import { singleComment } from "../App";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useEffect, useState } from "react";
import { useLikeDislike } from "./ThreadCard";
import { convertTime } from "./DetailedThreadCard";
import DeleteIcon from "@mui/icons-material/Delete";

const CommentCard: React.FC<{
  comment: singleComment;
  handleDeleteComment: Function;
}> = ({ comment, handleDeleteComment }) => {
  const { likes, likeStatus, handleLike, handleDisLike } = useLikeDislike(
    comment.likes,
    0
  );
  let time = convertTime(comment.created_at);
  return (
    <Card variant="outlined" style={{ marginTop: 5 }}>
      <CardHeader
        title={comment.username}
        subheader={`Posted on ${time}`}
        titleTypographyProps={{ fontSize: "1.2rem", fontWeight: "bold" }}
        subheaderTypographyProps={{ fontSize: "0.8rem" }}
      />

      <CardContent>
        <Typography>{comment.content}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleLike}>
          <ThumbUpIcon style={{ fill: likeStatus === 1 ? "coral" : "grey" }} />
          {likes}
        </IconButton>
        <IconButton onClick={handleDisLike}>
          <ThumbDownIcon
            style={{ fill: likeStatus === -1 ? "coral" : "grey" }}
          />
        </IconButton>
        <IconButton
          onClick={() => handleDeleteComment(comment.id)}
          style={{ marginLeft: "auto" }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CommentCard;
