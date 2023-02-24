import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { Select } from 'antd';

function Records() {
  
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState([])
  const [userName, setUserName] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [animalType, setAnimalType] = useState('')
  const [animalName, setAnimalName] = useState('')
  const [complaint, setComplaint] = useState('')
  const [durationComplaints, setDurationComplaints] = useState('')  
  const [finding, setFinding] = useState('')    
  const [notes, setNotes] = useState('')
  const [diagnosis, setdiagnosis] = useState('')
  const [procedureConducted, setProcedureConducted] = useState('')
  const [medicineName, setMedicineName] = useState('')  
  const [morning, setMorning] = useState('')  
  const [afternoon, setAfternoon] = useState('')
  const [evening, setEvening] = useState('')
  const [durationDosage, setDurationDosage] = useState('')  
  const [advices, setAdvices] = useState('')

  const onChange = (value) => {
    console.log(`Changed ${value}`);
  };
  
  const onSelect = (value) => {
    console.log('selected:', value);
  };

  const submitHandler = async(e)=>{
   
    try {
      const {data} = await axios.post('/api/prescription/save-prescription',
     {
        
          "user": userName,
            "doctor": user?.name,
            "animalName": animalName,
            "animaltype": animalType,
            "chiefComplaints": {
              complaint:complaint,
              duration:durationComplaints,
              finding:finding,

            },
            "notes": notes,
            "diagnosis": diagnosis,
            "procedureConducted": procedureConducted,
            "medicines": [
                {
                  "medicineName":medicineName,
                
                  "dosage": {
                    "morning": morning,
                    "afternoon": afternoon,
                    "evening": evening,
                    
                  "duration": durationDosage
                  }}],
            "advices": advices
            
      }, 
      
    
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      )
      

      //console.log(data)
    } catch (err) {
      toast.error(err);
      
    }
  }
 

 
  useEffect(() => {
    console.log("123")
    const getPatientsData = async () => {
      try {
        
        const resposne = await axios.get(
          "/api/admin/get-all-patients",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
       
        if (resposne.data.success) {
          setUsers(resposne.data.data);
        }
      } catch (error) {
        
      }
    };
    console.log("789")
    getPatientsData();
  console.log("obj",users)
 
  }, [])
  
return (<Layout>
    <Form layout="vertical" onFinish={submitHandler}> 
   
      <h1 className="card-title mt-3">Animal Record</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
        <Form.Item
            required
            label="User Name"
            name="name"
            rules={[{ required: true }]}
          >
         
          
        <Select  
    placeholder="Select a person"
    optionFilterProp="children"
    // onChange={onChange}
    // onSearch={onSearch}
    onSelect={onSelect}
     options={users.map((person) => ({
  value:  person._id,
  label: person.name,
}))}
/>
</Form.Item>
    </Col>
        
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Animal Type"
            name="animalType"
            rules={[{ required: true }]}
          >
            <Input placeholder="Animal Type" onChange={(e)=>(setAnimalType(e.target.value))}/>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Animal Name"
            name="animalName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Animal Name" onChange={(e)=>(setAnimalName(e.target.value))}/>
          </Form.Item>
        </Col>
        </Row>
        <hr />
        <h2 className="card-title mt-3">Chief Complaints</h2>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Complaint"
            name="complaint"
            rules={[{ required: true }]}
          >
            <Input placeholder="Complaint" onChange={(e)=>(setComplaint(e.target.value))} />
          </Form.Item>
        </Col>
       
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Duration"
            name="durationComplaints"
            rules={[{ required: true }]}
          >
            <Input placeholder="Duration" onChange={(e)=>(setDurationComplaints(e.target.value))} />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Finding"
            name="finding"
            rules={[{ required: true }]}
          >
            <Input placeholder="Finding" onChange={(e)=>(setFinding(e.target.value))}/>
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h2 className="card-title mt-3">Remarks</h2>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Notes"
            name="notes"
            rules={[{ required: true }]}
          >
            <Input placeholder="Notes" onChange={(e)=>(setNotes(e.target.value))}/>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Diagnosis"
            name="diagnosis"
            rules={[{ required: true }]}
          >
            <Input placeholder="Diagnosis"  onChange={(e)=>(setdiagnosis(e.target.value))}/>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Procedure Conducted"
            name="procedureConducted"
            rules={[{ required: true }]}
          >
            <Input placeholder="Procedure Conducted" onChange={(e)=>(setProcedureConducted(e.target.value))} />
          </Form.Item>
        </Col>
        </Row>
        <hr />
        <h2 className="card-title mt-3">Medicines</h2>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Medicine Name"
            name="medicineName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Medicine Name"  onChange={(e)=>(setMedicineName(e.target.value))}/>
          </Form.Item>
        </Col>
        </Row>
        <hr />
        <h2 className="card-title mt-3">Dosage</h2>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Morning"
            name="morning"
            rules={[{ required: true }]}
          >
            <Input placeholder="Morning" onChange={(e)=>(setMorning(e.target.value))} />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Afternoon"
            name="afternoon"
            rules={[{ required: true }]}
          >
            <Input placeholder="Afternoon"  onChange={(e)=>(setAfternoon(e.target.value))}/>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Evening"
            name="evening"
            rules={[{ required: true }]}
          >
            <Input placeholder="Evening"  onChange={(e)=>(setEvening(e.target.value))}/>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Duration"
            name="durationDosage"
            rules={[{ required: true }]}
          >
            <Input placeholder="Duration" onChange={(e)=>(setDurationDosage(e.target.value))} />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Advices"
            name="advices"
            rules={[{ required: true }]}
          >
            <Input placeholder="Advices"  onChange={(e)=>(setAdvices(e.target.value))}/>
          </Form.Item>
        </Col>
        </Row>


      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit"  >
          SUBMIT
        </Button>
      </div>
    </Form>
    </Layout>
  );
}

export default Records;
