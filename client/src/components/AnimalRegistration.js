import { Button, Col, Form, Image, Row } from "antd";
import Input from "rc-input";
import React from "react";
 
 
 
 function AnimalRegistration(){
 


    return(
 
           <Row>
      <Col span={12}>
      <Image 
    // style={{marginLeft:"px"}}
    width="100%"
    src="https://www.scotsman.com/webimg/b25lY21zOjQ2MmM5NDg1LWFhNTktNDQ1Ni1hMjEwLWE2OTc5MjM1ZmNlNDoyOTg0YzhhYS1lYmU3LTQxN2YtOTVkMS01NzEwNWFlYWUyNmM=.jpg?width=1200&enable=upscale"
  />
      </Col>
      <Col span={12}>
      <Form style={{marginLeft:"20px"}}>
      
      <h1 className="card-title mt-3">Animal Information</h1>
      <Row gutter={100}>
        <Col span={8} xs={24} sm={24} lg={24} >
          <Form.Item
            required
            label="Name"
            name="Name"
            rules={[{ required: true }]}
          >
            <br/>
            <Input placeholder="Name" />
          </Form.Item>
        </Col>
        
        <Col span={8} xs={24} sm={24} lg={24}>
          <Form.Item
            required
            label="Gender"
            name="gender"
            rules={[{ required: true }]}
          >
            <Input placeholder="Gender" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={24}>
          <Form.Item
            required
            label="Spayed or Neutered"
            name="reproduction"
            rules={[{ required: true }]}
          >
            <Input placeholder="Spayed or Neutered" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={24}>
          <Form.Item
            required
            label="Weight"
            name="weight"
            rules={[{ required: true }]}
          >
            <Input placeholder="weight" />
          </Form.Item>
        </Col>
        
      </Row>
      
    </Form>
      {/* <Form
     
    > */}
      {/* <h1 className="card-title mt-3">Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Email"
            name="email"
            rules={[{ required: true }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Experience"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Fee Per Consultation"
            name="feePerCunsultation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Fee Per Cunsultation" type="number" />
          </Form.Item>
        </Col>
       
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form> */}
    </Col>
      </Row> 
    )
 }

export default AnimalRegistration;