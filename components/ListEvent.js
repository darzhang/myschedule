import { DeleteOutline, EditOutlined, Visibility } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ListEvent({ events, handleDelete, view }) {
  const router = useRouter();
  const futureEvents = events.filter((event) => event.end > new Date());
  const [checked, setChecked] = useState(false);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: "20px",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <Typography>Show All</Typography>
        <Switch checked={checked} onChange={() => setChecked(!checked)} />
      </Box>
      <List>
        {checked
          ? events.map((event, index) => {
              return view ? (
                <Box key={index}>
                  <ListItemButton
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <div style={{ flexGrow: 1 }}>
                      <Typography>{event.title}</Typography>
                      <Typography variant="body2" color={"gray"}>
                        {"Start: " +
                          moment(event.start).format("DD/MM/YYYY h:mm a")}
                      </Typography>
                      <Typography variant="body2" color={"gray"}>
                        {"End: " +
                          moment(event.end).format("DD/MM/YYYY h:mm a")}
                      </Typography>
                    </div>
                  </ListItemButton>
                  <Divider />
                </Box>
              ) : (
                <Box key={index}>
                  <ListItemButton
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <div
                      style={{ flexGrow: 1 }}
                      onClick={() => router.push(`/event/${event.id}`)}
                    >
                      <Typography>{event.title}</Typography>
                      <Typography variant="body2" color={"gray"}>
                        {"Start: " +
                          moment(event.start).format("DD/MM/YYYY h:mm a")}
                      </Typography>
                      <Typography variant="body2" color={"gray"}>
                        {"End: " +
                          moment(event.end).format("DD/MM/YYYY h:mm a")}
                      </Typography>
                    </div>
                    <IconButton
                      onClick={() => handleDelete(event.id, event.title)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </ListItemButton>
                  <Divider />
                </Box>
              );
            })
          : futureEvents.map((event, index) => {
              return view ? (
                <Box key={index}>
                  <ListItemButton
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <div style={{ flexGrow: 1 }}>
                      <Typography>{event.title}</Typography>
                      <Typography variant="body2" color={"gray"}>
                        {"Start: " +
                          moment(event.start).format("DD/MM/YYYY h:mm a")}
                      </Typography>
                      <Typography variant="body2" color={"gray"}>
                        {"End: " +
                          moment(event.end).format("DD/MM/YYYY h:mm a")}
                      </Typography>
                    </div>
                  </ListItemButton>
                  <Divider />
                </Box>
              ) : (
                <Box key={index}>
                  <ListItemButton
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <div
                      style={{ flexGrow: 1 }}
                      onClick={() => router.push(`/event/${event.id}`)}
                    >
                      <Typography>{event.title}</Typography>
                      <Typography variant="body2" color={"gray"}>
                        {"Start: " +
                          moment(event.start).format("DD/MM/YYYY h:mm a")}
                      </Typography>
                      <Typography variant="body2" color={"gray"}>
                        {"End: " +
                          moment(event.end).format("DD/MM/YYYY h:mm a")}
                      </Typography>
                    </div>
                    <IconButton
                      onClick={() => handleDelete(event.id, event.title)}
                    >
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
