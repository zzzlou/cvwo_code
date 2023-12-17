import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import threadsData from "../data";
import React from "react";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CardActionArea,
  CardHeader,
  IconButton,
  createStyles,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Thread } from "../pages/mainpage";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface ThreadCardProps {
  thread: Thread;
  handleDelete: Function;
}
const useStyles = makeStyles({
  div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: "10px",
    width: "600px",
    transition: "box-shadow 0.1s",
    "&:hover": {
      boxShadow: "1px 3px 5px rgba(0, 0, 0, 0.7)",
    },
  },
  cardContent: {
    backgroundColor: "aquamarine",
  },
  typography: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical" as "vertical",
  },
  action: {
    maxHeight: "20px",
  },
  header: {
    maxHeight: "30px",
  },
});
const ThreadCard: React.FC<ThreadCardProps> = ({ thread, handleDelete }) => {
  const classes = useStyles();
  const useLikeDislike = (initialLikes: number, initialStatus: number) => {
    const [likes, setLikes] = useState(initialLikes);

    const [likeStatus, setLikeStatus] = useState(initialStatus);

    const handleLike = () => {
      if (likeStatus === 1) {
        setLikeStatus(0);
        setLikes(likes - 1);
      } else {
        setLikeStatus(1);
        setLikes(likes + (likeStatus === -1 ? 2 : 1));
      }
      // Don't forget about backend request
    };
    const handleDisLike = () => {
      if (likeStatus === -1) {
        setLikeStatus(0);
        setLikes(likes + 1);
      } else {
        setLikeStatus(-1);
        setLikes(likes - (likeStatus === 1 ? 2 : 1));
      }
      // Don't forget about backend request
    };
    return { likes, likeStatus, handleLike, handleDisLike };
  };

  const { likes, likeStatus, handleLike, handleDisLike } = useLikeDislike(
    thread.likes,
    0
  ); // 1 for liked, -1 for disliked, 0 for neither. Calling useLikeDislike to initiate like system,
  //and this module could be also used for liking/disliking comments
  return (
    <>
      <div className={classes.div}>
        <Card className={classes.card} elevation={1}>
          <CardHeader
            className={classes.header}
            title={thread.title}
            subheader={thread.category}
            titleTypographyProps={{ fontSize: "1.2rem", fontWeight: "bold" }}
            subheaderTypographyProps={{ fontSize: "1rem" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography className={classes.typography}>
              {thread.details}
            </Typography>
          </CardContent>
          <CardActions className={classes.action}>
            <IconButton onClick={handleLike}>
              <ThumbUpIcon
                style={{ fill: likeStatus === 1 ? "coral" : "grey" }}
              />
              {likes}
            </IconButton>
            <IconButton onClick={handleDisLike}>
              <ThumbDownIcon
                style={{ fill: likeStatus === -1 ? "coral" : "grey" }}
              />
            </IconButton>
            <IconButton onClick={() => console.log("clicked")}>
              <CommentIcon />
              {thread.commentNum}
            </IconButton>
            <IconButton
              onClick={() => handleDelete(thread.id)}
              style={{ marginLeft: "auto" }}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default ThreadCard;
