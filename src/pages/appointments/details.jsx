import { App, Button, Card, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppoinmentModal from '../../components/appointments/appointmentsForm';

const { Text } = Typography;
const AppointmentDetails = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [appointment, setAppointment] = useState();
  const { key } = useParams();
  useEffect(() => {
    const appointmentList = JSON.parse(localStorage.getItem('items'));
    const index = appointmentList.findIndex((obj) => obj.key === key);
    setAppointment(appointmentList[index]);
  }, [localStorage.getItem('items')]);

  const handleEdit = () => {
    setModalDisplay(true);
  };
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
      <AppoinmentModal isModalOpen={modalDisplay} handleCancel={handleEditModalClose} record={appointment} />
    </Card>
  );
};

export default AppointmentDetails;