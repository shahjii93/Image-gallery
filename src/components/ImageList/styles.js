import { styled } from "@mui/material/styles";
import { Box, Typography, Paper } from "@mui/material";

export const ImageListContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "1440px",
  margin: "0 auto",
  height: "calc(100vh - 100px)",
  padding: 0,
  backgroundColor: theme.palette.background.default,
}));

export const GridContainer = styled(Box)({
  width: "100%",
  height: "100%",
});

export const ImageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  height: "100%",
}));

export const ImageInnerContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease",
  backgroundColor: theme.palette.grey[100],
  "&:hover": {
    transform: "scale(1.02)",
    "& .image-overlay": {
      opacity: 1,
    },
  },
}));

export const SavedImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const ImageOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  padding: theme.spacing(1.5),
}));

export const ImageTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  textAlign: "center",
  fontWeight: 500,
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "0.9rem",
}));

export const ImageMetadata = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "0.75rem",
  opacity: 0.8,
  textAlign: "center",
}));

export const ImageInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const EmptyStateContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  flexDirection: "column",
  gap: "10px",
});

export const cellStyles = {
  padding: 1,
  cursor: "pointer",
};

export const metadataStyles = {
  marginTop: 0.5,
};
