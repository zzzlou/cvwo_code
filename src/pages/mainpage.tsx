import React, { useState, useEffect } from "react";
import { Container, Box, Grid } from "@mui/material";
import threadsData from "../data";
import TopBar from "../components/TopBar";
import SearchBar from "../components/SearchBar";
import ThreadCard from "../components/ThreadCard";

export interface Thread {
  title: string;
  details: string;
  category: string;
  id: number;
  likes: number;
  commentNum: number;
}

const MainPage = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    setThreads(threadsData);
  }, []);

  const handleDelete = (id: number) => {
    const newThreads = threads.filter((thread) => thread.id != id);
    setThreads(newThreads);
  };

  return (
    <>
      <TopBar />
      <div style={{ marginTop: "20px" }}>
        <SearchBar />
      </div>
      <Container style={{ marginTop: "10px" }}>
        {threads.map((thread) => (
          <ThreadCard
            key={thread.id}
            thread={thread}
            handleDelete={handleDelete}
          />
        ))}
      </Container>
    </>
  );
};
export default MainPage;
