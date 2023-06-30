import { useContext } from 'react';

import { App, Button, Popconfirm, Space, Table } from 'antd';
import { DeleteTwoTone, EditTwoTone, ExpandOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { MyContext } from '../../context/context.jsx';

const AppointmentsTable = observer(() => {
  const { appointmentList, setAppointment, setEditRecord, setModalDisplay } = useContext(MyContext);

  const { notification } = App.useApp();
  const navigate = useNavigate();

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
      title: 'Appointment Date',
      dataIndex: 'appointment_date',
      key: 'appointment_date',
      render: (text) => <a>{moment(text).format('YYYY-MM-DD')}</a>,
    },
    {
      title: 'Appointment Time',
      dataIndex: 'appointment_time',
      key: 'appointment_time',
      render: (text) => <a>{moment(text).format('hh:mm:ss')}</a>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          {/* Edit button */}
          <Button onClick={handleEdit(record)} type="text">
            <EditTwoTone />
          </Button>
          {/* Delete button */}
          <Popconfirm
            title="Delete the appointment"
            description="Are you sure to delete this appointment?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleOk(record)}
          >
            <Button type="text">
              <DeleteTwoTone />
            </Button>
          </Popconfirm>
          {/* Redirect button */}
          <Button onClick={handleRedirect(record)} type="text">
            <ExpandOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const handleOk = (record) => {
    return () => {
      handleDelete(record);
    };
  };

  const handleEdit = (record) => {
    return () => {
      const index = appointmentList.findIndex((obj) => obj.key === record.key);
      setEditRecord(appointmentList[index]);
      setModalDisplay(true);
    };
  };

  const handleRedirect = (record) => {
    return () => {
      navigate(`/appointments/${record.key}`);
    };
  };

  const handleDelete = (record) => {
    try {
      const index = appointmentList.findIndex((obj) => obj.key === record.key);
      appointmentList.splice(index, 1);
      setAppointment([...appointmentList]);
      notification.success({
        message: `Delete Success`,
        description: 'Appointment Deleted',
        placement: 'topRight',
      });
    } catch (error) {
      notification.error({
        message: `Something went wrong!`,
        description: error.message,
        placement: 'topRight',
      });
    }
  };

  return <Table dataSource={appointmentList} columns={columns} />;
});

export default AppointmentsTable;
