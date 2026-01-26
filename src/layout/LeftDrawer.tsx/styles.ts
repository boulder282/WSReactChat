import type { SxProps, Theme } from "@mui/material";

export const DRAWER_WIDTH = 280;

export const rootBox: SxProps<Theme> = {
  display: "flex",
};

export const drawerSx: SxProps<Theme> = {
  "& .MuiDrawer-paper": {
    width: 280,
  },
};
export const sideBar: SxProps<Theme> = {
  position: "inherit",
  top: 0,
  left: 0,
  width: 64,
  height: "100vh",
  bgcolor: "#1f2937",
  zIndex: (theme) => theme.zIndex.appBar,
};

export const sideBarStack: SxProps<Theme> = {
  pt: 1,
  alignItems: "center",
};

export const drawerPaper: SxProps<Theme> = {
  width: DRAWER_WIDTH,
};

export const drawerHeader: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: 2,
  py: 1.5,
};

export const userInfoBox: SxProps<Theme> = {
  overflow: "hidden",
};
