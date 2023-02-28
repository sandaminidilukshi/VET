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

  const [animal, setAnimal] = useState(null);
  const params = useParams();
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
  
 

  useEffect(() => {
    getAnimalData();
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
                    //onClick={bookNow}
                  >
                    View Records
                  </Button>
                
              
            </Col>
          </Row>
        </div>
      )}
       <div>
        
   
   </div>
    </AnimalSideBar>
  );
}

export default AnimalDetails;
