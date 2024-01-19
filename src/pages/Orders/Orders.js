/** @format */

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar";
import AllOrder from "./AllOrder/AllOrder";
import ViewOrder from "./ViewOrder";

const Orders = () => {
  const [viewOrderModal, setViewOrderModal] = useState(false);

  return (
    <div className="container-fluid page-body-wrapper">
      <Sidebar />
      <Modal
        size="xl"
        show={viewOrderModal}
        onHide={() => setViewOrderModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>View Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewOrder />
        </Modal.Body>
      </Modal>

      {/* </Spin> */}

      <div className="main-panel dashboard">
        <div className="content-wrapper">
          <div className="content">
            {/* main Breadcrumb Area */}
            <div className="row  ">
              <div className="col-md-8 grid-margin stretch-card">
                <div className="breadcrumb_top "></div>
              </div>
              <div className="col-md-4 text-end"></div>
            </div>
            {/* order tabs */}
            <div className="menu_inner myorders">
              <div className="row">
                <div className="col-md-12 col-xxl-12">
                  <div className="menu_right">
                    <div className="right_top mb-4">
                      <div className="card mt-2">
                        <div
                          className="card-body"
                          style={{ background: "#f1f7fc" }}
                        >
                          <div className="tab-content" id="v-pills-tabContent">
                            <AllOrder />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
