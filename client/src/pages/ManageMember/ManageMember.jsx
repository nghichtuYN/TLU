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
  MDBRadio
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import TableComponent from "../../components/TableComponent/TableComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import { FaBookOpen } from "react-icons/fa";
import { SearchComponent } from "../../components/SearchComponent/SearchComponent";
import {
  getAllUser,
  getMemberFilter,
  signUpMember,
} from "../../services/AdminService";
const ManageMember = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("pages");
  const limit = searchParams.get("limits");
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const [isLoading, setIsLoading] = useState(false);
  const [filterMember, setFilterMember] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [userName,setUserName]=useState("")
  const [fullName,setFullName]=useState("")
  const [password,setPassword]=useState("")
  const [repeatPassword,setRepeatPassword]=useState("")
  const [mobileNumber,setMobileNumber]=useState("")
  const[isAdmin,setIsAdmin]=useState("")
const [email,setEmail]=useState("")
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const getMemberFilters = (searchValue) => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const res = await getMemberFilter(5, page - 1, searchValue);
        setFilterMember(res.data);
        if (filterMember.length === 0 || filterMember?.totalPage <= 1) {
          navigate(`/manage-member?pages=${1}&limits=${limit}`);
        }
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllMember = async () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await getAllUser(limit, page - 1);
          setIsLoading(false);
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  };
  const { data: member, refetch } = useQueryHook(
    ["member", page],
    getAllMember
  );
  useEffect(() => {
    if (member?.data?.length === 0) {
      navigate(`/manage-book?pages=${Math.max(page - 1, 1)}&limits=${limit}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member, page, searchValue]);
  useEffect(() => {
    if (searchValue !== "") {
      getMemberFilters(searchValue);
    }
    if (searchValue === "") {
      setFilterMember([]);
      refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchValue])
  const signUpMembers = (data) => {
    return signUpMember(data);
  };
  const mutationAdd = useMutationHook(
    signUpMembers,
    (data) => onSuccessFn(data, "Tạo thủ thư thành công"),
    (data) => onErrorFn(data, "Tên tên đăng nhập đã tồn tại")
  );
  const onSuccessFn = (data, mes) => {
    refetch();
    setIsLoading(false);
    // clearBookFields();
    success(mes);
  };
  const onErrorFn = (data, mes) => {
    setIsLoading(false);
    error(mes);
  };
  const handleAdd=(event)=>{
    event.preventDefault();
    if(!fullName || !isAdmin || !userName || !password || !repeatPassword ||!email||!mobileNumber){
      return alert(`Vui lòng nhập đủ thông tin`);

    }
    if(password !==repeatPassword){
      return alert(`Mật khẩu nhập lại không chính xác`);

    }
    mutationAdd.mutate({fullName,email,userName,password,mobileNumber,isAdmin,confirmPassword: repeatPassword})
    toggleOpen()
  }
  return (
    <div>
      <div
        className="d-flex flex-column"
        style={{ padding: "0 20px", gap: "25px" }}
      >
        <div className="d-flex justify-content-start align-items-center">
          <FaBookOpen
            style={{
              fontSize: "20px",
              margin: "1px",
            }}
          />
          <h1
            style={{ fontFamily: "inherit", fontSize: "24px", margin: "10px" }}
          >
            Quản lý Thủ thư
          </h1>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              toggleOpen();
              // clearBookFields();
            }}
          >
            Thêm thủ thư
          </Button>
        </div>
        <div className="d-flex flex-column">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <SearchComponent
                value={searchValue}
                onChange={onChange}
                placeholder={"Tìm kiếm thủ thư"}
              />
            </div>
            {filterMember && filterMember.data?.length > 0 ? (
              <p style={{ fontSize: "20px" }}>{filterMember?.total} kết quả</p>
            ) : null}
          </div>
          {isLoading ? (
            <SpinnerComponent />
          ) : (
            <div>
              <TableComponent
                member={member?.data}
                filterMember={filterMember?.data}
                refetch={refetch}
                searchValue={searchValue}
              />
              <div className="d-flex justify-content-end">
                <PaginationComponent
                  isMember={true}
                  totalPage={
                    filterMember?.length === 0
                      ? member?.totalPage
                      : filterMember?.totalPage
                  }
                  pageCurrent={
                    filterMember?.length === 0
                      ? member?.pageCurrent
                      : filterMember?.pageCurrent
                  }
                  limit={limit}
                />
              </div>
            </div>
          )}
        </div>
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
                <MDBModalTitle>Tạo thủ thư</MDBModalTitle>
                <Button
                  className="btn-close"
                  color="none"
                  onClick={() => {
                    toggleOpen();
                    // clearBookFields();
                  }}
                ></Button>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span>Họ và tên</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBInput
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                      id="fullName"
                      type="text"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span>Email</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBInput
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      id="email"
                      type="email"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span>Tên đăng nhập</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBInput
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                      id="userName"
                      type="text"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span>Mật khẩu</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBInput
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      id="password"
                      type="password"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span>Nhập lại mật khẩu</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBInput
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      value={repeatPassword}
                      id="repeatPassword"
                      type="password"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span>Số điện thoại</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBInput
                      onChange={(e) => setMobileNumber(e.target.value)}
                      value={mobileNumber}
                      id="mobileNumber"
                      type="phne"
                    />
                  </div>
                </div>
                <label>
                  <span>Thành viên quản trị</span>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <MDBRadio
                  name="inlineRadio"
                  id="inlineRadio3"
                  value="false"
                  label="Không"
                  onChange={(e) => setIsAdmin(e.target.value)}
                  style={{ marginLeft: "3px" }}
                  inline
                />
                <MDBRadio
                  name="inlineRadio"
                  id="inlineRadio"
                  value="true"
                  onChange={(e) => setIsAdmin(e.target.value)}
                  label="Có"
                  inline
                />
              </MDBModalBody>
              <MDBModalFooter>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    toggleOpen();
                    // clearBookFields();
                  }}
                >
                  Close
                </Button>
                <Button onClick={handleAdd}>Tạo thành viên</Button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </div>
  );
};

export default ManageMember;
