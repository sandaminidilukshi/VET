import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Popconfirm, Table } from "antd";
import ViewReply from "./ViewReply";
import toast from "react-hot-toast";
import { Button, Col, Form, Input, Row, TimePicker, Modal } from "antd";

function ViewHelp() {
  const [open, setOpen] = useState(false);
  const [help, setHelp] = useState([]);
  const [animal, setAnimal] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [need, setNeed] = useState("");
  const [reply, setReply] = useState("");

  const dispatch = useDispatch();

  const viewModal = (Animal, Phone, EmailAddress, Issue, Need) => {
    setAnimal(Animal);
    setPhone(Phone);
    setEmail(EmailAddress);
    setIssue(Issue);
    setNeed(Need);
    setOpen(true);
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
    {
      title: "Email Address",
      dataIndex: "emailAddress",
    },
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
              record.emailAddress,
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
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p> {animal} </p>
        <p>{phone}</p>
        <p>{email}</p>
        <p>{issue}</p>
        <p>{need}</p>
        <input
          type="text"
          onChange={(e) => setReply(e.target.value)}
          value={reply}
        />
      </Modal>
    </Layout>
  );
}

export default ViewHelp;
