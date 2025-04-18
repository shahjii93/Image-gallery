"use client";
import { useState, useEffect, useMemo } from "react";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  DialogContent,
  DialogActions,
  DialogContentText,
  Divider,
  List,
  ListItemText,
  Skeleton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import { createCategory, updateCategory } from "@/services/categoryService";
import useGetCategories from "@/hooks/useGetCategories";
import useDeleteCategory from "@/hooks/useDeleteCategories";
import useUpdateCategories from "@/hooks/useUpdateCategories";

import {
  DrawerContent,
  Header,
  Title,
  StyledDialog,
  DialogHeader,
  StyledDialogTitle,
  StyledTextField,
  SelectText,
  CloseButton,
  CategoryChip,
  ChipsContainer,
  StyledListItem,
  CategoryActions,
} from "./styles";

const LoadingSkeleton = () => (
  <List sx={{ width: "100%", mt: 2 }}>
    {[1, 2, 3, 4, 5].map((index) => (
      <StyledListItem key={index}>
        <ListItemText primary={<Skeleton width="60%" />} sx={{ mr: 2 }} />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton width={32} height={32} variant="circular" />
          <Skeleton width={32} height={32} variant="circular" />
        </Box>
      </StyledListItem>
    ))}
  </List>
);

export default function CategoryDrawer({
  open,
  onClose,
  onCategorySelect,
  selectedCategories = [],
}) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { data, isLoading: isLoadingCategories, refetch } = useGetCategories();
  const { mutate: deleteCategory, isLoading: isDeletingCategory } =
    useDeleteCategory();
  const { mutate: updateCategoryMutation } = useUpdateCategories();

  useEffect(() => {
    if (!categories.length && data) {
      setCategories(data);
    } else {
      refetch();
    }
  }, [isLoading, open]);

  const handleCreateCategory = async (categoryData) => {
    setIsLoading(true);
    setError(null);
    try {
      const created = await createCategory(categoryData);
      const updatedCategories = [created, ...categories];
      setCategories(updatedCategories);
      setCreateDialogOpen(false);
      setNewCategory({ name: "" });
    } catch (err) {
      setError("Failed to create category. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async (categoryData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await updateCategory(categoryData.id, categoryData);
      setCategories(
        categories.map((cat) => (cat.id === updated.id ? updated : cat))
      );
    } catch (err) {
      setError("Failed to update category. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    setIsLoading(true);
    setError(null);
    try {
      deleteCategory(selectedCategory.id);
      const updatedCategories = categories.filter(
        (cat) => cat.id !== selectedCategory.id
      );
      setCategories(updatedCategories);
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
      if (
        onCategorySelect &&
        selectedCategories.includes(selectedCategory.id)
      ) {
        onCategorySelect(
          selectedCategories.filter((id) => id !== selectedCategory.id)
        );
      }
    } catch (err) {
      setError("Failed to delete category. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (!onCategorySelect) return;
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategorySelect(newSelected);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditDialogOpen(true);
  };

  const handleUpdateSubmit = (updatedData) => {
    updateCategoryMutation(
      {
        categoryId: selectedCategory.id,
        categoryData: updatedData,
      },
      {
        onSuccess: (data) => {
          const updatedCategories = categories.filter(
            (cat) => cat.id !== selectedCategory.id
          );
          setCategories([data, ...updatedCategories]);
          setDeleteDialogOpen(false);
          setSelectedCategory(null);
          setEditDialogOpen(false);
          // refetch();
          console.log(data);
        },
      }
    );
  };

  const allCategories = useMemo(() => [...categories], [data, categories]);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { boxShadow: "0 0 20px rgba(0,0,0,0.1)" },
        }}
      >
        <DrawerContent>
          <Header>
            <Title variant="h5">Categories</Title>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Header>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => setCreateDialogOpen(true)}
                sx={{
                  backgroundColor: "black",
                  mb: 3,
                  "&:hover": { backgroundColor: "#222" },
                }}
              >
                Add New Category
              </Button>

              <Divider />

              {onCategorySelect ? (
                // Chip view for selection mode
                <ChipsContainer>
                  {allCategories.map((category) => (
                    <CategoryChip
                      key={category.id}
                      label={category.name}
                      selected={selectedCategories.includes(category.id)}
                      onClick={() => handleCategoryClick(category.id)}
                    />
                  ))}
                </ChipsContainer>
              ) : (
                // List view for management mode
                <List sx={{ width: "100%", mt: 2 }}>
                  {allCategories.map((category) => (
                    <StyledListItem
                      key={category.id}
                      secondaryAction={
                        <CategoryActions>
                          <IconButton
                            size="small"
                            onClick={() => handleEditClick(category)}
                            sx={{
                              "&:hover": {
                                backgroundColor: "action.hover",
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedCategory(category);
                              setDeleteDialogOpen(true);
                            }}
                            sx={{
                              "&:hover": {
                                backgroundColor: "error.light",
                                color: "error.main",
                              },
                            }}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </CategoryActions>
                      }
                    >
                      <ListItemText
                        primary={category.name}
                        sx={{
                          "& .MuiTypography-root": {
                            fontWeight: 500,
                          },
                        }}
                      />
                    </StyledListItem>
                  ))}
                </List>
              )}
            </>
          )}
        </DrawerContent>
      </Drawer>

      <CategoryDialog
        open={createDialogOpen}
        onClose={() => {
          setCreateDialogOpen(false);
          setSelectedCategory(null);
        }}
        onSave={handleCreateCategory}
        initialData={newCategory}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDeleteCategory}
        categoryName={selectedCategory?.name}
      />

      <CategoryDialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedCategory(null);
        }}
        onSave={handleUpdateSubmit}
        initialData={selectedCategory}
        title="Edit Category"
      />
    </>
  );
}
//drawer
const CategoryDialog = ({
  open,
  onClose,
  onSave,
  initialData,
  title = "Create New Category",
}) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
      });
    }
  }, [initialData]);

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogHeader>
        <StyledDialogTitle>{title}</StyledDialogTitle>
        <CloseButton onClick={onClose} size="small">
          <CloseIcon />
        </CloseButton>
      </DialogHeader>
      <DialogContent sx={{ padding: "16px 0" }}>
        <StyledTextField
          autoFocus
          label="Category Name"
          fullWidth
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </DialogContent>
      <DialogActions sx={{ p: 0, mt: 2 }}>
        <SelectText onClick={onClose}>Cancel</SelectText>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "black",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#222" },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};
//delete modal
const DeleteDialog = ({ open, onClose, onConfirm, categoryName }) => (
  <StyledDialog open={open} onClose={onClose}>
    <DialogHeader>
      <StyledDialogTitle>Delete Category</StyledDialogTitle>
      <CloseButton onClick={onClose} size="small">
        <CloseIcon />
      </CloseButton>
    </DialogHeader>
    <DialogContent sx={{ p: 0 }}>
      <DialogContentText>
        Are you sure you want to delete "{categoryName}"? This action cannot be
        undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ p: 0, mt: 2 }}>
      <SelectText onClick={onClose}>Cancel</SelectText>
      <Button
        onClick={onConfirm}
        variant="contained"
        color="error"
        sx={{ borderRadius: "8px" }}
      >
        Delete
      </Button>
    </DialogActions>
  </StyledDialog>
);
