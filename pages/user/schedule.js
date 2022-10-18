import { Box, Button, TextField, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import AddEventDialog from "../../components/AddEventDialog";

export default function SchedulePage() {

  const localizer = momentLocalizer(moment) // or globalizeLocalizer
  const [event, setEvent] = useState([]);
  const [open, setOpen] = useState(false)

  const onSubmit = (data) => {
    setEvent([...event, data])
  }

  const handleSelectEvent = (event) => {
    console.log(event);
  }

  return (
    <>
      <AddEventDialog open={open} handleClose={() => setOpen(false)} onSubmit={onSubmit}/>
      <Typography sx={{mb:"10px", flexGrow: 1}} align="center" variant="h3">Schedule</Typography>
      <Button sx={{m: "0 30px"}} onClick={() => setOpen(true)} variant="outlined">Add Event</Button>
      <Box sx={{height: "600px", m: "30px"}} >
        <Calendar
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
      />
      </Box>
    </>
  )
}