import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookByCategory } from "../../services/BookService";
import { useQueryHook } from "../../Hook/useMutationHook";
import { Card } from "react-bootstrap";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import "../HomePageStudent/style.css";
import {  useSelector } from "react-redux";

const TypeCategoryPage = () => {
  const location = useLocation();
  const {categoryName} = location.state;
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("pages");
  const limit = searchParams.get("limits");
  const id = searchParams.get("cat");
  const [isLoading, setIsLoading] = useState(false);
  const searchProduct = useSelector((state) => state.book);
  const navigate = useNavigate();
  const getBookByCat = () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await getBookByCategory(limit, page - 1, id);
          setIsLoading(false);
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  };
  console.log('location',location)
  const { data: bookByCategory, refetch } = useQueryHook(
    ["bookByCategory", page],
    getBookByCat
  );
  useEffect(
    () => {
      if (searchProduct?.search !== ""  ) {
        navigate("/home-page");
      }
      
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, page, searchProduct?.search]
  )
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <hr
        style={{
          border: "4px solid",
          padding: "0 120px",
          color: "black",
        }}
      />
      <h2 style={{ marginBottom: "30px", padding: "0 10px" }}>
        {categoryName}
      </h2>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <div className="row  d-flex justyfid-flex justify-content-start align-items-center mt-2 gap-5 ms-1">
          {bookByCategory &&
            bookByCategory?.data?.map((book) => {
              return (
                <Card
                  className={`col-3 ${
                    book.isBorrowed === book.quantity ? "card-borrowed" : ""
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
                      state: { categoryName, catId: id, page: 1, limit: limit },
                    })
                  }
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
          <div className="d-flex justify-content-end">
            <PaginationComponent
              isBookByCategory={true}
              catId={id}
              limit={limit}
              pageCurrent={bookByCategory?.pageCurrent}
              totalPage={bookByCategory?.totalPage}
              categoryName={categoryName}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TypeCategoryPage;
