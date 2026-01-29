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

import { useState } from "react";

import {
  rootBox,
  sideBar,
  sideBarStack,
  drawerHeader,
  userInfoBox,
  drawerSx,
} from "./styles";
import useUserInfoStore from "../../store/userInfoStore";
import { MENU_ITEMS, type MenuAction } from "./menuItems";
import FriendsModal from "../../features/friends/friendsModal";
import UserInfoModal from "../../features/user/UserModal/userInfoModal";

interface Props {
  isConnected?: boolean;
}

export default function MiniLeftDrawer({ isConnected }: Props) {
  const { info } = useUserInfoStore();
  const [open, setOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [openUserInfo, setOpenUserInfo] = useState(false);

  const avatar = localStorage.getItem("userAvatar") ?? "";

  const handleMenuAction = (action: MenuAction) => {
    setOpen(false);

    if (action === "contacts") setFriendsOpen(true);
    if (action === "profile") setOpenUserInfo(true);
  };

  return (
    <Box sx={rootBox}>
      <CssBaseline />

      <Box sx={sideBar}>
        <Stack spacing={1} sx={sideBarStack}>
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={drawerSx}
      >
        <Box sx={drawerHeader}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar src={avatar} />

            <Box sx={userInfoBox}>
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
          {MENU_ITEMS.map(({ text, icon, action }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleMenuAction(action)}>
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
