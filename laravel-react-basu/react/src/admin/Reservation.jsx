import React from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export default function Reservation() {
  return (
    <PageComponent
      title={"Reservation List"}
      buttons={
        <TButton color="green" to="/reservation/create">
          <ClipboardDocumentListIcon className="h-6 w-6 mr-2" />
          Create a Reservation
        </TButton>
      }
    >
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date Submitted
              </th>
              <th scope="col" className="px-6 py-3">
                Date Returned
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Hanzel Bernante
              </td>
              <td className="px-6 py-4">reviewing</td>
              <td className="px-6 py-4">02/08/2024</td>
              <td className="px-6 py-4">~</td>
              <td className="px-6 py-4 flex justify-end space-x-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Show
                </a>
                <button className="text-red-600 dark:text-red-500 hover:underline">
                  Hide
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </PageComponent>
  );
}