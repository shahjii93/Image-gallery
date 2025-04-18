import { styled } from "@mui/material/styles";
import { Box, IconButton, Dialog, Typography, Button } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    minWidth: "600px",
    maxHeight: "100%",
    maxWidth: "600px",
    width: "auto",
    height: "auto",
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
      maxWidth: "100%",
    },
  },
}));

export const DialogHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}));

export const StyledDialogTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[100],
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
    transform: "rotate(90deg)",
  },
  "& svg": {
    fontSize: "20px",
  },
}));

export const StyledButton = styled(Button)(({ theme, variant }) => ({
  minWidth: 100,
  borderRadius: theme.spacing(1),
  textTransform: "none",
  padding: theme.spacing(1, 3),
  fontWeight: 500,
  ...(variant === "contained" && {
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "#222",
    },
  }),
  ...(variant === "outlined" && {
    borderColor: theme.palette.divider,
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }),
}));

export const ModalContent = styled(Box, {
  shouldComponentUpdate: true,
  shouldForwardProp: (prop) => prop !== "fullHeight",
})(({ theme, fullHeight }) => ({
  padding: 0,
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  ...(fullHeight && {
    height: "100%",
  }),
}));
