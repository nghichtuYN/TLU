import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetaislBook } from "../../services/BookService";
import { Col, Container, Row } from "react-bootstrap";
import "./style.css"
const BookDetailPage = () => {
  const { id } = useParams();
  const [bookDetail, setBookDetail] = useState([]);
  const getDetailBooks = async (id) => {
    const res = await getDetaislBook(id);
    setBookDetail(res.data);
  };
  const navigate=useNavigate()
  useEffect(() => {
    getDetailBooks(id);
  }, [id]);
  return (
    <div style={{ paddingTop: "30px", backgroundColor: "bisque",padding:'20px 10px' }}>
      <div className="d-flex justify-content-start align-items-center">
        <h5 onClick={()=>{navigate('/home-page')}}>Trang chủ </h5>
        <h4>{"/"}</h4>
        <h5>Thông tin sách</h5>
      </div>
      <Container style={{ minHeight: "90vh", marginTop: "10px" }}>
        <Row>
          <Col
            className="d-flex justify-content-start align-items-center"
            md={4}
          >
            <img
              src={`http://localhost:3001/uploads/${bookDetail.bookImage}`}
              alt=""
              style={{ width: "400px", height: "500px" }}
            ></img>
          </Col>
          <Col md={8}>
            <h1>{bookDetail.bookName}</h1>
            <div style={{ fontSize: "20px", marginTop: "20px" }}>
              <p>Tác giả: {bookDetail?.authorName}</p>
              <p>Danh mục: {bookDetail?.categoryName}</p>
              <p>
                Trạng thái:{" "}
                {bookDetail?.isBorrowed === bookDetail?.quantity
                  ? "hết sách "
                  : "Còn sách"}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookDetailPage;
