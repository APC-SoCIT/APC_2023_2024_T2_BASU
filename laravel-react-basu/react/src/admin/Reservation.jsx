import React, { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import { getReservationAdmin, updateReservationAdmin } from "../axios"; // Import the functions to get and update reservations data

export default function StudentReservation() {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getReservationAdmin();
        if (response && Array.isArray(response)) {
          setReservations(response);
        } else {
          console.error("Invalid data format received:", response);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await updateReservationAdmin(
        selectedReservation.id,
        selectedReservation
      );
      if (response) {
        // Update the reservations list with the updated reservation
        const updatedReservations = reservations.map((reservation) =>
          reservation.id === selectedReservation.id
            ? selectedReservation
            : reservation
        );
        setReservations(updatedReservations);
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleFieldChange = (field, value) => {
    setSelectedReservation({
      ...selectedReservation,
      [field]: value,
    });
  };

  const openModal = (reservation) => {
    setSelectedReservation(reservation);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <PageComponent>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="max-w-6xl mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <span className="sr-only">Checkbox</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
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
                    {reservation.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => openModal(reservation)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
              <div className="bg-white px-8 py-6 sm:p-6">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  id="modal-title"
                >
                  Reservation Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Reason
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.reason}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.description}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.location}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Landmark
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.landmark}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Time
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.start_time}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Time
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.end_time}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Passengers
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedReservation.passenger}
                    </p>
                  </div>
                </div>
                <div className="mt-10">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleFieldChange("status", "Approved")}
                      className={`p-2 block w-full border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        selectedReservation.status === "Approved"
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleFieldChange("status", "Denied")}
                      className={`p-2 block w-full border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        selectedReservation.status === "Denied"
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Deny
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
                <button
                  onClick={handleUpdate}
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageComponent>
  );
}
