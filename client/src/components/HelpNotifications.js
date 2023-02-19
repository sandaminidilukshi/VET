import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import Layout from "./Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { Image, Table } from "antd";
import { Button, Col, Form, Input, Row, TimePicker,Modal } from "antd";
import toast from "react-hot-toast";

function HelpNotifications() {
  const { user } = useSelector((state) => state.user);
  const [replies, setReplies] = useState([])
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [animal, setAnimal] = useState("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("");
  const [need, setNeed] = useState("");
  const [reply, setReply] = useState("");

  const viewModal = (Animal,  Issue, Need,Reply) => {
    setAnimal(Animal);
    setIssue(Issue);
    setNeed(Need);
    setOpen(true);
    setReply(Reply);
   
  
  };   

  const getReply = async () => {
    try {
     
      const response = await axios.post("/api/help/get-help-requests-by-user", 
      {
        userId: user._id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      
      if (response.data.success) {
        setReplies(response.data.data)
      }
      console.log("reply",response.data.data)
      
    } catch (error) {
      toast.error("Something went wrong")
    }
  };
  useEffect(() => {
    getReply();
  }, []);
 
 const columns = [
        {
          title: "Anima Type",
          dataIndex: "animalTypeHelp",
         
          render: (text, record) => (
            <span>
              {record.animalTypeHelp} 
            </span>
          ),
          
        },
        {
          title: "Issue",
          dataIndex: "issue",
          render: (text, record) => (
            <span>
              {record.issue} 
            </span>
          ),
        },
        {
          title: "Need",
          dataIndex: "need",

          render: (text, record) => (
            <span>
              {record.need} 
            </span>
          ),
        },
        {
          title: "Reply",
          dataIndex: "reply",
          render: (text, record) => (
            <span>
              {record.reply} 
            </span>
          ),
        },
        {
          title: "Actions",
          dataIndex: "actions",
    
          render: (_, record) => (
            <Button
              type="primary"
              onClick={() =>{
                viewModal(
                 
                  record.animalTypeHelp,
                  record.issue,
                  record.need,
                  record.reply
                )
              }
                
              }
            >
              View
            </Button>
           
          )
          
          
        },
      ]
     
      




return (
  <Form>
    <h1 className="page-header">Replies for Requests</h1>
    <Row gutter={20}>
        <Col span={12} xs={24} sm={24} lg={8}>
        <div  style={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'space-between',
                            // marginTop:'2px',
                        }} className="flex  ">
          
      </div>
</Col></Row>
    <hr />
    <Table columns={columns}  dataSource={replies} />

    <Modal
        title="Reply for the help request"
        centered
        visible={open}
        onOk={() =>{ setOpen(false);
          setReplies();                           
        }
        }
        onCancel={() => setOpen(false)}
        width={1000}
      >
      
      <Row>
      <Col span={12}>
      <Image 
   
    width="100%"
    height="100%"
    src="https://aldf.org/wp-content/uploads/2018/05/lamb-iStock-665494268-16x9-e1559777676675-1200x675.jpg"
  />
      </Col>
     
      <Col span={12}>
       <div className="w-full" style={{height:"100%"}} >
            <div className="p-2 m-2" style={{ border: '1px solid', borderColor: "#a5a4a4", width: '90%', layout:"vertical" }} >
                                                    <div className="vertical" >
                                                      <h6 className="text-12 my-0">Animal Type :</h6>
                                                         <p className="text-12 my-0 ml-2 ">{animal}</p>
                                            </div>
                                            <div className="vertical" >
                                                <h6 className="text-12 my-0">Pet's issue :</h6>
                                                <p className="text-12 my-0 ml-2 ">{issue}</p>
                                                   
                                            </div>
                                            <div className="vertical" >
                                                <h6 className="text-12 my-0">Pet's Need : </h6>
                                                <p className="text-12 my-0 ml-2 ">{need}</p>
                                                   
                                            </div>
                                            <div className="flex" >
                                                <h6 className="text-12 my-0">Doctor's Reply : </h6>
                                                <p className="text-12 my-0 ml-2 ">{reply}</p>
                                                   
                                            </div>
                                        </div>
                                        </div>
                                         </Col>
                                        </Row>

        </Modal>
  </Form>
);
}

export default HelpNotifications;


