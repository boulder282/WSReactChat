import {
  Dialog,
  DialogContent,
  Avatar,
  Button,
  Divider,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatIcon from "@mui/icons-material/Chat";

import { usePeople } from "../../hooks/usePeople";
import { useDeletePerson } from "../../hooks/deletePeople";

interface Props {
  open: boolean;
  onClose: () => void;
}

const FriendsModal = ({ open, onClose }: Props) => {
  const { people, isLoading, error } = usePeople();
  const { deletePerson } = useDeletePerson();

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    await deletePerson(id);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent sx={{ p: 0, bgcolor: "#17212b", color: "white" }}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#1f2a36] text-lg font-semibold">
          Friends ({people.length})
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">
          {isLoading && (
            <Typography p={2} color="gray">
              Loading...
            </Typography>
          )}

          {error && (
            <Typography p={2} color="error">
              {error}
            </Typography>
          )}

          {!isLoading && people.length === 0 && (
            <Typography p={3} color="gray" textAlign="center">
              No friends yet
            </Typography>
          )}

          <List disablePadding>
            {people.map((person) => (
              <div key={person.id}>
                <ListItem
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton sx={{ color: "#6ab3f3" }}>
                        <ChatIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        sx={{ color: "#e06c75" }}
                        onClick={() => handleDelete(person.id, person.username)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      src={person.avatar}
                      sx={{ width: 44, height: 44 }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography fontWeight={500}>
                        {person.firstName} {person.lastName}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="gray">
                        @{person.username} • {person.city}
                      </Typography>
                    }
                  />
                </ListItem>

                <Divider sx={{ borderColor: "#1f2a36" }} />
              </div>
            ))}
          </List>
        </div>

        {/* Close */}
        <Button
          fullWidth
          sx={{
            color: "gray",
            textTransform: "none",
            py: 1.5,
            "&:hover": { color: "white", bgcolor: "transparent" },
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default FriendsModal;
