"use client";
import { CardContent, Typography, Box } from "@mui/material";
import { useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CategorySelect from "../CategorySelect";
import {
  Container,
  UploadCard,
  UploadArea,
  PreviewGrid,
  PreviewContainer,
  PreviewImage,
  PreviewOverlay,
  IconWrapper,
  ErrorText,
  HiddenInput,
  DeleteButton,
} from "./style";
import { toast } from "react-hot-toast";

export default function ImageUploader({ onImageUpload }) {
  const [previews, setPreviews] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newPreviews = [];
    const invalidFiles = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        invalidFiles.push(`${file.name} is not an image file`);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name} exceeds 5MB limit`);
        return;
      }

      newPreviews.push({
        url: URL.createObjectURL(file),
        file: file,
        categories: selectedCategories,
      });
    });

    if (invalidFiles.length > 0) {
      setError(invalidFiles.join(", "));
      return;
    }

    setError("");
    setPreviews([...previews, ...newPreviews]);
    if (onImageUpload) {
      onImageUpload(
        newPreviews.map((p) => ({
          file: p.file,
          categories: p.categories,
        }))
      );
    }
  };

  const handleRemove = (index) => {
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index].url);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    if (onImageUpload) {
      onImageUpload(
        newPreviews.map((p) => ({
          file: p.file,
          categories: p.categories,
        }))
      );
    }
  };

  const handleAddClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    if (previews.length > 0) {
      const updatedPreviews = previews.map((preview) => ({
        ...preview,
        categories,
      }));
      setPreviews(updatedPreviews);
      if (onImageUpload) {
        onImageUpload(
          updatedPreviews.map((p) => ({
            file: p.file,
            categories: p.categories,
          }))
        );
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedCategories.length === 0) {
      toast.error("Please select at least one category");
      return;
    }

    // ... rest of the existing handleSubmit code ...
  };

  return (
    <Container>
      <UploadCard elevation={0}>
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <UploadArea>
            {previews.length > 0 ? (
              <>
                <PreviewGrid>
                  {previews.map((preview, index) => (
                    <PreviewContainer key={preview.url}>
                      <PreviewImage
                        src={preview.url}
                        alt={`Preview ${index + 1}`}
                      />
                      <PreviewOverlay className="preview-overlay">
                        <DeleteButton
                          onClick={() => handleRemove(index)}
                          size="small"
                        >
                          <DeleteIcon />
                        </DeleteButton>
                      </PreviewOverlay>
                    </PreviewContainer>
                  ))}
                  {previews.length < 4 && (
                    <PreviewContainer
                      sx={{
                        border: "1px dashed",
                        borderColor: "grey.300",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": {
                          borderColor: "primary.main",
                          backgroundColor: "grey.50",
                        },
                      }}
                      onClick={handleAddClick}
                    >
                      <AddPhotoAlternateIcon
                        sx={{ fontSize: 40, color: "primary.main" }}
                      />
                    </PreviewContainer>
                  )}
                </PreviewGrid>
              </>
            ) : (
              <Box
                onClick={handleAddClick}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: 1.5,
                  cursor: "pointer",
                  width: "100%",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    "& .upload-icon": {
                      transform: "scale(1.1)",
                    },
                  },
                }}
              >
                <IconWrapper>
                  <AddPhotoAlternateIcon
                    className="upload-icon"
                    sx={{
                      fontSize: 40,
                      color: "black",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </IconWrapper>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "black",
                    fontSize: "1.1rem",
                  }}
                >
                  Click to upload images
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                  }}
                >
                  SVG, PNG, JPG or JPEG (max. 5MB each)
                </Typography>
              </Box>
            )}
            <HiddenInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
            {error && <ErrorText>{error}</ErrorText>}
          </UploadArea>
        </CardContent>
      </UploadCard>
      <CategorySelect
        selectedCategories={selectedCategories}
        onChange={handleCategoryChange}
        required
        error={selectedCategories.length === 0}
        helperText={
          selectedCategories.length === 0 ? (
            <Typography
              color="error"
              variant="caption"
              sx={{
                display: "block",
                mt: 1,
                ml: 1,
              }}
            >
              Please select at least one category
            </Typography>
          ) : null
        }
        sx={{
          "& .MuiChip-root": {
            borderColor:
              selectedCategories.length === 0 ? "error.main" : "inherit",
          },
        }}
      />
    </Container>
  );
}
