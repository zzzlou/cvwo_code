import React from "react";
import { singleThread } from "../App";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";

export const convertTime = (isoString: string) => {
  //convert iso format time to ddmmyyyy
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const ddmmyyyy = `${day}.${month}.${year}`;
  return ddmmyyyy;
};
const DetailedThreadCard: React.FC<{ thread: singleThread }> = ({ thread }) => {
  let time = convertTime(thread.created_at);
  return (
    <Card variant="outlined">
      <CardHeader
        title={thread.title}
        subheader={
          <Typography variant="body2" color="textSecondary" component="div">
            <span style={{ marginRight: 8, fontWeight: "bold" }}>
              {thread.category}
            </span>
            - Posted by {thread.name} on {time}
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
