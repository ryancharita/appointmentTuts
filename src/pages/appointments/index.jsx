import { useEffect, useState } from 'react';

import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { useSearchParams } from 'react-router-dom';
import AppointmentsTable from '../../components/appointments/appointmentsTable';
import AppoinmentModal from '../../components/appointments/appointmentsForm';
import { makePossessive } from '../../helpers/names.cjs';

const Appointments = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editRecord, setEditRecord] = useState();
  const appointmentList = JSON.parse(localStorage.getItem('items'));

  let [searchParams] = useSearchParams();

  const handleAppointmentEdit = (key) => {
    const index = appointmentList.findIndex((obj) => obj.key === key);
    setEditRecord(appointmentList[index]);
    setModalDisplay(true);
  };
  const handleEditModalClose = () => {
    setEditRecord();
    setModalDisplay(false);
  };

  return (
    <div className="p-5">
      <Title className="capitalize"> {makePossessive(searchParams.get('name'))} Appointments</Title>
      <Button onClick={() => setModalDisplay(true)} type="primary" className="mb-5">
        Create Appointment
      </Button>
      <AppointmentsTable
        dataSource={appointmentList}
        onEdit={handleAppointmentEdit}
        confirmLoading={confirmLoading}
        setConfirmLoading={setConfirmLoading}
      />
      <AppoinmentModal isModalOpen={modalDisplay} handleCancel={handleEditModalClose} record={editRecord} />
    </div>
  );
};
export default Appointments;
