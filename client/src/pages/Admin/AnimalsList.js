import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";

function AnimalsList() {
  
  const [animalList, setAnimalList] = useState([]);
  const dispatch = useDispatch();
  const getAnimalList = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/animal/get-animals", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      
      if (resposne.data.success) {
        setAnimalList(resposne.data.data);
      }
      console.log("records",resposne.data.data)
      console.log("recordmed",resposne.data.data[0].medicines[0].medicineName)
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getAnimalList();
  }, []);
 
 const columns = [
        {
          title: "Name",
          dataIndex: "animalName",
        },
        {
          title: "gender",
          dataIndex: "gender",
        },
        {
          title: "Reproduction Status",
          dataIndex: "reproduction",
        },
        {
          title: "Weight",
          dataIndex: "weight",
        },
        {
          title: "Animal Type",
          dataIndex: "animalType",
        }
      ]
     
      




return (
  <Layout>
    <h1 className="page-header">Animals List</h1>
    <Row gutter={20}>
        <Col span={12} xs={24} sm={24} lg={8}>
        <div  style={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                            // marginTop:'2px',
                        }} className="flex  ">
          
      </div>
</Col></Row>
    <hr />
    <Table columns={columns}  dataSource={animalList} />
  </Layout>
);
}

export default AnimalsList;


