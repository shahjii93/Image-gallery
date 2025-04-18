import { styled } from "@mui/material/styles";
import { Box, IconButton, Dialog, Card, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
    padding: theme.spacing(1),
  },
  [theme.breakpoints.up("sm")]: {
    minWidth: "500px",
  },
}));

export const UploadCard = styled(Card)(({ theme }) => ({
  backgroundColor: "transparent",
  border: `1px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(2),
  boxShadow: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.grey[50],
  },
}));

export const UploadArea = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  position: "relative",
}));

export const PreviewGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(2),
  width: "100%",
}));

export const PreviewContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  borderRadius: "8px",
  overflow: "hidden",
  aspectRatio: "1",
  "&:hover .preview-overlay": {
    opacity: 1,
  },
}));

export const PreviewImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
  display: "block",
});

export const PreviewOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
}));

export const DeleteButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.error.main,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
}));

export const HiddenInput = styled("input")({
  display: "none",
});

export const IconWrapper = styled(Box)(({ theme }) => ({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  // backgroundColor: theme.palette.primary.light,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // marginBottom: theme.spacing(2),
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "0.875rem",
  marginTop: theme.spacing(1),
}));
