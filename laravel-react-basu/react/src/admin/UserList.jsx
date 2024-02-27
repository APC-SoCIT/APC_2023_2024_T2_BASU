import React, { useState, useEffect } from "react";
import axiosClient from "../axios"; // Import your axiosClient instance
import PageComponent from "../components/PageComponent";
import { CircularProgress, Typography } from "@mui/material"; // Import MUI components
import { UserCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import TButton from "../components/core/TButton";
import { ChevronDoubleLeftIcon, UserPlusIcon } from "@heroicons/react/24/outline";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
        {loading && <CircularProgress />}{" "}
        {/* Display loading spinner while loading */}
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}{" "}
        {/* Display error message if error occurs */}
        {!loading &&
          !error && ( // Render list only if not loading and no error
            <ul role="list" className="divide-y divide-gray-100">
              {users.map((user) => (
                <li key={user.id} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="h-12 w-12 flex-none rounded-full bg-gray-50 flex items-center justify-center">
                      {" "}
                      {/* Container for icon */}
                      {user.role === 2 ? (
                        <UserIcon className="h-8 w-8" />
                      ) : user.role === 3 ? (
                        <UserCircleIcon className="h-8 w-8" />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {user.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {user.role}
                    </p>
                    {/* Remove the last seen section */}
                  </div>
                </li>
              ))}
            </ul>
          )}
      </div>
    </PageComponent>
  );
}
