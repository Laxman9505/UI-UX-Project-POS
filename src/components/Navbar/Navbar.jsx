/** @format */

import { LogoutOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

function Navbar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.authenticationReducer);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [window.location.pathname]);

  return (
    <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <Drawer
        width={240}
        style={{ paddingBottom: "4rem" }}
        footerStyle={{ paddingBottom: "4rem" }}
        closeIcon={<></>}
        headerStyle={{ background: "#00205A", color: "white" }}
        title={
          <a
            className="navbar-brand brand-logo"
            // onClick={() => handleNavigation("/")}
          >
            <img
              style={{ width: "60%" }}
              src={"/assets/images/splash.png"}
              alt="logo"
            />
          </a>
        }
        closable={true}
        placement={"left"}
        onClose={() => {
          setIsSidebarOpen(false);
        }}
        open={isSidebarOpen}
        key={"left"}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </Drawer>

      <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
        <a
          className="navbar-brand brand-logo"
          // onClick={() => handleNavigation("/")}
        >
          <img src={"/assets/images/splash.png"} alt="logo" />
        </a>
      </div>

      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        {<div />}

        <div className="d-flex gap-4">
          <div>
            <img
              className="img-xs rounded-circle"
              src={
                userDetails?.image
                  ? `http://localhost:8000/uploads/${userDetails?.image}`
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="Profile image"
            />
            <span className="ms-2" style={{ fontSize: "13px" }}>
              {userDetails?.name}
            </span>
          </div>
          <div
            className="f-flex align-items-center"
            onClick={() => {
              dispatch({
                type: "LOGOUT",
              });
            }}
            style={{ cursor: "pointer" }}
          >
            <LogoutOutlined style={{ color: "Red", marginBottom: "4px" }} />
            <span className="ms-2" style={{ fontSize: "13px", color: "red" }}>
              Logout
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
