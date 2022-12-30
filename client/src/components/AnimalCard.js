import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AnimalSideBar from "./AnimalSideBar";

function AnimalCard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [animal, setAnimal] = useState();
  const params = useParams();
  const dispatch = useDispatch();

  const getAnimalData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/animal/get-animal-info-by-user-id",
        {
          userId: params.userId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        console.log(response.data.data)
        setAnimal(response.data.data);
        console.log(animal)
        
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
    <AnimalSideBar><Form>
      {animal && (
        <div>
          <h1 className="page-title">
            {animal.animalName} 
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShywja5_zmRTiMg4EkJWXPQc11q9DECwmDqA&usqp=CAU"
                alt=""
                width="100%"
                
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
               <b>Gender :</b>
               {animal.gender}
              </h1>
              <p>
                <b>Animal Type : </b>
                {animal.animalType}
              </p>
              
              <p>
                <b>Reproduction Status : </b>
                {animal.reproduction}
              </p>
              <p>
                <b>Weight : </b>
                {animal.weight}
              </p>
              
             
              <div className="d-flex flex-column pt-2 mt-2">
               
               
              </div>
            </Col>
          </Row>
        </div>
      )}</Form>
    </AnimalSideBar>
  );
}

export default AnimalCard;
