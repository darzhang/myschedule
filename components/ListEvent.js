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

export default function ListEvent({ events, handleDelete, view }) {
  const router = useRouter();
  return (
    <Box>
      <List>
        {events.map((event, index) => {
          return view ? (
            <Box key={index}>
              <ListItemButton>
                <ListItemText
                  primary={event.title}
                  secondary={`${moment(event.start).format(
                    "DD/MM/YYYY h:mm a"
                  )} - ${moment(event.end).format("DD/MM/YYYY h:mm a")}`}
                />
              </ListItemButton>
              <Divider />
            </Box>
          ) : (
            <Box key={index}>
              <ListItemButton onClick={() => router.push(`/event/${event.id}`)}>
                <ListItemText
                  primary={event.title}
                  secondary={`${moment(event.start).format(
                    "DD/MM/YYYY h:mm a"
                  )} - ${moment(event.end).format("DD/MM/YYYY h:mm a")}`}
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
