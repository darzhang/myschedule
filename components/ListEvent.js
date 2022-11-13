import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";

export default function ListEvent({ events, handleDelete }) {
  return (
    <Box>
      <List>
        {events.map((event, index) => {
          return (
            <Box key={index}>
              <ListItem>
                <ListItemText
                  primary={event.title}
                  secondary={event.description}
                />
                <IconButton>
                  <EditOutlined />
                </IconButton>
                <IconButton onClick={() => handleDelete(event.id, event.title)}>
                  <DeleteOutline />
                </IconButton>
              </ListItem>
              <Divider />
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
