import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";
import { setUser } from "../redux/userSlice";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Apply Pharmacist",
      path: "/apply-pharmacist",
      icon: "ri-hospital-line",
    },
    {
      name: "Animal Profile",
      path: "/user/profile",
      icon: "ri-user-line",
    },
    {
      name: "Prescriptions",
      path: "/user/prescriptions",
      icon: "ri-user-line",
    }
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Create Records",
      path: "/doctor/records",
      icon: "ri-file-list-line",
    },
    {
      name: "View Records",
      path: "/doctor/view_records",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
    {
      name: "About",
      path: "/doctor/about",
      icon: "ri-user-line",
    },
    {
      name: "Help",
      path: "/doctor/help",
      icon: "ri-user-line",
    }
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/admin/appointments",
      icon: "ri-home-line",
    },
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Pharmacists",
      path: "/admin/pharmacistlist",
      icon: "ri-user-line",
    },
    
    {
      name: "Animals",
      path: "/admin/animalslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
  ];
  const pharmacistMenu = [
    {
      name: "Home",
      path: "/pharmacist/home",
      icon: "ri-home-line",
    },
    {
      name: "Dashboard",
      path: "/pharmacist/dashboard",
      icon: "ri-home-line",
    },  
    {
      name: "Inventory",
      path: "/pharmacist/inventory",
      icon: "ri-home-line",
    },
    {
      name: "Sales",
      path: "/pharmacist/sales",
      icon: "ri-user-line",
    },
    {
      name: "Receiving",
      path: "/pharmacist/receiving",
      icon: "ri-user-star-line",
    },
    {
      name: "Expired List",
      path: "/pharmacist/expired-list",
      icon: "ri-user-line",
    },
    {
      name: "Supplier List",
      path: "/pharmacist/supplier-list",
      icon: "ri-user-line",
    },
    

  ]


  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : user?.isPharmacist
    ? pharmacistMenu
    : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" :user?.isPharmacist ? "Pharmacist": "User";
  
  
  const signOutHandler=()=>{
    dispatch(setUser(null));
  }
  
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">VETCARE</h1>
            <h1 className="role">{role}</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login" onClick={signOutHandler}>Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-2" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
