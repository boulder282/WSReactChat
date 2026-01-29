import type { SxProps, Theme } from "@mui/material";

export const styles = {
  viewContainer: "user-info-modal__view",

  avatar: {
    width: { xs: 110, sm: 128 },
    height: { xs: 110, sm: 128 },
    borderRadius: "50%",
    boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
    cursor: "pointer",
    transition: "transform 0.15s ease",
    "&:active": { transform: "scale(0.97)" },
  } as SxProps<Theme>,

  buttonStack: {
    my: 2,
  } as SxProps<Theme>,

  username: {
    fontSize: "1.375rem",
    fontWeight: 600,
    mb: 0.5,
  } as SxProps<Theme>,

  status: (isConnected: boolean) =>
    ({
      fontSize: "0.95rem",
      color: isConnected ? "#31b545" : "#8e8e93",
      fontWeight: isConnected ? 500 : 400,
    }) as SxProps<Theme>,

  editButton: {
    fullWidth: true,
    size: "large" as const,
  },
} as const;

export const spacing = {
  buttonSpacing: 1.5,
} as const;
