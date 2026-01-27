import { Avatar, Stack, Typography } from "@mui/material";
import { Button } from "../../../../shared/components/ui/button/Button";

type ViewModeProps = {
  avatar?: string;
  username: string;
  isConnected: boolean;
  onUpload: () => void;
  onEditClick: () => void;
};

export function ViewModeContent({
  avatar,
  username,
  isConnected,
  onUpload,
  onEditClick,
}: ViewModeProps) {
  return (
    <div className="user-info-modal__view">
      <Avatar
        src={avatar}
        alt={username || "User"}
        sx={{
          width: { xs: 110, sm: 128 },
          height: { xs: 110, sm: 128 },
          borderRadius: "50%",
          boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
          cursor: "pointer",
          transition: "transform 0.15s ease",
          "&:active": { transform: "scale(0.97)" },
        }}
        onClick={onUpload}
      />

      <Stack direction="row" spacing={1.5} sx={{ my: 2 }}>
        <Button variant="gray" size="small" onClick={onUpload}>
          Change Photo
        </Button>
        {avatar && (
          <Button variant="red" size="small" onClick={() => {}}>
            Remove
          </Button>
        )}
      </Stack>

      <Typography
        variant="h6"
        sx={{
          fontSize: "1.375rem",
          fontWeight: 600,
          mb: 0.5,
        }}
      >
        {username || "No username"}
      </Typography>

      <Typography
        sx={{
          fontSize: "0.95rem",
          color: isConnected ? "#31b545" : "#8e8e93",
          fontWeight: isConnected ? 500 : 400,
        }}
      >
        {isConnected ? "online" : "offline"}
      </Typography>

      <Button variant="blue" fullWidth size="large" onClick={onEditClick}>
        Edit Profile
      </Button>
    </div>
  );
}
