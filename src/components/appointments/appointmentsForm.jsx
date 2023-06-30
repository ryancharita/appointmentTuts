import { useContext, useEffect, useState } from "react";

import { Form, Input, Modal, Button, App } from "antd";
import { useForm } from "antd/lib/form/Form";
import { observer } from "mobx-react";
import moment from "moment";

import MyDatePicker from "../antd/datePicker";
import MyTimePicker from "../antd/timePicker";

import { MyContext } from "../../context/context";

const AppoinmentModal = observer(({ record }) => {
  const {
    modalDisplay,
    editRecord,
    setModalDisplay,
    setEditRecord,
    setAppointment,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const { notification } = App.useApp();

  useEffect(() => {
    if (editRecord) {
      // Pre-populate form fields if a record is provided
      editRecord.appointment_date = moment(editRecord.appointment_date);
      editRecord.appointment_time = moment(editRecord.appointment_time);
      form.setFieldsValue(editRecord);
    }
  }, [editRecord, form]);

  const handleOk = () => {
    form.submit();
  };

  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  const save = (value) => {
    try {
      const appointmentList = JSON.parse(localStorage.getItem("items")) || [];
      if (value.key) {
        // Update existing appointment
        const index = appointmentList.findIndex((obj) => obj.key === value.key);
        appointmentList[index] = value;
        setAppointment(appointmentList);
        notification.success({
          message: `Update Success`,
          description: "Appointment Updated",
          placement: "topRight",
        });
      } else {
        // Create new appointment
        if (!value.key) {
          value.key = generateRandomString();
        }
        const temp = [...appointmentList, value];
        setAppointment(temp);
        notification.success({
          message: `Create Success`,
          description: "Appointment Created",
          placement: "topRight",
        });
      }
    } catch (error) {
      notification.error({
        message: `Something went wrong!`,
        description: error.message,
        placement: "topRight",
      });
    }
  };

  const handleFormFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      save(values);
      setLoading(false);
      handleModalClose();
    }, 500);
  };

  const handleModalClose = () => {
    form.resetFields();
    setEditRecord({});
    setModalDisplay(false);
  };

  return (
    <Modal
      title="Basic Modal"
      footer={[
        <Button key="back" onClick={handleModalClose}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
      open={modalDisplay}
      onOk={handleOk}
      onCancel={handleModalClose}
    >
      <Form form={form} onFinish={handleFormFinish}>
        <Form.Item label="key" name="key" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact Number"
          name="contact_number"
          rules={[
            { required: true, message: "Please input your Contact Number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Purpose"
          name="purpose"
          rules={[{ required: true, message: "Please input your purpose!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Appointment Date"
          name="appointment_date"
          rules={[
            { required: true, message: "Please input your Appointment Date!" },
          ]}
        >
          <MyDatePicker />
        </Form.Item>
        <Form.Item
          label="Appointment Time"
          name="appointment_time"
          rules={[
            { required: true, message: "Please input your Appointment Time!" },
          ]}
        >
          <MyTimePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AppoinmentModal;
