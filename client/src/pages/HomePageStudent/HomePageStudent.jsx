import React, { useEffect, useState } from "react";
import { getAllBooks } from "../../services/BookService";
import { useQueryHook } from "../../Hook/useMutationHook";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import { getAllCategories } from "../../services/CategoryService";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
const HomePageStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("pages");
  const limit = searchParams.get("limits");
  const [isLoading, setIsLoading] = useState(false);
  const getAllBook = async () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await getAllBooks();
          setIsLoading(false);
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  };
  const getAllCategory = async () => {
    const res = await getAllCategories();
    return res.data;
  };
  const { data: categoryList } = useQueryHook(["categoryList"], getAllCategory);
  const { data: book, refetch } = useQueryHook(["book", page], getAllBook);
  useEffect(() => {}, [isLoading]);
  return (
    <>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <div>
          <section>
            <h2>Sách mới cập nhật</h2>
            <div className="row  d-flex justyfid-flex justify-content-start align-items-center mt-2 gap-5 ms-1">
              {book &&
                book?.data?.slice(-5).map((book) => {
                  return (
                    <Card
                      className="col-3"
                      style={{
                        width: "16rem",
                        cursor: "pointer",
                        marginLeft: "50px",
                        backgroundColor: "#A0A0A0",
                      }}
                      onClick={() => navigate(`/book-detail/${book?.id}`)}
                    >
                      <Card.Img
                        className="mt-1"
                        variant="top"
                        src={`http://localhost:3001/uploads/${book.bookImage}`}
                        style={{ width: "100%", height: "150px" }}
                        alt=""
                      />
                      <Card.Body className="text-center">
                        <Card.Title
                          style={{
                            maxWidth: "150px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={book?.bookName}
                        >
                          {book?.bookName}
                          {book?.isBorrowed === book?.quantity ? (
                            <p style={{ color: "red" }}>Đã được mượn</p>
                          ) : null}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  );
                })}
            </div>
          </section>
          {categoryList &&
            categoryList?.data.map((cat) => {
              return (
                <section className="flex-columns">
                  <hr style={{ border: "4px solid", padding: "0 120px" }} />
                  <h2>Thể loại {cat?.categoryName}</h2>
                  <div className="row  d-flex justyfid-flex justify-content-start align-items-center mt-2 gap-5 ms-1">
                    {book &&
                      book?.data
                        ?.filter((book) => book?.category_id === cat?.id)
                        .map((book) => {
                          return (
                            <Card
                              className="col-3"
                              style={{
                                width: "16rem",
                                cursor: "pointer",
                                marginLeft: "50px",
                                backgroundColor: "#A0A0A0",
                              }}
                              onClick={() =>
                                navigate(`/book-detail/${book?.id}`)
                              }
                            >
                              <Card.Img
                                className="mt-1"
                                variant="top"
                                src={`http://localhost:3001/uploads/${book.bookImage}`}
                                style={{ width: "100%", height: "150px" }}
                                alt=""
                              />
                              <Card.Body className="text-center">
                                <Card.Title
                                  style={{
                                    maxWidth: "150px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  title={book?.bookName}
                                >
                                  {book?.bookName}
                                  {book?.isBorrowed === book?.quantity ? (
                                    <p style={{ color: "red" }}>Đã được mượn</p>
                                  ) : null}
                                </Card.Title>
                              </Card.Body>
                            </Card>
                          );
                        })}
                  </div>
                </section>
              );
            })}
        </div>
      )}
    </>
  );
};

export default HomePageStudent;
