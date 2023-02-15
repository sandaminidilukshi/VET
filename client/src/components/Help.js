import { Button, Col, Form, Image, Input, Row, TimePicker } from "antd";
import React, { useEffect } from "react";
import axios, { Axios } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";


function Help({ onFinish }) {
  
 const [reply, setReply] = useState("")
  const dispatch = useDispatch();
  const [animalTypeHelp, setAnimalTypeHelp] = useState("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("");
  const [need, setNeed] = useState("");
  const { user } = useSelector((state) => state.user);

  const [form] = Form.useForm();

  const submitHandler = async (e) => {
    try {
      const { data } = await axios.post(
        "/api/help/save-help-request",
        { userId: user._id,
          animalTypeHelp: animalTypeHelp,
          phone: phone,
          issue: issue,
          need: need,
          reply:""
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Help request sent successfully");
    } catch (err) {
      toast.error(err);
    }
    
    form.resetFields();

  };


  // useEffect(() => {
  //   submitHandler();
  // }, []);


  return (
    <Row>
      <Col span={12}>
      <Image 
   
    width="100%"
    height="100%"
    src="https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074__340.jpg"
  />
      </Col>
      <Col span={12}>
    <Form layout="vertical" style={{marginLeft:"20px"}} onFinish={submitHandler} form ={form }>
      <h1 className="card-title mt-3">Help Center</h1>
      <Row gutter={20}>
        <Col span={24} xs={24} sm={24} lg={12}>
          <Form.Item
            required
            label="Animal Type"
            name="animalTypeHelp"
            rules={[{ required: true }]}
          >
            <Input
              
              placeholder="Animal Type"
              onChange={(e) => setAnimalTypeHelp(e.target.value)}
            />
          </Form.Item>
        </Col>

        <Col span={24} xs={24} sm={24} lg={12}>
          <Form.Item required 
          label="Phone Number" name="phone"
         >
            <Input
              placeholder="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>
        </Col>
       
        <Col span={24} xs={24} sm={24} lg={12}>
          <Form.Item 
          required 
          label="Issue" name="issue"
          rules={[{ required: true }]}>
            <Input
              placeholder="Issue"
              onChange={(e) => setIssue(e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} lg={12}>
          <Form.Item 
          required 
          label="Need" name="need"
          rules={[{ required: true }]}>
            <Input
              placeholder="Need"
              onChange={(e) => setNeed(e.target.value)}
            />
          </Form.Item>
          <div className="d-flex justify-content-end">
        <Button
          className="primary-button"
          htmlType="submit"
          onFinish={onFinish}
        >
          SUBMIT
        </Button>
      </div>
        </Col>
      </Row>
      </Form>
      <hr />

      
<br></br>

    </Col>
    </Row>
  );
}

export default Help;
