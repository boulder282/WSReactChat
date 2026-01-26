import { Avatar, Stack, Typography, Button } from "@mui/material";
import {
  avatarSx,
  usernameSx,
  statusSx,
  buttonSx,
} from "./UserInfoModal.styles";
import { BaseModal } from "@/shared/components/Modal/BaseModal";
import {
  getAvatar,
  removeAvatar,
  uploadAvatar,
} from "@/shared/components/AvatarUpload/AvatarUpload";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  username?: string;
  avatar?: string;
  isConnected?: boolean;
}

const UserInfoModal = ({ open, onClose, username, isConnected }: Props) => {
  const [avatar, setAvatar] = useState<string | undefined>(
    getAvatar() ?? undefined,
  );

  const handleClickAvatar = () => {
    uploadAvatar((base64) => setAvatar(base64));
  };

  const handleRemove = () => {
    removeAvatar(() => setAvatar(undefined));
  };
  return (
    <BaseModal open={open} onClose={onClose} title="User Info">
      <Stack spacing={2} alignItems="center">
        <Avatar src={avatar} sx={avatarSx} />
        <Button variant="text" onClick={handleClickAvatar}>
          Change Avatar
        </Button>
        <Button variant="text" color="error" onClick={handleRemove}>
          Remove Avatar
        </Button>
        <Typography sx={usernameSx}>{username ?? "Username"}</Typography>
        <Typography sx={statusSx}>
          {isConnected ? "Online" : "Offline"}
        </Typography>

        <Button variant="outlined" fullWidth sx={buttonSx}>
          ✏️ Edit profile
        </Button>
      </Stack>
    </BaseModal>
  );
};

export default UserInfoModal;
