import React from 'react';
import { Breadcrumb, Col, Form, Input, Layout, Menu, Row, Space, theme } from 'antd';
import { BookOutlined, ContainerOutlined, EditOutlined, PlusOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';

function AnimalSideBar({ children }){
const { Header, Content, Footer } = Layout;
const navigate = useNavigate();
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
        {/* <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        /> */}
        <Space>
        <Menu
         onClick={({key}) => {
            navigate(key)
          }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={''}
          items={[
            {label:"Home", key:"/",icon:<ContainerOutlined />},
            {label:"Register", key:"/profile/register", icon:<SnippetsOutlined />},
            {label:"Animal Profile", key:"/profile/animalprofile",icon:<BookOutlined />},
            {label:"Update", key:"/profile/update",icon:<EditOutlined />},
            {label:"Help Centre", key:"/profile/help",icon:<PlusOutlined />},
        ]} ></Menu>
        <Paths />
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
          <Breadcrumb.Item>Animal Profile</Breadcrumb.Item>
          {/* <Breadcrumb.Item>Animal Registration</Breadcrumb.Item> */}
          {/* <Breadcrumb.Item>Tommy</Breadcrumb.Item> */}
        </Breadcrumb>
        <div
          style={{
            padding: 10,
            minHeight: 500,

          }}
        >
          
  {children}
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
        <Route path="/profile/animalprofile" element={<div>Bookings</div>}></Route>
        <Route path="/" element={<div>Records</div>}></Route>
        <Route path="/profile/update" element={<div>Update</div>}></Route>
        <Route path="/profile/help" element={<div>Help</div>}></Route>
      </Routes>
    </div>
  }
};

export default AnimalSideBar;