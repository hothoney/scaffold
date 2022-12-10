import React from 'react';
import {
  Avatar,
  Layout,
  Space,
  Grid,
  Dropdown,
  Menu,
} from '@arco-design/web-react';
import { IconExport } from '@arco-design/web-react/icon';
import Nav from '../../components/Nav';
import { navConfig } from '../../config';
import useAuth from '../../hooks/useAuth';

const { Row, Col } = Grid;

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, signOut } = useAuth();
  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Sider breakpoint='lg' collapsible>
        <Nav
          schema={navConfig.defaultLayoutSideNavSchema}
          style={{ height: '100%' }}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header>
          <Row
            justify='space-between'
            align='center'
            style={{ padding: '0 20px' }}
          >
            <a>页面标题</a>
            <Space>
              <Nav
                schema={navConfig.defaultLayoutTopNavSchema}
                mode='horizontal'
              />
              <Dropdown
                position='bottom'
                droplist={
                  <Menu>
                    <Menu.Item key='1' onClick={signOut}>
                      <IconExport />
                      注销
                    </Menu.Item>
                  </Menu>
                }
              >
                <Space>
                  <Avatar autoFixFontSize>{user?.Name[0] || '用户名'}</Avatar>
                  <span>{user?.Name || '用户名'}</span>
                </Space>
              </Dropdown>
            </Space>
          </Row>
        </Layout.Header>
        <Layout style={{ padding: '24px', backgroundColor: '#f2f3f5' }}>
          <Layout.Content style={{ backgroundColor: '#ffffff', padding: 20 }}>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
