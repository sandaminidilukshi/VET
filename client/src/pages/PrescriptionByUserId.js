import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { Table } from "antd";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";

function PrescriptionByUserId() {
  const { user } = useSelector((state) => state.user);
  const [prescription, setPrescription] = useState([]);
  const [datasource, setDatasource] = useState(
[
  {
    id:1,
    animalName:'Tommy',
    animaltype:'Dog',
    notes:'Suffered from Neumonia',
    diagnosis:'Tick Fever',
    advices:'Donot shower',
    procedureConducted:'Manual',
    medicineName:'Amoxicillin',
    morning:'2 pills',
    afternoon:'3 pills',
    evening:'1 pill'

    
  }
]

  )
  const dispatch = useDispatch();
  const getPrescriptionData = async () => {
    try {
      
      const resposne = await axios.get("/api/prescription/get-prescription-by-userId", 
      {
        userId: user._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      
      
      if (resposne.data.success) {
        setPrescription(resposne.data.data);
      }
      console.log("records",resposne.data.data)
      console.log("recordmed",resposne.data.data[0].medicines[0].medicineName)
    } catch (error) {
    }
  };
  useEffect(() => {
    getPrescriptionData();
  }, []);
 
 const columns = [
        { key:1,
          title: "Animal Name",
          dataIndex: "animalName",
        },
        { key:2,
          title: "Animal Type",
          dataIndex: "animaltype",
        },
        { key:3,
          title: "Notes",
          dataIndex: "notes",
        },
        { key:4,
          title: "Diagnosis",
          dataIndex: "diagnosis",
        },
        { key:5,
          title: "Advices",
          dataIndex: "advices",
        },
        { key:6,
          title: "Procedure Conducted",
          dataIndex: "procedureConducted",
        },
        { key:7,
          title: "Medicines",
          dataIndex: "medicineName",
        },
        { key:8,
          title: "Morning",
          dataIndex: "morning",
        },
        { key:9,
          title: "Afternoon",
          dataIndex: "afternoon",
        },
        { key:10,
          title: "Evening",
          dataIndex: "evening",
        },

        
      ]
     
      




return (
<div>
    <h1 className="page-header">Animal prescription</h1>
    <Row gutter={20}>
        <Col span={12} xs={24} sm={24} lg={4}>
        <div  style={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                            // marginTop:'2px',
                        }} className="flex  ">
          
         
    <input mt-0
      placeholder="   Search pet name"
      className="space between "
    ></input>
    
      <img src="https://static.vecteezy.com/system/resources/thumbnails/001/591/586/small/free-search-icon-free-vector.jpg" style={{ width: 40 , height: 40 }} className=" h-6 mt-1px" alt="search"></img>
      </div>
</Col></Row>
    <hr />
    <Table columns={columns}  dataSource={datasource} />
    </div>
);
}

export default PrescriptionByUserId;


