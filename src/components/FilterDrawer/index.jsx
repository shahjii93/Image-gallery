"use client";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Chip,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CategoryList = styled(List)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  "&.selected": {
    borderWidth: 2,
  },
}));

const NoResults = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CategoryTitle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  gap: theme.spacing(1),
}));

export default function FilterDrawer({
  open,
  onClose,
  categories,
  onFilterChange,
  selectedCategories = [],
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleCategoryToggle = (categoryId) => {
    const newSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onFilterChange(newSelection);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    onFilterChange([]);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 400 } },
      }}
    >
      <DrawerHeader>
        <Typography variant="h6">Filter Images</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <SearchContainer>
        <TextField
          fullWidth
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
          size="small"
        />
      </SearchContainer>
      <Box sx={{ p: 2 }}>
        <Stack direction="column" spacing={1} gap={2}>
          <CategoryTitle>
            <Typography variant="subtitle2">Selected Filters:</Typography>
            {selectedCategories.length > 0 ? (
              <Chip
                label="Clear All"
                size="small"
                onClick={handleClearFilters}
                variant="outlined"
              />
            ) : null}
          </CategoryTitle>
          {selectedCategories.length > 0 ? (
            <Box>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                gap={1}
                sx={{ flex: 1 }}
              >
                {selectedCategories.map((catId) => {
                  const category = categories.find((c) => c.id === catId);
                  return (
                    <CategoryChip
                      key={catId}
                      label={category.name}
                      onDelete={() => handleCategoryToggle(catId)}
                      sx={{
                        bgcolor: "grey.100",
                        color: "text.primary",
                        borderRadius: "16px",
                        "&:hover": {
                          bgcolor: "grey.200",
                        },
                        "& .MuiChip-deleteIcon": {
                          color: "text.secondary",
                          "&:hover": {
                            color: "text.primary",
                          },
                        },
                        transition: "all 0.2s ease",
                        fontWeight: 500,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: "center",
              }}
            >
              No filters selected
            </Typography>
          )}
        </Stack>
      </Box>
      <Divider />
      <CategoryList>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <ListItem key={category.id} disablePadding>
              <ListItemButton
                onClick={() => handleCategoryToggle(category.id)}
                selected={selectedCategories.includes(category.id)}
              >
                <ListItemIcon>
                  <Box
                    component="img"
                    src={category.image}
                    alt={category.name}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      objectFit: "cover",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={category.name}
                  secondary={category.description}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: "text.primary",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <NoResults>
            <Typography variant="body1">No categories found</Typography>
            <Typography variant="body2">
              Try adjusting your search terms
            </Typography>
          </NoResults>
        )}
      </CategoryList>
    </Drawer>
  );
}
