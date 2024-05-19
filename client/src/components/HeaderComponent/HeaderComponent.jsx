import React from "react";
import logo from "../../asset/logo/Logo.png";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiLogin } from "react-icons/ci";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { searchBook } from "../../redux/Slice/BookSlice";
const HeaderComponent = (props) => {
  const { isShowLogin, searchValue, setSearchValue } = props;
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/sign-in");
  };
  const dispatch = useDispatch();
  const placeHolderBookName = "Tìm kiếm sách";
  const member = useSelector((state) => state.member);
  const onChange = (e) => {
    setSearchValue(e.target.value);
    dispatch(searchBook(e.target.value));
  };
  return (
    <Container
      style={{
        height: "90px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#C9BDBD",
        borderRadius: "3px",
      }}
    >
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          width: "100%",
        }}
      >
        <Col className="col-lg-2 col-md-2 col-xxl-1 d-flex justify-content-end  ">
          <Image
            src={logo}
            style={{
              width: "80%",
              height: "80px",
              cursor: "pointer",
              objectFit: "contain",
            }}
            onClick={() => {
              navigate("/home-page");
            }}
          />
        </Col>
        <Col
          className="col-lg-2 col-md-2 col-xxl-2 d-flex justify-content-start"
          style={{ marginRight: "30px", textAlign: "center" }}
        >
          {!isShowLogin ? (
            <span
              style={{
                textAlign: "center",
                wordWrap: "break-word",
              }}
              className="fw-bold fs-sm-6 fs-md-4 fs-lg-3 fs-xl-2 "
            >
              Library Management System
            </span>
          ) : (
            <span
              style={{
                fontSize: "100%",
                textAlign: "center",
                wordWrap: "break-word",
              }}
              className="fw-bold fs-sm-1 fs-md-4 fs-lg-3 fs-xl-2 fs-lg-6 fs-xxl-6 "
            >
              Thăng Long Library
            </span>
          )}
        </Col>

        <Col className="col-lg-7 col-md-7 col-xxl-8 col-xl-8  d-flex justify-content-end align-items-center ">
          {!isShowLogin ? (
            <div
              style={{
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {member?.fullName ? (
                <div className="d-flex justify-content-center align-items-center">
                  <div className="d-flex justify-content-center align-items-center" >
                    <MdOutlineAccountCircle
                      style={{ fontSize: "3rem", marginRight: "10px" }}
                    />
                  </div>
                  <div style={{ marginTop: "20px" }} className="flex-columns pb-4" onClick={()=>{
                    navigate("/detail-user")}}>
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
          {isShowLogin ? (
            <SearchComponent
              value={searchValue}
              onChange={onChange}
              placeholder={placeHolderBookName}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderComponent;
