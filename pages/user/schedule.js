import { Box, Button, Typography } from "@mui/material";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Swal from "sweetalert2";
import AddEventDialog from "../../components/AddEventDialog";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export default function SchedulePage() {
  const localizer = momentLocalizer(moment); // or globalizeLocalizer
  const [event, setEvent] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const onSubmit = (data) => {
    setEvent([...event, data]);
  };

  const handleSelectEvent = (event) => {
    Swal.fire({
      icon: "info",
      title: event.title,
      text: event.description,
    });
  };

  useEffect(() => {
    if (user) {
      const fetchEvents = async () => {
        const eventIds = await fetchEventIds();
        const q = query(
          collection(db, process.env.NEXT_PUBLIC_FIREBASE_EVENT_COLLECTION),
          where(documentId(), "in", eventIds)
        );
        const querySnapshot = await getDocs(q);
        const eventList = [];
        querySnapshot.forEach((doc) => {
          const oneEvent = doc.data();
          oneEvent.start = oneEvent.start.toDate();
          oneEvent.end = oneEvent.end.toDate();
          eventList.push(oneEvent);
        });
        setEvent([...eventList]);
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
  }, []);

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
      <Button
        sx={{ m: "0 30px" }}
        onClick={() => setOpen(true)}
        variant="outlined"
      >
        Add Event
      </Button>
      <Box sx={{ height: "600px", m: "30px" }}>
        <Calendar
          localizer={localizer}
          events={event}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
        />
      </Box>
    </>
  );
}
