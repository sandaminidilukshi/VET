import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PharmacistForm from "../components/PharmacistForm";
import moment from "moment";


function ApplyPharmacist() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "/api/user/apply-pharmacist-account",
        {
          ...values,
          userId: user._id,
         
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  

  return (
    <Layout>
      <h1 className="page-title">Apply Pharmacist</h1>
      <hr />

      <PharmacistForm onFinish={onFinish} />
    </Layout>
  );
}

export default ApplyPharmacist;
