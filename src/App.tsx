import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BasicCard from "./components/ThreadCard";
import SearchBar from "./components/SearchBar";
import MainPage from "./pages/mainpage";
const App = () => {
  return (
    <>
      <MainPage />
    </>
  );
};

export default App;
