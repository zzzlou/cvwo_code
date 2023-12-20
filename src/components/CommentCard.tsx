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

const CommentCard: React.FC<{ comment: singleComment }> = ({ comment }) => {
  const { likes, likeStatus, handleLike, handleDisLike } = useLikeDislike(
    comment.likes,
    0
  );
  return (
    <Card variant="outlined" style={{ marginTop: 5 }}>
      <CardHeader
        title={comment.userName}
        subheader={`Posted on ${comment.time}`}
        titleTypographyProps={{ fontSize: "1.2rem", fontWeight: "bold" }}
        subheaderTypographyProps={{ fontSize: "1rem" }}
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
      </CardActions>
    </Card>
  );
};

export default CommentCard;
