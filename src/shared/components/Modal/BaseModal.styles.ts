import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

export const dialogPaperSx: SxProps<Theme> = {
  bgcolor: "#17212b", // match chat background
  borderRadius: "1rem", // smooth corners
  border: "1px solid #1f2a36", // subtle dark border
  overflow: "hidden", // prevent white artifacts on corners
  boxShadow: "0 4px 20px rgba(0,0,0,0.5)", // subtle dark shadow
};

export const dialogContentSx: SxProps<Theme> = {
  p: 0,
  bgcolor: "#17212b",
  color: "#e5e7eb",
};

export const headerSx: SxProps<Theme> = {
  padding: "1.5rem",
  borderBottom: "1px solid #1f2a36",
  fontSize: "1.125rem",
  fontWeight: 600,
  color: "#e5e7eb",
};

export const closeButtonSx: SxProps<Theme> = {
  color: "#6b7280",
  textTransform: "none",
  minWidth: 0,
  padding: "0.5rem 1rem",
  "&:hover": {
    color: "#ffffff",
    bgcolor: "transparent",
  },
};
