import React from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";

export default function StudentReservation() {
  return (
    <PageComponent
      buttons={
        <TButton color="green" to="/inquire/reservation">
          <ArchiveBoxArrowDownIcon className="h-6 w-6 mr-2" />
          Inquire a Reservation
        </TButton>
      }
    >
Hello World
    </PageComponent>
  );
}
