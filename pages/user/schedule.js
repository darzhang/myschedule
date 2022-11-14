import { ReplyOutlined, ShareOutlined } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddEventDialog from "../../components/AddEventDialog";
import ListEvent from "../../components/ListEvent";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export default function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [shared, setShared] = useState(false);

  const onSubmit = (data) => {
    setEvents([...events, data]);
  };

  const handleDelete = (eventId, title) => {
    Swal.fire({
      icon: "warning",
      title: "Delete Event",
      text: `Are you sure you want to delete "${title}"`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(
          doc(db, process.env.NEXT_PUBLIC_FIREBASE_EVENT_COLLECTION, eventId)
        );
        await updateDoc(
          doc(db, process.env.NEXT_PUBLIC_FIREBASE_USER_COLLECTION, user.uid),
          {
            events: arrayRemove(eventId),
          }
        );
        setEvents(events.filter((event) => event.id != eventId));
      }
    });
  };

  useEffect(() => {
    if (user) {
      // fetch events in batches of 10 events each
      const fetchEvents = async () => {
        const eventList = [];
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
      <AddEventDialog
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={onSubmit}
      />
      <Typography sx={{ mb: "10px", flexGrow: 1 }} align="center" variant="h3">
        Schedule
      </Typography>
      <Box>
        <Button
          sx={{ ml: "30px", mr: "10px" }}
          onClick={() => setOpen(true)}
          variant="outlined"
        >
          Add Event
        </Button>
        <Button
          onClick={() => setShared(!shared)}
          variant={shared ? "contained" : "outlined"}
          startIcon={<ReplyOutlined />}
        >
          Share
        </Button>
      </Box>
      {shared && (
        <TextField
          sx={{
            ml: "160px",
            mt: "10px",
            width: "500px",
          }}
          value={`${window.location.host}/schedule/${user.uid}`}
          disabled
        />
      )}
      <Box sx={{ height: "600px", m: "30px" }}>
        {/* <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
        /> */}
        <ListEvent events={events} handleDelete={handleDelete} />
      </Box>
    </>
  );
}
