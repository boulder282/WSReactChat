import { Avatar, Stack, Typography } from "@mui/material";
import { Button } from "../../../../shared/components/ui/button/Button";
import { styles, spacing } from "./ViewModeContent.styles";

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
    <div className={styles.viewContainer}>
      <Avatar
        src={avatar}
        alt={username || "User"}
        sx={styles.avatar}
        onClick={onUpload}
      />

      <Stack
        direction="row"
        spacing={spacing.buttonSpacing}
        sx={styles.buttonStack}
      >
        <Button variant="gray" size="small" onClick={onUpload}>
          Change Photo
        </Button>
        {avatar && (
          <Button variant="red" size="small" onClick={() => {}}>
            Remove
          </Button>
        )}
      </Stack>

      <Typography variant="h6" sx={styles.username}>
        {username || "No username"}
      </Typography>

      <Typography sx={styles.status(isConnected)}>
        {isConnected ? "online" : "offline"}
      </Typography>

      <Button
        variant="blue"
        fullWidth={styles.editButton.fullWidth}
        size={styles.editButton.size}
        onClick={onEditClick}
      >
        Edit Profile
      </Button>
    </div>
  );
}
