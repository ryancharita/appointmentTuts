import { useContext, useState } from "react";

import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { observer } from "mobx-react";
import { useSearchParams } from "react-router-dom";

import AppointmentContextProvider from "../../components/appointments/appointmentContextProvider";
import AppoinmentModal from "../../components/appointments/appointmentsForm";
import AppointmentsTable from "../../components/appointments/appointmentsTable";

import { MyContext } from "../../context/context";

import { makePossessive } from "../../helpers/names.cjs";

const Appointments = observer(() => {
  const { setModalDisplay } = useContext(MyContext);

  // Get search parameters from the URL
  let [searchParams] = useSearchParams();

  // Handle create modal open
  const handleCreateApplicationButtonCLick = () => {
    setModalDisplay(true);
  };

  return (
    <div className="p-5">
      {/* Title */}
      <Title className="capitalize">
        {makePossessive(searchParams.get("name"))} Appointments
      </Title>

      {/* Create Appointment Button */}
      <Button
        onClick={handleCreateApplicationButtonCLick}
        type="primary"
        className="mb-5"
      >
        Create Appointment
      </Button>

      {/* Appointments Table */}
      <AppointmentsTable />

      {/* Appointment Modal */}
      <AppoinmentModal />
    </div>
  );
});

export default () => (
  <AppointmentContextProvider>
    <Appointments />
  </AppointmentContextProvider>
);
