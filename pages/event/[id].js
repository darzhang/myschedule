import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        const docSnap = await getDoc(
          doc(db, process.env.NEXT_PUBLIC_FIREBASE_EVENT_COLLECTION, id)
        );
        setEvent(docSnap.data());
        setIsLoading(false);
      };
      fetchEvent();
    }
  }, [id]);
  return (
    <>
      {!isLoading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">{event.title}</Typography>
          <TextField
            multiline
            sx={{ m: "10px", width: "250px" }}
            label={"Description"}
            defaultValue={event.description}
            inputProps={{ readOnly: true }}
          />
          <TextField
            sx={{ m: "10px", width: "250px" }}
            label={"Start Time"}
            defaultValue={moment(event.start.toDate()).format(
              "DD/MM/YYYY hh:mm a"
            )}
            inputProps={{ readOnly: true }}
          />
          <TextField
            sx={{ m: "10px", width: "250px" }}
            label={"End Time"}
            defaultValue={moment(event.end.toDate()).format(
              "DD/MM/YYYY hh:mm a"
            )}
            inputProps={{ readOnly: true }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
              onClick={() => router.push(`/event/edit/${id}`)}
              variant="outlined"
              startIcon={<EditOutlined />}
              sx={{ mb: "10px" }}
            >
              Edit
            </Button>
            <Button variant="outlined" startIcon={<DeleteOutline />}>
              Delete
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
