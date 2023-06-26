import { useContext, useEffect, useState } from "react";

import { Button, Card, Typography } from "antd";
import Title from "antd/es/typography/Title";
import moment from "moment";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

import AppoinmentModal from "../../components/appointments/appointmentsForm";

import { MyContext } from "../../context/context.jsx";
import AppoinmentContextProvider from "../../components/appointments/appointmentContextProvider";

const { Text } = Typography;

const AppointmentDetails = observer(() => {
  const { setModalDisplay, setEditRecord, appointmentList } =
    useContext(MyContext);
  // State variables
  // const [modalDisplay, setModalDisplay] = useState(false);
  const [appointment, setAppointment] = useState();
  const { key } = useParams();

  // Fetch and set appointment details from local storage
  useEffect(() => {
    const index = appointmentList.findIndex((obj) => obj.key === key);
    setAppointment(appointmentList[index]);
  }, [localStorage.getItem("items")]);

  // Handle edit button click to display the modal
  const handleEdit = () => {
    const index = appointmentList.findIndex((obj) => obj.key === key);
    setEditRecord(appointmentList[index]);
    setModalDisplay(true);
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
      <Title style={{ marginBottom: "1.2em" }} level={4}>
        {appointment?.contact_number}
      </Title>
      <Text>
        {moment(appointment?.appointment_date).format("YYYY-MM-DD")}&nbsp;
        {moment(appointment?.appointment_time).format("hh:mm:ss")}
      </Text>
      {/* Render the appointment modal */}
      <AppoinmentModal />
    </Card>
  );
});

export default () => (
  <AppoinmentContextProvider>
    <AppointmentDetails />
  </AppoinmentContextProvider>
);
