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
      Reservation Form
    </PageComponent>
  );
}
