import { App, Button, Popconfirm, Space, Table } from 'antd';
import { DeleteTwoTone, EditTwoTone, ExpandOutlined } from '@ant-design/icons';
import moment from 'moment';

import { updateLocalStorage } from '../../helpers/localStorage.cjs';
import { useNavigate } from 'react-router-dom';

const AppointmentsTable = ({ dataSource, onEdit, confirmLoading, setConfirmLoading }) => {
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
            okButtonProps={confirmLoading}
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
      setConfirmLoading(true);
      handleDelete(record);
      setTimeout(() => {
        setConfirmLoading(false);
      }, 500);
    };
  };

  const handleEdit = (record) => {
    return () => {
      onEdit(record.key);
    };
  };

  const handleRedirect = (record) => {
    return () => {
      navigate(`/appointments/${record.key}`);
    };
  };

  const handleDelete = (record) => {
    try {
      const appointmentList = JSON.parse(localStorage.getItem('items')) || [];
      const index = appointmentList.findIndex((obj) => obj.key === record.key);
      appointmentList.splice(index, 1);
      updateLocalStorage(appointmentList);
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

  return <Table dataSource={dataSource} columns={columns} />;
};

export default AppointmentsTable;
