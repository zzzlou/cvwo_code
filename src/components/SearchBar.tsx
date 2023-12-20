import React, { FormEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Search query submitted:", search);
    setSearch("");
  };
  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        style={{
          width: "300px",
        }}
        InputProps={{ style: { backgroundColor: "white" } }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "white" }} />
      </IconButton>
    </form>
  );
};
export default SearchBar;
