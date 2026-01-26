import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

export const dialogContentSx: SxProps<Theme> = {
  p: 0,
  bgcolor: "#17212b",
  color: "white",
};

export const headerSx: SxProps<Theme> = {
  padding: "12px 16px",
  borderBottom: "1px solid #1f2a36",
  fontSize: "1.125rem",
  fontWeight: 600,
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
