import { App, Layout, Menu, theme } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const MainLayout = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };
  return (
    <App>
      <Layout className="w-full h-screen">
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={location.pathname}
            onClick={handleMenuClick}
            items={[
              {
                key: '/',
                label: 'Home',
              },
              {
                key: '/appointments',
                label: 'Appointments',
              },
            ]}
          />
        </Header>
        <Content>
          <div className=" m-10" style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
            <Paragraph>{outlet}</Paragraph>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </App>
  );
};

export default MainLayout;
