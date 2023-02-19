import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function PharmacistList() {
  const [pharmacists, setPharmacists] = useState([]);
  const dispatch = useDispatch();
  const getPharmacistsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/admin/get-all-pharmacists", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setPharmacists(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changePharmacistStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/admin/change-pharmacist-account-status",
        { pharmacistId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getPharmacistsData();
      }
    } catch (error) {
      toast.error('Error changing doctor account status');
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getPharmacistsData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h1
              className="anchor"
              onClick={() => changePharmacistStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="anchor"
              onClick={() => changePharmacistStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">Pharmacist List</h1>
      <hr />
      <Table columns={columns} dataSource={pharmacists} />
    </Layout>
  );
}

export default PharmacistList;
