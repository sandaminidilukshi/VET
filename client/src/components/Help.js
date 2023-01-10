import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React from "react";
import axios, { Axios } from "axios";
import  { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Help({ onFinish }) {
      
        const [animalTypehelp, setAnimalTypehelp] = useState('')
        const [phone, setPhone] = useState('');
        const [emailAddress, setEmailAddress] = useState('');
        const [issue, setIssue] = useState('');
        const [need, setNeed] = useState('');
        
      
        const submitHandler = async(e)=>{
         
          try {
            const {data} = await axios.post('/api/help/save-help-request',
           {
              
                "animalTypehelp": animalTypehelp,
                  "phone": phone,
                  "emailAddress": emailAddress,
                  "issue": issue,
                  "need": need,
                  
                  
            }, 
            
           
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
            )
            
      toast.success("Animal registered successfully")
            
          } catch (err) {
            toast.error(err);
            
          }
        }
  return (
    <Form
      layout="vertical"
      onFinish={submitHandler}
    >
      <h1 className="card-title mt-3">Help Center</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Animal Type"
            name="animalTypehelp"
            rules={[{ required: true }]}
          >
            <Input placeholder="Animal Type" onChange={(e)=>(setAnimalTypehelp(e.target.value))}/>
          </Form.Item>
        </Col>
        
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone Number"
            name="phone"
            
          >
            <Input placeholder="phone" onChange={(e)=>(setPhone(e.target.value))}/>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Email Address"
            name="emailAddress"
            rules={[{ required: true }]}
          >
            <Input placeholder="Email Address" onChange={(e)=>(setEmailAddress(e.target.value))}/>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Issue"
            name="issue"
            
          >
            <Input placeholder="Issue" onChange={(e)=>(setIssue(e.target.value))}/>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Need"
            name="need"
            
          >
            <Input placeholder="Need" onChange={(e)=>(setNeed(e.target.value))} />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      
      

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default Help;


