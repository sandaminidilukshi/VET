import {  Button, Card, Col, Collapse, Divider, Form,  Input,  Row, Space, Table } from "antd";
import axios, { Axios } from "axios";
import React, { useEffect, useState ,useRef  } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { Select } from 'antd';
import AppointmentsList from "./AppointmentList";
import moment from "moment";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ReactToPrint from 'react-to-print';


function PaymentCalculation(){


const [consultationFee, setConsultationFee] = useState("")
const [medicines, setMedicines] = useState([])
const [medicineFee, setMedicineFee] = useState()
const [bill2,setBill2] = useState([])
const [bill, setBill] = useState([])
const [total, setTotal] = useState("")
const params = useParams();
const today = moment().format('YYYY-MM-DD');
const currentTime = moment().format('h:mm:ss a');
console.log("date",today)
const  {user}  = useSelector((state) => state.user);
const componentRef = useRef();


const add=() =>{
     setTotal(parseInt(medicineFee) + parseInt(consultationFee))
}

//get bill information by id
const  getBillInfoById = async  ()=> {
    try {
      const resposne = await axios.post(
        "/api/prescription/get-bill-record-by-bill-id",
        {
          billId: params.billId
        },
  
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (resposne.data.success) {
        setBill(resposne.data.data);
        setMedicineFee(bill.medicineFee)
        
        console.log("userId",bill.userId)
        console.log("medi",medicineFee)
      }
    } catch (error) {
      
    }
  };

  const  updateBill = async  ()=> {
    try {
      const resposne = await axios.post(
        "/api/bill/add-new-payment-values",
        {
          billId: params.billId,
          medicationFee:consultationFee,
          total:total
        },
  
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (resposne.data.success) {
        setBill2(resposne.data.data);
        toast.success("Bill record updated successfully");
        // setMedicineFee(bill.medicineFee)
       // console.log("userId",bill.userId)
        console.log("medi3",bill2)
      }
    } catch (error) {
      
    }
  };
  // useEffect(() => {
   
  //   getBillInfoById();
  // }, [params.billId]); 


return(
    <Layout>
        <Form layout="vertical" > 
        {/* onFinish={submitHandler} */}
  <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Consultation Fee"
            name="Consultation Fee"
            rules={[{ required: false }]}
          >
            <Input placeholder="Consultation Fee" onChange={(e)=>(setConsultationFee(e.target.value))} />
          </Form.Item>
        </Col>
       
        <Col span={8} xs={24} sm={24} lg={8}>
        
          <Form.Item
            
            label="Medicine Fee"
            name="medicineFee"
           
          >
          <label for="medicinFee">{medicineFee}</label>
            {/* <Input readOnly  value={medicineFee}  /> */}
          </Form.Item>
        </Col>
        <Col span={4} xs={24} sm={24} lg={4}>
        <Button style={{marginTop:"42px"}} className="transparent" onClick={() =>{ getBillInfoById()}} >
           Get Medicine Fee
        </Button>
        </Col>
        <Col span={4} xs={24} sm={24} lg={4}>
        <Button style={{marginTop:"42px"}} className="transparent" onClick={add}  >
          Calculate Bill
        </Button>
        {/* onClick={getOngoingAppointment}onClick={add()} */}
            </Col>
        </Row>
        
        
           
            
            <Row gutter={20}>
       
        <Col span={8} xs={24} sm={24} lg={8}>
        
        <Form.Item
          
          label="Total Fee"
          name="total"
         
        >
        <label for="total">{total}</label>
          {/* <Input readOnly  value={medicineFee}  /> */}
        </Form.Item>
      </Col>
        <Col span={4} xs={24} sm={24} lg={4}>
        <Button style={{marginTop:"42px"}} className="primary-button" onClick={updateBill}>
          Confirm Payment
        </Button>
        {/* onClick={getOngoingAppointment} */}
       
            </Col>
            <Col span={4} xs={24} sm={24} lg={4}>
            <div>
      
      </div>
   
            </Col>
      </Row>
      </Form>

      <Divider/>
     
<div>
      <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>
<div  className="w-full font-bold text-20 text-center"><h3>Bill Calculation</h3></div>
                                <div className="w-full font-bold text-16 text-center"><h4>Vet Care Animal Hospital</h4> </div>
                                {/* Boxes */}
                                <div className="mx-5 my-2 flex w-full" >
                                    <div className="w-full" >
                                        <div className="p-2 m-2 w-full" style={{ border: '1px solid', borderColor: "#a5a4a4", width: '90%', borderRadius: '5px' }} >
                                            <div className="flex" >
                                                
                                                <p className="text-12 my-0">Date :{today}</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                            </div>
                                            <div className="flex" >
                                                <p className="text-12 my-0">Time :{currentTime}</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                            </div>

                                            <div className="flex" >
                                                <p className="text-12 my-0">User :{user.name}</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                      
                                        </div>
                                        </div>
                                        <div className="p-2 m-2 w-full" style={{ border: '1px solid', borderColor: "#a5a4a4", width: '90%', borderRadius: '5px' }} >
                                            <div className="flex" >
                                                <p className="text-12 my-0">Medication Payment : Rs.{consultationFee}.00</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                            </div>
                                            <div className="flex" >
                                                <p className="text-12 my-0">Pharmacy Bill: Rs.{medicineFee}.00</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                            </div>

                                            
                                        <div className="flex" >
                                                <p className="text-12 my-0">Sub Total : Rs.{total}.00</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                      
                                        </div>
                                       
                                        </div>
                                        </div>
                                        <div>
                                        
                                          
                                        <div className="p-2 m-2 w-full" style={{ border: '1px solid', borderColor: "#a5a4a4", width: '90%', borderRadius: '5px' }} >
                                            <div className="flex" >
                                                <p className="text-12 my-0">Drugs Name :Cloaxicillin 5 mg </p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                            </div>
                                            <div className="flex" >
                                                <p className="text-12 my-0">Dosage : </p>
                                                <p className="text-12 my-0 ml-2 ">Morning :1 </p>
                                                <p className="text-12 my-0 ml-2 ">Afternoon : 1</p>
                                                <p className="text-12 my-0 ml-2 ">Evening :1</p>
                                               
                                            </div>


                                            
                                        <div className="flex" >
                                                <p className="text-12 my-0">Duration :4</p>
                                                <p className="text-12 my-0 ml-2 "></p>
                                      
                                        </div>
                                       
                                        </div>                 
                                        
       
       </div>
    
   
   
        

</div>
</div>
</div>
    </Layout>
)

}


export default PaymentCalculation;