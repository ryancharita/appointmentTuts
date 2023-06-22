import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          alert('this is a function');
          navigate(`/appointments/${'ghjmasfgdkjml'}`);
        }}
      >
        Login
      </Button>
      <a href="/appointments"> Go to App</a>
      <br />
      <Link to="/appointments"> Go to App using Link</Link>
    </>
  );
};

export default Dashboard;
