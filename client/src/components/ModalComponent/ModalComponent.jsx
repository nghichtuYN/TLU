import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBRadio,
  MDBTableBody,
  MDBTable,
  MDBFile,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import "./style.css";
import React, { useState } from "react";
import { useMutationHook } from "../../Hook/useMutationHook";
import { error, success } from "../MessageComponent/MessageComponent";
import { updateCategory } from "../../services/CategoryService";
import { updateAuthor } from "../../services/AuthorService";
import { updateBook } from "../../services/BookService";
import { updateStudent } from "../../services/StudentService";
import { updateOrder } from "../../services/OrderService";
import { format } from "date-fns";

const ModalComponent = (props) => {
  const {
    getStudentFilters,
    getCategoriesFilter,
    getAuthorFilters,
    getBookFilters,
    searchValue,
    book,
    category,
    author,
    category_id,
    setCatID,
    categoryName,
    status,
    setStatus,
    setCategoryName,
    basicModal,
    toggleOpen,
    refetch,
    authorId,
    setAuthID,
    authorName,
    setAuthorName,
    bookImage,
    setBookImage,
    quantity,
    setQuantity,
    ISBNNumber,
    setISBN_Number,
    bookName,
    setBookName,
    bookID,
    bookPrice,
    isBorrowed,
    setBookPrice,
    categoryList,
    authorList,
    studentId,
    studentCode,
    setStudentCode,
    fullName,
    setFullName,
    email,
    setEmail,
    mobileNumber,
    setMobileNumber,
    student,
    detailStudent,
    orderId,
    orderItems,
    borrowDate,
    returnDate,
    refetchBook,
    setOrderItems,
    order,
    statusReturn
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const onSuccessFn = (data, mes) => {
    refetch();
    if (book) {
      // setIsUpdate(!isUpdate)
      if (searchValue) {
        getBookFilters(searchValue);
      }
    }

    if (author) {
      if (searchValue) {
        getAuthorFilters(searchValue);
      }
    }
    if (category) {
      if (searchValue) {
        getCategoriesFilter(searchValue);
      }
    }
    if (student) {
      if (searchValue) {
        getStudentFilters(searchValue);
      }
    }
    if (order) {
      refetchBook();
    }
    success(mes);
  };
  const onErrorfn = (data, mes) => {
    error(mes);
  };
  const updateRow = (data) => {
    const { id, ...rest } = data;
    if (category) {
      return updateCategory(id, rest);
    } else if (author) {
      return updateAuthor(id, rest);
    } else if (book) {
      return updateBook(data.get("id"), data);
    } else if (student) {
      return updateStudent(id, rest);
    } else if (order) {
      console.log(rest);
      return updateOrder(id, rest);
    }
  };
  const mutationUpdate = useMutationHook(
    updateRow,
    (data) => onSuccessFn(data, "Cập nhật thành công"),
    (data) => onErrorfn(data, "Cập nhật thất bại")
  );
  const handleUpdate = () => {
    if (category) {
      mutationUpdate.mutate({ id: category_id, categoryName, status: status });
    } else if (author) {
      mutationUpdate.mutate({ id: authorId, authorName });
    } else if (book) {
      const formData = new FormData();
      formData.append("id", bookID);
      formData.append("bookName", bookName);
      formData.append("bookImage", bookImage);
      formData.append("bookPrice", bookPrice);
      formData.append("ISBNNumber", ISBNNumber);
      formData.append("category_id", category_id);
      formData.append("authorId", authorId);
      formData.append("isBorrowed", isBorrowed);
      formData.append("quantity", quantity);
      mutationUpdate.mutate(formData);
    } else if (student) {
      mutationUpdate.mutate({
        id: studentId,
        studentCode,
        fullName,
        email,
        mobileNumber,
        status,
      });
    } else if (order) {
      mutationUpdate.mutate({
        id: orderId,
        orderItems: orderItems,
        returnStatus: status,
      });
    }
    toggleOpen();
  };
  const clearSOrderItems = () => {
    if (order) {
      setOrderItems([]);
      setStatus("");
    }
    // const clearStudent = () => {
    //   setStudent([]);
    // };
  };
  console.log(returnDate)
  const formattedDateCreated = borrowDate
              ? format(new Date(borrowDate), "dd/MM/yyyy")
              : "";
              const formattedDateReturn = returnDate
              ? format(new Date(returnDate), "dd/MM/yyyy")
              : "";
  return (
    <>
      <MDBModal
        open={basicModal}
        onClose={toggleOpen}
        tabIndex="-1"
        staticBackdrop={true}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {category ? (
                  <div>Cập nhật danh mục</div>
                ) : author ? (
                  <div>Cập nhật tác giả </div>
                ) : book ? (
                  <div>Cập nhật sách </div>
                ) : student ? (
                  <div>Cập nhật độc giả </div>
                ) : order ? (
                  <div>Cập nhật đơn mượn </div>
                ) : null}
              </MDBModalTitle>
              <Button
                className="btn-close"
                color="none"
                onClick={() => {
                  toggleOpen();
                  clearSOrderItems();
                }}
              ></Button>
            </MDBModalHeader>
            <MDBModalBody>
              {category ? (
                <div>
                  <label className="mb-1">
                    <span>Tên danh mục</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    value={categoryName}
                    wrapperClass="mb-4"
                    onChange={(e) => setCategoryName(e.target.value)}
                    id="categoryName"
                    type="text"
                    required
                  />
                  <div>
                    <label>
                      <span>Trạng thái</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBRadio
                      name="inlineRadio"
                      id="inlineRadio"
                      value="false"
                      label="Ẩn"
                      onChange={(e) => setStatus(e.target.value)}
                      inline
                      style={{ marginLeft: "5px" }}
                    />
                    <MDBRadio
                      name="inlineRadio"
                      id="inlineRadio"
                      value="true"
                      onChange={(e) => setStatus(e.target.value)}
                      label="Kích hoạt"
                      inline
                    />
                  </div>
                </div>
              ) : author ? (
                <div>
                  <label>
                    <span>Tên tác giả</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    id="authorName"
                    required
                    type="text"
                  />
                </div>
              ) : book ? (
                <>
                  <label>
                    <span>Tên sách</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    id="bookName"
                    wrapperClass="mb-4"
                    type="text"
                  />
                  <label>
                    <span>Danh mục</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    type="text"
                    wrapperClass="mb-4"
                    value={categoryName}
                    onChange={(e) => {
                      const selectedCat = categoryList?.find(
                        (cat) => cat?.categoryName === e.target.value
                      );
                      if (selectedCat) {
                        setCatID(selectedCat.id);
                        setCategoryName(selectedCat.categoryName);
                      } else {
                        setCatID(0);
                        setCategoryName(e.target.value);
                      }
                    }}
                    list="optionsCat"
                  />
                  <datalist id="optionsCat">
                    {categoryList?.map((cat) => (
                      <option key={cat?.id} value={cat?.categoryName} />
                    ))}
                  </datalist>
                  <label>
                    <span>Tác giả</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    type="text"
                    wrapperClass="mb-4"
                    value={authorName}
                    onChange={(e) => {
                      const selectedAuthor = authorList.find(
                        (author) => author.authorName === e.target.value
                      );
                      if (selectedAuthor) {
                        setAuthID(selectedAuthor.id);
                        setAuthorName(selectedAuthor.authorName);
                      } else {
                        setAuthID(0);
                        setAuthorName(e.target.value);
                      }
                    }}
                    list="optionAuthor"
                  />
                  <datalist id="optionAuthor">
                    {authorList?.map((author) => (
                      <option key={author?.id} value={author?.authorName} />
                    ))}
                  </datalist>
                  <label>
                    <span>ISBN</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    value={ISBNNumber}
                    onChange={(e) => setISBN_Number(e.target.value)}
                    id="ISBN"
                    wrapperClass="mb-4"
                    type="text"
                  />
                  <label>
                    <span>Đính kèm ảnh</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBFile
                    id="customFile"
                    onChange={(e) => setBookImage(e.target.files[0])}
                    wrapperClass="mb-5"
                    required
                  />
                  <label>
                    <span> Giá</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    onChange={(e) => setBookPrice(e.target.value)}
                    wrapperClass="mb-4"
                    value={bookPrice}
                    id="bookPrice"
                    type="number"
                    min={0}
                  />
                  <label>
                    <span> Số lượng </span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                    id="bookQuantity"
                    wrapperClass="mb-4"
                    type="number"
                    min={0}
                  />
                </>
              ) : student ? (
                <div>
                  <label>
                    <span>Mã độc giả</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    value={studentCode}
                    onChange={(e) => setStudentCode(e.target.value)}
                    wrapperClass="mb-4"
                    id="studentCode"
                    type="text"
                  />
                  <label>
                    <span>Tên độc giả</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    wrapperClass="mb-4"
                    id="fullName"
                    type="text"
                  />{" "}
                  <label>
                    <span>Email</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    wrapperClass="mb-4"
                    type="email"
                  />
                  <label>
                    <span>Số điện thoại</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    wrapperClass="mb-4"
                    id="mobileNumber"
                    type="phone"
                  />
                  <label className="mx-2">
                    <span>Trạng thái</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBRadio
                    name="inlineRadio"
                    id="status"
                    value="false"
                    label="Không"
                    onChange={(e) => setStatus(e.target.value)}
                    inline
                  />
                  <MDBRadio
                    name="inlineRadio"
                    id="status"
                    value="true"
                    onChange={(e) => setStatus(e.target.value)}
                    label="có"
                    inline
                  />
                </div>
              ) : order ? (
                <div>
                  <div>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Chi tiết độc giả</MDBModalTitle>
                      </MDBModalHeader>
                      <MDBModalBody>
                        <MDBTable align="middle" style={{ fontSize: "16px" }}>
                          <MDBTableBody>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">
                                      Mã độc giả: {detailStudent?.studentCode}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">
                                      Tên độc giả: {detailStudent?.fullName}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">
                                      Email: {detailStudent?.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="ms-3">
                                    <p className="fw-bold mb-1">
                                      Số điện thoại:
                                      {detailStudent?.mobileNumber}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </MDBTableBody>
                        </MDBTable>
                      </MDBModalBody>
                    </MDBModalContent>
                  </div>
                  <div>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Chi tiết sách</MDBModalTitle>
                      </MDBModalHeader>
                      <MDBModalBody>
                        <MDBTable align="middle" style={{ fontSize: "16px" }}>
                          <MDBTableBody>
                            {orderItems?.map((items) => {
                              
                              return (
                                <tr key={items?.id}>
                                  <td style={{ maxWidth: "30%" }}>
                                    <div className=" align-items-center ">
                                      <div>Ảnh: </div>
                                      <img
                                        src={`http://localhost:3001/uploads/${items?.bookImage}`}
                                        alt=""
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                        }}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{ maxWidth: "300px" }}>
                                      <p>Tên sách: {items?.bookName}</p>
                                      <p>ISBNNmber: {items?.ISBNNumber}</p>
                                      <p>Ngày mượn: {formattedDateCreated}</p>
                                      <p>Ngày trả: {formattedDateReturn}</p>
                                      <p>Tình trạng: {statusReturn(items?.returnStatus, returnDate,currentDate)}</p>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                            <tr>
                              <td>
                                <MDBRadio
                                  name="inlineRadio"
                                  id="inlineRadio2"
                                  value="true"
                                  onChange={(e) => setStatus(e.target.value)}
                                  label="Đã trả"
                                  inline
                                />
                              </td>
                            </tr>
                          </MDBTableBody>
                        </MDBTable>
                      </MDBModalBody>
                    </MDBModalContent>
                  </div>
                </div>
              ) : null}
            </MDBModalBody>
            <MDBModalFooter>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  toggleOpen();
                  clearSOrderItems();
                }}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  handleUpdate();
                }}
                disabled={
                  status === undefined && author
                    ? false
                    : status === undefined && book
                    ? false
                    : status && category
                    ? false
                    : status && student
                    ? false
                    : status === undefined
                    ? true
                    : status === "true"
                    ? false
                    : true
                }
              >
                Lưu thay đổi
              </Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ModalComponent;
