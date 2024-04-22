import React from "react";
import { Card, Container, Row } from "react-bootstrap";
import book from "../../asset/images/book.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const bookList = useSelector((state) => state.book);
  const navigate = useNavigate();
  const page=1;
  const limit=5;
  const totalBook =bookList.totalBook
  return (
    <Container className="pt-5">
      <Row className="d-flex justyfid-flex justify-content-start align-items-center mt-2 gap-5 ms-1">
        <Card
          className="col-3"
          style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
          // onClick={()=>handleNavigate(props.id
        >
          <Card.Img
            className="mt-1"
            variant="top"
            src={book}
            style={{ width: "100%", height: "150px" }}
            alt=""
          />
          <Card.Body  className="text-center">
            <Card.Title>8</Card.Title>
            <Card.Title>Danh sách sách</Card.Title>
          </Card.Body>
        </Card>
        <Card
          className="col-3"
          style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
          onClick={()=>navigate(`/manage-book?pages=${page}&limits=${limit}`)}
        >
          <Card.Img
            className="mt-1"
            variant="top"
            src={book}
            style={{ width: "100%", height: "150px" }}
            alt=""
          />
          <Card.Body  className="text-center">
            <Card.Title>{totalBook}</Card.Title>
            <Card.Title>Danh sách sách</Card.Title>
          </Card.Body>
        </Card>
        <Card
          className="col-3"
          style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
          // onClick={()=>handleNavigate(props.id
        >
          <Card.Img
            className="mt-1"
            variant="top"
            src={book}
            style={{ width: "100%", height: "150px" }}
            alt=""
          />
          <Card.Body  className="text-center">
            <Card.Title>8</Card.Title>
            <Card.Title>Danh sách sách</Card.Title>
          </Card.Body>
        </Card>

      </Row>
      <Row className="d-flex justyfid-flex justify-content-start align-items-center mt-5 gap-5 ms-1">
     
        <Card
          className="col-3"
          style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
          // onClick={()=>handleNavigate(props.id
        >
          <Card.Img
            className="mt-1"
            variant="top"
            src={book}
            style={{ width: "100%", height: "150px" }}
            alt=""
          />
          <Card.Body  className="text-center">
            <Card.Title>8</Card.Title>
            <Card.Title>Danh sách sách</Card.Title>
          </Card.Body>
        </Card>
        <Card
          className="col-3"
          style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
          // onClick={()=>handleNavigate(props.id
        >
          <Card.Img
            className="mt-1"
            variant="top"
            src={book}
            style={{ width: "100%", height: "150px" }}
            alt=""
          />
          <Card.Body  className="text-center">
            <Card.Title>8</Card.Title>
            <Card.Title>Danh sách sách</Card.Title>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default HomePage;
