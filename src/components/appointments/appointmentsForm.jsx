import { useEffect, useState } from 'react';
import { Form, Input, Modal, Button, App } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';

import MyDatePicker from '../antd/datePicker';
import MyTimePicker from '../antd/timePicker';

import { updateLocalStorage } from '../../helpers/localStorage.cjs';

const AppoinmentModal = ({ isModalOpen, handleCancel, record }) => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const { notification } = App.useApp();

  useEffect(() => {
    if (record) {
      // Pre-populate form fields if a record is provided
      record.appointment_date = moment(record.appointment_date);
      record.appointment_time = moment(record.appointment_time);
      form.setFieldsValue(record);
    }
  }, [record, form]);

  const handleOk = () => {
    form.submit();
  };

  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  const save = (value) => {
    try {
      const appointmentList = JSON.parse(localStorage.getItem('items')) || [];
      if (value.key) {
        // Update existing appointment
        const index = appointmentList.findIndex((obj) => obj.key === value.key);
        appointmentList[index] = value;
        updateLocalStorage(appointmentList);
        notification.success({
          message: `Update Success`,
          description: 'Appointment Updated',
          placement: 'topRight',
        });
      } else {
        // Create new appointment
        if (!value.key) {
          value.key = generateRandomString();
        }
        const temp = [...appointmentList, value];
        updateLocalStorage(temp);
        notification.success({
          message: `Create Success`,
          description: 'Appointment Created',
          placement: 'topRight',
        });
      }
    } catch (error) {
      notification.error({
        message: `Something went wrong!`,
        description: error.message,
        placement: 'topRight',
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
    handleCancel();
  };

  return (
    <Modal
      title="Basic Modal"
      footer={[
        <Button key="back" onClick={handleModalClose}>
          Return
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Submit
        </Button>,
      ]}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleModalClose}
    >
      <Form form={form} onFinish={handleFormFinish}>
        <Form.Item label="key" name="key" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact Number"
          name="contact_number"
          rules={[{ required: true, message: 'Please input your Contact Number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Purpose" name="purpose" rules={[{ required: true, message: 'Please input your purpose!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Appointment Date"
          name="appointment_date"
          rules={[{ required: true, message: 'Please input your Appointment Date!' }]}
        >
          <MyDatePicker />
        </Form.Item>
        <Form.Item
          label="Appointment Time"
          name="appointment_time"
          rules={[{ required: true, message: 'Please input your Appointment Time!' }]}
        >
          <MyTimePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AppoinmentModal;
