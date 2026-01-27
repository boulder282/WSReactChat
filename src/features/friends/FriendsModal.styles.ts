import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

export const dialogContentSx: SxProps<Theme> = {
  p: 0,
  bgcolor: "#17212b",
  color: "white",
};

export const headerSx: SxProps<Theme> = {
  px: 2,
  py: 1.5,
  borderBottom: "1px solid #1f2a36",
  fontSize: "1.125rem",
  fontWeight: 600,
};

export const listContainerSx: SxProps<Theme> = {
  maxHeight: "70vh",
  overflowY: "auto",
};

export const dividerSx: SxProps<Theme> = {
  borderColor: "#1f2a36",
};

export const chatButtonSx: SxProps<Theme> = {
  color: "#6ab3f3",
};

export const deleteButtonSx: SxProps<Theme> = {
  color: "#e06c75",
};

export const closeButtonSx: SxProps<Theme> = {
  color: "gray",
  textTransform: "none",
  py: 1.5,
  "&:hover": {
    color: "white",
    bgcolor: "transparent",
  },
};
