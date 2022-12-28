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
import ViewAppointments from "./ViewAppointments";

function BookAppointment() {


  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const [appointment, setAppointment] = useState([]);
 
  const getAppointmentData = async () => {
    try {
      
      dispatch(showLoading());
      const resposne = await axios.post("/api/user/get-booking-avilability-by-date",
      {
        doctorId: params.doctorId,
        date: date,
       },
        {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      
      if (resposne.data.success) {
        if (resposne.data.data.length > 0){
          const date = moment(resposne.data.data[0].time, "HH:mm").toISOString();
          setAppointment(resposne.data.data);
          console.log(resposne.data.data)
        }
        else{
            setAppointment(resposne.data.data)       
            console.log(resposne.data.data)  
      }    
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      if(date && time && params.doctorId) {
        const response = await axios.post(
          "/api/user/check-booking-avilability",
          {
            doctorId: params.doctorId,
            date: date,
            time: time,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
      } else {
        dispatch(hideLoading());
        toast.error("Not available");
      }
      
      
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };
  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  useEffect(() => {
    getAppointmentData()    
  }, [date])
  

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      render: (text, record) => (
        <div>
          {/* <div>
          {
          moment(record.time).format("HH")==="04" ?
            moment(record.time).format("HH:mm"): "ok"
          }
          </div>
          <div>
          {
          moment(record.time).format("HH")==="05" ?
            moment(record.time).format("HH:mm"):  "ok1"
          }
          </div>
           */}
           {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}{"-"} 
          {moment(record.time).add(1, "hours").format("HH:mm")}
         
        </div>
      ),
    },
    {
      title: "Status of booking",
      dataIndex: "status",
      render:
      (text, record) => (
        
        
      <span style={{color:"red"}}>{record.status}</span>
      )
    },    
  ]
 
  

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={20} className="mt-5" align="middle">
            <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                alt=""
                width="100%"
                height="400"
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <p>
                <b>Phone Number : </b>
                {doctor.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {doctor.address}
              </p>
              <p>
                <b>Fee per Visit : </b>
                {doctor.feePerCunsultation}
              </p>
              <p>
                <b>E-mail : </b>
                {doctor.email}
              </p>
              <div className="d-flex flex-column pt-2 mt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                    getAppointmentData();
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(moment(value).format("HH:mm"));
                    //getAppointmentData()
                  }}
                />
                {!isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={checkAvailability}
                  >
                    Check Availability
                  </Button>
                )}

                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
       <div>
        <p>{}</p>
   <Table columns={columns}  dataSource={appointment} />
   </div>
    </Layout>
  );
}

export default BookAppointment;
