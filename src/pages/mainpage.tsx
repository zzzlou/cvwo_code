import React, { useState, useEffect } from "react";
import { Container, Box, Grid, Button } from "@mui/material";
import TopBar from "../components/TopBar";
import SearchBar from "../components/SearchBar";
import ThreadCard from "../components/ThreadCard";
import { singleThread } from "../App";
import PostNewBar from "../components/PostNewBar";
import Filter from "../components/Filter";

interface MainpageProps {
  threads: singleThread[];
  handleDelete: Function;
  handleCreate: Function;
  selectedCategory: String;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const MainPage: React.FC<MainpageProps> = ({
  threads,
  handleDelete,
  handleCreate,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div style={{ marginTop: "100px" }}>
      <Container style={{ marginTop: "20px" }}>
        <PostNewBar handleCreate={handleCreate} />
        <Filter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
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
