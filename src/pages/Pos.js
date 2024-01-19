/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Billing from "../components/Billing/Billing";
import POSMenu from "../components/POSMenu/POSMenu";
import Sidebar from "../components/Sidebar/Sidebar";

function Pos() {
  return (
    <>
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel dashboard">
          <div className="content-wrapper">
            <div className="content">
              <div className="row  d-flex justify-content-center">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="breadcrumb_top">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb breadcrumb-custom">
                        <Link to="/" className="breadcrumb-item fw-bold">
                          Home
                        </Link>
                        <li className="breadcrumb-item fw-bold">
                          <span> Menu </span>
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>

              <div className="menu_inner">
                <div className="row">
                  <POSMenu />

                  <Billing />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <></>
    </>
  );
}

export default Pos;
