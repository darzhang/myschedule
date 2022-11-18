import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

export default function EventOverview() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // fetch events in batches of 10 events each
      const fetchEvents = async () => {
        let eventList = [];
        const eventIds = await fetchEventIds();
        const lastBatch = eventIds.length % 10;
        const numBatch =
          Math.floor(eventIds.length / 10) + (lastBatch > 0 ? 1 : 0);
        if (numBatch > 0) {
          for (let i = 0; i < numBatch; i++) {
            const index = i * 10;
            const idList = eventIds.slice(index, index + 10);
            const q = query(
              collection(db, process.env.NEXT_PUBLIC_FIREBASE_EVENT_COLLECTION),
              where(documentId(), "in", idList)
            );
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
              const oneEvent = doc.data();
              oneEvent.id = doc.id;
              oneEvent.start = oneEvent.start.toDate();
              oneEvent.end = oneEvent.end.toDate();
              eventList.push(oneEvent);
            });
          }
          eventList.sort((a, b) => a.start - b.start);
          eventList = eventList.filter((event) => event.end > new Date());
          eventList = eventList.slice(0, 5);
        }
        setEvents([...eventList]);
      };
      const fetchEventIds = async () => {
        const userRef = doc(
          db,
          process.env.NEXT_PUBLIC_FIREBASE_USER_COLLECTION,
          user.uid
        );
        const userSnap = await getDoc(userRef);
        return userSnap.data().events;
      };
      fetchEvents();
    }
  }, [user]);
  return (
    <>
      <Typography align="left" variant="h6">
        Your Next Five Events
      </Typography>
      <List>
        {events.map((event, index) => {
          return (
            <Box key={index}>
              <ListItemButton>
                <ListItemText
                  primary={event.title}
                  secondary={
                    <>
                      <Typography variant="body2">
                        {"Start: " +
                          moment(event.start).format("DD/MM/YYYY h:mm a")}
                      </Typography>
                      <Typography variant="body2">
                        {"End: " +
                          moment(event.end).format("DD/MM/YYYY h:mm a")}
                      </Typography>
                    </>
                  }
                  onClick={() => router.push(`/event/${event.id}`)}
                />
              </ListItemButton>
              <Divider />
            </Box>
          );
        })}
      </List>
    </>
  );
}
