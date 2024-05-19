import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDetaislBook } from "../../services/BookService";
import { Col, Container, Row } from "react-bootstrap";
import { SiComposer } from "react-icons/si";
import { BiSolidCategory } from "react-icons/bi";
import { FaBook } from "react-icons/fa";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import { GrStatusGoodSmall } from "react-icons/gr";
import { MdAttachMoney } from "react-icons/md";
import "./style.css";
import { useDispatch } from "react-redux";
import { resetSearchBook } from "../../redux/Slice/BookSlice";
const BookDetailPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [bookDetail, setBookDetail] = useState([]);
  const dispatch = useDispatch();

  const getDetailBooks = (id) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const res = await getDetaislBook(id);
        setBookDetail(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }, 500);
  };
  const location = useLocation();
  const { categoryName, catId, page, limit } = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    getDetailBooks(id);
  }, [id]);
  return (
    <>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <div>
          <hr
            style={{
              border: "2px solid",
              color: "black",
            }}
          />
          <div
            style={{
              paddingTop: "30px",
              backgroundColor: "white",
              padding: "20px 10px",
            }}
          >
            <div className="d-flex justify-content-start align-items-center">
              <h5
                onClick={() => {
                  navigate("/home-page");
                }}
              >
                Trang chủ
              </h5>
              <h4 style={{ color: "#A0A0A0" }}>{">"}</h4>
              <h5
                onClick={() => {
                  dispatch(resetSearchBook());
                  navigate(
                    `/category/?pages=${page}&limits=${limit}&cat=${catId}`,
                    {
                      state: { categoryName: categoryName },
                    }
                  );
                }}
              >
                {categoryName}
              </h5>
              <h4 style={{ color: "#A0A0A0" }}>{">"}</h4>
              <h5>Thông tin chi tiết</h5>
            </div>

            <Container style={{ minHeight: "90vh", marginTop: "10px" }}>
              <Row>
                <Col
                  className="flex-columns justify-content-start align-items-center"
                  md={4}
                >
                  <img
                    src={`http://localhost:3001/uploads/${bookDetail.bookImage}`}
                    alt=""
                    style={{ width: "400px", height: "500px" }}
                  ></img>
                </Col>
                <Col md={8}>
                  <div className="d-flex justify-content-start align-items-center">
                    <FaBook
                      style={{
                        fontSize: "20px",
                        margin: "1px",
                        fontWeight: "bold",
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "inherit",
                        fontSize: "24px",
                        margin: "10px",
                      }}
                    >
                      Sách:
                    </p>
                    <h1
                      style={{
                        maxWidth: "700px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={bookDetail?.bookName}
                    >
                      {bookDetail.bookName}
                    </h1>
                  </div>
                  <div className="ps-5 pe-5">
                    <div
                      className=" d-flex justify-content-between  align-items-center"
                      style={{ fontSize: "20px", marginTop: "20px" }}
                    >
                      <div className="d-flex justify-content-start align-items-center">
                        <BiSolidCategory
                          style={{
                            fontSize: "20px",
                            margin: "1px",
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "inherit",
                            fontSize: "24px",
                            margin: "10px",
                          }}
                        >
                          Danh mục: {bookDetail?.categoryName}
                        </p>
                      </div>
                      <div className="d-flex justify-content-start align-items-center">
                        <SiComposer
                          style={{
                            fontSize: "20px",
                            margin: "1px",
                            fontWeight: "bold",
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "inherit",
                            fontSize: "24px",
                            margin: "10px",
                          }}
                        >
                          Tác giả: {bookDetail?.authorName}
                        </p>
                      </div>
                    </div>
                    <div
                      className=" d-flex justify-content-start  align-items-center"
                      style={{
                        fontSize: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <GrStatusGoodSmall
                          style={{
                            fontSize: "20px",
                            margin: "1px",
                            fontWeight: "bold",
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "inherit",
                            fontSize: "24px",
                            margin: "10px",
                          }}
                        >
                          Tình trạng:{" "}
                        </p>
                        {bookDetail?.isBorrowed === bookDetail?.quantity ? (
                          <p
                            style={{
                              fontFamily: "inherit",
                              fontSize: "24px",
                              margin: "10px",
                              color: "red",
                            }}
                          >
                            Tạm hết sách{" "}
                          </p>
                        ) : (
                          <p
                            style={{
                              fontFamily: "inherit",
                              fontSize: "24px",
                              margin: "10px",
                              color: "green",
                            }}
                          >
                            Còn sách{" "}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      className=" d-flex justify-content-start  align-items-center"
                      style={{
                        fontSize: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <MdAttachMoney
                          style={{
                            fontSize: "20px",
                            margin: "1px",
                            fontWeight: "bold",
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "inherit",
                            fontSize: "24px",
                            margin: "10px",
                          }}
                        >
                          Giá:
                        </p>
                        <h1
                          style={{
                            fontFamily: "inherit",
                            color: "orange",
                          }}
                        >
                          {bookDetail?.bookPrice} VND
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="note-section mt-5 p-3 border border-dark">
                    <h4 style={{ marginBottom: "10px" }}>Ghi chú:</h4>
                    <h5 className="ms-3">
                      -- Độc giả vui lòng đến quầy thủ thư để lấy thông tin và
                      tiến hành mượn/trả sách
                      <br />
                      -- Độc giả phải có trách nhiệm giữ gìn bảo vệ sách mượn
                      của thư viện tránh làm rách hoặc hư hỏng sách
                      <br />
                      -- Sau khi mượn sách khi đến ngày trả để tránh việc trả
                      muộn có thể bị phạt
                    </h5>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetailPage;
