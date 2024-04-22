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
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import "./style.css";
import React from "react";
import { useMutationHook } from "../../Hook/useMutationHook";
import { error, success } from "../MessageComponent/MessageComponent";
import { updateCategory } from "../../services/CategoryService";
import { updateAuthor } from "../../services/AuthorService";
import { updateBook } from "../../services/BookService";
import { updateStudent } from "../../services/StudentService";
import { updateOrder,  } from "../../services/OrderService";

const ModalComponent = (props) => {
  const {
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
    ISBNNumber,
    setISBN_Number,
    bookName,
    setBookName,
    bookID,
    bookPrice,
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
    setOrderItems,
    order,
  } = props;
  const onSuccessFn = (data, mes) => {
    refetch();
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
      return updateBook(id, rest);
    } else if (student) {
      return updateStudent(id, rest);
    } else if (order) {
      return updateOrder(id, rest);
    }
  };
console.log('Modal  orderItems',status)

  const mutationUpdate = useMutationHook(
    updateRow,
    (data) => onSuccessFn(data, "Cập nhật thành công"),
    (data) => onErrorfn(data, "Cập nhật thất bại")
  );
  const handleUpdate = () => {
    if (category) {
      mutationUpdate.mutate({ id: category_id, categoryName, status });
    } else if (author) {
      mutationUpdate.mutate({ id: authorId, authorName });
    } else if (book) {
      mutationUpdate.mutate({
        id: bookID,
        bookName,
        bookImage,
        bookPrice,
        ISBNNumber,
        category_id,
        authorId,
      });
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
        orderItems:orderItems,
        returnStatus: status,
      });
    }
    toggleOpen();
    // clearSOrderItems();

  };
  const clearSOrderItems = () => {
    if (order) {
      setOrderItems([]);
      // setStatus("");
    }
    // const clearStudent = () => {
    //   setStudent([]);
    // };
  };
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
            <MDBModalBody style={{}}>
              {category ? (
                <div>
                  <label>Tên danh mục</label>
                  <MDBInput
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    id="categoryName"
                    type="text"
                  />
                  <div>
                    <label>Trạng thái</label>
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
                  <label>Tên tác giả</label>
                  <MDBInput
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    id="authorName"
                    type="text"
                  />
                </div>
              ) : book ? (
                <>
                  <MDBInput
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    label={
                      <div>
                        <span>Tên sách</span>
                        <span style={{ color: "red" }}>*</span>
                      </div>
                    }
                    id="bookName"
                    type="text"
                  />
                  <MDBInput
                    type="text"
                    label={
                      <div>
                        <span>Danh mục</span>
                        <span style={{ color: "red" }}>*</span>
                      </div>
                    }
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
                  <MDBInput
                    type="text"
                    label={
                      <div>
                        <span>Tác giả</span>
                        <span style={{ color: "red" }}>*</span>
                      </div>
                    }
                    value={authorName}
                    onChange={(e) => {
                      const selectedAuthor = authorList.find(
                        (author) => author.authorName === e.target.value
                      );
                      if (selectedAuthor) {
                        setAuthID(selectedAuthor._id);
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
                  <MDBInput
                    value={ISBNNumber}
                    onChange={(e) => setISBN_Number(e.target.value)}
                    label={
                      <div>
                        <span>ISBN</span>
                        <span style={{ color: "red" }}>*</span>
                      </div>
                    }
                    id="ISBN"
                    type="text"
                  />
                  <MDBInput
                    onChange={(e) => setBookImage(e.target.value)}
                    value={bookImage}
                    label={
                      <div>
                        <span> URL ảnh Sách</span>
                        <span style={{ color: "red" }}>*</span>
                      </div>
                    }
                    id="bookImage"
                    type="text"
                  />
                  <MDBInput
                    onChange={(e) => setBookPrice(e.target.value)}
                    value={bookPrice}
                    label={
                      <div>
                        <span> Giá</span>
                        <span style={{ color: "red" }}>*</span>
                      </div>
                    }
                    id="bookImage"
                    type="number"
                  />
                </>
              ) : student ? (
                <div>
                  <MDBInput
                    value={studentCode}
                    onChange={(e) => setStudentCode(e.target.value)}
                    label="Mã sinh viên"
                    id="studentCode"
                    type="text"
                  />
                  <MDBInput
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    label="Tên độc giả"
                    id="fullName"
                    type="text"
                  />
                  <MDBInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    id="email"
                    type="email"
                  />
                  <MDBInput
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    label="Số điện thoại"
                    id="mobileNumber"
                    type="phone"
                  />
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
                                        src={items?.bookImage}
                                        alt=""
                                        style={{
                                          width: "60px",
                                          height: "60px",
                                        }}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <tr>
                                      <td style={{ maxWidth: "300px" }}>
                                        Tên sách: {items?.bookName}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ maxWidth: "300px" }}>
                                        ISBNNUmber: {items?.ISBNNumber}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ maxWidth: "300px" }}>
                                        Ngày mượn: {borrowDate}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ maxWidth: "300px" }}>
                                        Ngày trả: {returnDate}
                                      </td>
                                    </tr>
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
                                  checked={order?.returnStatus}
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
              >
                Save changes
              </Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ModalComponent;
