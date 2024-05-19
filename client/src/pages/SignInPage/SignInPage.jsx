import React, { useState } from "react";
import { message } from "antd";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.css";
import logo from "../../asset/logo/Logo.png";
import banner from "../../asset/images/banner.jpg";
import { getDetailsUser, signInMember } from "../../services/AdminService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateMember } from "../../redux/Slice/MemberSlice";
import { Button } from "react-bootstrap";
const SignInPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassWord] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShowPasswrond = () => {
    setShowPassWord(!showPassword);
  };
  const mutation = useMutation({
    mutationFn: (data) => {
      return signInMember(data);
    },
    onSuccess: (res) => {
      if (res.status === "OK" && res.message === "LOGIN SUCCESS") {
        message.success("Đăng nhập thành công");
        navigate("/home");
        localStorage.setItem("access_token", JSON.stringify(res?.access_token));
        if (res?.access_token) {
          const decoded = jwtDecode(res?.access_token);
          console.log("decoded", decoded);
          console.log("decode", res?.access_token);

          if (decoded?.id) {
            handleGetDetailUser(decoded?.id, res?.access_token);
          }
        }
      } else {
        message.error(`${res.message}`);
      }
    },
  });

  const handleGetDetailUser = async (id, token) => {
    const res = await getDetailsUser(id, token);
    dispatch(updateMember({ ...res?.data, access_token: token }));
  };
  const handleLogin = (event) => {
    event.preventDefault();
    mutation.mutate({ userName, password });
  };
  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src={logo} style={{ width: "160px" }} alt="logo" />
              <h4 className="mt-3 mb-5 pb-1">
                Quản lý thư viện Đại học Thăng Long
              </h4>
            </div>
            <p>Vui lòng nhập thông tin đăng nhập !</p>
            <MDBInput
              wrapperClass="mb-4"
              label="Tài khoản"
              id="form1"
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <div className="position-relative">
              <MDBInput
                wrapperClass="mb-4"
                label="Mật khẩu"
                id="form2"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              {password ? (
                <span
                  onClick={handleShowPasswrond}
                  className="password-toggle-icon"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              ) : null}
            </div>
            <div className="text-center pt-1 mb-5 pb-1">
              <Button
                className="mb-4 w-100 gradient-custom-2"
                onClick={handleLogin}
              >
                Đăng nhập
              </Button>
              <a className="text-muted" href="#!">
                Quên mật khẩu ?
              </a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <Button className="mx-2" variant="outline-danger">
                Danger
              </Button>
            </div>
          </div>
        </MDBCol>

        <MDBCol md="6">
          <MDBCardImage
            src={banner}
            alt="login form"
            className="rounded-start w-100 "
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignInPage;
