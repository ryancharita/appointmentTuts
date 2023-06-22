import { useEffect, useState } from 'react';

import { Button, Form, Input, Modal, Space, Table, TimePicker } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';
import MyDatePicker from '../components/datePicker';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const AppoinmentModal = ({ isModalOpen, handleCancel, hadleSave, record }) => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  useEffect(() => {
    if (record) {
      record.appointment_date = moment(record.appointment_date);
      record.appointment_time = dayjs(record.appointment_time);
      form.setFieldsValue(record);
    }
  });
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
  const handleFormFinish = (values) => {
    setLoading(true);
    if (!values.key) {
      values.key = generateRandomString();
    }
    setTimeout(() => {
      hadleSave(values);
      setLoading(false);
      handleModalClose();
    }, 500);
  };
  const handleModalClose = () => {
    form.resetFields();
    handleCancel(false);
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
          <TimePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AppointmentsTable = ({ dataSource, onEdit, onDelete }) => {
  const handleEdit = (record) => {
    return () => {
      onEdit(record.key);
    };
  };
  const handleDelete = (record) => {
    return () => {
      onDelete(record.key);
    };
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact_number',
      key: 'contact_number',
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appointment_date',
      key: 'appointment_date',
      render: (text) => <a>{moment(text).format('YYYY-MM-DD')}</a>,
    },
    {
      title: 'Appointment Time',
      dataIndex: 'appointment_time',
      key: 'appointment_time',
      render: (text) => <a>{typeof text === 'string' ? moment(text).format('hh:mm:ss') : text.format('hh:mm:ss')}</a>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={handleEdit(record)} type="text">
            <EditTwoTone />
          </Button>
          <Button onClick={handleDelete(record)} type="text">
            <DeleteTwoTone />
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

const App = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);
  const [editIndex, setEditIndex] = useState();
  const [editRecord, setEditRecord] = useState();

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const appointments = JSON.parse(localStorage.getItem('items'));
    if (appointments?.length) {
      setAppointmentList(appointments);
    }
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem('items', JSON.stringify(items));
  };
  const save = (value) => {
    setAppointmentList((previousState) => {
      if (typeof editIndex === 'number') {
        const temp = [...previousState];
        temp[editIndex] = value;
        setEditIndex();
        setEditRecord();
        updateLocalStorage(temp);
        return temp;
      }
      setEditIndex();
      setEditRecord();
      const temp = [...previousState, value];
      updateLocalStorage(temp);
      return temp;
    });
  };
  const handleAppointmentEdit = (key) => {
    const index = appointmentList.findIndex((obj) => obj.key === key);
    setEditIndex(index);
    setEditRecord(appointmentList[index]);
    setModalDisplay(true);
  };
  const handleAppointmentDelete = (key) => {
    const index = appointmentList.findIndex((obj) => obj.key === key);
    setAppointmentList((previousState) => {
      const temp = [...previousState];
      temp.splice(index, 1);
      updateLocalStorage(temp);
      return temp;
    });
  };

  return (
    <div className="p-5">
      <Title>Appointments {searchParams.get('name')}</Title>
      <Button onClick={() => setModalDisplay(true)} type="primary" className="mb-5">
        Create Appointment
      </Button>
      <AppointmentsTable
        dataSource={appointmentList}
        onEdit={handleAppointmentEdit}
        onDelete={handleAppointmentDelete}
      />
      <AppoinmentModal isModalOpen={modalDisplay} handleCancel={setModalDisplay} hadleSave={save} record={editRecord} />
    </div>
  );
};
export default App;
