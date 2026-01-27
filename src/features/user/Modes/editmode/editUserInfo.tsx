import { Button } from "@/shared/components/ui/button/Button";
import Input from "@/shared/components/ui/input/Input";
import { Avatar, Stack, Typography } from "@mui/material";

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
    <Stack spacing={3} sx={{ px: 1 }}>
      {/* Avatar Section */}
      <Stack alignItems="center" spacing={1.5}>
        <Avatar
          src={avatar}
          alt={username || "User"}
          sx={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
          }}
        />

        <Stack direction="row" spacing={1.5}>
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
          sx={{
            display: "block",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#606060",
            mb: 0.75,
          }}
        >
          Username
        </Typography>

        <Input
          value={username}
          onChange={(newValue) => onUsernameChange(newValue)}
          placeholder="Enter username"
        />

        <Typography
          variant="caption"
          sx={{
            mt: 1,
            color: "#8e8e93",
            fontSize: "0.75rem",
            display: "block",
          }}
        >
          a–z, 0–9, underscores • minimum 5 characters
        </Typography>
      </div>

      {/* Spacer */}
      <div style={{ height: 32 }} />
    </Stack>
  );
}
