"use client";
import {
  Box,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { categories } from "./categories";

const CategoryContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  // padding: theme.spacing(2),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  "& .MuiSelect-select": {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(0.5),
  },
}));

const CategoryTag = styled(Box)(({ color }) => ({
  display: "inline-block",
  padding: "2px 8px",
  borderRadius: "12px",
  backgroundColor: `${color}20`,
  color: color,
  fontSize: "0.875rem",
  marginRight: "4px",
}));

export default function CategorySelect({ selectedCategories, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const getSelectedCategoryNames = () => {
    return selectedCategories
      .map((id) => categories.find((cat) => cat.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <CategoryContainer>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Select Categories</InputLabel>
        <StyledSelect
          labelId="category-select-label"
          id="category-select"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          renderValue={getSelectedCategoryNames}
          label="Select Categories"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              <Checkbox checked={selectedCategories.includes(category.id)} />
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CategoryTag color="black">{category.name}</CategoryTag>
                  </Box>
                }
              />
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </CategoryContainer>
  );
}
