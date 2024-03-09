import React, { useState } from "react";
import PageComponent from "../components/PageComponent";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Alert,
} from "@mui/material";
import { postReservation } from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function InquireReservation() {
  const { currentUser } = useStateContext();
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    reason: "",
    description: "",
    location: "",
    landmark: "",
    status: "Pending",
    start_time: "",
    end_time: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "start_time" || name === "end_time") {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        alert("Please select a date and time in the future.");
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postReservation(formData);
      console.log("Reservation created:", response);
      setFormData({
        name: "",
        email: "",
        reason: "",
        description: "",
        location: "",
        landmark: "",
        start_time: "",
        end_time: "",
      });
      setError(null); // Reset error state after successful submission
    } catch (error) {
      console.error("Error creating reservation:", error);
      setError(error.message); // Set error state to error message from axios
    }
  };

  return (
    <PageComponent>
      <Box sx={{ display: "flex", justifyContent: "center", m: 1, p: 1 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-10">
              {error && <Alert severity="error">{error}</Alert>}{" "}
              </div>
              {/* Display error message */}
              <Grid container spacing={2}>
                {/* Form fields */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Reason"
                    name="reason"
                    variant="outlined"
                    value={formData.reason}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    variant="outlined"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Landmark"
                    name="landmark"
                    variant="outlined"
                    value={formData.landmark}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Time"
                    name="start_time"
                    type="datetime-local"
                    variant="outlined"
                    value={formData.start_time}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Time"
                    name="end_time"
                    type="datetime-local"
                    variant="outlined"
                    value={formData.end_time}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </PageComponent>
  );
}
