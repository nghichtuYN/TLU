import React, { useState } from "react";
import { MDBTableBody } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import ModalComponent from "../ModalComponent/ModalComponent";
import { useMutationHook } from "../../Hook/useMutationHook";
import { error, success } from "../MessageComponent/MessageComponent";
import { deleteBook } from "../../services/BookService";

export const ManageBookComponent = (props) => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(false);
  const { book, refetch, categoryList, authorList, filterBook } = props;
  const [authorId, setAuthID] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [ISBNNumber, setISBN_Number] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookID, setBookID] = useState("");
  const [bookPrice, setBookPrice] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [category_id, setCatID] = useState(0);
  const [isBorrowed, setIsBorrowed] = useState("");
  const handleOpen = (id) => {
    setBasicModal(true);
    if (book) {
      const selectedBook = book?.find((book) => book?.id === id);
      if (selectedBook) {
        setBookID(selectedBook?.id);
        setBookName(selectedBook?.bookName);
        setAuthID(selectedBook?.authorId);
        setAuthorName(selectedBook?.authorName);
        setCatID(selectedBook?.category_id);
        setCategoryName(selectedBook?.categoryName);
        setBookImage(selectedBook?.bookImage);
        setBookPrice(selectedBook?.bookPrice);
        setISBN_Number(selectedBook?.ISBNNumber);
        setIsBorrowed(selectedBook?.isBorrowed.toString());
      }
    }
  };
  const onSuccessFn = (data, mes) => {
    refetch();
    success(mes);
  };
  const onErrorfn = (data, mes) => {
    error(mes);
  };
  const deleteRow = (id) => {
    if (book) {
      return deleteBook(id);
    }
  };
  const mutationDelete = useMutationHook(
    deleteRow,
    (data) => onSuccessFn(data, "Xóa thành công"),
    (data) => onErrorfn(data, "Xóa thất bại")
  );
  const handleDelete = (id) => {
    mutationDelete.mutate(id);
  };
  console.log("filterBook", filterBook);
  return (
    <>
      <MDBTableBody>
        {!filterBook
          ? book?.map((book) => {
              return (
                <tr key={book?.id}>
                  <td>
                    <div className=" align-items-center ">
                      <img
                        src={book?.bookImage}
                        alt=""
                        style={{ width: "60px", height: "60px" }}
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={book?.bookName}>
                          {book?.bookName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={book?.categoryName}>
                          {book?.categoryName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={book?.authorName}>
                          {book?.authorName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center ">
                      {book?.ISBNNumber}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center ">
                      {book?.bookPrice}
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      rounded="true"
                      onClick={() => handleOpen(book?.id)}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="danger"
                      rounded="true"
                      onClick={() => handleDelete(book?.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })
          : filterBook?.map((book) => {
              return (
                <tr key={book?.id}>
                  <td>
                    <div className=" align-items-center ">
                      <img
                        src={book?.bookImage}
                        alt=""
                        style={{ width: "60px", height: "60px" }}
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={book?.bookName}>
                          {book?.bookName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={book?.categoryName}>
                          {book?.categoryName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={book?.authorName}>
                          {book?.authorName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center ">
                      {book?.ISBNNumber}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center ">
                      {book?.bookPrice}
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      rounded="true"
                      onClick={() => handleOpen(book?.id)}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="danger"
                      rounded="true"
                      onClick={() => handleDelete(book?.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })}
      </MDBTableBody>
      {/* Modal */}
      <ModalComponent
        isBorrowed={isBorrowed}
        book={book}
        authorName={authorName}
        authorId={authorId}
        setAuthorName={setAuthorName}
        setAuthID={setAuthID}
        category_id={category_id}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        bookImage={bookImage}
        setCatID={setCatID}
        setBookImage={setBookImage}
        ISBNNumber={ISBNNumber}
        setISBN_Number={setISBN_Number}
        bookName={bookName}
        setBookName={setBookName}
        bookID={bookID}
        setBookID={setBookID}
        bookPrice={bookPrice}
        setBookPrice={setBookPrice}
        categoryList={categoryList}
        authorList={authorList}
        refetch={refetch}
        basicModal={basicModal}
        toggleOpen={toggleOpen}
      />
    </>
  );
};
