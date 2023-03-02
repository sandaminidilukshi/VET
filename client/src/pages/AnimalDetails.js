import { Button, Col, DatePicker, Form, Input, Row, Table, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import moment from "moment";
import AnimalSideBar from "../components/AnimalSideBar";

function AnimalDetails() {
  const [viewRecords, setViewRecords] = useState(false)
  const [records, setRecords] = useState([])
  const [animal, setAnimal] = useState(null);
  const params = useParams();

  const columns = [
    {
        title: "Id",
        dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      render: (text, record) => (
        <span>
          {record.doctor}
        </span>
      ),
    },
    {
      title: "Complaint",
      dataIndex: "complaint",
      render: (text, record) => (
        <span>
          {record.chiefComplaints.complaint} 
        </span>
      ),
    },
    
    {
        title: "Notes",
        dataIndex: "notes",
    },

    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      render: (text, record) => (
        <span>
          {record.diagnosis} 
        </span>
      ),
   
        
      
    },
    {
      title: "Advices",
      dataIndex: "advices",
      render: (text, record) => (
        <span>
          {record.advices} 
        </span>
      ),
   
        
      
    },
  ];

  const dispatch = useDispatch();
  
  const getAnimalData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/animal/get-animal-by-id",
        {
            animalId: params.animalId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setAnimal(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  
//get animal records by animal id
const animalId= params.animalId

  const getAnimalRecords = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post("/api/prescription/get-animal-records-by-animal-ID",
      {
        animalId
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      dispatch(hideLoading());
      
      if (resposne.data.success) {
        setRecords(resposne.data.data);
      }
      console.log("records",resposne.data.data)
      console.log("recordmed",resposne.data.data[0].medicines[0].medicineName)
    } catch (error) {
      dispatch(hideLoading());
    }
  };
 

  useEffect(() => {
    getAnimalData();
    getAnimalRecords();
  }, []);

 
  

  
 
  

  return (
    <AnimalSideBar>
      {animal && (
        <div>
          <h1 className="page-title">
            {animal.animalName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWSSqukMbtS3jKsBgDvCUvAsD3f-WCHYI4QA&usqp=CAU"
                alt=""
                width="100%"
                height="400"
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Gender :</b> {animal.gender}
              </h1>
              <p>
                <b>Reproduction Status : </b>
                {animal.reproduction}
              </p>
              <p>
                <b>Weight : </b>
                {animal.weight}
              </p>
              <p>
                <b>Animal Type : </b>
                {animal.animalType}
              </p>
             
             
                
                

               
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={() => {setViewRecords(true)}}
                  >
                    View Records
                  </Button>
                
              
            </Col>
          </Row>
        </div>
      )}
       <div>
        
   
   </div>

<div>{viewRecords?
<Table
columns={columns}  dataSource={records}>
</Table> :null}
</div>
    </AnimalSideBar>
  );
}

export default AnimalDetails;
