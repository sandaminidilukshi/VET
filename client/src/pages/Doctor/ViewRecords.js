import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";

function ViewRecords() {
  
  const [prescription, setPrescriprion] = useState([]);
  const dispatch = useDispatch();
  const getAnimalData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/prescription/get-all-records", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      
      if (resposne.data.success) {
        setPrescriprion(resposne.data.data);
      }
      console.log("records",resposne.data.data)
      console.log("recordmed",resposne.data.data[0].medicines[0].medicineName)
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getAnimalData();
  }, []);
 
 const columns = [
        {
          title: "Owner",
          dataIndex: "user",
        },
        {
          title: "Animal Name",
          dataIndex: "animalName",
        },
        {
          title: "Animal Type",
          dataIndex: "animaltype",
        },
        {
          title: "Notes",
          dataIndex: "notes",
        },
        {
          title: "Diagnosis",
          dataIndex: "diagnosis",
        },
        {
          title: "Advices",
          dataIndex: "advices",
        },
        {
          title: "Doctor",
          dataIndex: "doctor",
        },
      ]
     
      




return (
  <Layout>
    <h1 className="page-header">Animal History</h1>
    <Row gutter={20}>
        <Col span={12} xs={24} sm={24} lg={8}>
        <div  style={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                            // marginTop:'2px',
                        }} className="flex  ">
          
         
    <input mt-0
      placeholder="Search owner name"
      className="space between "
    ></input>
    
      <img src="https://static.vecteezy.com/system/resources/thumbnails/001/591/586/small/free-search-icon-free-vector.jpg" style={{ width: 40 , height: 40 }} className=" h-6 mt-1px" alt="search"></img>
      </div>
</Col></Row>
    <hr />
    <Table columns={columns}  dataSource={prescription} />
  </Layout>
);
}

export default ViewRecords;


