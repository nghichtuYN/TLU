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
  MDBRadio,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import TableComponent from "../../components/TableComponent/TableComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import {
  addStudent,
  getAllStudents,
  getFilterStudentByCode,
} from "../../services/StudentService";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import { FaBookReader } from "react-icons/fa";
import { SearchComponent } from "../../components/SearchComponent/SearchComponent";

const ManageStudentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("pages");
  const limit = searchParams.get("limits");
  const [studentCode, setStudentCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [status, setStatus] = useState(0);
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStudent, setFilterStudent] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const getStudentFilters = async (searchValue) => {
    const res = await getFilterStudentByCode(5, page - 1, searchValue);
    setFilterStudent(res.data);
  };
  const getAllStudent = async () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await getAllStudents(limit, page - 1);
          setIsLoading(false);
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  };
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const { data: student, refetch } = useQueryHook(
    ["student", page],
    getAllStudent
  );
  useEffect(() => {
    if (student?.data.length === 0) {
      navigate(
        `/manage-student?pages=${Math.max(page - 1, 1)}&limits=${limit}`
      );
    }
    if (searchValue !== "") {
      getStudentFilters(searchValue);
      if (filterStudent?.totalPage <= 1) {
        navigate(`/manage-student?pages=${1}&limits=${limit}`);
      }
    }
    if (searchValue === "") {
      setFilterStudent([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student, page,searchValue,isLoading]);
  const onSuccessFn = (data, mes) => {
    refetch();
    success(mes);
  };
  const onErrorFn = (data, mes) => {
    error(mes);
  };
  const muationAdd = useMutationHook(
    (data) => addStudent(data),
    (data) => onSuccessFn(data, "Tạo độc giả thành công"),
    (data) => onErrorFn(data, "Độc giả đã tồn tại")
  );
  const handleAdd = (event) => {
    event.preventDefault();
    if (!studentCode || !fullName || !email || !mobileNumber || !status) {
      return alert(`Vui lòng nhập đủ thông tin`);
    }
    muationAdd.mutate({ studentCode, fullName, email, mobileNumber, status });
    toggleOpen();
  };
  return (
    <div>
      <div
        className="d-flex flex-column"
        style={{ padding: "0 20px", gap: "25px" }}
      >
        <div className="d-flex justify-content-start align-items-center">
          <FaBookReader
            style={{
              fontSize: "20px",
              margin: "10px",
            }}
          />
          <h1
            style={{ fontFamily: "inherit", fontSize: "24px", margin: "10px" }}
          >
            Quản lý Độc giả
          </h1>
        </div>
        <div className="d-flex justify-content-end">
          <Button onClick={toggleOpen}>Thêm độc giả</Button>
        </div>
        <div className="d-flex flex-column">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <SearchComponent
                value={searchValue}
                onChange={onChange}
                placeholder={"Tìm kiếm theo mã độc giả"}
              />
            </div>
            {filterStudent && filterStudent.data?.length > 0 ? (
              <p style={{ fontSize: "20px" }}>{filterStudent?.total} kết quả</p>
            ) : null}
          </div>
          {isLoading ? (
            <SpinnerComponent />
          ) : (
            <div>
              <TableComponent student={student?.data}
              filterStudent={filterStudent?.data}
              refetch={refetch} 
              searchValue={searchValue}/>
              <div className="d-flex justify-content-end">
                <PaginationComponent
                  isStudent={true}
                  totalPage={
                    filterStudent?.length===0 ?
                    student?.totalPage: filterStudent?.totalPage}
                  pageCurrent={filterStudent?.length===0 ? student?.pageCurrent:filterStudent?.pageCurrent}
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
                  <MDBModalTitle>Thêm độc giả</MDBModalTitle>
                  <Button
                    className="btn-close"
                    color="none"
                    onClick={toggleOpen}
                  ></Button>
                </MDBModalHeader>
                <MDBModalBody>
                  <label>
                    <span>Mã độc giả</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
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
                    onChange={(e) => setFullName(e.target.value)}
                    wrapperClass="mb-4"
                    id="fullName"
                    type="text"
                  />
                  <label>
                    <span>Email</span>
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <MDBInput
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
                    onChange={(e) => setMobileNumber(e.target.value)}
                    wrapperClass="mb-4"
                    id="mobileNumber"
                    type="phone"
                  />
                  <label>
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
                </MDBModalBody>

                <MDBModalFooter>
                  <Button variant="outline-secondary" onClick={toggleOpen}>
                    Close
                  </Button>
                  <Button onClick={handleAdd}>Thêm độc giả</Button>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </div>
      </div>
    </div>
  );
};

export default ManageStudentPage;
