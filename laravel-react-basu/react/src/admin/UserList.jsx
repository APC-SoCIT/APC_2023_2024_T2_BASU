import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import PageComponent from "../components/PageComponent";
import {
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TButton from "../components/core/TButton";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import Person2Icon from "@mui/icons-material/Person2";
import FlightClassIcon from "@mui/icons-material/FlightClass";
import UserSearch from "../styling/UserSearch";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState(null); // New state for filtering role

  const [openDialog, setOpenDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null); // New state to store the user ID to delete

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then((response) => {
        // Filter out users with role 1
        const filteredUsers = response.data.filter(
          (user) => parseInt(user.role) !== 1
        );
        setUsers(filteredUsers);
        setFilteredUsers(filteredUsers);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Function to render role name based on role number
  const renderRoleName = (role) => {
    switch (role) {
      case "2":
        return "Student";
      case "3":
        return "Driver";
      default:
        return "Unknown";
    }
  };

  // Function to handle search
  const handleSearch = (value) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Function to handle role filtering
  const handleRoleFilter = (role) => {
    if (role === filterRole) {
      setFilterRole(null); // Clear filter if clicked again
      setFilteredUsers(users); // Reset filtered users
    } else {
      const filtered = users.filter((user) => user.role === role);
      setFilterRole(role);
      setFilteredUsers(filtered);
    }
  };

  // Function to handle opening the confirmation dialog
  const handleOpenDialog = (userId) => {
    setUserIdToDelete(userId);
    setOpenDialog(true);
  };

  // Function to handle closing the confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserIdToDelete(null);
  };

  // Function to handle deleting the user after confirmation
  const handleDeleteConfirmed = async () => {
    try {
      await axiosClient.delete(`/users/${userIdToDelete}`);
      // After successful deletion, you may want to update the user list displayed on the frontend
      // You can fetch the updated user list from the backend again or update the state if you're already keeping track of the user list in state
      handleCloseDialog(); // Close the confirmation dialog after successful deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const deleteUser = (userId) => {
    handleOpenDialog(userId); // Trigger confirmation dialog before deleting the user
  };

  return (
    <PageComponent
      title="User List"
      buttons={
        <TButton color="green" to="/account/register">
          <UserPlusIcon className="h-6 w-6 mr-2" />
          Register an Account
        </TButton>
      }
    >
      <div>
        {loading && <CircularProgress />}
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
        {!loading && !error && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "8px",
              }}
            >
              {/* Button for filtering by student */}
              <IconButton
                color={filterRole === "2" ? "primary" : "default"}
                onClick={() => handleRoleFilter("2")}
                aria-label="filter-student"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginRight: "8px",
                }}
              >
                <Person2Icon />
              </IconButton>
              {/* Button for filtering by driver */}
              <IconButton
                color={filterRole === "3" ? "primary" : "default"}
                onClick={() => handleRoleFilter("3")}
                aria-label="filter-driver"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginRight: "8px",
                }}
              >
                <FlightClassIcon />
              </IconButton>
              {/* Search bar */}
              <UserSearch onSearch={handleSearch} />
            </div>
            {filteredUsers.length === 0 ? (
              <Typography variant="body1">No user details found.</Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table aria-label="user table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "darkblue",
                          fontFamily: "monospace",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "darkblue",
                          fontFamily: "monospace",
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "darkblue",
                          fontFamily: "monospace",
                        }}
                      >
                        Role
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "darkblue",
                          fontFamily: "monospace",
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex min-w-0 gap-x-4 items-center">
                            <div className="h-12 w-12 flex-none rounded-full bg-gray-50 flex items-center justify-center">
                              {user.role === "2" ? (
                                <Person2Icon className="h-8 w-8" />
                              ) : user.role === "3" ? (
                                <FlightClassIcon className="h-8 w-8" />
                              ) : null}
                            </div>
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {user.name}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {user.email}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm leading-6 text-gray-900">
                            {renderRoleName(user.role)}
                          </p>
                        </TableCell>
                        <TableCell>
                          <IconButton color="primary" aria-label="edit">
                            <EditNoteIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            aria-label="delete"
                            onClick={() => deleteUser(user.id)}
                          >
                            <PersonRemoveIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
        {/* Confirmation dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <TButton onClick={handleCloseDialog} color="blue">
              Cancel
            </TButton>
            <TButton
              onClick={handleDeleteConfirmed}
              color="red"
              autoFocus
            >
              Delete
            </TButton>
          </DialogActions>
        </Dialog>
      </div>
    </PageComponent>
  );
}
