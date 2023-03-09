import { Button, Card, Col, Collapse, Divider, Form, Input, Row, Space, TimePicker } from "antd";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";
import AppointmentsList from "./AppointmentList";
import moment from "moment";

function Records() {
  const { Panel } = Collapse;
  const { user } = useSelector((state) => state.user);
  const [animalList, setAnimalList] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const [userList, setUserList] = useState([])
  const [userName, setUserName] = useState('')
  const [doctor, setDoctor] = useState([])
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
  const [animal, setAnimal] = useState([])
  const [drugList, setDrugList] = useState([])
  const [drug, setDrug] = useState('')
  const [appointments, setAppointments] = useState([])
  const date = moment(new Date()).format("DD-MM-YYYY")
  const navigate = useNavigate();
 
  // var dateTime = moment().toDate();
  // console.log("date",dateTime)
  // var now = moment().startOf('day').toString();
  // console.log("now",now)
  //get the value of selected user
  const onSelectUser = (value) => {
   getUserInfoById(value);
   getAnimalsData(value);
  };

  //get the value of selected animal
  const onSelectAnimal = (value) => {
    getAnimalInfoById(value);
   };

   //get the value of selected animal
  const onSelectDrug = (value) => {
    setDrug(value);
   };

  
  const submitHandler = async(e)=>{
   
    try {
      const {data} = await axios.post('/api/prescription/save-prescription',
     {
        
          "user": userInfo.name,
          "userId":userInfo._id,
            "doctor": user?.name,
            "animalName": animal.animalName,
            "animalId":animal._id,
            "animaltype": animal.animalType,
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
                  
                  
                  "dosage": {
                    "medicineName":drug,
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
      
      toast.success("Animal record saved successfully");
      //console.log(data)
    } 
    catch (err) {
      toast.error(err);
      
    }
  }
 //get all patients 
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
        setUserList(resposne.data.data);
      }
    } catch (error) {
      
    }
  };
 //get animals by owner ID
  const getAnimalsData = async (value) => {
    try {
      
      const resposne = await axios.post(
        "/api/animal/get-animals-by-userId",
        {
          userId:value
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAnimalList([""])
      if (resposne.data.success) {
        setAnimalList(resposne.data.data);
      }
    } catch (error) {
      
    }
  };

 //get relevant user information by ID
  const  getUserInfoById = async (value) => {
    try {
      const resposne = await axios.post(
        "/api/admin/get-patient-info-by-id",
        {
          value
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
     
      if (resposne.data.success) {
        setUserInfo(resposne.data.data);
      }
    } catch (error) {
      
    }
  };
//get animal information by animal ID
  const  getAnimalInfoById = async  (value)=> {
    try {
      const resposne = await axios.post(
        "/api/animal/get-animal-by-Id",
        {
          animalId:value
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (resposne.data.success) {
        setAnimal(resposne.data.data);
        console.log(animal)
      }
    } catch (error) {
      
    }
  };

  //get all drugs
  const getDrugsData = async () => {
    try {
      
      const response = await axios.get("/api/drugs/get-all-drugs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
      console.log("drugs", response.data.data);

        setDrugList(response.data.data);
      }
     
    } catch (error) {
      
    }
  };

//get doctor info by id
const getDoctorData = async () => {
  try {
   
    const response = await axios.post(
      "/api/doctor/get-doctor-info-by-user-id",
      {
        userId:user?._id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    
    if (response.data.success) {
      console.log(response.data)
      setDoctor(response.data.data);
      
    }
  } catch (error) {
    console.log(error);
    
  }
};

//get appointments scheduled for the day
  const getAppointmentsData = async (value) => {
    try {
     
      const resposne = await axios.post(
        "/api/user/get-booking-avilability-by-date",
        {
        doctorId:doctor._id,
          date:date,
          
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    
      if (resposne.data.success) {
        setAppointments(resposne.data);
      }
    } catch (error) {
      
    }
  };
  
  useEffect(() => {
    getPatientsData();
    getDrugsData();
    getDoctorData();
    
  }, [])

  
return (<Layout>
    <Form layout="vertical" onFinish={submitHandler}> 
    <div>
      <Row>
    <Card
    title="Ongoing Appointment"
    bordered={true}
    style={{
      width: 300,
    }}
  >
    <p>Date : 2023/03/03</p>
    <p>Client Name :  Chamuditha Bandara</p>
    <p>Appointment Time : 20:00pm</p>
  </Card>
  <Card
    title="Next Appointment"
    bordered={true}
    style={{
      width: 300,
    }}
  >
    <p>Date : 2023/03/03</p>
    <p>Client Name :  Yasara Herath</p>
    <p>Appointment Time : 21:00pm</p>
  </Card>

    
  </Row>
    </div>
      <h1 className="card-title mt-3">Animal Record</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
        <Form.Item
            required
            label="User Name"
            name="user"
            rules={[{ required: true }]}
          >
         
          
        <Select  
        allowClear={true}
    placeholder="Select a person"
    optionFilterProp="children"
    // onChange={onChange}
    // onSearch={onSearch}
    onSelect={onSelectUser}
     options={userList.map((person) => ({
  value:  person._id,
  label: person.name,
}))}
/>
</Form.Item>
    </Col>
    <Col span={8} xs={24} sm={24} lg={8}>
    <Form.Item
           
            label="Email"
          
            
          >
    <Input readOnly value={userInfo.email} />
        {/* <p>Email : {userInfo.email}</p>
        <p>Contact No : {userInfo.phoneno}</p>
      */}
      </Form.Item>
    </Col>
    
    <Col span={8} xs={24} sm={24} lg={8}>
    <Form.Item
          
            label="Contact No"
           
          >
    <Input readOnly value={userInfo.phoneno} />
        {/* <p>Email : {userInfo.email}</p>
        <p>Contact No : {userInfo.phoneno}</p>
      */}
      </Form.Item>
    </Col>
    </Row>
    <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Animal Name"
            name="animalName"
         
          >
            <Select  
            allowClear={true}
    placeholder="Select an animal"
    optionFilterProp="children"
    // onChange={onChange}
    // onSearch={onSearch}
    onSelect={onSelectAnimal}
     options={animalList.map((pet) => ({
     
  value:  pet._id,
  label: pet.animalName,
})
)


}

/>
</Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
    <Form.Item
          
            label="Animal Type"
           
          >
    <Input  readOnly value={animal.animalType} />
       
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
          >
            <Select  
        allowClear={true}
    placeholder="Select a drug"
    optionFilterProp="children"
    // onChange={onChange}
    // onSearch={onSearch}
    onSelect={onSelectDrug}
     options={drugList.map((drug) => ({
  value:  drug._id,
  label: drug.productname,
}))}
/>
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

        {/* <div className="d-flex justify-content-start">
        <Button className="primary-button" htmlType="submit" >
         Save Records
        </Button>
      </div> */}
 {/* onClick={() => navigate(`/calculateBill`)} */}
 <Divider orientation="left"></Divider>
    <Row >
      <Col className="gutter-row w-full" span={3}>
      <div className="d-flex justify-content-mid">
        <Button className="primary-button" htmlType="submit"  >
          Save Record
        </Button>
      </div>
      </Col>
      <Col className="gutter-row" span={6}>
      <div className="d-flex justify-content-mid w-full">
        <Button className="primary-button" onClick={() => navigate(`/calculateBill`)} >
          Calculate Bill
        </Button>
      </div>
      </Col>
      <Col className="gutter-row" span={6}>
      <div className="d-flex justify-content-mid w-full">
        <Button className="primary-button" onClick={getAppointmentsData}>
          Appointments
        </Button>
      </div>
      </Col>
     </Row>
     
    </Form>
    </Layout>
  );
}

export default Records;
