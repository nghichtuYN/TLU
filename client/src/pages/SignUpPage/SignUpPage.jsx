import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import logo from "../../asset/logo/Logo.png";

import FooterComponent from "../../components/FooterComponent/FooterComponent";
const SignUpPage = () => {
  return (
    <div>
      <div style={{ height: "100vh" }}>
        <MDBContainer
          fluid
          className="d-flex align-items-center justify-content-center bg-image"
          style={{
            backgroundImage:
              "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
            height: "100vh",
          }}
        >
          <div className="mask gradient-custom-3"></div>
          <MDBCard className="m-5" style={{ width: "800px" }}>
            <MDBCardBody className="px-5">
              <div className="d-flex align-items-center gap-5">
                <img
                  src={logo}
                  alt=""
                  style={{ width: "80px", height: "80px", float: "left", marginBottom:'10px' }}
                ></img>
                <div className= "d-flex align-items-center justify-content-center gap-5 w-100 mx-5">
                  <h2 className="text-uppercase text-center ">
                    Tạo tài khoản
                  </h2>
                </div>
              </div>
              <MDBInput
                wrapperClass="mb-4"
                label="Your Name"
                size="lg"
                id="form1"
                type="text"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Your Email"
                size="lg"
                id="form2"
                type="email"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                size="lg"
                id="form3"
                type="password"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Repeat your password"
                size="lg"
                id="form4"
                type="password"
              />
              <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg">
                Register
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    </div>
  );
};

export default SignUpPage;
