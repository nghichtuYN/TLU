import React, { useState } from "react";
import { MDBTableBody } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import ModalComponent from "../ModalComponent/ModalComponent";
import { getDetailsStudent } from "../../services/StudentService";
import { getDetaislBook } from "../../services/BookService";
import { FaRegEdit } from "react-icons/fa";
import NotFoundMessageComponent from "../NotFoundMessageComponent/NotFoundMessageComponent";
const ManageOrderComponent = (props) => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(false);
  const {
    order,
    refetch,
    refetchBook,
    filterOrder,
    searchValue,
    returnStatus,
  } = props;
  const [detailStudent, setDetailStudent] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [borrowDate, setBorrowDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(Date);
  const [status, setStatus] = useState("");

  const getDetailStudent = async (id) => {
    const res = await getDetailsStudent(id);
    return res.data;
  };
  const getDetailBook = async (id) => {
    const res = await getDetaislBook(id);
    return res.data;
  };
  const getOrderItems = (selectedOrder) => {
    selectedOrder?.BookIDs.split(",").map(async (id) => {
      const detailBook = await getDetailBook(id);
      if (detailBook) {
        if (!orderItems.find((item) => item.id === detailBook.id)) {
          setOrderItems((prevOrderItems) => [...prevOrderItems, detailBook]);
        }
      }
    });
  };

  const handleOpen = async (id) => {
    setBasicModal(true);
    if (order) {
      const selectedOrder = filterOrder
        ? filterOrder?.find((order) => order?.id === id)
        : order?.find((order) => order?.id === id);
      if (selectedOrder) {
        setOrderId(selectedOrder?.id);
        const student = await getDetailStudent(selectedOrder?.UserId);
        setDetailStudent(student);
        getOrderItems(selectedOrder);
        // const formattedBorrowDate = selectedOrder?.borrowDate
        //   ? format(new Date(selectedOrder?.borrowDate), "dd/MM/yyyy")
        //   : "";
        // const formattedReturnDate = selectedOrder?.returnDate
        //   ? format(new Date(selectedOrder?.returnDate), "dd/MM/yyyy")
        //   : "Chưa trả";
        console.log(selectedOrder)
        setBorrowDate(selectedOrder?.borrowDate);
        setReturnDate(selectedOrder?.returnDate);
        setStatus(selectedOrder?.returnStatus);
      }
    }
  };
  const statusReturn = (status,returnDate, currentDate) => {
    const date1 = new Date(returnDate);
    const date2 = new Date(currentDate);
    console.log('returnDate',returnDate )
    console.log('currentDate',currentDate )

    console.log(date1)
    const isTrue="Đã trả"
    const isFalse="Chưa trả"
    const isWarning="Quá hạn"
    console.log(date1 < date2)
    if(status){
      return isTrue
    }else if(!status && date1 < date2){
      return isWarning
    }else if(!status){
      return isFalse
    }
  };
  return (
    <>
      <MDBTableBody>
        {searchValue !== "" || returnStatus !== "" ? (
          filterOrder && filterOrder?.length > 0 ? (
            filterOrder?.map((order) => {
              const formattedDateCreated = order?.borrowDate
                ? format(new Date(order?.borrowDate), "dd/MM/yyyy")
                : "";
              const formattedDateReturn = order?.returnDate
                ? format(new Date(order?.returnDate), "dd/MM/yyyy")
                : "";
              const bookArray = order?.BookNames
                ? order?.BookNames.split(",")
                : [];
              // console.log('bookArray',bookArray)
              const isbnArray = order?.ISBNNumbers
                ? order?.ISBNNumbers.split(",")
                : [];
              return (
                <tr key={order?.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={order?.studentCode}>
                          {order?.studentCode}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={order?.fullName}>
                          {order?.fullName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {bookArray?.map((items, index) => {
                      return (
                        <div key={index} className="d-flex align-items-center">
                          <div className="ms-3">
                            <p className="fw-bold mb-1" title={items}>
                              {items}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    {isbnArray?.map((items, index) => {
                      return (
                        <div key={index} className="d-flex align-items-center">
                          <div className="ms-3">
                            <p className="fw-bold mb-1" title={items}>
                              {items}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{formattedDateCreated}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{formattedDateReturn}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">
                        {statusReturn(order?.returnStatus ,order?.returnDate,borrowDate)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button
                        disabled={order?.returnStatus}
                        variant="primary"
                        rounded="true"
                        onClick={() => handleOpen(order?.id)}
                      >
                        <FaRegEdit style={{ fontSize: "20px" }} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8}>
                <div className="d-flex justify-content-center align-items-center">
                  <NotFoundMessageComponent />
                </div>
              </td>
            </tr>
          )
        ) : (
          order &&
          order?.map((order) => {

            const formattedDateCreated = order?.borrowDate
              ? format(new Date(order?.borrowDate), "dd/MM/yyyy")
              : "";
            const formattedDateReturn = order?.returnDate
              ? format(new Date(order?.returnDate), "dd/MM/yyyy")
              : "Chưa trả";
            const bookArray = order?.BookNames
              ? order?.BookNames.split(",")
              : "không có gì";
            // console.log('bookArray',bookArray)
            const isbnArray = order?.ISBNNumbers
              ? order?.ISBNNumbers.split(",")
              : "không có gì";
            return (
              <tr key={order?.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1" title={order?.studentCode}>
                        {order?.studentCode}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1" title={order?.fullName}>
                        {order?.fullName}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  {bookArray?.map((items, index) => {
                    return (
                      <div key={index} className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1" title={items}>
                            {items}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </td>
                <td>
                  {isbnArray?.map((items, index) => {
                    return (
                      <div key={index} className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1" title={items}>
                            {items}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{formattedDateCreated}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{formattedDateReturn}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                       {statusReturn(order?.returnStatus ,order?.returnDate,borrowDate)}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <Button
                      disabled={order?.returnStatus}
                      variant="primary"
                      rounded="true"
                      onClick={() => handleOpen(order?.id)}
                    >
                      <FaRegEdit style={{ fontSize: "20px" }} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </MDBTableBody>
      {/* Modal */}
      <ModalComponent
        refetchBook={refetchBook}
        status={status}
        setStatus={setStatus}
        setOrderItems={setOrderItems}
        detailStudent={detailStudent}
        orderId={orderId}
        orderItems={orderItems}
        borrowDate={borrowDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        order={order}
        refetch={refetch}
        basicModal={basicModal}
        toggleOpen={toggleOpen}
        statusReturn={statusReturn}
      />
    </>
  );
};

export default ManageOrderComponent;
