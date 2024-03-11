import React, { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { InboxArrowDownIcon } from "@heroicons/react/24/outline";
import { getReservation } from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import EditReservationModal from "./EditReservationModal";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export default function StudentReservation() {
  const { currentUser } = useStateContext();
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null); // Track selected reservation for editing

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getReservation();
        if (response && Array.isArray(response)) {
          const userReservations = response.filter(
            (reservation) => reservation.email === currentUser.email
          );
          setReservations(userReservations);
        } else {
          console.error("Invalid data format received:", response);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [currentUser.email]); // Depend on currentUser.email to refetch reservations when email changes

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleEdit = (reservation) => {
    if (reservation.status !== "Denied" && reservation.status !== "Approved") {
      setSelectedReservation(reservation);
    } else {
      setSelectedReservation(null);
    }
  };

  return (
    <PageComponent
      buttons={
        <TButton color="green" to="/inquire/reservation">
          <InboxArrowDownIcon className="h-6 w-6 mr-2" /> Inquire a Reservation
        </TButton>
      }
    >
      <div className="mb-20">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="font-mono text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Welcome to the Student Reservation Overview!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This page displays a summary of your reservations. You can view and modify your reservations here. If you have any inquiries or
            need assistance, feel free to contact us.
          </p>
        </div>

        <div className="my-10 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <span className="sr-only">Checkbox</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Starting Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Ending Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <span className="sr-only">Checkbox</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDateTime(reservation.start_time)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDateTime(reservation.end_time)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`
                      font-bold
                      ${
                        reservation.status === "Pending"
                          ? "text-yellow-500"
                          : reservation.status === "Approved"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    `}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="flex items-center justify-center font-medium text-blue-600 dark:blue-red-500 hover:underline border border-gray-300 rounded-md w-8 h-8 transition duration-300 ease-in-out transform hover:scale-110"
                      onClick={() => handleEdit(reservation)}
                    >
                      <PencilSquareIcon className="h-6 w-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedReservation && ( // Render the editing component if a reservation is selected and not "Denied" or "Approved"
          <EditReservationModal
            reservation={selectedReservation}
            onClose={() => setSelectedReservation(null)} // Close the modal when editing is done
          />
        )}

        <div className="max-w-6xl mx-auto mt-8 flex flex-col items-center gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-gray-200 mb-4">
                Reservation Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The reservation passed on this system are for the whole shuttle vehicle.
                <br /><br />Any reservations made by the students are stored and up for processing.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-yellow-600 dark:text-gray-200 mb-4">
                Notice!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                By filling up the reservation form, you are responsible for the data you provide.
                <br/><br/>
                You are also responsible for any outcomes regarding the reservation of the system.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className=" text-center text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Contact Administration:
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Shuttle Service Administrator
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Name: Moana Marie C. Dingle
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Email: moanad@apc.edu.ph
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
