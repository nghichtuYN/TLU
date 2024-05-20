import React, { useEffect, useState } from "react";
import { getAllBooks, getBookFilter } from "../../services/BookService";
import { useQueryHook } from "../../Hook/useMutationHook";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import { getAllCategories } from "../../services/CategoryService";
import { useSelector } from "react-redux";
import NotFoundMessageComponent from "../../components/NotFoundMessageComponent/NotFoundMessageComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import "./style.css";
const HomePageStudent = (props) => {
  const { setSearchValue } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  console.log(location);
  const page = searchParams.get("pages");
  const searchProduct = useSelector((state) => state.book);
  // eslint-disable-next-line no-unused-vars
  const limit = searchParams.get("limits");
  const [filterBookBySearch, setFilterBookBySearch] = useState([]);
  const [numberSection, setNumberSection] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const bookLimit = 8;
  const bookPage = 1;
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
  const getBookFilters = (searchValue) => {
    setIsLoading(true);
    setTimeout(async () => {
      const res = await getBookFilter(8, page ? page - 1 : 0, searchValue);
      setFilterBookBySearch(res.data);
      setIsLoading(false);
    }, 500);
  };
  const { data: categoryList } = useQueryHook(["categoryList"], getAllCategory);
  // eslint-disable-next-line no-unused-vars
  const { data: book, refetch } = useQueryHook(["book"], getAllBook);
  useEffect(() => {}, [isLoading, numberSection, page]);
  useEffect(() => {
    if (searchProduct.search !== "") {
      getBookFilters(searchProduct.search);
    }
    if (searchProduct.search === "") {
      setFilterBookBySearch([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProduct.search, page]);
  console.log(searchProduct.search);
  return (
    <>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <>
          {searchProduct?.search !== "" ? (
            filterBookBySearch && filterBookBySearch?.data?.length > 0 ? (
              <div>
                <hr
                  style={{
                    border: "4px solid",
                    padding: "0 120px",
                    color: "black",
                  }}
                />
                <div className="d-flex justify-content-between align-items center">
                  <h2 style={{ marginBottom: "30px", padding: "0 10px" }}>
                    Từ khóa tìm kiếm : {searchProduct.search}
                  </h2>
                  <div
                    className="d-flex justify-content-end align-items-center"
                    style={{ paddingRight: "40px" }}
                  >
                    <h3>{filterBookBySearch?.total} kết quả</h3>
                  </div>
                </div>
                <div className="row  d-flex justyfid-flex justify-content-start align-items-center mt-2 gap-5 ms-1">
                  {filterBookBySearch?.data?.map((book) => {
                    return (
                      <Card
                        className={`col-3 ${
                          book.isBorrowed === book.quantity
                            ? "card-borrowed"
                            : ""
                        }`}
                        style={{
                          width: "16rem",
                          cursor: "pointer",
                          marginLeft: "50px",
                          backgroundColor: "#A0A0A0",
                          position: "relative",
                        }}
                        onClick={() => {
                          setSearchValue("");
                          const selectCat = categoryList?.data.find(
                            (cat) => cat?.id === book?.category_id
                          );
                          navigate(`/book-detail/${book?.id}`, {
                            state: {
                              categoryName: selectCat?.categoryName,
                              catId: selectCat?.id,
                              page: 1,
                              limit: bookLimit,
                            },
                          });
                        }}
                      >
                        {book.isBorrowed === book.quantity && (
                          <p className="borrowed-message">Đã được mượn</p>
                        )}
                        <Card.Img
                          className="mt-1"
                          variant="top"
                          src={`http://localhost:3001/uploads/${book.bookImage}`}
                          style={{ width: "100%", height: "200px" }}
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
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    );
                  })}
                  <div
                    className="d-flex justify-content-end"
                    style={{ paddingRight: "40px" }}
                  >
                    <PaginationComponent
                      isFilterBookBySearch={true}
                      totalPage={filterBookBySearch?.totalPage}
                      pageCurrent={filterBookBySearch?.pageCurrent}
                      limit={bookLimit}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <hr
                  style={{
                    border: "4px solid",
                    padding: "0 120px",
                    color: "black",
                  }}
                />
                <h2 style={{ marginBottom: "30px", padding: "0 10px" }}>
                  Từ khóa tìm kiếm : {searchProduct.search}
                </h2>
                <div className="d-flex justify-content-center align-items-center">
                  <NotFoundMessageComponent />
                </div>
              </div>
            )
          ) : (
            <div>
              <hr
                style={{
                  border: "4px solid",
                  padding: "0 120px",
                  color: "black",
                }}
              />
              <section>
                <h2 style={{ marginBottom: "30px", padding: "0 10px" }}>
                  Sách mới cập nhật
                </h2>
                <div className="row  d-flex justyfid-flex justify-content-start align-items-center mt-2 gap-5 ms-1">
                  {book &&
                    book?.data
                      ?.slice(-8)
                      .reverse()
                      .map((book) => {
                        return (
                          <Card
                            className={`col-3 ${
                              book.isBorrowed === book.quantity
                                ? "card-borrowed"
                                : ""
                            }`}
                            style={{
                              width: "16rem",
                              cursor: "pointer",
                              marginLeft: "50px",
                              backgroundColor: "#A0A0A0",
                              position: "relative",
                            }}
                            onClick={() => {
                              const selectCat = categoryList?.data.find(
                                (cat) => cat?.id === book?.category_id
                              );
                              navigate(`/book-detail/${book?.id}`, {
                                state: {
                                  categoryName: selectCat?.categoryName,
                                  catId: selectCat?.id,
                                  page: 1,
                                  limit: bookLimit,
                                },
                              });
                            }}
                          >
                            {book.isBorrowed === book.quantity && (
                              <p className="borrowed-message">Đã được mượn</p>
                            )}
                            <Card.Img
                              className="mt-1"
                              variant="top"
                              src={`http://localhost:3001/uploads/${book.bookImage}`}
                              style={{ width: "100%", height: "200px" }}
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
                              </Card.Title>
                            </Card.Body>
                          </Card>
                        );
                      })}
                </div>
              </section>
              {categoryList &&
                // eslint-disable-next-line array-callback-return
                categoryList?.data?.slice(0, numberSection).map((cat) => {
                  const filterBook = book?.data
                    ?.filter((book) => book?.category_id === cat?.id)
                    .slice(0, 7);
                  if (filterBook?.length > 0) {
                    return (
                      <section className="flex-columns">
                        <hr
                          style={{
                            border: "4px solid",
                            padding: "0 120px",
                            color: "black",
                          }}
                        />
                        <h2 style={{ marginBottom: "30px", padding: "0 10px" }}>
                          {cat?.categoryName}
                        </h2>
                        <div className="row  d-flex justyfid-flex justify-content-start align-items-center mt-2 gap-5 ms-1">
                          {filterBook &&
                            filterBook.map((book) => {
                              return (
                                <Card
                                  className={`col-3 ${
                                    book.isBorrowed === book.quantity
                                      ? "card-borrowed"
                                      : ""
                                  }`}
                                  style={{
                                    width: "16rem",
                                    cursor: "pointer",
                                    marginLeft: "50px",
                                    backgroundColor: "#A0A0A0",
                                    position: "relative",
                                  }}
                                  onClick={() =>
                                    navigate(`/book-detail/${book?.id}`, {
                                      state: {
                                        categoryName: cat?.categoryName,
                                        catId: cat?.id,
                                        page: 1,
                                        limit: bookLimit,
                                      },
                                    })
                                  }
                                >
                                  {book.isBorrowed === book.quantity && (
                                    <p className="borrowed-message">
                                      Đã được mượn
                                    </p>
                                  )}
                                  <Card.Img
                                    className="mt-1"
                                    variant="top"
                                    src={`http://localhost:3001/uploads/${book.bookImage}`}
                                    style={{ width: "100%", height: "200px" }}
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
                                    </Card.Title>
                                  </Card.Body>
                                </Card>
                              );
                            })}
                          {filterBook?.length > 6 ? (
                            <Button
                            style={{ fontSize: "15px",width: "16rem",marginLeft: "50px", }}
                            onClick={() =>
                              navigate(
                                `/category/?pages=${bookPage}&limits=${bookLimit}&cat=${cat?.id}`,
                                { state: { categoryName: cat?.categoryName } }
                              )
                            }
                            className="col-3"
                            variant="info"
                          >
                            ...Xem tất cả {">>"}
                          </Button>
                          ) : null}
                        </div>
                      </section>
                    );
                  }
                })}
              <div className="d-flex justify-content-center align-items-center mt-5 mb-2">
                <Button
                  style={{ fontSize: "15px" }}
                  onClick={() => {
                    setNumberSection(numberSection + 2);
                  }}
                  variant="outline-secondary"
                >
                  Xem thêm {">>"}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default HomePageStudent;
