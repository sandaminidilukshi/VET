import React from 'react';
import { Breadcrumb, Layout, Menu, Space, theme } from 'antd';
import { BookOutlined, ContainerOutlined, EditOutlined, PlusOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Route, Routes } from 'react-router-dom';

function AnimalSideBar(){
const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Space>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[
            {label:"Register", key:"/profile/register", icon:<SnippetsOutlined />},
            {label:"Bookings", key:"/profile/bookings",icon:<BookOutlined />},
            {label:"Records", key:"/profile/records",icon:<ContainerOutlined />},
            {label:"Update", key:"/profile/update",icon:<EditOutlined />},
            {label:"Help Centre", key:"/profile/help",icon:<PlusOutlined />},
        ]} ></Menu>
        
        </Space>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Animal Profile</Breadcrumb.Item>
          <Breadcrumb.Item>Tommy</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            
          }}
        >
          Content
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        San Design ©2022 
      </Footer>
    </Layout>
  );
  function Paths(){
    return <div>
      <Routes>
        <Route path="/profile/register" element={<div>Register</div>}></Route>
        <Route path="/profile/bookings" element={<div>Bookings</div>}></Route>
        <Route path="/profile/records" element={<div>Records</div>}></Route>
        <Route path="/profile/update" element={<div>Update</div>}></Route>
        <Route path="/profile/help" element={<div>Help</div>}></Route>
      </Routes>
    </div>
  }
};

export default AnimalSideBar;