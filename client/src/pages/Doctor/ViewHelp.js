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
  const [issue, setIssue] = useState("");
  const [need, setNeed] = useState("");
  const [reply, setReply] = useState("");
  const [helpReqId, setHelpReqId] = useState("")

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const viewModal = (HelpReqId,Animal, Phone, Issue, Need,Reply) => {
    setAnimal(Animal);
    setPhone(Phone);
    setIssue(Issue);
    setNeed(Need);
    setOpen(true);
    setReply(Reply);
    setHelpReqId(HelpReqId)
  
  };
 
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
  const getReply = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post("/api/help/update-reply", 
      {helpReqId:helpReqId ,userId: user._id, reply: reply },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());

      if (resposne.data.success) {
        toast.success("Reply Sent Successfully");
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
              record._id,
              record.animalTypeHelp,
              record.phone,
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
          getReply();                           
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
                                                  <div className="p-2 m-2" style={{ border: '1px solid', borderColor: "#a5a4a4", width: '90%', layout:"vertical" }} >
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
                                        
      
        <input
        className="w-full"
        style={{marginLeft:"10px" ,width:"90%"}}
          type="text"
          onChange={(e) => setReply(e.target.value)}
          value={reply}
          rules={[{ required: true }]}
        />
        </Col>
                                        </Row>
      </Modal>
    </Layout>
  );
}

export default ViewHelp;
