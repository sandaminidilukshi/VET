import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import Layout from "../../components/Layout";

function Records({ onFinish }) {
  return (<Layout>
    <Form
      layout="vertical"
      onFinish={onFinish}
      
    > 
    <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
        <div  style={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                            // marginTop:'2px',
                        }} className="flex  ">
          <label>
            User ID
          </label>
         
    <input mt-0
      placeholder="Search"
      className="space between "
    ></input>
    
      <img src="https://static.vecteezy.com/system/resources/thumbnails/001/591/586/small/free-search-icon-free-vector.jpg" style={{ width: 40 , height: 40 }} className=" h-6 mt-1px" alt="search"></img>
      </div>
</Col></Row>
   
      <h1 className="card-title mt-3">Animal Record</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="User Name"
            name="User Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="User Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Animal Type"
            name="Animal Type"
            rules={[{ required: true }]}
          >
            <Input placeholder="Animal Type" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Animal Name"
            name="Animal Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Animal Name" />
          </Form.Item>
        </Col>
        </Row>
        <hr />
        <h2 className="card-title mt-3">Chief Complaints</h2>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Complaint"
            name="Complaint"
            rules={[{ required: true }]}
          >
            <Input placeholder="Complaint" />
          </Form.Item>
        </Col>
       
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Duration"
            name="Duration"
            rules={[{ required: true }]}
          >
            <Input placeholder="Duration" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Finding"
            name="Finding"
            rules={[{ required: true }]}
          >
            <Input placeholder="Finding" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h2 className="card-title mt-3">Remarks</h2>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Notes"
            name="Notes"
            rules={[{ required: true }]}
          >
            <Input placeholder="Notes" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Diagnosis"
            name="Diagnosis"
            rules={[{ required: true }]}
          >
            <Input placeholder="Diagnosis"  />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Procedure Conducted"
            name="Procedure Conducted"
            rules={[{ required: true }]}
          >
            <Input placeholder="Procedure Conducted"  />
          </Form.Item>
        </Col>
        </Row>
        <hr />
        <h2 className="card-title mt-3">Medicines</h2>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Medicine Name"
            name="Medicine Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Medicine Name"  />
          </Form.Item>
        </Col>
        </Row>
        <hr />
        <h2 className="card-title mt-3">Dosage</h2>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Morning"
            name="Morning"
            rules={[{ required: true }]}
          >
            <Input placeholder="Morning"  />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Afternoon"
            name="Afternoon"
            rules={[{ required: true }]}
          >
            <Input placeholder="Afternoon"  />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Evening"
            name="Evening"
            rules={[{ required: true }]}
          >
            <Input placeholder="Evening"  />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Duration"
            name="Duration"
            rules={[{ required: true }]}
          >
            <Input placeholder="Duration"  />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Advices"
            name="Advices"
            rules={[{ required: true }]}
          >
            <Input placeholder="Advices"  />
          </Form.Item>
        </Col>
        </Row>


      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
    </Layout>
  );
}

export default Records;
