import React from "react";
import  Layout  from "../../components/Layout";
import { Chart } from "react-google-charts";
import { Card, Col, Row } from "antd";


  
 const options = {
    chart: {
      title: "Appointments",
      subtitle: "Progress",
      is3D:true,
      
    },
    colors: ["#d9f7be"],
  };

  export const data1 = [
    ["Animal Type", "Number for month"],
    ["Dog", 70],
    ["Cat", 25],
    ["Cow", 1],
    ["Bird", 3],
    ["Exotic", 7],
  ];
  
  export const options1 = {
    title: "For last month",
  };

function Dashboard(){

return(
    <Layout>
        <div className='Cards'>
        <div className='container-fluid'>
        <Row gutter={[16, 16]}>
  <Col span={8} >
  <Card className='card-dashboard'>
    <h4>No of Doctors : 3</h4>
    </Card>
    </Col>
    <Col span={8} >
  <Card  className='card-dashboard'>
    <h4>No of Users : 100</h4>
    </Card>
    </Col>
    <Col span={8} >
  <Card className='card-dashboard'>
    <h4>Total Income : 30000  </h4> </Card>
    </Col>
    </Row><hr />
    </div></div>
    <></>

    <h3>Daily Appointments</h3>
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      data={[
        ["Date", 'Appointments'],
        ["01-11", 15],
        ["01-12", 20],
        ["01-13", 25],
        ["01-14", 30],
        ["01-15", 21],
        ["01-16", 28],
        ["01-17", 27],
        ["01-18", 15],
        ["01-19", 21],
        ["01-20", 13],
      ]}
    options={options}
    />
<hr />
<h3>Animals by type</h3>
<Chart
      chartType="PieChart"
      data={data1}
      options={options1}
      width={"100%"}
      height={"400px"}
    />
</Layout>
)

}

export default Dashboard