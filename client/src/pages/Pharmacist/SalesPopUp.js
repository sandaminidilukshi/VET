import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { Modal, Table } from "antd";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import toast from "react-hot-toast"

function SalesPopUp(){
    const columns = [
        { key:1,
          title: "Product ",
          dataIndex: "product",
        },
        { key:2,
          title: "Quantity",
          dataIndex: "quantity",
        },
        { key:3,
          title: "Price",
          dataIndex: "price",
        },
        { key:4,
          title: "Amount",
          dataIndex: "amount",
        },]
    return(
        <div>
        <h1 className="page-header">Inventory</h1>
        <Row gutter={20}>
            <Col gutter={20} span={12} xs={24} sm={24} lg={5}>
            <div  style={{
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'space-between',
                                // marginTop:'2px',
                            }} className="space-between  ">
              
             
        <input mt-0
          placeholder="   Search drug name"
       
        ></input>
        
          <img src="https://static.vecteezy.com/system/resources/thumbnails/001/591/586/small/free-search-icon-free-vector.jpg" style={{ width: 40 , height: 40 }} className=" h-6 mt-1px" alt="search"></img>
          </div>
    </Col>
    
    <Col gutter={20} span={12} xs={24} sm={24} lg={5}>
            <div  style={{
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'space-between',
                                // marginTop:'2px',
                            }} className="space-between  ">
              
             
        <input size="large" mt-0
          placeholder="   Search Item No"
       
        ></input>
        
          <img src="https://static.vecteezy.com/system/resources/thumbnails/001/591/586/small/free-search-icon-free-vector.jpg" style={{ width: 40 , height: 40 }} className=" h-6 mt-1px" alt="search"></img>
          </div>
    </Col>
    
    <Col  gutter={20} span={12} xs={24} sm={24} lg={5}>
            <div  style={{
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'space-between',
                                // marginTop:'2px',
                            }} className=" space-between">
              
             
        <input mt-0
          placeholder="   Search Manufacturer"
       
        ></input>
        
          <img src="https://static.vecteezy.com/system/resources/thumbnails/001/591/586/small/free-search-icon-free-vector.jpg" style={{ width: 40 , height: 40 }} className=" h-6 mt-1px" alt="search"></img>
          </div>
    </Col>
    <Col  gutter={20} span={12} xs={24} sm={24} lg={5}>
            <div  style={{
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'space-between',
                                // marginTop:'2px',
                            }} className=" space-between">
        <Button type="primary" className=" h-6 mt-1px"  style={{ background: "#a0d911", borderColor: "yellow" ,  height: 40}}
        
        >Add Drug</Button>
         
         
          </div>
    </Col>
    </Row>
        <hr />
        <Table columns={columns}  dataSource={123} />
        <Col  gutter={20} span={12} xs={24} sm={24} lg={5}>
            <div  style={{
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'space-between',
                                // marginTop:'2px',
                            }} className=" space-between">
        <Button type="primary" className=" h-6 mt-1px"  style={{ background: "#a0d911", borderColor: "yellow" ,  height: 40}}
        
        >Pay</Button>
         
         
          </div>
    </Col>
        </div>
    
    )

}

export default SalesPopUp;