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
import useUserInfoStore from "../store/userInfoStore";
import personIcon from "@/shared/icons/person.svg";
import settingsIcon from "@/shared/icons/settings.svg";
import contactsIcon from "@/shared/icons/contacts.svg";
import message from "@/shared/icons/message.svg";
import { useState } from "react";
import UserInfoModal from "../features/user/userInfoModal";
import FriendsModal from "../features/friends/friendsModal";

const DRAWER_WIDTH = 280;

interface Props {
  isConnected?: boolean;
}

export default function ModalLeftDrawer({ isConnected }: Props) {
  const { info } = useUserInfoStore();
  const [open, setOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [openUserInfo, setOpenUserInfo] = useState(false);

  const handleMenuClick = (text: string) => {
    setOpen(false);

    if (text === "Contacts") setFriendsOpen(true);
    if (text === "My Profile") setOpenUserInfo(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Box
        sx={{
          position: "inherit",
          top: 0,
          left: 0,
          width: 64,
          height: "100vh",
          bgcolor: "#1f2937",
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
                {isConnected ? "online" : "offline"}
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
            {
              text: "My Profile",
              icon: personIcon,
              action: () => setOpenUserInfo(true),
            },
            { text: "Settings", icon: settingsIcon },
            {
              text: "Contacts",
              icon: contactsIcon,
              action: () => setFriendsOpen(true),
            },
          ].map(({ text, icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleMenuClick(text)}>
                <ListItemIcon>
                  <img src={icon} alt={text} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <FriendsModal open={friendsOpen} onClose={() => setFriendsOpen(false)} />
      <UserInfoModal
        open={openUserInfo}
        onClose={() => setOpenUserInfo(false)}
        isConnected={isConnected}
      />
    </Box>
  );
}
