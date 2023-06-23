import { Button, Result } from 'antd';

const Error404Page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* Result component for displaying the 404 error */}
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
};

export default Error404Page;
