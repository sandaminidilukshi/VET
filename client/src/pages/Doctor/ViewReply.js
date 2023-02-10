import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Help from "../../components/Help";
import moment from "moment";

function ViewReply() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [help, setHelp] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getHelpData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-help-info-by-user-id",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        console.log(response.data);
        setHelp(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  return (
    <Layout>
      <h1 className="page-title">Reply</h1>
      <hr />
      {help && <Help onFinish={getHelpData} initivalValues={help} />}
    </Layout>
  );
}

export default ViewReply;
