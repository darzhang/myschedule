import { Box, Button, Typography } from "@mui/material";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ListEvent from "../../components/ListEvent";
import { db } from "../../config/firebase";

export default function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [falseUser, setFalseUser] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
    if (uid) {
      // fetch events in batches of 10 events each
      const fetchEvents = async () => {
        const eventList = [];
        const eventIds = await fetchEventIds();
        if (eventIds == null) {
          setFalseUser(true);
          return;
        } else {
          const lastBatch = eventIds.length % 10;
          const numBatch =
            Math.floor(eventIds.length / 10) + (lastBatch > 0 ? 1 : 0);
          if (numBatch > 0) {
            for (let i = 0; i < numBatch; i++) {
              const index = i * 10;
              const idList = eventIds.slice(index, index + 10);
              const q = query(
                collection(
                  db,
                  process.env.NEXT_PUBLIC_FIREBASE_EVENT_COLLECTION
                ),
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
          }
          setEvents([...eventList]);
        }
      };
      const fetchEventIds = async () => {
        const userRef = doc(
          db,
          process.env.NEXT_PUBLIC_FIREBASE_USER_COLLECTION,
          uid
        );
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
          return userSnap.data().events;
        } else {
          return null;
        }
      };
      fetchEvents();
    }
  }, [uid]);

  return (
    <>
      {falseUser ? (
        <Typography variant="h3">No schedule can be found</Typography>
      ) : (
        <>
          <Typography
            sx={{ mb: "10px", flexGrow: 1 }}
            align="center"
            variant="h3"
          >
            {user.name}&apos;s Schedule
          </Typography>
          <Box sx={{ m: "0px 20px" }}>
            <ListEvent events={events} view={true} />
          </Box>
        </>
      )}
    </>
  );
}
