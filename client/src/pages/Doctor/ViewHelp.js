import React, { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Image, Popconfirm, Table } from "antd";
import ViewReply from "./ViewReply";
import toast from "react-hot-toast";
import { Button, Col, Form, Input, Row, TimePicker, Modal } from "antd";

function ViewHelp() {
  const [open, setOpen] = useState(false);
  const [help, setHelp] = useState([]);
  const [animal, setAnimal] = useState("");
  const [phone, setPhone] = useState("");
 // const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [need, setNeed] = useState("");
  const [reply, setReply] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const viewModal = (Animal, Phone, Issue, Need,Reply) => {
    setAnimal(Animal);
    setPhone(Phone);
    //setEmail(EmailAddress);
    setIssue(Issue);
    setNeed(Need);
    setOpen(true);
    setReply(Reply);
  };
  const onFinish = async (req,res) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/help/update-reply",
        {
          

          userId: user._id,
          animalTypeHelp: req.body.animalTypeHelp,
      phone: req.body.phone,
     // emailAddress: req.body.emailAddress,
      issue: req.body.issue,
      need: req.body.need,
      reply: req.body.reply
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("Sent Reply");
        
      } else {
        toast.success("Sent Reply");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.success("Sent Reply");
    }
  };

  // const submitHandler =  async (params)=>{
   
  //   try {
  //     const {data} = await axios.post('/api/prescription/save-reply',
  //    {
  //     userId: params.userId,
  //      "reply" : reply
            
  //     }, 
      
    
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }
  //     )
      

  //     //console.log(data)
  //   } catch (err) {
  //     toast.error(err);
      
  //   }
  // }
  const getHelpData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/help/get-all-help-requests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());

      if (resposne.data.success) {
        setHelp(resposne.data.data);
      }
      console.log("records", resposne.data.data);
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getHelpData();
  }, []);

  const columns = [
    {
      title: "Animal Type",
      dataIndex: "animalTypeHelp",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    // {
    //   title: "Email Address",
    //   dataIndex: "emailAddress",
    // },
    {
      title: "Issue",
      dataIndex: "issue",
    },
    {
      title: "Need",
      dataIndex: "need",
    },
    {
      title: "",
      dataIndex: "reply",

      render: (_, record) => (
        <Button
          type="primary"
          onClick={() =>
            viewModal(
              record.animalTypeHelp,
              record.phone,
              //record.emailAddress,
              record.issue,
              record.need
            )
          }
        >
          Reply
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-header">Help Requests</h1>

      <hr />
      <Table columns={columns} dataSource={help} />
      <Modal
        title="Reply for the help request"
        centered
        visible={open}
        onOk={() =>{ setOpen(false);
          onFinish();                             
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
    src="https://imageio.forbes.com/specials-images/imageserve/477669665/Prison-inmates-train-service-dogs-to-help-vets-and-first-responders-with-PTSD-/960x0.jpg?format=jpg&width=960"
  />
      </Col>
      <Col span={12}>
       <div className="w-full" >
                                                  <div className="p-2 m-2" style={{ border: '1px solid', borderColor: "#a5a4a4", width: '90%', borderRadius: '5px',layout:"vertical" }} >
                                                    <div className="flex" >
                                                      <h6 className="text-12 my-0">Animal Type :</h6>
                                                         <p className="text-12 my-0 ml-2 ">{animal}</p>
                                            </div>
                                            <div className="flex" >
                                                <h6 className="text-12 my-0">Phone Number :</h6>
                                                <p className="text-12 my-0 ml-2 ">{phone}</p>
                                            </div>
                                            <div className="flex" >
                                                <h6 className="text-12 my-0">Pet's issue :</h6>
                                                <p className="text-12 my-0 ml-2 ">{issue}</p>
                                                   
                                            </div>
                                            <div className="flex" >
                                                <h6 className="text-12 my-0">Pet's Need : </h6>
                                                <p className="text-12 my-0 ml-2 ">{need}</p>
                                                   
                                            </div>
                                            
                                        </div>
                                        </div>
                                        
        {/* <p>Animal Type: {animal} </p>
        <p>Phone Number: {phone}</p>
        <p>Pet's issue: {issue}</p>
        <p>Pet's Need: {need}</p> */}
        <input
        className="w-full"
        style={{marginLeft:"20px"}}
          type="text"
          onChange={(e) => setReply(e.target.value)}
          value={reply}
        />
        </Col>
                                        </Row>
      </Modal>
    </Layout>
  );
}

export default ViewHelp;
