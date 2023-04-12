import {  Button, Card, Col, Collapse, Divider, Form,  Input,  Row, Space, Steps, Table } from "antd";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { Select } from 'antd';
import { useNavigate } from "react-router-dom";
import AppointmentsList from "./AppointmentList";
import moment from "moment";
import { LoadingOutlined,SolutionOutlined, UserOutlined, UserOutlinedYYY } from '@ant-design/icons';

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
  const [appointment, setAppointment] = useState([])
  const [current, setCurrent] = useState(0)
  const [shouldRerender, setShouldRerender] = useState(false);
  const [inputList, setinputList]= useState([{medicineName:'', morning:'',afternoon:'',evening:'',durationDosage:'',advices:''}]);
  const date = moment(new Date()).format("DD-MM-YYYY")
  const time =moment().format("HH:mm")
  const navigate = useNavigate();
 
  const handleinputchange=(e, index)=>{
    const {name, value}= e.target;
    const list= [...inputList];
    list[index][name]= value;
    setinputList(list);
 
  }

  const handleremove= index=>{
    const list=[...inputList];
    list.splice(index,1);
    setinputList(list);
  }
  const handleaddclick=()=>{ 
    setinputList([...inputList, { medicineName:'', morning:'',afternoon:'',evening:'',durationDosage:'',advices:''}]);
  }

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


 
//get details of ongoing appointment
const getOngoingAppointment = async () => {
  try {
    
    if(date && time ) {
      const response = await axios.post(
        "/api/user/show-appointment-by-time",
        {
          doctorId:"6390106c0ffe482b78ce862b",
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      
    if (response.data.success) {
      toast.success(response.data.message);
      setAppointment(response.data.data[0].userInfo);
    } else {
      toast.error(response.data.message);
    }
    } else {
      
      toast.error("No booked  appointments");
    }
    
    
  } catch (error) {
    toast.error("Error booking appointment");
    
  }
};

console.log("appointment",appointment)
useEffect(() => {
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
        setDoctor(response.data.data);
        console.log("doctor",)
        
      }
    } catch (error) {
      console.log(error);
      
    }
  };
    getPatientsData();
    getDrugsData();
    getDoctorData();
    getOngoingAppointment();
    //getAppointmentsData();
     }, [])

    //  useEffect(() => {
     
    //    }, [])

useEffect(() => {
      const intervalId = setInterval(() => {
        getOngoingAppointment();
      }, 3600000);
    
      return () => clearInterval(intervalId);
    }, []);

return(
  <Layout>
  <Steps 
     onChange={setCurrent}
     current={current} >
    <Steps.Step title="Create Record" icon={<LoadingOutlined />}/>
    <Steps.Step title="Calculate Bill" icon={<SolutionOutlined />}/>
    <Steps.Step title="Confirm Bill" icon={<UserOutlined />}/>
  </Steps>



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
    {/* {appointment?
  (<div>
     <div className="d-flex justify-content-mid w-full">
         <Button className="primary-button" onClick={getOngoingAppointment}>
          Appointments
        </Button> 
      </div> */}
   
    <p>Client Name : {appointment.name} </p>
    <p>Phone No. : {appointment.phoneno}</p>
    {/* </div>):null} */}
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
       
         { 
            inputList.map( (x,i)=>{
        return(
        <div>
          
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
        <Col>
       
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
        
        <div>
        <Row><Col span={8} xs={24} sm={24} lg={8}>
        { inputList.length-1===i && 
        <Button className="primary-button" onClick={handleaddclick}>Add Medicine</Button>}
        </Col>
        
        <Col span={8} xs={24} sm={24} lg={8}>  {
                  inputList.length!==1 &&
                  <Button className="primary-button" onClick={handleremove}>Remove Medicine</Button>}
           </Col></Row></div>
       
        </div>)})}
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
        <Button className="primary-button" onClick={() => navigate(`/calculateBill/${appointment._id}`)}>
          Calculate Bill
        </Button>
        {/*  */}
      </div>
      </Col>
      <Col className="gutter-row" span={6}>
     
      </Col>
     </Row>
   
    </Form>
   
    </Layout>
  );}


export default Records;
