import React from "react";
import  Layout  from "../../components/Layout";
import { Chart } from "react-google-charts";
import { Card, Col, Row } from "antd";


  
 const options = {
    chart: {
      title: "Income",
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
  export const data3 = [
    ["Medicine", "Number for month"],
    ["Cosequin DS", 70],
    ["Rimadyl", 25],
    ["Denamarin", 1],
    ["Cephalexin Capsules", 3],
    ["Metronidazole Tablets", 7],
  ];
  export const options3 = {
    title: "For last month",
  };
  export const data4 = [
    ["Visitors", "Number for year"],
    ["One Time Visitors", 70],
    ["Frequent Visitors", 100],
    
  ];
  export const options4 = {
    title: "For last year",
  
  };

  export const data2 = [
    ["Visitors", "Number for month"],
    ["New  Visitors", 70],
    ["Returning Visitors", 50],
    
  ];
  export const options2 = {
    title: "New vs Returning Visitors",
  };
  export const options1 = {
    title: "For Last Month",
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
<Row>
<Col span={8} >
  
  
  <h3> Frequent Visitors</h3>
  <Chart
      chartType="PieChart"
      data={data4}
      options={options4}
      width={"100%"}
      height={"400px"}
    />
    
    </Col>
<Col span={8} >
  
    
<h3>Animals by type</h3>
<Chart
      chartType="PieChart"
      data={data1}
      options={options1}
      width={"100%"}
      height={"400px"}
    />
    
    </Col>

    <Col span={8} >
  

<h3>Top Selling Medicines</h3>
<Chart
      chartType="PieChart"
      data={data3}
      options={options3}
      width={"100%"}
      height={"400px"}
    />
    
    </Col>
    </Row>

    <Row>
   
    <h3>Monthly Income</h3>
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      data={[
        ["Date", 'Income'],
        ["January", 50000],
        ["February", 63000],
        ["March", 45000],
        ["April", 70000],
        ["May", 59000],
        ["June", 35000],
        ["July", 45600],
        ["Aug", 50600],
        ["Sep", 80000],
        ["Oct", 65000],
        ["Nov", 59000],
        ["Dec", 78000],
      ]}
    options={options}
    />
<hr />
  

    
    </Row>
</Layout>
)

}

export default Dashboard