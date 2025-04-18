"use client";
import { DialogActions } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  DialogHeader,
  StyledDialogTitle,
  CloseButton,
  StyledButton,
  ModalContent,
  StyledDialog,
} from "./styles";
export default function Modal({
  open,
  onClose,
  onSave,
  children,
  title = "Upload Images",
  maxWidth = "sm",
  fullWidth = false,
  fullHeight = false,
}) {
  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          maxHeight: maxWidth === "xl" ? "95vh" : "90vh",
          ...(fullHeight && {}),
        },
      }}
    >
      <DialogHeader>
        <StyledDialogTitle>{title}</StyledDialogTitle>
        <CloseButton onClick={onClose} size="small">
          <CloseIcon />
        </CloseButton>
      </DialogHeader>

      <ModalContent fullHeight={fullHeight}>{children}</ModalContent>

      <DialogActions sx={{ p: 0, mt: 2, gap: 1 }}>
        <StyledButton onClick={onClose} variant="outlined">
          Cancel
        </StyledButton>
        <StyledButton onClick={onSave} variant="contained">
          Save
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
}
