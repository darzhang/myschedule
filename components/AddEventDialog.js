import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  DateTimePicker,
  DesktopDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Box } from "@mui/system";
import { Button, Dialog, TextField, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { db } from "../config/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function AddEventDialog({ open, handleClose, onSubmit }) {
  const [startDate, setStartDate] = useState(moment().toDate());
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(moment().toDate());
  const [eventName, setEventName] = useState("");
  const { user } = useAuth();

  const handleSubmit = async () => {
    const event = {
      title: eventName,
      description: description,
      start: startDate,
      end: endDate,
    };

    // create new event document in firestore
    const docRef = await addDoc(
      collection(db, process.env.NEXT_PUBLIC_FIREBASE_EVENT_COLLECTION),
      {
        title: event.title,
        description: event.description,
        start: Timestamp.fromDate(event.start),
        end: Timestamp.fromDate(event.end),
      }
    );

    // using the event document id above, update the user event list to include the new event
    await updateDoc(
      doc(db, process.env.NEXT_PUBLIC_FIREBASE_USER_COLLECTION, user.uid),
      {
        events: arrayUnion(docRef.id),
      }
    );

    onSubmit(event);
    closeDialog();
  };

  const closeDialog = () => {
    handleClose();
    setEventName("");
    setDescription("");
    setStartDate(moment().toDate());
    setEndDate(moment().toDate());
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <Box sx={{ m: "20px" }}>
        <Typography variant="h4" sx={{ m: "10px 0" }}>
          Add New Event
        </Typography>
        <TextField
          sx={{ alignSelf: "center", mb: "20px" }}
          label="Event Name"
          value={eventName}
          fullWidth
          onChange={(e) => setEventName(e.target.value)}
        />
        <TextField
          sx={{ alignSelf: "center", mb: "20px" }}
          label="Event Description"
          value={description}
          fullWidth
          multiline
          onChange={(e) => setDescription(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <DesktopDateTimePicker
              label="Start Time"
              renderInput={(params) => <TextField {...params} />}
              value={startDate}
              inputFormat="DD/MM/YYYY hh:mm a"
              onChange={(newDate) => {
                setStartDate(moment(newDate).toDate());
              }}
            />
            <Box sx={{ height: "20px" }}></Box>
            <DesktopDateTimePicker
              label="End Time"
              renderInput={(params) => <TextField {...params} />}
              value={endDate}
              inputFormat="DD/MM/YYYY hh:mm a"
              onChange={(newDate) => {
                setEndDate(moment(newDate).toDate());
              }}
            />
          </Box>
        </LocalizationProvider>
        <Box sx={{ height: "20px" }}></Box>
        <Button onClick={async () => await handleSubmit()} variant="outlined">
          Submit
        </Button>
      </Box>
    </Dialog>
  );
}
