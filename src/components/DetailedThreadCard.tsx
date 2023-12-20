import React from "react";
import { singleThread } from "../App";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";

const DetailedThreadCard: React.FC<{ thread: singleThread }> = ({ thread }) => {
  return (
    <Card variant="outlined">
      <CardHeader
        title={thread.title}
        subheader={
          <Typography variant="body2" color="textSecondary" component="div">
            <span style={{ marginRight: 8, fontWeight: "bold" }}>
              {thread.category}
            </span>
            - Posted by {thread.userName} on {thread.time}
          </Typography>
        }
        titleTypographyProps={{ fontSize: "1.2rem", fontWeight: "bold" }}
      />
      <CardContent>
        <Typography>{thread.details}</Typography>
      </CardContent>
    </Card>
  );
};

export default DetailedThreadCard;
