/** @format */

import {
  DeleteOutlined,
  MoneyCollectOutlined,
  QrcodeOutlined,
  ScanOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Empty, Modal, Pagination, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSkeleton from "../../../components/CardSkeleton/CardSkeleton";
import ViewOrder from "../ViewOrder";

const AllOrder = ({}) => {
  const dispatch = useDispatch();
  const { isLoading, allOrdersList } = useSelector(
    (state) => state.ordersReducer
  );
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false);
  const [isPayOrderOpen, setIsPayOrderOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState("");
  const [activePaymentMethod, setActivePaymentMethod] = useState({
    name: "Fonepay",
    id: "1",
    icon: <QrcodeOutlined style={{ fontSize: "40px" }} />,
  });
  useEffect(() => {
    dispatch({
      type: "GET_ALL_ORDERS_REQUEST",
      payload: {
        Page: 1,
        PageSize: 10,
      },
    });
  }, []);
  function onShowSizeChange(current, pageSize) {
    window.scrollTo(0, 0);
    dispatch({
      type: "GET_ALL_ORDERS_REQUEST",
      payload: {
        Page: current,
        PageSize: pageSize,
      },
    });
  }

  console.log("---active order", activeOrder);

  const paymentMethods = [
    {
      name: "Fonepay",
      id: "1",
      icon: <QrcodeOutlined style={{ fontSize: "40px" }} />,
    },
    {
      name: "Esewa",
      id: "2",
      icon: <ScanOutlined style={{ fontSize: "40px" }} />,
    },
    {
      name: "Cash",
      id: "3",
      icon: <MoneyCollectOutlined style={{ fontSize: "40px" }} />,
    },
  ];

  return (
    <>
      <Modal
        width={1000}
        open={isViewOrderOpen}
        onCancel={() => {
          setIsViewOrderOpen(false);
        }}
        footer={null}
      >
        <ViewOrder order={activeOrder} />
      </Modal>
      <Drawer
        open={isPayOrderOpen}
        title="Payment"
        width={"55vw"}
        onClose={() => setIsPayOrderOpen(false)}
      >
        <div className="row" style={{ overflow: "hidden", padding: "15px" }}>
          <div className="col-md-6">
            <p className="text-theme">Order No : {activeOrder._id}</p>
            <div className="">
              <div className="details_inner">
                {activeOrder?.ProductList &&
                  activeOrder.ProductList?.map((product, i) => {
                    return (
                      <div className="cartdetails" key={i}>
                        <div className="border-gray" style={{ margin: "2px" }}>
                          <div className="card-body">
                            <div className="card-details">
                              <div className="row d-flex">
                                <div
                                  className="col-md-3"
                                  style={{ width: "30%" }}
                                >
                                  <img
                                    src={`http://localhost:8000/uploads/${product?.ProductImage}`}
                                    alt=""
                                    className="img-fluid orderimg"
                                  />
                                </div>
                                <div className="col-md-5">
                                  <h6
                                    className="mb-0"
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {product.ProductName}
                                  </h6>

                                  <div className="col-md-2 mt-3">
                                    <div className="d-flex gap-2">
                                      <Button
                                        style={{
                                          background: "#1b9aa5",
                                          color: "white",
                                          width: "20px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <i
                                          className="fa fa-minus"
                                          onClick={() => {
                                            dispatch({
                                              type: "SUBTRACT_QUANTITY_ITEM",
                                              payload: product,
                                            });
                                          }}
                                        />
                                      </Button>
                                      <Button
                                        style={{
                                          background: "#1b9aa5",
                                          color: "white",
                                          width: "20px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        {product.ProductQuantity}
                                      </Button>
                                      {/* <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                          background: "#1b9aa5",
                                          color: "white",
                                          padding: "1px",

                                          width: "30px",
                                          borderRadius: "6px",
                                        }}
                                      >
                                        {" "}
                                      </div> */}
                                      <Button
                                        style={{
                                          background: "#1b9aa5",
                                          color: "white",
                                          width: "20px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <i
                                          className="fa fa-plus"
                                          onClick={() => {
                                            if (true) {
                                              dispatch({
                                                type: "ADD_QUANTITY_ITEM",
                                                payload: product,
                                              });
                                            } else {
                                            }
                                          }}
                                        />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-md-3 d-flex fw-bold"
                                  style={{ paddingLeft: "0" }}
                                >
                                  <p>
                                    {"Rs "}
                                    {product.ProductPrice}
                                  </p>
                                </div>
                              </div>

                              <div className="textbox d-flex align-items-center justify-content-end mt-2">
                                <input
                                  placeholder="Please , Just a bit spicy"
                                  className="form-control textbox"
                                />
                                <Tooltip title="Delete">
                                  <Button
                                    style={{
                                      background: "#FCCCD9",
                                      color: "black",
                                      borderColor: "#FCCCD9",
                                    }}
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE_ITEM_CART",
                                        payload: {
                                          index: i,
                                        },
                                      });
                                    }}
                                    className="ms-2"
                                    type="danger"
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                  />
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="total-price border-0 d-flex align-items-start justify-content-between">
              <span className="text-dark-white fw-700">Discount:</span>
              <span className="text-dark-white fw-700">
                {"Rs "}
                {0}
              </span>
            </div>
            <div className="total-price border-0 d-flex align-items-start justify-content-between">
              <span className="text-dark-white fw-700">Items subtotal:</span>
              <span className="text-dark-white fw-700">
                {"Rs "}
                {activeOrder.TotalAmount}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="btn-group btn1 paybtn place-order-pos">
              {paymentMethods?.map((paymentMethod) => {
                return (
                  <a
                    key={paymentMethod.id}
                    onClick={() => {
                      setActivePaymentMethod(paymentMethod);
                    }}
                    className={`d-flex flex-column btn btn-primary all_btn ${
                      paymentMethod.id == activePaymentMethod.id
                        ? "active"
                        : "btn_red"
                    } rounded-3`}
                    aria-current="page"
                  >
                    {paymentMethod.icon}
                    <span>{paymentMethod.name}</span>
                  </a>
                );
              })}
            </div>
            <div className="card bg-theme mt-3 ">
              <div className="card-body">
                <h6 className="text-white">{activePaymentMethod?.name} </h6>

                <div className="col-md-12">
                  <div className="form-group">
                    <label className="control-label text-white">
                      Paid Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={activeOrder.TotalAmount}
                      placeholder="eg.$10"
                      spellCheck="false"
                      data-ms-editor="true"
                    />
                  </div>
                </div>

                <div className="row d-flex align-items-center">
                  <div className="col-md-12">
                    <div className="d-flex align-items-center justify-content-between fw-bold">
                      <label className="control-label text-white">
                        Total Payable Amount
                      </label>
                      <label className="control-label text-white">
                        {"Rs" + activeOrder.TotalAmount}
                      </label>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="d-flex align-items-center justify-content-center mt-3 gap-3">
                      <Button
                        style={{
                          background: "#FFDF54",
                          color: "black",
                          borderColor: "#FFDF54",
                        }}
                        loading={isLoading}
                        className=" w-50 "
                        type="danger"
                        onClick={() => {}}
                      >
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap align-items-center">
            <div className="d-flex align-items-end flex-wrap"></div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div className="orderfilter">
          <div className="row  d-flex justify-content-flex-start">
            {allOrdersList ? (
              allOrdersList?.items?.map((item) => (
                <div
                  className="col-md-4 col-xxl-4 pb-3 grid-margin stretch-card"
                  key={item._id}
                >
                  <div className="card h-100  border-0">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between tablecard_img">
                        <div className="row justify-content-between">
                          <div className="d-flex align-items-center col-md-12">
                            <label className="text-danger text-center d-flex align-items-center justify-content-center fw-bold">
                              {item.CustomerName}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="template-demo">
                        <table className="table mb-0 ">
                          <tbody>
                            <tr>
                              <td
                                style={{ fontWeight: "200" }}
                                className="pe-0 text-start fw-bold"
                                colSpan={2}
                              >
                                {item.OrderId}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="ps-0"
                                style={{ fontWeight: "200" }}
                              >
                                Customer Address
                              </td>
                              <td
                                className="pe-0 text-end"
                                style={{ fontWeight: "700" }}
                              >
                                {item.CustomerAddress}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="ps-0"
                                style={{ fontWeight: "200" }}
                              >
                                Order Date
                              </td>
                              <td className="pe-0 text-end">
                                {item.OrderDate}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="ps-0"
                                style={{ fontWeight: "200" }}
                              >
                                Order Status
                              </td>
                              <td className="pe-0 text-end">
                                <span className="badge bg-success">
                                  {item.OrderStatus}
                                </span>
                              </td>
                            </tr>

                            <tr className="border-dashed bordercolor">
                              <td className="ps-0">Total</td>
                              <td className="pe-0 text-end">
                                {"Rs"} {item.TotalAmount}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="mybtn d-flex">
                          <Button
                            style={{ background: "#E1045F", color: "#fff" }}
                            className="btn text-white btn-smborder-0 w-100 me-2"
                            onClick={() => {
                              setActiveOrder(item);
                              setIsViewOrderOpen(true);
                            }}
                          >
                            View Order
                          </Button>
                          <Button
                            style={{ background: "#1A9AA5", color: "#fff" }}
                            className="btn text-white btn-sm border-0 w-100 me-2"
                            onClick={() => {
                              setActiveOrder(item);
                              setIsPayOrderOpen(true);
                            }}
                          >
                            Pay Order
                          </Button>
                          <Button
                            style={{ background: "#E10404", color: "#fff" }}
                            className="btn text-white btn-sm  border-0 w-100 me-2"
                            onClick={() => {
                              setActiveOrder(item);
                              setIsViewOrderOpen(true);
                            }}
                          >
                            Reject Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Empty description="No Orders Found !" />
            )}
          </div>
          <div className="company_footer d-flex justify-content-end mt-3">
            {allOrdersList?.totalItems > 0 && (
              <Pagination
                pageSize={8}
                total={allOrdersList?.totalItems}
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                showTotal={(total) => (
                  <span className="fw-bold"> Total {total} items</span>
                )}
                // pageSize={100}
                // defaultCurrent={1}
                onChange={onShowSizeChange}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrder;
