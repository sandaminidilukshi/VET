import { Button, Col, Form, Image, Row } from "antd";
import Input from "rc-input";
import React from "react";
import axios, { Axios } from "axios";
import  { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
 
 
 function UpdateAnimal(){
 
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [reproduction, setReproduction] = useState('');
  const [weight, setWeight] = useState('');
  const [animalType, setAnimalType] = useState('');

  const submitHandler = async(e)=>{
   
    try {
      const {data} = await axios.post('/api/animal/save-animal',
     {
        
          "animalName": name,
            "gender": gender,
            "reproduction": reproduction,
            "weight": weight,
            "animalType": animalType,
            
            
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
    return(
 
           <Row>
      <Col span={12}>
      <Image 
   
    width="100%"
    height="100%"
    src="https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2020/07/cover-image-240720-b.jpg"
  />
      </Col>
      <Col span={12}>
      <Form layout="vertical" style={{marginLeft:"20px"}} onFinish={submitHandler}>
      
      <h1 className="card-title mt-3">Animal Information</h1>
      <Row gutter={20}>
        <Col span={24} xs={24} sm={24} lg={12} >
          <Form.Item
            required
            label="Name"
            name="name"
            rules={[{ required: true }]}
          >
          
            <Input style={{width:"300px"}}  placeholder="Name" onChange={(e)=>(setName(e.target.value))}/>
          </Form.Item>
        </Col>
        
        <Col span={24} xs={24} sm={24} lg={12}>
          <Form.Item
            required
            label="Gender"
            name="gender"
            rules={[{ required: true }]}
          >
            <Input style={{width:"300px"}} placeholder="Gender" onChange={(e)=>(setGender(e.target.value))}/>
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} lg={12}>
          <Form.Item
            required
            label="Spayed or Neutered"
            name="reproduction"
            rules={[{ required: true }]}
          >
            <Input style={{width:"300px"}} placeholder="Spayed or Neutered" onChange={(e)=>(setReproduction(e.target.value))}/>
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} lg={12}>
          <Form.Item
            required
            label="Weight"
            name="weight"
            rules={[{ required: true }]}
          >
            <Input style={{width:"300px"}} placeholder="weight" onChange={(e)=>(setWeight(e.target.value))}/>
          </Form.Item>
        </Col><Col span={24} xs={24} sm={24} lg={12}>
          <Form.Item
            required
            label="Animal Type"
            name="animalType"
            rules={[{ required: true }]}
          >
            <Input style={{width:"300px"}} placeholder="Animal Type" onChange={(e)=>(setAnimalType(e.target.value))}/>
          </Form.Item>
        </Col>
        
      </Row>
      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          UPDATE
        </Button>
      </div>
      <br/>
      <hr/>
      
    </Form>
      
     
    </Col>
      </Row> 
    )
 }

export default UpdateAnimal;