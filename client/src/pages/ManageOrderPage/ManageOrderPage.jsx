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
import {
  addOrder,
  getAllOrders,
  getFilterOrder,
} from "../../services/OrderService";
import { getAllBooks } from "../../services/BookService";
import { getAllStudents } from "../../services/StudentService";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import { MdOutlineEditNote } from "react-icons/md";
import { SearchComponent } from "../../components/SearchComponent/SearchComponent";
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
  const [searchValue, setSearchValue] = useState("");
  const [filterOrder, setFilterOrder] = useState([]);
  const [returnStatus, setReturnStatus] = useState("");

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
  const onChangeReturnStatus = (e) => {
    setReturnStatus(e.target.value);
  };
  const getFilterOrders =  (searchValue, status) => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const res = await getFilterOrder(5, page - 1, searchValue, status);
        setFilterOrder(res.data);
        console.log(filterOrder)
        if (filterOrder.length===0 || filterOrder?.totalPage <=1) {
          console.log("ruunginng")
          navigate(`/manage-order?pages=${1}&limits=${limit}`);
        }
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
    }
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
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const fetchOrders = async () => {
    if (order?.data.length === 0) {
      navigate(`/manage-order?pages=${Math.max(page - 1, 1)}&limits=${limit}`);
    }
    if (searchValue !== "" && returnStatus !== "") {
      getFilterOrders(searchValue, returnStatus);
    }
    if (searchValue === "" && returnStatus === "") {
      setFilterOrder([]);
      refetchOrder();
    } else {
      getFilterOrders(searchValue, returnStatus);
    }
  };
  const { data: student } = useQueryHook(["student"], getAllStudent);
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, page, student, book, searchValue, returnStatus]);

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
    if (stu?.length === 0 || orderItems?.length === 0 || !borrowDate) {
      return alert(`Vui lòng nhập đủ thông tin`);
    } else {
      const student = stu.map((stu) => stu.id);
      muationAdd.mutate({
        orderItems: orderItems,
        userId: student[0],
        borrowsDate: borrowDate,
        returnDate:returnDate
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
          <div class="d-flex bd-highlight mb-3">
            <div class="me-auto p-2 bd-highlight" style={{ flex: 1 }}>
              <SearchComponent
                value={searchValue}
                onChange={onChange}
                placeholder={"Tìm kiếm đơn mượn theo mã độc giả"}
              />
            </div>
            <div class="p-2 bd-highlight">
              <select
                onChange={onChangeReturnStatus}
                id="studentCode"
                className="form-select"
                required
                style={{ fontSize: "15px" }}
              >
                <option value={""}>--Tất cả--</option>
                <option value={"true"}>--Đã trả--</option>
                <option value={"false"}>--Chưa trả--</option>
              </select>
            </div>
            <div class="p-2 bd-highlight">
              {filterOrder && filterOrder.data?.length > 0 ? (
                <p style={{ fontSize: "20px" }}>{filterOrder?.total} kết quả</p>
              ) : null}
            </div>
          </div>
          {isLoading ? (
            <SpinnerComponent />
          ) : (
            <div>
              <TableComponent
                order={order?.data}
                refetch={refetchOrder}
                refetchBook={refetchBook}
                filterOrder={filterOrder?.data}
                searchValue={searchValue}
                returnStatus={returnStatus}
              />
              <div className="d-flex justify-content-end">
                <PaginationComponent
                  isOrder={true}
                  totalPage={
                    filterOrder?.length === 0
                      ? order?.totalPage
                      : filterOrder?.totalPage
                  }
                  pageCurrent={
                    filterOrder?.length === 0
                      ? order?.pageCurrent
                      : filterOrder?.pageCurrent
                  }
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
                    <label>
                      <span>Mã sinh viên</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      onChange={onChangeStudent}
                      id="studentCode"
                      className="form-select"
                      required
                    >
                      <option value="">--Chọn sinh viên--</option>
                      {student?.data.map((stu) => (
                        <option key={stu?.id} value={stu?.studentCode}>
                          {stu?.studentCode}
                        </option>
                      ))}
                    </select>

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
                  <div style={{with :'100px'}}>
                    <label>
                      <span>Sách mượn</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      required
                      onChange={handleInputChange}
                      className="form-select"
                      style={{
                        width: "100%",
                        maxHeight: "130px",
                        height: "30px",
                        marginLeft: "10px",
                        boxSizing: "border-box",
                      }}
                    >
                      <option
                       style={{
                        width: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        boxSizing: "border-box",
                        textOverflow: "ellipsis",
                      }}
                      value="">--Chọn sách--</option>
                      {book?.data.map((book) => {
                        return (
                          <option
                          style={{
                            // width: "100%",
                            maxWidth: "100px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            boxSizing: "border-box",
                            textOverflow: "ellipsis",
                          }}
                            key={book?.id}
                            value={book?.bookName}
                            disabled={book?.quantity === book.isBorrowed}
                            
                          >
                            {book?.bookName}{" "}
                            {book?.quantity === book.isBorrowed ? (
                              <div style={{ color: "red" }}>(hết sách)</div>
                            ) : null}
                          </option>
                        );
                      })}
                    </select>

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
                          <div className="ms-3 d-flex justify-content-center align-items-center">
                            <p className="fw-bold mb-1" style={{
                              maxWidth:'200px',
                              whiteSpace:'nowrap',
                              overflow:'hidden',
                              textOverflow:'ellipsis'
                            }} title={items?.bookName}>
                              {items?.bookName}
                            </p>
                              <button
                                style={{ marginLeft: "2px" }}
                                onClick={() => removeItems(items?.id)}
                              >
                                X
                              </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <label>
                    <span>Ngày mượn</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    required
                    value={borrowDate}
                    id="email"
                    type="date"
                    wrapperClass="mb-4"
                    onChange={(e) => setBorrowDate(e.target.value)}
                  />
                  <label>
                    <span>Ngày trả</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
                    // required
                    onChange={(e) => setReturnDate(e.target.value)}
                    id="returndate"
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
