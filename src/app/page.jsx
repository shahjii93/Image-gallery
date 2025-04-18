"use client";
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState, useMemo, useEffect, useCallback } from "react";
import Modal from "@/components/Modal";
import ImageUploader from "@/components/ImageUpload";
import ImageList from "@/components/ImageList";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { categories } from "@/components/CategorySelect/categories";
import CategoryIcon from "@mui/icons-material/Category";
import FilterListIcon from "@mui/icons-material/FilterList";
import CategoryDrawer from "@/components/CategoryDrawer";
import { saveAnnotations, getAnnotations } from "@/services/annotationService";
import { fetchImages, uploadImage } from "@/services/imageService";
import CloseIcon from "@mui/icons-material/Close";
import ImageAnnotator from "@/components/ImageAnnotator";
import {
  PageContainer,
  MainContent,
  Header,
  ActionButton,
  TitleBox,
  ProgressBox,
  ActionBox,
  ImageBox,
  ImageListBox,
  titleStyles,
  subtitleStyles,
  actionButtonIconStyles,
  categoryButtonIconStyles,
  closeButtonStyles,
} from "./styles";
import FilterDrawer from "../components/FilterDrawer";
import useGetImages from "@/hooks/useGetImages";
import useDeleteImage from "@/hooks/useDeleteImages";
import { Search } from "@mui/icons-material";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [annotations, setAnnotations] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnnotationModalOpen, setIsAnnotationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const { data, isLoading: isLoadingImages, refetch } = useGetImages();
  const { mutate: deleteImage, isLoading: isDeletingImage } = useDeleteImage();
  // Load images from backend
  useEffect(() => {
    if (!uploadedImages.length && data) {
      setUploadedImages(data);
    } else {
      refetch();
    }
  }, [isLoadingImages]);

  // Handle saving uploaded images
  const handleSave = async () => {
    if (!selectedFiles.length) return;
    try {
      setIsLoading(true);
      const uploadPromises = selectedFiles.map(async ({ file, categories }) => {
        const formData = {
          name: file.name,
          url: URL.createObjectURL(file),
          uploadDate: new Date().toISOString(),
          metadata: {
            size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
            resolution: "1920x1080",
          },
          categoryIds: categories,
        };
        return await uploadImage(formData);
      });
      const newImages = await Promise.all(uploadPromises);
      setUploadedImages((prev) => [...newImages, ...prev]);
      setIsModalOpen(false);
      setSelectedFiles([]);
    } catch (error) {
      setError("Failed to upload images. Please try again.");
      console.error("Error uploading images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting an image
  const handleDelete = (imageId) => {
    try {
      setIsLoading(true);
      deleteImage(imageId);
      setUploadedImages((prev) => {
        const imageToDelete = prev.find((img) => img.id === imageId);
        if (imageToDelete?.url.startsWith("blob:")) {
          URL.revokeObjectURL(imageToDelete.url);
        }
        return prev.filter((img) => img.id !== imageId);
      });
    } catch (error) {
      setError("Failed to delete image. Please try again.");
      console.error("Error deleting image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced search and filter functions
  const filterImagesBySearch = useCallback((image, term) => {
    if (!term) return true;

    const searchTermLower = term.toLowerCase();

    // Search in name
    const nameMatch = image.name?.toLowerCase().includes(searchTermLower);

    // Search in description
    const descriptionMatch = image.description
      ?.toLowerCase()
      .includes(searchTermLower);

    // Search in metadata
    const metadataMatch =
      image.metadata &&
      // Search in resolution (e.g., "1920x1080")
      (image.metadata.resolution?.toLowerCase().includes(searchTermLower) ||
        // Search in size (e.g., "2.5MB")
        image.metadata.size?.toLowerCase().includes(searchTermLower));

    return nameMatch || descriptionMatch || metadataMatch;
  }, []);

  const filterImagesByCategories = useCallback(
    (image) => {
      if (selectedCategoryFilters.length === 0) return true;

      return (
        selectedCategoryFilters.includes(image.categoryId) ||
        (image.categoryIds &&
          image.categoryIds.some((catId) =>
            selectedCategoryFilters.includes(catId)
          ))
      );
    },
    [selectedCategoryFilters]
  );

  // Combined filtering logic
  const filteredImages = useMemo(() => {
    return [...uploadedImages].filter(
      (image) =>
        filterImagesBySearch(image, searchTerm) &&
        filterImagesByCategories(image)
    );
  }, [
    uploadedImages,
    searchTerm,
    filterImagesBySearch,
    filterImagesByCategories,
  ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setIsAnnotationModalOpen(true);
  };

  // Load annotations for the selected image
  useEffect(() => {
    if (selectedImage) {
      const loadAnnotations = async () => {
        try {
          const data = await getAnnotations(selectedImage.id);
          setAnnotations(data);
        } catch (error) {
          console.error("Failed to load annotations:", error);
          setAnnotations([]);
        }
      };

      loadAnnotations();
    }
  }, [selectedImage]);

  // Handle saving annotations for the selected image
  const handleSaveAnnotations = async (newAnnotations) => {
    if (!selectedImage) return;

    try {
      await saveAnnotations(selectedImage.id, newAnnotations);
      setAnnotations(newAnnotations);
    } catch (error) {
      console.error("Failed to save annotations:", error);
    }
  };

  // Handle closing the annotation modal
  const handleCloseAnnotation = () => {
    setIsAnnotationModalOpen(false);
    setSelectedImage(null);
    setAnnotations([]);
  };

  const handleFilterChange = (selectedCategories) => {
    setSelectedCategoryFilters(selectedCategories);
  };

  return (
    <PageContainer disableGutters>
      <MainContent elevation={0}>
        {error && (
          <TitleBox>
            <Typography>{error}</Typography>
            <IconButton
              size="small"
              onClick={() => setError(null)}
              sx={closeButtonStyles}
            >
              <CloseIcon />
            </IconButton>
          </TitleBox>
        )}

        {isLoading && (
          <ProgressBox>
            <CircularProgress />
          </ProgressBox>
        )}

        <Header>
          <Typography variant="h4" sx={titleStyles}>
            Image Gallery
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={subtitleStyles}
          >
            Upload and organize your images into different categories
          </Typography>
          <ActionBox>
            <ActionButton
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              startIcon={<AddPhotoAlternateIcon />}
              sx={actionButtonIconStyles}
            >
              Upload Images
            </ActionButton>
            <ActionButton
              variant="contained"
              onClick={() => setIsCategoryDrawerOpen(true)}
              startIcon={<CategoryIcon />}
              sx={categoryButtonIconStyles}
            >
              Add Categories
            </ActionButton>
            <ActionButton
              variant="contained"
              onClick={() => setIsFilterDrawerOpen(true)}
              startIcon={<FilterListIcon />}
              sx={categoryButtonIconStyles}
            >
              Filter Images
            </ActionButton>
          </ActionBox>
        </Header>
        <Box
          sx={{
            width: "100%",
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search by name, resolution or size"
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" sx={{ fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchTerm("")}
                    edge="end"
                    sx={{
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: "400px",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: (theme) => theme.palette.background.paper,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.grey[50],
                },
                "& fieldset": {
                  borderColor: (theme) => theme.palette.grey[200],
                },
                "&:hover fieldset": {
                  borderColor: (theme) => theme.palette.grey[300],
                },
                "&.Mui-focused fieldset": {
                  borderColor: (theme) => theme.palette.primary.main,
                  borderWidth: 1,
                },
              },
              "& .MuiInputBase-input": {
                padding: "8px 12px",
              },
            }}
          />
          {searchTerm && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              {`Showing ${filteredImages.length} result${
                filteredImages.length !== 1 ? "s" : ""
              }`}
            </Typography>
          )}
        </Box>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        >
          <ImageUploader onImageUpload={setSelectedFiles} />
        </Modal>

        {selectedImage && (
          <Modal
            open={isAnnotationModalOpen}
            onClose={handleCloseAnnotation}
            onSave={handleSaveAnnotations}
            title="Add Annotations"
            maxWidth="xl"
            fullWidth
            fullHeight
          >
            <ImageBox>
              <ImageAnnotator
                image={selectedImage}
                annotations={annotations}
                onAnnotationsChange={setAnnotations}
              />
            </ImageBox>
          </Modal>
        )}

        <CategoryDrawer
          open={isCategoryDrawerOpen}
          onClose={() => setIsCategoryDrawerOpen(false)}
        />
        {(data || isLoadingImages) && (
          <ImageListBox>
            <ImageList
              images={filteredImages}
              onDelete={handleDelete}
              onImageSelect={handleImageSelect}
              isLoadingImages={isLoadingImages}
            />
          </ImageListBox>
        )}
        <FilterDrawer
          open={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          categories={categories}
          onFilterChange={handleFilterChange}
          selectedCategories={selectedCategoryFilters}
        />
      </MainContent>
    </PageContainer>
  );
}
