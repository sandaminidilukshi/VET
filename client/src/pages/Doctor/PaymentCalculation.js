import {  Button, Card, Col, Collapse, Divider, Form,  Input,  Row, Space, Table } from "antd";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { Select } from 'antd';
import AppointmentsList from "./AppointmentList";
import moment from "moment";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function PaymentCalculation(){
const [consultationFee, setConsultationFee] = useState("")
// const [medicineFee, setMedicineFee] = useState("")
const [total, setTotal] = useState("")
const params = useParams();

return(
    <Layout>
        <Form layout="vertical" > 
        {/* onFinish={submitHandler} */}
  <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Consultation Fee"
            name="Consultation Fee"
            rules={[{ required: true }]}
          >
            <Input placeholder="Consultation Fee" onChange={(e)=>(setConsultationFee(e.target.value))} />
          </Form.Item>
        </Col>
       
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            
            label="Medicine Fee"
            name="medicineFee"
           
          >
            <Input readOnly value={params.medicineFee}  />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
        <Button style={{marginTop:"42px"}} className="primary-button" >
          Calculate Bill
        </Button>
        {/* onClick={getOngoingAppointment} */}
            </Col>
            </Row>
            <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Total"
            name="Total"
            rules={[{ required: true }]}
          >
            <Input placeholder="Finding" onChange={(e)=>(setTotal(e.target.value))}/>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
        <Button style={{marginTop:"42px"}} className="primary-button" >
          Confirm Payment
        </Button>
        {/* onClick={getOngoingAppointment} */}
            </Col>
      </Row>
      </Form>
    </Layout>
)

}


export default PaymentCalculation;