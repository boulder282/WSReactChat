import type { SxProps, Theme } from "@mui/material";

export const styles = {
  container: {
    px: 1,
  } as SxProps<Theme>,

  avatar: {
    width: 96,
    height: 96,
    borderRadius: "50%",
    boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
  } as SxProps<Theme>,

  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#606060",
    mb: 0.75,
  } as SxProps<Theme>,

  helperText: {
    mt: 1,
    color: "#8e8e93",
    fontSize: "0.75rem",
    display: "block",
  } as SxProps<Theme>,
};

export const spacing = {
  stackSpacing: 3,
  avatarSectionSpacing: 1.5,
  buttonStackSpacing: 1.5,
};
