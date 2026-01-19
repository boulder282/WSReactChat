import * as React from "react";
import {
  Box,
  CssBaseline,
  Typography,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import useUserInfoStore from "../../../../store/userInfoStore";
import personIcon from "../../../../Icons/person.svg";
import settingIcon from "../../../../Icons/settings.svg";
import contactsIcon from "../../../../Icons/contacts.svg";
import message from "../../../../Icons/message.svg";
import { useNavigate } from "react-router";

const DRAWER_WIDTH = 280;

export default function ModalLeftDrawer() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const { info } = useUserInfoStore();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 64,
          height: "100vh",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack spacing={1} alignItems="center" pt={1}>
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit">
            <img src={message} alt="Messages" width={24} height={24} />
          </IconButton>
        </Stack>
      </Box>

      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar src={localStorage.getItem("userAvatar") ?? ""} />
            <Box>
              <Typography fontWeight={600} noWrap>
                {info?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Online
              </Typography>
            </Box>
          </Stack>

          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>

        <Divider />

        <List>
          {[
            { text: "My Profile", path: "/userinfo", icon: personIcon },
            { text: "Settings", path: "/settings", icon: settingIcon },
            { text: "Contacts", path: "/friends", icon: contactsIcon },
          ].map(({ text, path, icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(path);
                  setOpen(false);
                }}
              >
                <ListItemIcon>
                  <img src={icon} alt={text} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: "64px",
          p: 3,
        }}
      >
        <Typography>Page content goes here.</Typography>
      </Box>
    </Box>
  );
}
