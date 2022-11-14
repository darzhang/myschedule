import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  DesktopDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(moment().toDate());
  const [endDate, setEndDate] = useState(moment().toDate());
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async () => {
    const data = {
      title: title,
      description: description,
      start: Timestamp.fromDate(startDate),
      end: Timestamp.fromDate(endDate),
    };
    await setDoc(
      doc(db, process.env.NEXT_PUBLIC_FIREBASE_EVENT_COLLECTION, id),
      data
    );
    router.push(`/event/${id}`);
  };

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        const docSnap = await getDoc(
          doc(db, process.env.NEXT_PUBLIC_FIREBASE_EVENT_COLLECTION, id)
        );
        const event = docSnap.data();
        setTitle(event.title);
        setDescription(event.description);
        setStartDate(event.start.toDate());
        setEndDate(event.end.toDate());
        setIsLoading(false);
      };
      fetchEvent();
    }
  }, [id]);
  return (
    !isLoading && (
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h3">Edit Event</Typography>
        <TextField
          multiline
          sx={{ m: "10px", width: "250px" }}
          label={"Title"}
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          multiline
          sx={{ m: "10px", width: "250px" }}
          label={"Description"}
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <DesktopDateTimePicker
              label="Start Time"
              renderInput={(params) => (
                <TextField {...params} sx={{ m: "10px", width: "250px" }} />
              )}
              value={startDate}
              inputFormat="DD/MM/YYYY hh:mm a"
              onChange={(newDate) => {
                setStartDate(moment(newDate).toDate());
              }}
            />
          </Box>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <DesktopDateTimePicker
              label="End Time"
              renderInput={(params) => (
                <TextField {...params} sx={{ m: "10px", width: "250px" }} />
              )}
              value={endDate}
              inputFormat="DD/MM/YYYY hh:mm a"
              onChange={(newDate) => {
                setEndDate(moment(newDate).toDate());
              }}
            />
          </Box>
        </LocalizationProvider>
        <Button onClick={handleSubmit} variant="outlined">
          Submit
        </Button>
      </Box>
    )
  );
}
