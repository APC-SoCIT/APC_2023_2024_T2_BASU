import React, { useState } from "react";
import PageComponent from "../components/PageComponent";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import Calendar from "../components/Calendar"; // Import your Calendar component

export default function InquireReservation() {
  const [passengers, setPassengers] = useState([{ id: 1, name: "" }]);
  const [nextId, setNextId] = useState(2);

  const addPassenger = () => {
    setPassengers([...passengers, { id: nextId, name: "" }]);
    setNextId(nextId + 1);
  };

  const removePassenger = (id) => {
    setPassengers(passengers.filter((passenger) => passenger.id !== id));
  };

  const handlePassengerChange = (id, value) => {
    setPassengers(
      passengers.map((passenger) =>
        passenger.id === id ? { ...passenger, name: value } : passenger
      )
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <PageComponent
      buttons={
        <TButton color="indigo" to="/student/reservation/list">
          <ChevronDoubleLeftIcon className="h-6 w-6 mr-2" />
          Back to your Reservation Dashboard
        </TButton>
      }
    >
      <form>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Left Column */}
          <div className="sm:col-span-1">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Reservation Details
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Provide information about your reservation.
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {/* Reservation details fields */}
                {/* Name */}
                <div className="col-span-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
                {/* Reservation Reason */}
                <div className="col-span-1 mt-2">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Reason for Reserving a Shuttle Vehicle
                  </label>
                  <input
                    type="text"
                    id="reason"
                    name="reason"
                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
                {/* Reservation Description */}
                <div className="col-span-1 mt-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Reservation Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={2}
                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              {/*Second Left Border */}
              <div className="bg-white overflow-hidden shadow rounded-lg mt-5">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Passenger Details
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Provide the list of names of all students & faculty
                    involved.
                  </p>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  {passengers.map((passenger) => (
                    <div
                      className="col-span-1 flex items-center"
                      key={passenger.id}
                    >
                      <label
                        htmlFor={`name-${passenger.id}`}
                        className="block text-sm font-medium text-gray-900 mr-3"
                      >
                        Passenger
                      </label>
                      <input
                        type="text"
                        id={`name-${passenger.id}`}
                        name={`name-${passenger.id}`}
                        className="mt-1 flex-grow block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        value={passenger.name}
                        onChange={(e) =>
                          handlePassengerChange(passenger.id, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="ml-3 px-3 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={() => removePassenger(passenger.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="col-span-1">
                    <button
                      type="button"
                      className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={addPassenger}
                    >
                      Add Passenger
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="sm:col-span-1">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Location Information
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Provide the full location details
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="col-span-1 mt-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-1 mt-2">
                  <label
                    htmlFor="landmark"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Landmark
                  </label>
                  <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-1 mt-2">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-900"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id=""
                    name=""
                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-1 mt-2">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-900"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id=""
                    name=""
                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-1 mt-2">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-900"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id=""
                    name=""
                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-1 mt-2">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-900"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id=""
                    name=""
                    className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Bottom Page */}
        <div
          className="bg-white overflow-hidden shadow rounded-lg mt-5 p-2 md:p-6 flex flex-col md:flex-row"
          style={{ marginBottom: "20px", padding: "5px" }}
        >
          <div className="px-4 py-5 sm:px-6 md:w-1/2">
            <h2 className="text-lg font-medium text-center text-gray-900">
              Choose Date and Time
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Input the exact information
            </p>
            <div
              style={{
                border: "2px solid white",
                borderRadius: "8px",
                overflow: "hidden",
                borderBottom: "10px solid white",
              }}
            >
              <Calendar onSelectDate={handleDateSelect} />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="px-4 py-5">
              <h3 className="text-lg font-medium text-gray-900 text-center">
                Reservation Details
              </h3>
              <p className="text-sm text-gray-600">
                Provide information about your reservation. Provide information
                about your reservation. Provide information about your
                reservation. Provide information about your reservation. Provide
                information about your reservation.
              </p>
              {/* Add more description content as needed */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </PageComponent>
  );
}
