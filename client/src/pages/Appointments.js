import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Button, Table } from "antd";
import moment from "moment";
import swal from 'sweetalert';
function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/user/get-appointments-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    swal({
      title: "Are you sure?",
      text: "Your appointment will be cancelled!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete){try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/doctor/change-appointment-status",
        { appointmentId : record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {

      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
    swal("Appointment has been cancelled!", {
      icon: "success",
  });
  }})
    
    
  };
 
  // const changeAppointmentStatus = async (record, status) => {
  //   try {
  //     dispatch(showLoading());
  //     const resposne = await axios.post(
  //       "/api/user/change-appointment-status-by-user-role",
  //       { appointmentId : record._id, status: status },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
        
  //     );
  //     dispatch(hideLoading());
  //     if (resposne.data.success) {
  //       toast.success(resposne.data.message);
  //       getAppointmentsData();
  //     }
  //   } catch (error) {
  //     toast.error("Error changing doctor account status");
  //     dispatch(hideLoading());
  //   }
  // };

  // const changeAppointmentStatus = async (record, status) => {
  //   try {
  //     dispatch(showLoading());
  //     const resposne = 
  //   }
  // };

  

  
  
  const columns = [
    {
        title: "Id",
        dataIndex: "_id",
    },
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => (
        <span>
          {record.doctorInfo.phoneNumber} 
        </span>
      ),
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
        title: "Status",
        dataIndex: "status",
    },

    {
      title: "Actions",
      dataIndex: "",
      render: (text, record) => (<div className="d-flex">
      {record.status === "approved" && (
        <div className="d-flex">
          <Button
            className="anchor"
            danger
            onClick={() => changeAppointmentStatus(record, "Cancelled")}
          >
           Delete  
          </Button>
        </div>
      )}
    </div>
        
      ),
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return  <Layout>
  <h1 className="page-title">Appointments</h1>
  <hr />
  <Table columns={columns} dataSource={appointments} />
</Layout>
}

export default Appointments;
