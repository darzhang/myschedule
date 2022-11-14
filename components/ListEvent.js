import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useRouter } from "next/router";

export default function ListEvent({ events, handleDelete }) {
  const router = useRouter();
  return (
    <Box>
      <List>
        {events.map((event, index) => {
          return (
            <Box key={index}>
              <ListItemButton>
                <ListItemText
                  primary={event.title}
                  secondary={`${moment(event.start).format(
                    "DD/mm/YYYY h:mm a"
                  )} - ${moment(event.end).format("DD/mm/YYYY h:mm a")}`}
                />
                <IconButton onClick={() => handleDelete(event.id, event.title)}>
                  <DeleteOutline />
                </IconButton>
              </ListItemButton>
              <Divider />
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
