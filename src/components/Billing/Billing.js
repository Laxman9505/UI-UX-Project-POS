/** @format */

import { DeleteOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Billing({}) {
  const dispatch = useDispatch();
  const [itemsSubTotal, setItemsSubTotal] = useState(0);
  const [orderDescription, setOrderDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNameError, setCustomerNameError] = useState("");
  const [customerAddressError, setCustomerAddressError] = useState("");
  const { cartProducts } = useSelector((state) => state.cartReducer);
  const { placeOrderLoading, isPlaceOrderSuccess } = useSelector(
    (state) => state.ordersReducer
  );

  useEffect(() => {
    const totalPrice = cartProducts.reduce((accumulator, item) => {
      return accumulator + item.Quantity * item.UnitPrice;
    }, 0);
    setItemsSubTotal(totalPrice);
  }, [cartProducts]);

  const placeOrderHandler = () => {
    if (!customerName) {
      setCustomerNameError("Please enter customer name");
    }
    if (!customerAddress) {
      setCustomerAddressError("Please enter customer address");
    }
    if (!customerAddress || !customerAddress) {
      return;
    }
    dispatch({
      type: "PLACE_ORDER_REQUEST",
      payload: {
        CustomerName: customerName,
        CustomerAddress: customerAddress,
        OrderDescription: orderDescription,
        ProductList: cartProducts?.map((item, index) => {
          return {
            Id: item._id,
            ProductName: item.ItemName,
            ProductImage: item.ItemImage,
            ProductQuantity: item.Quantity.toString(),
            ProductPrice: item.UnitPrice.toString(),
          };
        }),
        TotalAmount: itemsSubTotal.toString(),
      },
    });
  };

  useEffect(() => {
    if (isPlaceOrderSuccess) {
      dispatch({
        type: "CLEAR_CART",
      });
      setCustomerAddress("");
      setCustomerName("");
      setOrderDescription("");
      setCustomerAddressError("");
      setCustomerNameError("");
    }
  }, [isPlaceOrderSuccess]);

  return (
    <>
      <div className="col-md-4 col-xxl-4 ">
        <div className="card">
          <div className="card-body">
            <div className="mybtn mb-3 postop">
              <div className="row">
                <div className="col-md-12 mt-2">
                  <input
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                    }}
                    placeholder="Customer Name"
                    className="form-control textbox"
                    style={{ height: "44px" }}
                  />
                </div>
                {customerNameError && (
                  <span style={{ color: "red" }}>{customerNameError}</span>
                )}
                <div className="col-md-12 mt-2">
                  <input
                    value={customerAddress}
                    onChange={(e) => {
                      setCustomerAddress(e.target.value);
                    }}
                    placeholder="Customer Address"
                    className="form-control textbox"
                    style={{ height: "44px" }}
                  />
                </div>
                {customerAddressError && (
                  <span style={{ color: "red" }}>{customerAddressError}</span>
                )}
              </div>
            </div>

            {/* <div className="textbox">
              <textarea
                className="form-control"
                value={orderDescription ? orderDescription : ""}
                onChange={(e) => setOrderDescription(e.target.value)}
                id="exampleFormControlTextarea1"
                rows={1}
                placeholder="Order Description"
              />
            </div> */}

            <div className="d-flex align-items-center justify-content-between mt-3">
              <h6
                className="offcanvas-title fw-bold"
                id="placeorderCanvasLabel"
                style={{ fontWeight: "bolder" }}
              >
                Items in your Cart
              </h6>
            </div>
            <div className="">
              <div className="details_inner">
                {cartProducts &&
                  cartProducts?.map((product, i) => {
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
                                    src={`http://localhost:8000/uploads/${product?.ItemImage}`}
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
                                    {product.ItemName}
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
                                        {product.Quantity}
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
                                    {product.UnitPrice}
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
                {itemsSubTotal}
              </span>
            </div>
            <div className="row mt-2 g-1">
              <div className="col-md-12">
                <Button
                  className="w-100"
                  loading={placeOrderLoading}
                  data-bs-toggle="offcanvas"
                  href=""
                  role="button"
                  style={{
                    background: "#1b9aa5",
                    color: "white",
                    borderRadius: "5px",
                    height: "40px",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    borderColor: "#1b9aa5",
                  }}
                  disabled={cartProducts?.length == 0}
                  onClick={() => {
                    placeOrderHandler();
                  }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Billing);
