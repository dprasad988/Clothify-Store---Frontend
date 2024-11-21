import React, { useContext, useState } from 'react';
import { Layout, Menu, Avatar, Typography, Card, Button, Drawer } from 'antd';
import { UserOutlined, ShoppingCartOutlined, SettingOutlined, LogoutOutlined, MenuOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useMediaQuery } from '@mui/material';  
import { AuthContext } from "../../Config/AuthContext";
import CustomerOrders from './customerOrders';
import DeliveryAddress from './delivaryAddress';
import Profile from './Profile';


const { Sider, Content } = Layout;
const { Title } = Typography;

function ProfileDashboard({profileData}) {
  const [selectedMenu, setSelectedMenu] = useState('1');
  const [drawerVisible, setDrawerVisible] = useState(false); 
  const isMobile = useMediaQuery('(max-width:768px)'); 

  const { logout, userData } = useContext(AuthContext);

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
    if (isMobile) {
      setDrawerVisible(false); 
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return (
          <Card title="My Profile" style={{ marginTop: 0 }}>
            <Profile/>
          </Card>
        );
      case '2':
        return (
          <Card title="My Orders" style={{ marginTop: 0 }}>
            <CustomerOrders/>
          </Card>
        );
      case '3':
        return (
          <Card title="Delivary Address" style={{ marginTop: 0 }}>
            <DeliveryAddress/>
          </Card>
        );
      case '4':
        return (
          <Card title="Settings" style={{ marginTop: 0 }}>
            <p>Configure your account settings here.</p>
          </Card>
        );
      case '5':
        return (
          <Card title="Log Out" style={{ marginTop: 0 }}>
            <p>Are you sure you want to log out?</p>
            <Button type="primary" danger onClick={logout}>
              Log Out
            </Button>
          </Card>
        );
      default:
        return null;
    }
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout style={{ minHeight: '70vh', padding: '20px' }}>
      {/* Drawer for mobile */}
      <Drawer
        title="Profile Dashboard"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={250}
      >
        <Menu mode="inline" selectedKeys={[selectedMenu]} onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            My Profile
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
            My Orders
          </Menu.Item>
          <Menu.Item key="3" icon={<EnvironmentOutlined />}>
            Delivary Address
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />}>
            Log Out
          </Menu.Item>
        </Menu>
      </Drawer>

      {/* Mobile Drawer Toggle Button */}
      {isMobile && (
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 1000,
          }}
        />
      )}

      {/* Sider for desktop */}
      {!isMobile && (
        <Sider width={250} theme="light" >
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <Avatar
              size={64}
              src={userData?.profilePicture || undefined} 
              icon={!userData?.profilePicture ? <UserOutlined /> : null}
            />
            <Title level={4} style={{ marginTop: 10 }}>
              {userData?.firstName ? `${userData.firstName}` : 'My'} {userData?.lastName ? `${userData.lastName}` : 'Account'}
            </Title>
          </div>

          <Menu mode="inline" selectedKeys={[selectedMenu]} onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              My Profile
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
              My Orders
            </Menu.Item>
            <Menu.Item key="3" icon={<EnvironmentOutlined />}>
              Delivary Address
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
            <Menu.Item key="5" icon={<LogoutOutlined />}>
              Log Out
            </Menu.Item>
          </Menu>
        </Sider>
      )}

      <Layout style={{ marginLeft: 0 }}>
        <Content style={{ paddingLeft: '10px' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default ProfileDashboard;
