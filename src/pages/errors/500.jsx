import { Button, Result } from 'antd';
import { useRouteError } from 'react-router-dom';
const Error500Page = () => {
  const error = useRouteError();
  return (
    <div className="flex items-center justify-center h-screen">
      <Result
        status="500"
        title="500"
        subTitle={error.statusText || error.message || 'Sorry, something went wrong.'}
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
};
export default Error500Page;
