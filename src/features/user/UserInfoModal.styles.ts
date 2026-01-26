import type { SxProps } from "@mui/material";
import type { Theme } from "@emotion/react";

export const dialogContentSx: SxProps<Theme> = {
  p: 3,
  bgcolor: "#17212b",
  color: "white",
  textAlign: "center",
};

export const avatarSx: SxProps<Theme> = {
  width: 100,
  height: 100,
  mb: 2,
  mx: "auto",
};

export const usernameSx: SxProps<Theme> = {
  fontSize: "1.125rem",
  fontWeight: 600,
  mb: 0.5,
};

export const statusSx: SxProps<Theme> = {
  fontSize: "0.875rem",
  color: "gray",
  mb: 3,
};

export const buttonSx: SxProps<Theme> = {
  textTransform: "none",
  mb: 1,
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
