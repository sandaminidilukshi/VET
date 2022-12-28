import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";


function ViewAppointments() {
  
  const [appointment, setAppointment] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/user/get-booking-avilability-by-date", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      
      if (resposne.data.success) {
        setAppointment(resposne.data.data);
      }
      console.log("appointments",resposne.data.data)
     
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getAppointmentData();
  }, []);
 
 const columns = [
        {
          title: "Time",
          dataIndex: "time",
        },
        {
          title: "Status of booking",
          dataIndex: "status",
        },
        
      ]
     
      




return (
  <div>
   <Table columns={columns}  dataSource={appointment} />
   </div>
);
}

export default ViewAppointments;


