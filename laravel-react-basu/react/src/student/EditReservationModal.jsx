import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button, TextField } from "@mui/material";
import { updateReservationAdmin } from "../axios";

export default function EditReservationModal({ reservation, onClose }) {
  const [formData, setFormData] = useState(reservation);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateReservationAdmin(reservation.id, formData);
      console.log("Edited reservation submitted successfully");
      onClose();
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-lg font-medium text-gray-900 mb-4">Modify Reservation</DialogTitle>
      <DialogContent>
        <div className="space-y-4 mt-5">
          <TextField
            label="Starting Date"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Ending Date"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            fullWidth
          />
          <div className="flex justify-end"> {/* Flex container to align the button to the right */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
