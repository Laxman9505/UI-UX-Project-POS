/** @format */

import React from "react";

const PaymentReceipt = ({ activeOrder }) => {
  return (
    <div className="eodfinal" style={{ margin: "0 12px" }}>
      <div className="reciept-wrapper">
        <div className="reciept-container rounded d-flex flex-column p-3 mt-3">
          <div className="text-center topeod">
            <p className="">
              <small>
                <span
                  className="fw-bold"
                  style={{ fontSize: "20px", marginBottom: "10px" }}
                >
                  Demo POS
                </span>
                <br />
                Baneshwor, Kathmandu
              </small>
            </p>
          </div>
          <div style={{ fontSize: "12px", marginTop: "-1rem" }}>
            <br />
            Order No: {activeOrder._id} <br />
            <br />
            Customer: {activeOrder.CustomerName}
            <br />
            Customer Address: {activeOrder.CustomerAddress}
            <br />
            Order Date: {activeOrder.OrderDate} <br />
          </div>
          <div
            className="d-flex justify-content-between mt-2 "
            style={{
              borderTop: "1px dotted black",
            }}
          >
            <div className="col-7  fw-bold">Product Name</div>
            <div className=" fw-bold">Qty</div>
            <div className=" fw-bold">Price</div>
          </div>
          <div
            style={{
              borderBottom: "1px dotted black",
            }}
          >
            {activeOrder.ProductList?.map((product, i) => {
              return (
                <div key={i}>
                  <div className="d-flex justify-content-between">
                    <small className="col-7 ">{product.ProductName}</small>
                    <small className="">{product.ProductQuantity}</small>
                    <small className="">
                      Rs
                      {product.ProductPrice}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div className=" me-3"><h6 className="mb-0 fw-bold  mt-3">Final Report</h6></div> */}

          <div className="">
            <div className="d-flex">
              <div className="col-7  fw-bold">Discount Amount</div>
              <div className="">{"Rs"} 0</div>
            </div>

            <div className="d-flex">
              <div className="col-7  fw-bold">Total Amount</div>
              <div className="">
                {"Rs"}
                {activeOrder.TotalAmount}
              </div>
            </div>
          </div>
          <section className="">
            <p
              style={{
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              Thank you for your visit!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
