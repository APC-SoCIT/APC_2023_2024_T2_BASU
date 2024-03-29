import React, { useState, useEffect } from "react";
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
import { postReservation, getUsers } from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import Autocomplete from "@mui/material/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TButton from "../components/core/TButton";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

export default function InquireReservation() {
  const { currentUser, setCurrentUser } = useStateContext();
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
    passengers: [],
  });
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = await getUsers();
        const filteredUsers = userList.filter((user) => user.role === 2);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

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

  const handlePassengerChange = (event, newValue) => {
    const filteredPassengers = newValue.filter(
      (user) => user.id !== currentUser.id
    );

    setFormData((prevData) => ({
      ...prevData,
      passengers: filteredPassengers,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUser.hasReservations) {
        toast.error("You can only create one reservation.");
        return;
      }

      const response = await postReservation(formData);
      toast.success("Reservation submitted");
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        reason: "",
        description: "",
        location: "",
        landmark: "",
        start_time: "",
        end_time: "",
        passengers: [],
      });
      setError(null);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        hasReservations: true,
      }));
    } catch (error) {
      console.error("Error creating reservation:", error);
      setError(error.message);
    }
  };

  return (
    <PageComponent
      buttons={
        <TButton color="indigo" to="/student/reservation/list">
          <ArrowLeftEndOnRectangleIcon className="h-6 w-6 mr-2" /> Back to
          Reservation
        </TButton>
      }
    >
      <ToastContainer />
      <Box sx={{ display: "flex", justifyContent: "center", m: 1, p: 1 }}>
        <Card sx={{ width: "100%", maxWidth: 600 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {error && <Alert severity="error">{error}</Alert>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    variant="outlined"
                    value={formData.name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    multiple
                    id="passengers"
                    options={users}
                    getOptionLabel={(option) => option.email}
                    value={formData.passengers}
                    onChange={handlePassengerChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Passengers"
                        placeholder="Select passengers"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    variant="outlined"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Landmark"
                    name="landmark"
                    variant="outlined"
                    value={formData.landmark}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
