import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function ViewRecords() {
    const columns = [
        {
          title: "User ID",
          dataIndex: "user_id",  
        },
        {
          title: "Animal Name",
          dataIndex: "animal_name",
        },
        {
          title: "Animal Type",
          dataIndex: "animal_type",
        },
        {
          title: "Notes",
          dataIndex: "notes",
        },
        {
          title: "Diagnosis",
          dataIndex: "diagnosis",
        },
        {
          title: "Medicine",
          dataIndex: "medicine",
        },
        {
          title: "Dosage",
          dataIndex: "dosage",
        },
        {
          title: "Advices",
          dataIndex: "advices",
        },
      ]




return (
  <Layout>
    <h1 className="page-header">Animal History</h1>
    <hr />
    <Table columns={columns} />
  </Layout>
);
}//dataSource={doctors} 

export default ViewRecords;


