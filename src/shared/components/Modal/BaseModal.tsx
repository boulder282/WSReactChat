import { Dialog, DialogContent, Button } from "@mui/material";
import type { ReactNode } from "react";
import { closeButtonSx, dialogContentSx, headerSx } from "./BaseModal.styles";

interface BaseModalProps {
  open: boolean;
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
}

export const BaseModal = ({
  open,
  title,
  children,
  onClose,
  footer,
}: BaseModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: "#17212b", // match chat background
          borderRadius: "1rem", // smooth rounded corners
          border: "1px solid #1f2a36", // subtle dark border
          overflow: "hidden", // removes white pixels on corners
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)", // subtle dark shadow
        },
      }}
    >
      <DialogContent sx={dialogContentSx}>
        {/* Header */}
        <div style={headerSx as React.CSSProperties}>{title}</div>

        {/* Content */}
        <div>{children}</div>

        {/* Footer */}
        {footer ?? (
          <Button fullWidth sx={closeButtonSx} onClick={onClose}>
            Close
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
