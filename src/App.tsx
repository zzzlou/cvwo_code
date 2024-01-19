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
import axios from "axios";

export interface singleComment {
  content: string;
  id: number;
  likes: number;
  username: string;
  created_at: string;
}
export interface singleThread {
  title: string;
  details: string;
  category: string;
  id: number;
  likes: number;
  comment_num: number;
  username: string;
  created_at: string;
  comments: singleComment[];
}

const App = () => {
  const [threads, setThreads] = useState<singleThread[]>([]);
  const [threadTrigger, setThreadTrigger] = useState(0); //a trigger to ensure threads sync with backend every time it's created or deleted
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/v1/posts/")
      .then((res) => res.json())
      .then((data) => setThreads(data));
  }, [threadTrigger]);

  const handleDelete = (postId: number) => {
    const deleteURL = `/api/v1/posts/${postId}`;

    fetch(deleteURL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setThreadTrigger((n: number) => n + 1); // Increment threadTrigger to refetch threads
        } else if (response.status === 401) {
          alert(
            "Access Denied: You are not authorized to perform this action. Please login using username 'admin' "
          );
          throw new Error("Unauthorized");
        } else {
          throw new Error("Failed to delete thread");
        }
      })
      .catch((error) => console.error("Error deleting thread", error));
  };

  const handleCreate = (title: string, details: string) => {
    const createURL = `api/v1/posts/`;

    const postData = {
      title: title,
      details: details,
      name: "admin",
      category: "cat",
      likes: 0,
    };

    fetch(createURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setThreadTrigger((n: number) => n + 1);
        } else if (response.status === 401) {
          alert("Access denied: Please login to create a new thread");
          throw new Error("Unauthorized");
        } else {
          throw new Error("Failed to post thread");
        }
      })
      .catch((error) => console.error("Error posting thread", error));
  };

  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                threads={threads}
                handleDelete={handleDelete}
                handleCreate={handleCreate}
              />
            }
          />
          {threads.map((thread) => (
            <Route
              key={thread.id}
              path={`posts/${thread.id}/comments`}
              element={<CommentPage thread={thread} />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
