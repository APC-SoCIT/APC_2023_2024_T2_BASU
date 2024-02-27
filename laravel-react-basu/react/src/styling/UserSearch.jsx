import React, { useState } from "react";
import { TextField } from "@mui/material";

export default function UserSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "16px" }}>
        <TextField
          label="Search User"
          value={searchTerm}
          onChange={handleSearch}
          variant="outlined"
          size="small"
        />
      </div>
    </>
  );
}
