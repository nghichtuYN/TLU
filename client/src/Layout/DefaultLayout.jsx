import React from "react";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import NavbarCompoent from "../components/NavbarComponent/NavbarCompoent";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import { Row, Col, Container, Image } from "react-bootstrap";
import logo from "../asset/logo/Logo.png";
const DefaultLayout = ({ children }) => {
  return (
    <div>
      {/* <Container fluid> */}
      <HeaderComponent />
      <Container style={{ marginTop: "20px", minHeight: "115vh" }}>
        <Row>
          {/* Sidebar */}
          <Col
            md={3}
            style={{
              backgroundColor: "#f0f0f0",
              minHeight: "100vh",
              paddingLeft: "30px",
              borderRadius:'10px '
            }}
          >
            <div>
              <NavbarCompoent />
            </div>
            <div className="d-flex align-items-end">
                <Image
                  src={logo}
                  style={{
                    width: "70px",
                    height: "100px",
                    paddingBottom: "20px",
                  }}
                />
              </div>
          </Col>

          {/* Main Content */}
          <Col md={8} style={{ padding: "20px", backgroundColor:'#808080',borderRadius:'15px',width:'70%',marginLeft:'20px'}}>
            <div style={{ backgroundColor: "#fff" ,minHeight: "100vh"}}>
              {children}
            </div>
          </Col>
        </Row>
      </Container>
        <FooterComponent />
      {/* </Container> */}
    </div>
  );
};

export default DefaultLayout;
