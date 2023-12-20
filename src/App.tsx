import React, { FormEvent } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import BasicCard from "./components/ThreadCard";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import threadsData from "./data";
import CommentPage from "./pages/CommentPage";
import TopBar from "./components/TopBar";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import "./App.css";

export interface singleComment {
  content: string;
  id: number;
  likes: number;
  userName: string;
  time: string;
}
export interface singleThread {
  title: string;
  details: string;
  category: string;
  id: number;
  likes: number;
  commentNum: number;
  userName: string;
  time: string;
  comments: singleComment[];
}

const App = () => {
  const [threads, setThreads] = useState<singleThread[]>(threadsData);

  const handleDelete = (id: number) => {
    const newThreads = threads.filter((thread) => thread.id != id);
    setThreads(newThreads);
  };

  const handleComment = (
    e: FormEvent,
    targetThread: singleThread,
    newCommentContent: string
  ) => {
    e.preventDefault();
    let lastID = threads
      .map((thread) =>
        thread.id === targetThread.id
          ? thread.comments.length > 0
            ? thread.comments[thread.comments.length - 1].id
            : 1
          : null
      )
      .filter((id): id is number => id !== null)[0];
    let newComment: singleComment = {
      content: newCommentContent,
      id: lastID + 1,
      likes: 0,
      userName: "NewUser",
      time: "2023.12.21",
    };
    const updatedThreads = threads.map((thread) =>
      thread.id === targetThread.id
        ? {
            ...thread,
            comments: [...thread.comments, newComment],
            commentNum: thread.comments.length + 1,
          }
        : thread
    );
    setThreads(updatedThreads);
  };

  return (
    <>
      <TopBar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainPage threads={threads} handleDelete={handleDelete} />}
          />
          {threads.map((thread) => (
            <Route
              key={thread.id}
              path={`/comments/${thread.id}`}
              element={
                <CommentPage thread={thread} handleComment={handleComment} />
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
