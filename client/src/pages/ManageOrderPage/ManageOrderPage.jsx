import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutationHook, useQueryHook } from "../../Hook/useMutationHook";
import {
  error,
  success,
} from "../../components/MessageComponent/MessageComponent";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import TableComponent from "../../components/TableComponent/TableComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import { addOrder, getAllOrders } from "../../services/OrderService";
import { getAllBooks } from "../../services/BookService";
import { getAllStudents } from "../../services/StudentService";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import { MdOutlineEditNote } from "react-icons/md";

const ManageOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("pages");
  const limit = searchParams.get("limits");
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const [orderItems, setOrderItems] = useState([]);
  const [stu, setStudent] = useState([]);
  const [borrowDate, setBorrowDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [returnDate, setReturnDate] = useState(Date);
  const [studentExist, setStudentExist] = useState(true);
  const getAllOrder = async () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await getAllOrders(limit, page - 1);
          setIsLoading(false);
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  };
  const { data: order, refetch: refetchOrder } = useQueryHook(
    ["order", page],
    getAllOrder
  );
  const getAllBook = async () => {
    const res = await getAllBooks();
    return res.data;
  };
  const { data: book, refetch: refetchBook } = useQueryHook(
    ["book"],
    getAllBook
  );
  const getAllStudent = async () => {
    const res = await getAllStudents();

    return res.data;
  };
  const { data: student } = useQueryHook(["student"], getAllStudent);
  useEffect(() => {
    if (order?.data.length === 0) {
      navigate(`/manage-order?pages=${Math.max(page - 1, 1)}&limits=${limit}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, page, student, book]);
  const handleInputChange = async (e) => {
    const bookName = e.target.value;
    const selectedBook = book?.data.find((book) => book?.bookName === bookName);
    if (selectedBook) {
      if (!orderItems.find((item) => item.id === selectedBook.id)) {
        setOrderItems((prevOrderItems) => [...prevOrderItems, selectedBook]);
      }
      e.target.value = "";
    }
  };
  const onChangeStudent = (e) => {
    const studentCode = e.target.value;
    const selectedStudent = student?.data.find(
      (stu) => stu?.studentCode === studentCode
    );
    if (selectedStudent) {
      setStudent([selectedStudent]);
      setStudentExist(true);
      e.target.value = "";
    } else {
      e.target.value ? setStudentExist(false) : setStudentExist(true);
    }
  };
  const removeItems = (bookId) => {
    const updatedBooks = orderItems.filter((items) => items?.id !== bookId);
    setOrderItems(updatedBooks);
  };
  const clearSOrderItems = () => {
    setOrderItems([]);
  };
  const clearStudent = () => {
    setStudent([]);
  };

  const onSuccessFn = (data, mes) => {
    refetchOrder();
    refetchBook();
    success(mes);
  };
  const onErrorFn = (data, mes) => {
    error(mes);
  };
  const muationAdd = useMutationHook(
    (data) => addOrder(data),
    (data) => onSuccessFn(data, "Tạo đơn mượn thành công"),
    (data) => onErrorFn(data, "Tên đơn đã tồn tại")
  );
  const handleAdd = async (event) => {
    event.preventDefault();
    console.log(stu, orderItems, borrowDate);
    if (stu?.length===0 || orderItems?.length===0 || !borrowDate) {
      console.log("running")
      return alert(`Vui lòng nhập đủ thông tin`);
    } else {
      console.log("running")

      const student = stu.map((stu) => stu.id);
      muationAdd.mutate({
        orderItems: orderItems,
        userId: student[0],
        borrowsDate: borrowDate,
      });
      toggleOpen();
    }
  };
  return (
    <div>
      <div
        className="d-flex flex-column"
        style={{ padding: "0 20px", gap: "25px" }}
      >
        <div className="d-flex justify-content-start align-items-center">
          <MdOutlineEditNote
            style={{
              fontSize: "30px",
              margin: "10px",
            }}
          />
          <h1
            style={{ fontFamily: "inherit", fontSize: "24px", margin: "10px" }}
          >
            Quản lý mượn
          </h1>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              toggleOpen();
              clearSOrderItems();
              clearStudent();
            }}
          >
            Thêm đơn mượn
          </Button>
        </div>
        <div className="d-flex flex-column">
          {isLoading ? (
            <SpinnerComponent />
          ) : (
            <div>
              <TableComponent
                order={order?.data}
                refetch={refetchOrder}
                refetchBook={refetchBook}
              />
              <div className="d-flex justify-content-end">
                <PaginationComponent
                  isOrder={true}
                  totalPage={order?.totalPage}
                  pageCurrent={order?.pageCurrent}
                  limit={limit}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <MDBModal
            open={basicModal}
            setOpen={setBasicModal}
            staticBackdrop={true}
            tabIndex="-1"
          >
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Thêm đơn mượn</MDBModalTitle>
                  <Button
                    className="btn-close"
                    color="none"
                    onClick={() => {
                      toggleOpen();
                      clearSOrderItems();
                      clearStudent();
                    }}
                  ></Button>
                </MDBModalHeader>
                <MDBModalBody>
                  <div>
                    <MDBInput
                      onChange={onChangeStudent}
                      label={
                        <div>
                          <span>Mã sinh viên</span>
                          <span style={{ color: "red" }}>*</span>
                        </div>
                      }
                      id="studentCode"
                      type="text"
                      list="optionsStudent"
                      required
                    />
                    <datalist id="optionsStudent">
                      {student?.data.map((stu) => (
                        <option key={stu?.id} value={stu?.studentCode} />
                      ))}
                    </datalist>

                    <div>
                      {stu?.map((stu) => (
                        <div
                          key={stu?.id}
                          className="d-flex align-items-center"
                        >
                          <div className="ms-3">
                            <p
                              className="fw-bold mb-1"
                              title={stu?.studentCode}
                            >
                              {stu?.studentCode}-{stu?.fullName}
                            </p>
                          </div>
                          <button
                            style={{ marginLeft: "2px" }}
                            onClick={() => clearStudent()}
                          >
                            X
                          </button>
                        </div>
                      ))}
                      {!studentExist && (
                        <p style={{ color: "red" }}>
                          Học sinh không tồn tại. Vui lòng kiểm tra lại!
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <MDBInput
                      required
                      type="text"
                      label={
                        <div>
                          <span>Sách mượn</span>
                          <span style={{ color: "red" }}>*</span>
                        </div>
                      }
                      onChange={handleInputChange}
                      list="optionsBook"
                    />
                    <datalist id="optionsBook">
                      {book?.data.map((book) => {
                        if (book?.quantity > book.isBorrowed) {
                          return (
                            <option key={book?.id} value={book?.bookName} />
                          );
                        } else {
                          return null;
                        }
                      })}
                    </datalist>

                    <div style={{ marginBottom: "10px" }}>
                      {orderItems.map((items) => (
                        <div
                          className="d-flex align-items-center "
                          key={items?.id}
                        >
                          <img
                            src={`http://localhost:3001/uploads/${items?.bookImage}`}
                            alt=""
                            style={{ width: "60px", height: "60px" }}
                          />
                          <div className="ms-3">
                            <p className="fw-bold mb-1" title={items?.bookName}>
                              {items?.bookName}
                              <button
                                style={{ marginLeft: "2px" }}
                                onClick={() => removeItems(items?.id)}
                              >
                                X
                              </button>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <MDBInput
                    required
                    value={borrowDate}
                    label={
                      <div>
                        <span>Ngày mượn</span>
                        <span style={{ color: "red" }}>*</span>
                      </div>
                    }
                    id="email"
                    type="date"
                    onChange={(e) => setBorrowDate(e.target.value)}
                  />
                  <MDBInput
                    // required
                    onChange={(e) => setReturnDate(e.target.value)}
                    label={
                      <div>
                        <span>Ngày trả</span>
                        <span style={{ color: "red" }}>*</span>
                      </div>
                    }
                    id="mobileNumber"
                    type="date"
                  />
                </MDBModalBody>

                <MDBModalFooter>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      toggleOpen();
                      clearSOrderItems();
                      clearStudent();
                    }}
                  >
                    Close
                  </Button>
                  <Button onClick={handleAdd}>Save changes</Button>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </div>
      </div>
    </div>
  );
};

export default ManageOrderPage;
