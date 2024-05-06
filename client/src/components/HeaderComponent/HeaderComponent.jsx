import React from "react";
import logo from "../../asset/logo/Logo.png";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiLogin } from "react-icons/ci";
const HeaderComponent = (props) => {
  const { isShowLogin } = props;
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/sign-in");
  };
  const member = useSelector((state) => state.member);
  return (
    <Container
      style={{
        height: "90px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C9BDBD",
        borderRadius: "3px",
      }}
    >
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Col className="col-1 d-flex justify-content-end">
          <Image
            src={logo}
            style={{
              width: "70px",
              height: "100px",
              paddingBottom: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          />
        </Col>
        <Col
          className="col-2"
          style={{ marginRight: "30px", textAlign: "center" }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
              wordWrap: "break-word",
            }}
            className="fw-bold fs-sm-6 fs-md-4 fs-lg-3 fs-xl-2 "
          >
            Library Management System
          </span>
        </Col>

        <Col className="col-8 d-flex justify-content-end align-items-center">
          {!isShowLogin ? (
            <div
              style={{
                fontSize: "1.5rem",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {member?.fullName ? (
                <div className="d-flex justify-content-center align-items-center">
                  <MdOutlineAccountCircle
                    style={{ fontSize: "3rem", marginRight: "10px" }}
                  />
                  <div style={{ marginTop: "20px" }} className="text-start">
                    <span>{member?.fullName}</span>
                    <br />
                    {member?.isAdmin ? (
                      <span style={{ fontSize: "15px", marginTop: "0" }}>
                        Admin
                      </span>
                    ) : (
                      <span style={{ fontSize: "15px", marginTop: "0" }}>
                        Thủ thư
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div onClick={(e) => handleLogin(e)}>
                  <span style={{ fontSize: "1.5rem", cursor: "pointer" }}>
                    Đăng nhập
                  </span>
                  <CiLogin style={{ fontSize: "3rem", marginRight: "10px" }} />
                </div>
              )}
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderComponent;
