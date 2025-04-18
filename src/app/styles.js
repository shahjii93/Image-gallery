import { styled } from "@mui/material/styles";
import { Container, Paper, Box, Button, Tabs, Tab } from "@mui/material";

export const PageContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.grey[50],
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "1440px !important",
  width: "100%",
  margin: "0 auto",
  padding: theme.spacing(4),
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(2),
  },
}));

export const MainContent = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  width: "100%",
  maxWidth: "1440px",
  margin: "0 auto",
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  textAlign: "center",
  width: "100%",
}));

export const TabsContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .MuiTabs-indicator": {
    height: 3,
    borderRadius: "3px 3px 0 0",
  },
  "& .MuiTabs-scroller": {
    overflowY: "visible",
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: "72px",
  padding: theme.spacing(1.5),
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateY(-2px)",
  },
}));

export const TabContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  minWidth: "200px",
}));

export const TabImage = styled(Box)(({ theme }) => ({
  width: "48px",
  height: "48px",
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  flexShrink: 0,
  position: "relative",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
}));

export const TabInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  textAlign: "left",
  gap: theme.spacing(0.5),
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  minWidth: 180,
  height: 48,
  backgroundColor: "#000",
  color: "#fff",
  borderRadius: theme.spacing(1.5),
  textTransform: "none",
  fontSize: "0.95rem",
  fontWeight: 500,
  letterSpacing: "0.3px",
  padding: theme.spacing(1.5, 3),
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  "&:hover": {
    backgroundColor: "#222",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
  },
  "&:active": {
    backgroundColor: "#333",
    transform: "translateY(0)",
  },
  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(1.5),
    "& svg": {
      fontSize: 20,
    },
  },
  transition: "all 0.2s ease",
}));

export const TitleBox = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.contrastText,
  borderRadius: theme.spacing(1),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const ProgressBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

export const ActionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: theme.spacing(3),
}));

export const ImageBox = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const ImageListBox = styled(Box)({
  width: "100%",
  overflow: "hidden",
  "& > *": {
    maxWidth: "100%",
    margin: "0 auto",
  },
});

export const titleStyles = {
  fontWeight: 700,
  color: "text.primary",
  fontSize: { xs: "1.75rem", sm: "2.125rem" },
  letterSpacing: "-0.5px",
};

export const subtitleStyles = {
  maxWidth: 600,
};

export const actionButtonIconStyles = {
  "&:hover": {
    "& .MuiSvgIcon-root": {
      transform: "scale(1.1)",
    },
  },
};

export const categoryButtonIconStyles = {
  "&:hover": {
    "& .MuiSvgIcon-root": {
      transform: "rotate(15deg)",
    },
  },
};

export const tabImageStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const tabTypographyStyles = {
  fontWeight: 600,
};

export const tabCaptionStyles = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export const closeButtonStyles = {
  color: "inherit",
};
