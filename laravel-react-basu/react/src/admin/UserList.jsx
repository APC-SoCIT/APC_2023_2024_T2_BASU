import React, { useState, useEffect } from "react";
import axiosClient from "../axios";
import PageComponent from "../components/PageComponent";
import { CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import TButton from "../components/core/TButton";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import Person2Icon from "@mui/icons-material/Person2";
import FlightClassIcon from "@mui/icons-material/FlightClass";
import UserSearch from "../styling/UserSearch";
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

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
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
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
                          textAlign: "center", // Center align
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "darkblue",
                          fontFamily: "monospace",
                          textAlign: "center", // Center align
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "darkblue",
                          fontFamily: "monospace",
                          textAlign: "center", // Center align
                        }}
                      >
                        Role
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "darkblue",
                          fontFamily: "monospace",
                          textAlign: "center", // Center align
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
                          <IconButton color="secondary" aria-label="delete">
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
      </div>
    </PageComponent>
  );
}
