/** @format */

import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Register({ setShowRegisterModal }) {
  const {
    sendOTPLoading,

    isSendOTPSuccess,

    registerError,

    isResendOTPSuccess,

    isOperationSuccessful,
    registerUserLoading,
    registerationError,
  } = useSelector((state) => state.authenticationReducer);
  const dispatch = useDispatch();

  const [otpForm] = Form.useForm();
  const [RegisterForm] = Form.useForm();
  const [otp, setOTP] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();

  const onRegisterFormSubmit = (values) => {
    const formData = new FormData();
    const request = {
      OTP: values.verificationCode,
      FullName: values.fullName,
      Password: values.password,
      Email: otpForm.getFieldValue("Email"),
      ConfirmPassword: values.confirmPassword,
      PhoneNumber: values.phone,
    };
    formData.append("Request", JSON.stringify(request));

    if (image) {
      formData.append("image", image);
    }
    dispatch({
      type: "REGISTER_USER_REQUEST",
      payload: formData,
    });
  };
  const onOTPFormSubmit = (values) => {
    dispatch({
      type: "SEND_OTP_REQUEST",
      payload: {
        Email: values.Email,
      },
    });
  };

  useEffect(() => {
    if (isOperationSuccessful) {
      RegisterForm.resetFields();
    }
  }, [isOperationSuccessful]);

  return (
    <>
      <div
        className="container-scroller h100 loginPage"
        style={{ background: "#fff" }}
      >
        {/* partial */}
        <div className="container pt-4 categoryField">
          <section className="">
            <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
              <div className="col-12 col-md-8  ">
                <div className="card" style={{ background: "#F0F2F5" }}>
                  <div className="card-body ">
                    <div className="d-flex gap-4 row">
                      <div className="col-md-5">
                        <h5 className="fw-bold mt-4 text-center fs-5 mb-3 ">
                          Get Started With POS
                        </h5>

                        <Form
                          className="login"
                          name="form"
                          onFinish={onRegisterFormSubmit}
                          autoComplete="off"
                          initialValues={{
                            remember: true,
                          }}
                          form={RegisterForm}
                        >
                          <div className="row ">
                            <div className="  col-md-12 col-lg-12 otp-container">
                              {registerationError && (
                                <Alert variant="danger">
                                  {registerationError}
                                </Alert>
                              )}
                            </div>

                            <div className="  col-md-12 col-lg-12">
                              <Form.Item
                                label="Full Name"
                                name="fullName"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your full name!",
                                  },
                                ]}
                              >
                                <Input
                                  style={{ background: "white" }}
                                  placeholder="Enter Full Name"
                                  className="form-control"
                                />
                              </Form.Item>
                            </div>

                            <div className="  col-md-6 col-lg-12 phone-input">
                              {" "}
                              <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your phone number!",
                                  },
                                  // {
                                  //   pattern: selectedPhoneNumberRegex,
                                  //   message: "Please enter a valid phone number",
                                  // },
                                ]}
                              >
                                <Input
                                  style={{ background: "white" }}
                                  placeholder="Enter Phone"
                                />
                              </Form.Item>
                            </div>

                            <div className="  col-md-12 col-lg-12">
                              {" "}
                              <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your password!",
                                  },
                                ]}
                              >
                                <Input
                                  type="password"
                                  style={{ background: "white" }}
                                  placeholder="Enter password"
                                  className="form-control"
                                />
                              </Form.Item>
                            </div>
                            <div className=" col-md-12 col-lg-12">
                              {" "}
                              <Form.Item
                                label="Confirm Password"
                                name="confirmPassword"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input confirm password!",
                                  },
                                ]}
                              >
                                <Input
                                  type="password"
                                  style={{ background: "white" }}
                                  placeholder="Enter Confirm Password"
                                  className="form-control"
                                />
                              </Form.Item>
                            </div>

                            <div className=" mb-3  mt-3">
                              <Form.Item>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  loading={registerUserLoading}
                                  className="primary-button w-100"
                                >
                                  {" "}
                                  Create Account
                                </Button>
                              </Form.Item>
                            </div>
                          </div>
                        </Form>
                        <p className="text-center">
                          Already have an account ?{" "}
                          <Link to={"/login"} className="text-danger">
                            <span className="ms-1 fw-bold">Login</span>
                          </Link>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <img
                          className="w-100 d-none d-md-block"
                          src="assets/images/login_image.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* page-body-wrapper ends */}
      </div>
    </>
  );
}

export default Register;
