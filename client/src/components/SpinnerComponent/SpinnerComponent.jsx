import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerComponent = () => {
  return (
    <div
      className="spinner-container d-flex justify-content-center align-item-center"
      style={{ height: "100vh" }}
    >
      <Spinner className="spinner" animation="border" style={{width:'50px',height:'50px'}} />
    </div>
  );
};

export default SpinnerComponent;
