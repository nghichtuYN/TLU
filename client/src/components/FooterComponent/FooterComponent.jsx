import { MDBFooter } from "mdb-react-ui-kit";
import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <Container>
      <Row>
        <Col>
          <MDBFooter bgColor="light" className="text-center text-lg-left">
            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a className="text-dark" href="https://www.facebook.com/nghichtuyn">
                Nhóm 9 Công nghệ phần mềm TLU
              </a>
            </div>
          </MDBFooter>
        </Col>
      </Row>
    </Container>
  );
};

export default FooterComponent;
