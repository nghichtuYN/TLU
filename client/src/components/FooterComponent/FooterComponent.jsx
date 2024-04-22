import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <Container >
      <Row>
        <Col>
          <footer
            style={{
              height: "50px",
              backgroundColor: "#333",
              color: "#fff",
              textAlign: "center",
              lineHeight: "50px",
               borderRadius: "5px"
            }}
          >
            Footer
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default FooterComponent;
