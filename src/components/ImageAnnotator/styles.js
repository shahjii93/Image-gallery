import { styled } from "@mui/material/styles";
import { Box, IconButton, Dialog } from "@mui/material";

export const AnnotatorContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  backgroundColor: "#f5f5f5",
  cursor: "crosshair",
  "& img": {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    userSelect: "none",
    WebkitUserSelect: "none",
  },
});

export const AnnotationCanvas = styled("canvas")({
  position: "absolute",
  top: 0,
  left: 0,
  pointerEvents: "none",
});

export const AnnotationControls = styled(Box)({
  position: "absolute",
  top: -30,
  right: -10,
  display: "flex",
  gap: "4px",
});

export const ControlButton = styled(IconButton)({
  padding: 4,
  backgroundColor: "white",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "& svg": {
    fontSize: 16,
  },
});

export const ColorPalette = styled(Box)({
  position: "absolute",
  top: 16,
  left: 16,
  display: "flex",
  gap: "8px",
  padding: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  zIndex: 1000,
});

export const ColorButton = styled(Box)(({ selected }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.2s ease",
  transform: selected ? "scale(1.1)" : "scale(1)",
  boxShadow: selected ? "0 0 0 2px white, 0 0 0 4px currentColor" : "none",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 0 0 2px white, 0 0 0 4px currentColor",
  },
}));

export const DeleteDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 12,
    padding: theme.spacing(1),
    minWidth: 200,
  },
  "& .MuiDialogTitle-root": {
    textAlign: "center",
    color: "black",
    fontSize: "12px",
    padding: 8,
    width: "fit-content",
  },
  "& .MuiDialogActions-root": {
    justifyContent: "flex-end",
  },
  "& .MuiButton-root": {
    fontSize: "12px",
    padding: "4px 8px",
    minWidth: "60px",
    borderRadius: "6px",
    textTransform: "none",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-1px)",
    },
  },
}));

export const StyledMenuItem = (theme, selectedColor, color, values) => ({
  color: values.border,
  fontWeight: selectedColor === color ? 600 : 400,
});

export const CancelButton = (theme) => ({
  borderColor: "divider",
  color: "text.secondary",
  "&:hover": {
    borderColor: "text.primary",
    backgroundColor: "action.hover",
  },
});

export const DeleteButton = (theme) => ({
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: "error.dark",
  },
});

export const ImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};
