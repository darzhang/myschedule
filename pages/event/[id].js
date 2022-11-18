import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState({});
  const { user } = useAuth;
  const [isLoading, setIsLoading] = useState(true);
  const [falseEvent, setFalseEvent] = useState(false);

  const handleDelete = () => {
    Swal.fire({
      icon: "warning",
      title: "Delete Event",
      text: `Are you sure you want to delete "${event.title}"`,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(
          doc(db, process.env.NEXT_PUBLIC_FIREBASE_EVENT_COLLECTION, id)
        );
        await updateDoc(
          doc(db, process.env.NEXT_PUBLIC_FIREBASE_USER_COLLECTION, user.uid),
          {
            events: arrayRemove(id),
          }
        );
        router.push("/user/schedule");
      }
    });
  };

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        const docSnap = await getDoc(
          doc(db, process.env.NEXT_PUBLIC_FIREBASE_EVENT_COLLECTION, id)
        );
        setIsLoading(false);
        if (docSnap.data() == null) {
          setFalseEvent(true);
          return;
        } else {
          setEvent(docSnap.data());
        }
      };
      fetchEvent();
    }
  }, [id]);
  return (
    <>
      {!isLoading &&
        (falseEvent ? (
          <Typography variant="h3">No event can be found</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ mb: "20px" }} variant="h3">
              {event.title}
            </Typography>
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
              <Button
                onClick={handleDelete}
                variant="outlined"
                startIcon={<DeleteOutline />}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
    </>
  );
}
