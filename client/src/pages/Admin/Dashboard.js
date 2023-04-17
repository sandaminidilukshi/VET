import React, { useEffect, useState } from "react";
import  Layout  from "../../components/Layout";
import { Card, Col, Row } from "antd";
import ReactApexChart from "react-apexcharts";
import useFormInstance from "antd/lib/form/hooks/useFormInstance";
import ApexCharts from "react-apexcharts";
import Chart from "react-apexcharts";
import axios from "axios";
function Dashboard(){
const [appointments, setAppointments] = useState([])
const [incomeByMonth, setIncomeByMonth] = useState([]);
const [users, setUsers] = useState('');
const [doctors, setDoctors] = useState('')
const [data, setData] = useState([]);
const [income, setIncome] = useState('')
const [chartData, setChartData] = useState([]);
const [revisitingPercentage, setRevisitingPercentage] = useState(null);
const [x, setX] = useState([])


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/user/chart-by-appointments-for-the-month');
  //     const res = await response.json();
  //     setAppointments(res.data)
  //     // setX(appointments.map((item) => item.y));
  //     // console.log("app",x)
  //   };
  //   fetchData();
  // }, []);


  
  
  const fetchPieChartData = async () => {
    const response = await axios.get("/api/user/get-all-appointments");
    setChartData(response.data.data);
    console.log("appointment",response)
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/user/get-number-of-doctors');
      setDoctors(response);
      console.log("doctors",doctors)
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user/get-number-of-users');
      setUsers(response);
      console.log("users",users)
    } catch (error) {
      console.error(error);
    }
  };//.data[0].numUsers
  
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/bill/income-by-month');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchIncome = async () => {
    try {
      const response = await axios.get('/api/bill/income-by-month-for-card');
      setIncome(response);
      console.log("res",response)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchMonthlyAppointments = async () => {
      try {
        const response = await axios.get("/api/user/chart-by-appointments-for-the-month");
        setAppointments(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMonthlyAppointments();
    fetchData();
    fetchUsers();
    fetchDoctors();
    fetchIncome();
    fetchPieChartData();
  }, []);

  const filterByStatus = (status) => {
    return chartData.filter((appointment) => appointment.status === status);
  };
  useEffect(() => {
    axios.get('/api/user/revisiting-percentage')
      .then(res => setRevisitingPercentage(res.data.revisitingPercentage))
      .catch(err => console.error(err));
  }, []);
  const optionsPie = {
    chart: {
      type: "pie",
    },
    labels: ["Pending", "Approved", "Cancelled"],
  };

  const optionsper = {
    chart: {
      type: 'radialBar',
      height: 350,
    },
    series: [revisitingPercentage],
    labels: ['Revisiting Percentage'],
    colors: ['#20E647'],
  };

  const seriesPie = [
    filterByStatus("pending").length,
    filterByStatus("approved").length,
    filterByStatus("Cancelled").length,
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: appointments.map(
        ({ _id: { year, month } }) => `${year}-${month.toString().padStart(2, "0")}`
      ),
    },
    yaxis: {
      title: {
        text: "Number of Appointments",
      },
    },
  };

  const series = [
    {
      name: "Appointments",
      data: appointments.map(({ count }) => count),
    },
  ];

  const optionstot = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.map(
        ({ _id: { year, month } }) => `${year}-${month.toString().padStart(2, "0")}`
      ),
    },
    yaxis: {
      title: {
        text: "Monthly Income",
      },
    },
  };

  const seriestot = [
    {
      name: "Income",
      data: data.map(({ count }) => count),
    },
  ];







return(
    <Layout>
        <div className='Cards'>
        <div className='container-fluid'>
        <Row gutter={[16, 16]}>
  <Col span={8} >
  <Card className='card-dashboard'>
    <h4>No of Doctors : {doctors.data && doctors.data[0] ? doctors.data[0].numUsers:0}</h4>
    </Card>
    </Col>
    <Col span={8} >
  <Card  className='card-dashboard'>
    <h4>No of Users :{users.data && users.data[0] ? users.data[0].numUsers:0}</h4>
    </Card>
    </Col>
    <Col span={8} >
  <Card className='card-dashboard'>
    <h4>Total Income : {income.data && income.data[0] ? income.data[0].count:0}  </h4> </Card>
    </Col>
    </Row><hr />
    </div></div>
    <></>

    <h3><center>Monthly Appointments</center></h3>
    {/* <ReactApexChart options={options} series={series} type="line" height={350} /> */}
    <Chart options={options} series={series} type="bar" height={350} />
    
<hr />


  
  

  
    
  <Row>
<Col span={8} >
  
    
<h3><center>Revisiting Clients</center></h3>
<Chart options={optionsper} series={optionsper.series} type="radialBar" height={450} />
    
    </Col>

    <Col span={16} >
  

<h3 style={{marginRight:"50px"}}><center>Appointment Status</center></h3>
<Chart style={{marginTop:"70px"}} options={optionsPie} series={seriesPie} type="pie" height={300} />
    
    </Col>
    </Row>
<hr/>
   
   
    <h3><center>Monthly Income</center></h3>
    <Chart options={optionstot} series={seriestot} type="bar" height={350} />
    
<hr />
  

    
    
</Layout>
)

}

export default Dashboard