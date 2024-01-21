import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Container } from "@mui/material";
import { categories } from "./categories";

const Filter: React.FC<{
  selectedCategory: String;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}> = ({ selectedCategory, setSelectedCategory }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    handleClose();
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
      }}
    >
      <Button
        aria-controls="category-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<FilterListIcon />}
      >
        Category: {selectedCategory}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {categories.map((category) => (
          <MenuItem onClick={() => handleSelect(category)}>{category}</MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export default Filter;
