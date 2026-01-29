import { Avatar, Stack, Typography } from "@mui/material";
import { Button } from "../../../../shared/components/ui/button/Button";
import Input from "../../../../shared/components/ui/input/Input";
import { styles, spacing } from "./EditModeContent.styles";

type EditModeProps = {
  avatar?: string;
  username: string;
  onUpload: () => void;
  onRemove: () => void;
  onUsernameChange: (newValue: string) => void;
};

export function EditModeContent({
  avatar,
  username,
  onUpload,
  onRemove,
  onUsernameChange,
}: EditModeProps) {
  return (
    <Stack spacing={spacing.stackSpacing} sx={styles.container}>
      {/* Avatar Section */}
      <Stack alignItems="center" spacing={spacing.avatarSectionSpacing}>
        <Avatar src={avatar} alt={username || "User"} sx={styles.avatar} />

        <Stack direction="row" spacing={spacing.buttonStackSpacing}>
          <Button variant="gray" size="small" onClick={onUpload}>
            Change Photo
          </Button>
          {avatar && (
            <Button variant="red" size="small" onClick={onRemove}>
              Remove
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Username Field */}
      <div>
        <Typography
          component="label"
          htmlFor="username-input"
          sx={styles.label}
        >
          Username
        </Typography>

        <Input
          value={username}
          onChange={(newValue) => onUsernameChange(newValue)}
          placeholder="Enter username"
        />

        <Typography variant="caption" sx={styles.helperText}>
          a–z, 0–9, underscores • minimum 5 characters
        </Typography>
      </div>

      {/* Spacer */}
      <div style={{ height: 32 }} />
    </Stack>
  );
}
