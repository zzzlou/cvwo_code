import React, { useState, useEffect } from "react";
import { Container, Box, Grid } from "@mui/material";
import TopBar from "../components/TopBar";
import SearchBar from "../components/SearchBar";
import ThreadCard from "../components/ThreadCard";
import { singleThread } from "../App";

interface MainpageProps {
  threads: singleThread[];
  handleDelete: Function;
}

const MainPage: React.FC<MainpageProps> = ({ threads, handleDelete }) => {
  return (
    <div style={{ marginTop: "100px" }}>
      <Container style={{ marginTop: "20px" }}>
        {threads.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            handleDelete={handleDelete}
          />
        ))}
      </Container>
    </div>
  );
};
export default MainPage;
