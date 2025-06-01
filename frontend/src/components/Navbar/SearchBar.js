// src/components/SearchBar/SearchBar.jsx
import React, { useState } from "react";
import { Box, InputBase, IconButton, Paper } from "@mui/material";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", sm: 400, md: 600 },
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "#fff",
        boxShadow: 1,
      }}
    >
      <InputBase
        placeholder="Search Amazon ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ ml: 2, flex: 1 }}
      />
      <FaSearch style={{ padding: "8px" }} />
    </Paper>
  );
};

export default SearchBar;
