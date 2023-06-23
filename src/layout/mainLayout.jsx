import { App, Layout, Menu, theme } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  // Get the current route's outlet, location, and navigation functions
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the colorBgContainer from the theme's token
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Handle menu item clicks and navigate to the selected key
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <App>
      <Layout className="w-full h-screen">
        {/* Header */}
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
          {/* Menu */}
          <Menu
            className="w-full"
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

        {/* Content */}
        <Content>
          <div className="m-10" style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
            <Paragraph>{outlet}</Paragraph>
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </App>
  );
};

export default MainLayout;
