import { App, Button, Card, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppoinmentModal from '../../components/appointments/appointmentsForm';

const { Text } = Typography;

const AppointmentDetails = () => {
  // State variables
  const [modalDisplay, setModalDisplay] = useState(false);
  const [appointment, setAppointment] = useState();
  const { key } = useParams();

  // Fetch and set appointment details from local storage
  useEffect(() => {
    const appointmentList = JSON.parse(localStorage.getItem('items'));
    const index = appointmentList.findIndex((obj) => obj.key === key);
    setAppointment(appointmentList[index]);
  }, [localStorage.getItem('items')]);

  // Handle edit button click to display the modal
  const handleEdit = () => {
    setModalDisplay(true);
  };

  // Handle edit modal close
  const handleEditModalClose = () => {
    setModalDisplay(false);
  };

  return (
    <Card
      type="inner"
      title={<Title level={3}>{appointment?.name}</Title>}
      extra={
        <Button type="primary" onClick={handleEdit}>
          Edit
        </Button>
      }
    >
      <Title level={4}>{appointment?.purpose}</Title>
      <Title style={{ marginBottom: '1.2em' }} level={4}>
        {appointment?.contact_number}
      </Title>
      <Text>
        {moment(appointment?.appointment_date).format('YYYY-MM-DD')}&nbsp;
        {moment(appointment?.appointment_time).format('hh:mm:ss')}
      </Text>
      {/* Render the appointment modal */}
      <AppoinmentModal isModalOpen={modalDisplay} handleCancel={handleEditModalClose} record={appointment} />
    </Card>
  );
};

export default AppointmentDetails;
