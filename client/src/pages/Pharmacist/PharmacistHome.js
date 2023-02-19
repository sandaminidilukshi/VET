import React from 'react'
import { Card, Col, Row,Image } from 'antd';

function PharmacistHome() {
  return (
    <div>
        <div mt-5 mb-5>
       <Row gutter={16}>
    <Col span={8}>
      <Card title="Total Invoice" bordered={true} style={{ borderColor:"#000000" , Color:"red"}} 
       headStyle={{ backgroundColor: '#8c8c8c', color: '#ffffff' }}
       bodyStyle={{ backgroundColor: '#d9d9d9',textAlign:'center'}}>
        <h3 color='Red'>4</h3>
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Total Medicine" bordered={true} style={{ borderColor:"#000000" , Color:"red"}}
       headStyle={{ backgroundColor: '#8c8c8c', color: '#ffffff' }}
       bodyStyle={{ backgroundColor: '#d9d9d9',textAlign:'center'}}
      >
      <h3 color='Red'> 10</h3>
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Total Supplier" bordered={true} style={{ borderColor:"#000000" , Color:"red"}}
       headStyle={{ backgroundColor: '#8c8c8c', color: '#ffffff' }}
       bodyStyle={{ backgroundColor: '#d9d9d9',textAlign:'center'}}>
      <h3 color='Red'>10</h3>
      </Card>
    </Col>
  </Row>
  <div mt-5 mb-5>
  <Row gutter={16} style={{marginTop:"5"}}>
    <Col span={8}>
      <Card title="Invoices Today" bordered={true} style={{ borderColor:"#000000" , Color:"red"}}
      headStyle={{ backgroundColor: '#8c8c8c', color: '#ffffff' }}
      bodyStyle={{ backgroundColor: '#d9d9d9',textAlign:'center'}}
      >
        <h3 color='Red'>5</h3>
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Categories" bordered={true} style={{ borderColor:"#000000" , Color:"red"}}
      headStyle={{ backgroundColor: '#8c8c8c', color: '#ffffff' }}
      bodyStyle={{ backgroundColor: '#d9d9d9',textAlign:'center'}}
      >
      <h3 color='Red'> 6 </h3>
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Medicine Types" bordered={true} style={{ borderColor:"#000000" , Color:"red"}}
      headStyle={{ backgroundColor: '#8c8c8c', color: '#ffffff' }}
      bodyStyle={{ backgroundColor: '#d9d9d9',textAlign:'center'}}
      >
      <h3 color='Red'>5</h3>
      </Card>
    </Col>
  </Row>
  </div>

  <div mt-5 mb-5>
  <Row gutter={16} style={{marginTop:"5"}}>
    <Col span={8}>
      <Card title="Total Sales Today" bordered={true} style={{ borderColor:"#000000" , Color:"red"}}
      headStyle={{ backgroundColor: '#8c8c8c', color: '#ffffff' }}
      bodyStyle={{ backgroundColor: '#d9d9d9',textAlign:'center'}}>
        <h3 color='Red'>50 Issuance</h3>
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Total Count Of Transaction Today" bordered={true} style={{ borderColor:"#000000" , Color:"red"}}
      headStyle={{ backgroundColor: '#8c8c8c', color: '#ffffff' }}
      bodyStyle={{ backgroundColor: '#d9d9d9',textAlign:'center'}}>
      <h3 color='Red'> 6 Transactions</h3>
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Total Value of Transactions" bordered={true} style={{ borderColor:"#000000" , Color:"red"}}
      headStyle={{ backgroundColor: '#8c8c8c', color: '#ffffff' }}
      bodyStyle={{ backgroundColor: '#d9d9d9',textAlign:'center'}}>
      <h3 color='Red'>LKR.12500</h3>
      </Card>
    </Col>
  </Row>
  </div>
  </div>
    </div>
  )
}

export default PharmacistHome
