import React, { useState } from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { postShuttleForm } from "../axios";

export default function ShuttleForm() {
  const [formData, setFormData] = useState({
    shuttle_name: "",
    shuttle_plate_number: "",
    shuttle_color: "",
    design_mark: "",
    passenger_capacity: "",
    working_condition: "",
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend API using postShuttleForm
      const response = await postShuttleForm(formData);
      console.log("Form submitted successfully:", response);
      // Clear form fields after successful submission
      setFormData({
        shuttle_name: "",
        shuttle_plate_number: "",
        shuttle_color: "",
        shuttle_landmark: "",
        passenger_capacity: "",
        working_condition: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <PageComponent
      buttons={
        <TButton color="indigo" to="/shuttle/storage">
          <ClipboardDocumentIcon className="h-6 w-6 mr-2" />
          Go back to Shuttle Storage
        </TButton>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Shuttle Importation Process
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Register shuttle vehicles that would be used on the service.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="shuttle_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name of the Vehicle
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="shuttle_name"
                    id="shuttle_name"
                    value={formData.shuttle_name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="large-white"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Shuttle Vehicle Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">, image only</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG and JPG, up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Shuttle Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Input the details and information of Shuttle Vehicles.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="shuttle_plate_number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Plate Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="shuttle_plate_number"
                    id="shuttle_plate_number"
                    value={formData.shuttle_plate_number}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="shuttle_color"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Shuttle Color
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="shuttle_color"
                    id="shuttle_color"
                    value={formData.shuttle_color}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="shuttle_landmark"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Design Landmark
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="shuttle_landmark"
                    id="shuttle_landmark"
                    value={formData.shuttle_landmark}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="passenger_capacity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Passenger Capacity
                </label>
                <div className="mt-2">
                  <select
                    id="passenger_capacity"
                    name="passenger_capacity"
                    value={formData.passenger_capacity}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                    <option>X-Large</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            {/* Working Condition */}
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Working Condition
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Select the current working condition of the vehicle.
            </p>
            <div className="mt-6 space-y-6">
              {/* Rest of the form fields */}
              <div className="flex items-center gap-x-3">
                <input
                  id="available"
                  name="working_condition"
                  type="radio"
                  value="Available"
                  checked={formData.working_condition === "Available"} // Corrected checked attribute
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="available"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Available
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="under-maintenance"
                  name="working_condition"
                  type="radio"
                  value="Under Maintenance"
                  checked={formData.working_condition === "Under Maintenance"} // Corrected checked attribute
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="under-maintenance"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Under Maintenance
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="out-of-service"
                  name="working_condition"
                  type="radio"
                  value="Out of Service"
                  checked={formData.working_condition === "Out of Service"} // Corrected checked attribute
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="out-of-service"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Out of Service
                </label>
              </div>
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
