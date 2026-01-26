import {
  Avatar,
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
import {
  listContainerSx,
  dividerSx,
  chatButtonSx,
  deleteButtonSx,
} from "./FriendsModal.styles";
import { BaseModal } from "@/shared/components/Modal/BaseModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const FriendsModal = ({ open, onClose }: Props) => {
  const { people, isLoading, error } = usePeople();
  const { deletePerson } = useDeletePerson();

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={`Friends (${people.length})`}
    >
      <div style={listContainerSx as React.CSSProperties}>
        {isLoading && <Typography p={2}>Loading...</Typography>}
        {error && <Typography p={2}>{error}</Typography>}

        <List disablePadding>
          {people.map((person) => (
            <div key={person.id}>
              <ListItem
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton sx={chatButtonSx}>
                      <ChatIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      sx={deleteButtonSx}
                      onClick={() => deletePerson(person.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemAvatar>
                  <Avatar src={person.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${person.firstName} ${person.lastName}`}
                  secondary={`@${person.username}`}
                />
              </ListItem>
              <Divider sx={dividerSx} />
            </div>
          ))}
        </List>
      </div>
    </BaseModal>
  );
};

export default FriendsModal;
