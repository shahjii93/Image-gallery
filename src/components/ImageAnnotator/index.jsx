import {
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState, useCallback } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PaletteIcon from "@mui/icons-material/Palette";
import {
  AnnotatorContainer,
  AnnotationControls,
  ControlButton,
  ColorPalette,
  ColorButton,
  DeleteDialog,
} from "./styles";

const ANNOTATION_COLORS = {
  red: { border: "#f44336", background: "rgba(244, 67, 54, 0.1)" },
  blue: { border: "#2196f3", background: "rgba(33, 150, 243, 0.1)" },
  green: { border: "#4caf50", background: "rgba(76, 175, 80, 0.1)" },
  purple: { border: "#9c27b0", background: "rgba(156, 39, 176, 0.1)" },
  orange: { border: "#ff9800", background: "rgba(255, 152, 0, 0.1)" },
};
export const AnnotationOverlay = styled(Box, {
  shouldComponentUpdate: true,
  shouldForwardProp: (prop) => !["color", "isActive"].includes(prop),
})(({ theme, color = "blue", isActive }) => ({
  position: "absolute",
  border: `2px solid ${
    ANNOTATION_COLORS[color]?.border || ANNOTATION_COLORS.blue.border
  }`,
  backgroundColor: isActive
    ? ANNOTATION_COLORS[color]?.background || ANNOTATION_COLORS.blue.background
    : "transparent",
  pointerEvents: "auto",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor:
      ANNOTATION_COLORS[color]?.background || ANNOTATION_COLORS.blue.background,
  },
}));

