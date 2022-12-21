import "../layout.css";
import { Badge, Menu, Space,Layout} from "antd";
import {BookOutlined, ContainerOutlined, EditOutlined, PlusOutlined, SnippetsOutlined} from "@ant-design/icons"
import { useSelector } from "react-redux";
import { Link, Route,Routes, useNavigate } from "react-router-dom";
import { useState } from "react";


function SideBar(children){
  const [collapsed, setCollapsed] = useState(false);
   const navigate = useNavigate();
   const { user } = useSelector((state) => state.user);
   const { Header, Sider, Content } = Layout;
   const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

return(
  <div className="main"  >
  <div className="d-flex layout" >
    <div className="sidebar" style={{backgroundColor:"#000080"}} >
      <div className="sidebar-header" >
      <h1 className="logo">VETCARE</h1>
            <h1 className="role">{role}</h1>
    </div><div className="animalMenu">
    
        <Space>
        <Menu 
        onClick={({key}) => {
          navigate(key)
        }}
        mode="inline" 
        items={[
            {label:"Register", key:"/profile/register", icon:<SnippetsOutlined />},
            {label:"Bookings", key:"/profile/bookings",icon:<BookOutlined />},
            {label:"Records", key:"/profile/records",icon:<ContainerOutlined />},
            {label:"Update", key:"/profile/update",icon:<EditOutlined />},
            {label:"Help Centre", key:"/profile/help",icon:<PlusOutlined />},
        ]} style={{height:"92vh",width:"30vh",marginLeft:"7px",marginBottom:"5px"}}>
          

        </Menu>
        <Paths/>
        </Space>
        </div>       
</div>
      </div>
      </div>
    
     
     
  );
      
function Paths(){
  return <div>
    <Routes>
      <Route path="/profile/register" element={<div>Register</div>}></Route>
      <Route path="/profile/bookings" element={<div>Bookings</div>}></Route>
      <Route path="/profile/records" element={<div>Records</div>}></Route>
      <Route path="/profile/update" element={<div>Update</div>}></Route>
      <Route path="/profile/help" element={<div>Help</div>}></Route>
    </Routes>
  </div>
}


}

export default SideBar;