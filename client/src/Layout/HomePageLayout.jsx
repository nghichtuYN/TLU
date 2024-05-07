import React from "react";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import { Container, Row } from "react-bootstrap";

const HomePageLayout = ({ children }) => {
  return (
    <div>
      <HeaderComponent isShowLogin={true} />
      <Container style={{ marginTop: "20px", minHeight: "100vh" ,paddingTop:'20px'}} >
      <hr style={{border:'4px solid',padding: "0 120px"}}/>
          {children}
      </Container>

      <FooterComponent />
    </div>
  );
};

export default HomePageLayout;
