import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Container } from "@mui/material";
import { categories } from "./categories";
import { useState, useEffect } from "react";

const SelectCategory: React.FC<{
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}> = ({ category, setCategory }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (cat: string) => {
    //cat is for category, but to distinguish it from the useState category
    setCategory(cat);
    handleClose();
  };

  return (
    <Container style={{ marginLeft: -33, marginTop: 5 }}>
      <Button
        aria-controls="category-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<FilterListIcon />}
      >
        {category}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {categories.slice(1).map((category) => (
          <MenuItem onClick={() => handleSelect(category)}>{category}</MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export default SelectCategory;
