
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker, DesktopDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Box } from '@mui/system';
import { Button, Dialog, TextField, Typography } from "@mui/material";
import moment from 'moment';
import { useState } from 'react';

export default function AddEventDialog({open, handleClose, onSubmit}) {
  const [startDate, setStartDate] = useState(moment().toDate());
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(moment().toDate());
  const [eventName, setEventName] = useState("");

  const handleSubmit = () => {
    const event = {
      title: eventName,
      description: description,
      start: startDate,
      end: endDate
    };

    onSubmit(event);
    closeDialog();
  }

  const closeDialog = () => {
    handleClose();
    setEventName("");
    setDescription("");
    setStartDate(moment().toDate());
    setEndDate(moment().toDate());
  }
  
  return (
    <Dialog open={open} onClose={closeDialog}>
      <Box sx={{m:"20px"}}>
        <Typography variant="h4" sx={{m: "10px 0"}}>Add New Event</Typography>
        <TextField
          sx={{alignSelf: "center", mb: "20px"}}
          label="Event Name"
          value={eventName}
          fullWidth
          onChange={(e) => setEventName(e.target.value)} 
        />
        <TextField
          sx={{alignSelf: "center", mb: "20px"}}
          label="Event Description"
          value={description}
          fullWidth
          multiline
          onChange={(e) => setDescription(e.target.value)} 
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Box sx={{display: "flex", flexDirection: "row"}}>
            <DesktopDateTimePicker
              label="Start Time"
              renderInput={(params) => <TextField {...params} />}
              value={startDate}
              inputFormat="DD/MM/YYYY hh:mm a"
              onChange={(newDate) => {
                setStartDate(moment(newDate).toDate());
              }}
            />
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
        <Box sx={{height: "20px"}}></Box>
        <Button onClick={handleSubmit} variant='outlined'>Submit</Button>
      </Box>
    </Dialog>
  )
}