import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Calendar, Col, Row } from "antd";
import Animal from "../components/Animal";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import AnimalSideBar from "./AnimalSideBar";
function AnimalCard() {
  const { user } = useSelector((state) => state.user);
  const [animals, setAnimals] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post("/api/animal/get-animals-by-userId", 
      {
        userId:user._id
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading())
      if (response.data.success) {
        console.log("res",response.data.data)
        setAnimals(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <AnimalSideBar>
      <Row gutter={20}>
        {animals.map((animal) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Animal animal={animal} />
          </Col>
        ))}
      </Row>
      </AnimalSideBar>
    
  );
}

export default AnimalCard;