const ImageAnnotator = ({
  image,
  annotations: initialAnnotations = [],
  onAnnotationsChange,
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentAnnotation, setCurrentAnnotation] = useState(null);
  const [activeAnnotation, setActiveAnnotation] = useState(null);
  const [imageScale, setImageScale] = useState({ x: 1, y: 1 });
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const [colorMenuAnchor, setColorMenuAnchor] = useState(null);
  const [selectedColor, setSelectedColor] = useState("blue");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [annotationToDelete, setAnnotationToDelete] = useState(null);

  // Ensure annotations is always an array
  const annotations = Array.isArray(initialAnnotations)
    ? initialAnnotations
    : [];

  const updateImageMetrics = useCallback(() => {
    const container = containerRef.current;
    const img = imageRef.current;

    if (!container || !img) return;

    const containerRect = container.getBoundingClientRect();
    const containerRatio = containerRect.width / containerRect.height;
    const imageRatio = img.naturalWidth / img.naturalHeight;

    let scale = { x: 1, y: 1 };
    let offset = { x: 0, y: 0 };

    if (containerRatio > imageRatio) {
      // Height limited
      const height = containerRect.height;
      const width = height * imageRatio;
      scale.x = width / img.naturalWidth;
      scale.y = height / img.naturalHeight;
      offset.x = (containerRect.width - width) / 2;
    } else {
      // Width limited
      const width = containerRect.width;
      const height = width / imageRatio;
      scale.x = width / img.naturalWidth;
      scale.y = height / img.naturalHeight;
      offset.y = (containerRect.height - height) / 2;
    }

    setImageScale(scale);
    setImageOffset(offset);
  }, []);

  useEffect(() => {
    updateImageMetrics();
    window.addEventListener("resize", updateImageMetrics);
    return () => window.removeEventListener("resize", updateImageMetrics);
  }, [updateImageMetrics]);

  const screenToImageCoordinates = useCallback(
    (x, y) => {
      return {
        x: Math.round((x - imageOffset.x) / imageScale.x),
        y: Math.round((y - imageOffset.y) / imageScale.y),
      };
    },
    [imageScale, imageOffset]
  );

  const imageToScreenCoordinates = useCallback(
    (x, y, width, height) => {
      return {
        x: x * imageScale.x + imageOffset.x,
        y: y * imageScale.y + imageOffset.y,
        width: width * imageScale.x,
        height: height * imageScale.y,
      };
    },
    [imageScale, imageOffset]
  );

  const handleMouseDown = (e) => {
    if (e.target !== containerRef.current && e.target !== imageRef.current)
      return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPos({ x, y });
    setCurrentAnnotation({
      x,
      y,
      width: 0,
      height: 0,
      color: selectedColor,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentAnnotation((prev) => ({
      ...prev,
      x: Math.min(x, startPos.x),
      y: Math.min(y, startPos.y),
      width: Math.abs(x - startPos.x),
      height: Math.abs(y - startPos.y),
    }));
  };

  const getAnnotationCoordinates = useCallback((annotation) => {
    // Handle both old and new annotation formats
    if (annotation.coordinates) {
      return {
        x: annotation.coordinates.x,
        y: annotation.coordinates.y,
        width: annotation.coordinates.width,
        height: annotation.coordinates.height,
      };
    }
    // Legacy format
    return {
      x: annotation.x || 0,
      y: annotation.y || 0,
      width: annotation.width || 0,
      height: annotation.height || 0,
    };
  }, []);

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (
      currentAnnotation &&
      currentAnnotation.width > 10 &&
      currentAnnotation.height > 10
    ) {
      const imageCoords = screenToImageCoordinates(
        currentAnnotation.x,
        currentAnnotation.y
      );

      const imageSize = {
        width: Math.round(currentAnnotation.width / imageScale.x),
        height: Math.round(currentAnnotation.height / imageScale.y),
      };

      const newAnnotation = {
        id: Date.now().toString(),
        imageId: image?.id || "temp",
        type: "rectangle",
        coordinates: {
          x: imageCoords.x,
          y: imageCoords.y,
          width: imageSize.width,
          height: imageSize.height,
        },
        color: currentAnnotation.color || "blue",
      };

      onAnnotationsChange(
        Array.isArray(annotations)
          ? [...annotations, newAnnotation]
          : [newAnnotation]
      );
    }
    setCurrentAnnotation(null);
  };

  const handleDeleteClick = (e, annotationId) => {
    e.stopPropagation();
    setAnnotationToDelete(annotationId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (annotationToDelete) {
      onAnnotationsChange(
        Array.isArray(annotations)
          ? annotations.filter((a) => a.id !== annotationToDelete)
          : []
      );
      setActiveAnnotation(null);
    }
    setDeleteDialogOpen(false);
    setAnnotationToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setAnnotationToDelete(null);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (activeAnnotation) {
      onAnnotationsChange(
        Array.isArray(annotations)
          ? annotations.map((a) =>
              a.id === activeAnnotation ? { ...a, color } : a
            )
          : []
      );
    }
    setColorMenuAnchor(null);
  };

  return (
    <AnnotatorContainer
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <ColorPalette>
        {Object.entries(ANNOTATION_COLORS).map(([color, values]) => (
          <Tooltip
            key={color}
            title={color.charAt(0).toUpperCase() + color.slice(1)}
            placement="bottom"
          >
            <ColorButton
              selected={selectedColor === color}
              onClick={() => setSelectedColor(color)}
              sx={{
                backgroundColor: values.border,
                color: values.border,
              }}
            />
          </Tooltip>
        ))}
      </ColorPalette>

      <img
        ref={imageRef}
        src={image?.url}
        alt="Annotation target"
        onLoad={updateImageMetrics}
        draggable={false}
      />

      {Array.isArray(annotations) &&
        annotations.map((annotation) => {
          if (!annotation) return null;

          const coords = getAnnotationCoordinates(annotation);
          const screenCoords = imageToScreenCoordinates(
            coords.x,
            coords.y,
            coords.width,
            coords.height
          );

          return (
            <AnnotationOverlay
              key={annotation.id || Date.now().toString()}
              color={annotation.color || "blue"}
              isActive={activeAnnotation === annotation.id}
              onClick={() => setActiveAnnotation(annotation.id)}
              sx={{
                left: screenCoords.x,
                top: screenCoords.y,
                width: screenCoords.width,
                height: screenCoords.height,
              }}
            >
              {activeAnnotation === annotation.id && (
                <AnnotationControls>
                  <Tooltip title="Change color">
                    <ControlButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setColorMenuAnchor(e.currentTarget);
                      }}
                    >
                      <PaletteIcon />
                    </ControlButton>
                  </Tooltip>
                  <Tooltip title="Delete annotation">
                    <ControlButton
                      size="small"
                      onClick={(e) => handleDeleteClick(e, annotation.id)}
                    >
                      <DeleteIcon />
                    </ControlButton>
                  </Tooltip>
                </AnnotationControls>
              )}
            </AnnotationOverlay>
          );
        })}

      {currentAnnotation && (
        <AnnotationOverlay
          color={currentAnnotation.color || "blue"}
          isActive={true}
          sx={{
            left: currentAnnotation.x,
            top: currentAnnotation.y,
            width: currentAnnotation.width,
            height: currentAnnotation.height,
            pointerEvents: "none",
          }}
        />
      )}

      <Menu
        anchorEl={colorMenuAnchor}
        open={Boolean(colorMenuAnchor)}
        onClose={() => setColorMenuAnchor(null)}
      >
        {Object.entries(ANNOTATION_COLORS).map(([color, values]) => (
          <MenuItem
            key={color}
            onClick={() => handleColorChange(color)}
            sx={{
              color: values.border,
              fontWeight: selectedColor === color ? 600 : 400,
            }}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </MenuItem>
        ))}
      </Menu>

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete Annotation?</DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCancelDelete}
            sx={{
              borderColor: "divider",
              color: "text.secondary",
              "&:hover": {
                borderColor: "text.primary",
                backgroundColor: "action.hover",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            sx={{
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "error.dark",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </DeleteDialog>
    </AnnotatorContainer>
  );
};

export default ImageAnnotator;
