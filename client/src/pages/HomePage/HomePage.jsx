import React, { useEffect } from "react";
import { Card, Container, Row } from "react-bootstrap";
import bookImg from "../../asset/images/book.png";
import user from "../../asset/images/user.png";
import returnbook from '../../asset/images/return.png'; 
import authorImg from "../../asset/images/editor.png"
import categoryImg from "../../asset/images/options.png"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const book = useSelector((state) => state.book);
  const author = useSelector((state) => state.author);
  const category = useSelector((state) => state.category  );
  const student = useSelector((state) => state.student  );
  const navigate = useNavigate();
  const page=1;
  const limit=5;
  const borrowedBooks=book?.book?.data.filter((book) => book.isBorrowed === true)
  useEffect(()=>{},[book,author,category,student])
  return (
    <Container className="pt-5">
      <Row className="d-flex justyfid-flex justify-content-start align-items-center mt-2 gap-5 ms-1">
        <Card
          className="col-3"
          style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
          onClick={()=>navigate(`/manage-order?pages=${page}&limits=${limit}`)}

        >
          <Card.Img
            className="mt-1"
            variant="top"
            src={returnbook}
            style={{ width: "100%", height: "150px" }}
            alt=""
          />
          <Card.Body  className="text-center">
            <Card.Title>{borrowedBooks.length}</Card.Title>
            <Card.Title>Sách chưa trả</Card.Title>
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
            src={bookImg}
            style={{ width: "100%", height: "150px" }}
            alt=""
          />
          <Card.Body  className="text-center">
            <Card.Title>{book.book.total}</Card.Title>
            <Card.Title>Danh sách sách</Card.Title>
          </Card.Body>
        </Card>
        <Card
          className="col-3"
          style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}

        >
          <Card.Img
            className="mt-1"
            variant="top"
            src={user}
            style={{ width: "100%", height: "150px" }}
            alt=""
          />
          <Card.Body  className="text-center">
            <Card.Title>{student.student.total}</Card.Title>
            <Card.Title>Độc giả</Card.Title>
          </Card.Body>
        </Card>

      </Row>
      <Row className="d-flex justyfid-flex justify-content-start align-items-center mt-5 gap-5 ms-1">
     
        <Card
          className="col-3"
          style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
          onClick={()=>navigate(`/manage-author?pages=${page}&limits=${limit}`)}
        >
          <Card.Img
            className="mt-1"
            variant="top"
            src={authorImg}
            style={{ width: "100%", height: "150px" }}
            alt=""
          />
          <Card.Body  className="text-center">
            <Card.Title>{author.author.total}</Card.Title>
            <Card.Title>Danh sách tác giả</Card.Title>
          </Card.Body>
        </Card>
        <Card
          className="col-3"
          style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
          onClick={()=>navigate(`/manage-category?pages=${page}&limits=${limit}`)}
        >
          <Card.Img
            className="mt-1"
            variant="top"
            src={categoryImg}
            style={{ width: "100%", height: "150px" }}
            alt=""
          />
          <Card.Body  className="text-center">
            <Card.Title>{category.category.total}</Card.Title>
            <Card.Title>Danh sách danh mục</Card.Title>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default HomePage;
