import { useState } from 'react';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { useSearchParams } from 'react-router-dom';
import AppointmentsTable from '../../components/appointments/appointmentsTable';
import AppoinmentModal from '../../components/appointments/appointmentsForm';
import { makePossessive } from '../../helpers/names.cjs';

const Appointments = () => {
  // State variables
  const [modalDisplay, setModalDisplay] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editRecord, setEditRecord] = useState();

  // Get appointment list from local storage
  const appointmentList = JSON.parse(localStorage.getItem('items'));

  // Get search parameters from the URL
  let [searchParams] = useSearchParams();

  // Handle appointment edit, set the edit record and display the modal
  const handleAppointmentEdit = (key) => {
    const index = appointmentList.findIndex((obj) => obj.key === key);
    setEditRecord(appointmentList[index]);
    setModalDisplay(true);
  };

  // Handle edit modal close, reset the edit record and hide the modal
  const handleEditModalClose = () => {
    setEditRecord();
    setModalDisplay(false);
  };

  return (
    <div className="p-5">
      {/* Title */}
      <Title className="capitalize">{makePossessive(searchParams.get('name'))} Appointments</Title>

      {/* Create Appointment Button */}
      <Button onClick={() => setModalDisplay(true)} type="primary" className="mb-5">
        Create Appointment
      </Button>

      {/* Appointments Table */}
      <AppointmentsTable
        dataSource={appointmentList}
        onEdit={handleAppointmentEdit}
        confirmLoading={confirmLoading}
        setConfirmLoading={setConfirmLoading}
      />

      {/* Appointment Modal */}
      <AppoinmentModal isModalOpen={modalDisplay} handleCancel={handleEditModalClose} record={editRecord} />
    </div>
  );
};

export default Appointments;
