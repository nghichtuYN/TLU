import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import bookImg from "../../asset/images/book.png";
import user from "../../asset/images/user.png";
import returnbook from "../../asset/images/return.png";
import authorImg from "../../asset/images/editor.png";
import categoryImg from "../../asset/images/options.png";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../services/StudentService";
import { getAllBooks } from "../../services/BookService";
import { getAllCategories } from "../../services/CategoryService";
import { getAllAuthor } from "../../services/AuthorService";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
const HomePage = () => {
  const [book, setBook] = useState([]);
  const [author, setAuthor] = useState([]);
  const [category, setCategory] = useState([]);
  const [student, setStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const page = 1;
  const limit = 5;
  const getAllStudent = async () => {
    const res = await getAllStudents();
    setStudent(res.data);
  };
  const getAllBook = async () => {
    const res = await getAllBooks();
    console.log(res.data);
    setBook(res.data);
  };
  const getAllCategory = async () => {
    const res = await getAllCategories();
    setCategory(res.data);
  };
  const getAllAuthors = async () => {
    const res = await getAllAuthor();
    setAuthor(res.data);
  };
  const fetchData = () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        await getAllBook();
        await getAllAuthors();
        await getAllCategory();
        await getAllStudent();
        console.log("Data fetched successfully");
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const borrowedBooks = book?.data
    ? book?.data.filter((book) => book.isBorrowed === true)
    : [];
  return (
    <div className="pt-4">
      <h1 style={{ fontFamily: "inherit", fontSize: "24px", margin: "10px" }}>
        Trang chủ
      </h1>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <Container className="pt-5">
          <Row className="d-flex justyfid-flex justify-content-start align-items-center mt-2 gap-5 ms-1">
            <Card
              className="col-3"
              style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
              onClick={() =>
                navigate(`/manage-order?pages=${page}&limits=${limit}`)
              }
            >
              <Card.Img
                className="mt-1"
                variant="top"
                src={returnbook}
                style={{ width: "100%", height: "150px" }}
                alt=""
              />
              <Card.Body className="text-center">
                <Card.Title>{borrowedBooks.length}</Card.Title>
                <Card.Title>Sách chưa trả</Card.Title>
              </Card.Body>
            </Card>
            <Card
              className="col-3"
              style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
              onClick={() =>
                navigate(`/manage-book?pages=${page}&limits=${limit}`)
              }
            >
              <Card.Img
                className="mt-1"
                variant="top"
                src={bookImg}
                style={{ width: "100%", height: "150px" }}
                alt=""
              />
              <Card.Body className="text-center">
                <Card.Title>{book?.total}</Card.Title>
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
              <Card.Body className="text-center">
                <Card.Title>{student?.total}</Card.Title>
                <Card.Title>Độc giả</Card.Title>
              </Card.Body>
            </Card>
          </Row>
          <Row className="d-flex justyfid-flex justify-content-start align-items-center mt-5 gap-5 ms-1">
            <Card
              className="col-3"
              style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
              onClick={() =>
                navigate(`/manage-author?pages=${page}&limits=${limit}`)
              }
            >
              <Card.Img
                className="mt-1"
                variant="top"
                src={authorImg}
                style={{ width: "100%", height: "150px" }}
                alt=""
              />
              <Card.Body className="text-center">
                <Card.Title>{author?.total}</Card.Title>
                <Card.Title>Danh sách tác giả</Card.Title>
              </Card.Body>
            </Card>
            <Card
              className="col-3"
              style={{ width: "16rem", cursor: "pointer", marginLeft: "50px" }}
              onClick={() =>
                navigate(`/manage-category?pages=${page}&limits=${limit}`)
              }
            >
              <Card.Img
                className="mt-1"
                variant="top"
                src={categoryImg}
                style={{ width: "100%", height: "150px" }}
                alt=""
              />
              <Card.Body className="text-center">
                <Card.Title>{category?.total}</Card.Title>
                <Card.Title>Danh sách danh mục</Card.Title>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default HomePage;
