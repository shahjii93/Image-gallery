import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Dialog,
  TextField,
  Button,
  IconButton,
  Chip,
  ListItem,
} from "@mui/material";

export const DrawerContent = styled(Box)(({ theme }) => ({
  width: "400px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const CategoryList = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  overflowY: "auto",
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    padding: theme.spacing(2),
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

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
}));

export const SelectText = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textTransform: "none",
  padding: theme.spacing("6px", 2),
  fontSize: "0.875rem",
  fontWeight: 400,
  backgroundColor: "transparent",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
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

export const CategoryChip = styled(Chip)(({ theme, selected }) => ({
  borderRadius: "16px",
  backgroundColor: selected
    ? theme.palette.primary.main
    : theme.palette.grey[100],
  color: selected
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: selected
      ? theme.palette.primary.dark
      : theme.palette.grey[200],
  },
  transition: "all 0.2s ease",
}));

export const ChipsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: "8px",
  marginBottom: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const CategoryActions = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));
