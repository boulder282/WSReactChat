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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
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
