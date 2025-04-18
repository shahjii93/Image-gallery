"use client";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { FixedSizeGrid } from "react-window";
import { useCallback, useEffect, useState } from "react";
import {
  ImageListContainer,
  GridContainer,
  ImageContainer,
  ImageInnerContainer,
  SavedImage,
  ImageOverlay,
  ImageTitle,
  ImageMetadata,
  ImageInfo,
  EmptyStateContainer,
  cellStyles,
  metadataStyles,
} from "./styles";
import {
  StyledDialog,
  DialogHeader,
  StyledDialogTitle,
  CloseButton,
  ModalContent,
  StyledButton,
} from "../Modal/styles";

const EmptyState = ({ children }) => (
  <EmptyStateContainer>{children}</EmptyStateContainer>
);

export default function ImageList({
  images,
  onDelete,
  onImageSelect,
  isLoadingImages,
}) {
  const [gridDimensions, setGridDimensions] = useState({
    width: 1400,
    height: 800,
    columnCount: 4,
    rowCount: 1,
    columnWidth: 360,
    rowHeight: 360,
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    imageId: null,
  });

  const calculateGridDimensions = useCallback(
    (containerWidth, containerHeight) => {
      let columnCount = 4;
      if (containerWidth < 1200) columnCount = 3;
      if (containerWidth < 900) columnCount = 2;
      if (containerWidth < 600) columnCount = 1;

      const spacing = 16;
      const totalSpacing = spacing * (columnCount + 1);
      const columnWidth = Math.floor(
        (containerWidth - totalSpacing) / columnCount
      );
      const rowHeight = columnWidth;

      const rowCount = Math.ceil(images.length / columnCount);

      return {
        width: containerWidth,
        height: containerHeight,
        columnCount,
        rowCount,
        columnWidth,
        rowHeight,
      };
    },
    [images.length]
  );

  const updateDimensions = useCallback(() => {
    if (typeof window !== "undefined") {
      const containerWidth = Math.min(window.innerWidth, 1400);
      const containerHeight = window.innerHeight - 100;
      const newDimensions = calculateGridDimensions(
        containerWidth,
        containerHeight
      );
      setGridDimensions(newDimensions);
    }
  }, [calculateGridDimensions]);

  useEffect(() => {
    updateDimensions();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, [updateDimensions]);

  const formatDate = useCallback((date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  const Cell = useCallback(
    ({ columnIndex, rowIndex, style }) => {
      const index = rowIndex * gridDimensions.columnCount + columnIndex;
      const image = images[index];

      if (!image) return null;

      return (
        <Box sx={{ ...style, ...cellStyles }}>
          <ImageContainer onClick={() => onImageSelect?.(image)}>
            <ImageInnerContainer>
              <SavedImage
                src={image.url}
                alt={image.name || `Image ${index + 1}`}
                loading="lazy"
              />
              <ImageOverlay className="image-overlay">
                <ImageInfo>
                  <ImageTitle variant="subtitle1">
                    {image.name || `Image ${index + 1}`}
                  </ImageTitle>
                  {image.metadata && (
                    <ImageMetadata>
                      {image.metadata.size} • {image.metadata.resolution}
                    </ImageMetadata>
                  )}
                  {image.uploadDate && (
                    <ImageMetadata sx={metadataStyles}>
                      {formatDate(image.uploadDate)}
                    </ImageMetadata>
                  )}
                </ImageInfo>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirmation({ open: true, imageId: image.id });
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </ImageOverlay>
            </ImageInnerContainer>
          </ImageContainer>
        </Box>
      );
    },
    [images, gridDimensions.columnCount, formatDate]
  );

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.imageId) {
      onDelete(deleteConfirmation.imageId);
      setDeleteConfirmation({ open: false, imageId: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ open: false, imageId: null });
  };

  console.log(isLoadingImages, "isloso");
  if (isLoadingImages) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh", // This ensures vertical centering
          width: "100%",
        }}
      >
        <CircularProgress sx={{ color: "black" }} />
      </Box>
    );
  }
  if (!images.length && !isLoadingImages) {
    return (
      <EmptyState>
        <Typography variant="h6">No images to display</Typography>
        <Typography variant="body2" color="text.secondary">
          Upload some images to get started
        </Typography>
      </EmptyState>
    );
  }

  return (
    <ImageListContainer elevation={0}>
      <GridContainer>
        <FixedSizeGrid
          columnCount={gridDimensions.columnCount}
          columnWidth={gridDimensions.columnWidth}
          height={gridDimensions.height}
          rowCount={gridDimensions.rowCount}
          rowHeight={gridDimensions.rowHeight}
          width={gridDimensions.width}
        >
          {Cell}
        </FixedSizeGrid>
      </GridContainer>
      <StyledDialog
        open={deleteConfirmation.open}
        onClose={handleDeleteCancel}
        maxWidth="xs"
      >
        <DialogHeader>
          <StyledDialogTitle>Delete Image</StyledDialogTitle>
          <CloseButton onClick={handleDeleteCancel} size="small">
            <CloseIcon />
          </CloseButton>
        </DialogHeader>

        <ModalContent>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone. Are you sure you want to delete this
            image?
          </Typography>
        </ModalContent>

        <DialogActions sx={{ p: 0, mt: 2, gap: 1 }}>
          <StyledButton onClick={handleDeleteCancel} variant="outlined">
            Cancel
          </StyledButton>
          <StyledButton
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              backgroundColor: "error.main",
              "&:hover": {
                backgroundColor: "error.dark",
              },
            }}
          >
            Delete
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </ImageListContainer>
  );
}
