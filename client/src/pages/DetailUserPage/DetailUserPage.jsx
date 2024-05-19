import React, { useEffect, useState } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { FaEnvelope } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidUser } from "react-icons/bi";
import { FaPhone } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { updateMember } from "../../redux/Slice/MemberSlice";
import {
  error,
  success,
} from "../../components/MessageComponent/MessageComponent";
import logo from "../../asset/logo/Logo.png";
import { Button } from "react-bootstrap";
import {
  checkPassword,
  getDetailsUser,
  updatelUser,
} from "../../services/AdminService";
import { useMutationHook } from "../../Hook/useMutationHook";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.css";
const DetailUserPage = () => {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.member);
  const [showPassword, setShowPassWord] = useState(false);
  const [showPasswordNew, setShowPassWordNew] = useState(false);
  const [showPasswordRenew, setShowPassWordRenew] = useState(false);

  const [fullName, setFullName] = useState(member?.fullName);
  const [email, setEmail] = useState(member?.email);
  const [userName, setUserName] = useState(member?.userName);
  const [password, setPassword] = useState(member?.password);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const [mobileNumber, setMobileNumber] = useState(member?.mobileNumber);
  const handleShowPasswrond = () => {
    setShowPassWord(!showPassword);
  };
  const handleShowPasswrordRenew = () => {
    setShowPassWordRenew(!showPasswordRenew);
  };
  const handleShowPasswrordNew = () => {
    setShowPassWordNew(!showPasswordNew);
  };

  const handleGetDetailUser = async (id, token) => {
    const res = await getDetailsUser(id, token);
    console.log("res", res.data);
    dispatch(updateMember({ ...res?.data, access_token: token }));
  };
  const initialValues = {
    fullName: member?.fullName,
    email: member?.email,
    userName: member?.userName,
    mobileNumber: member?.mobileNumber,
  };
  const hasChanges =
    fullName !== initialValues.fullName ||
    email !== initialValues.email ||
    userName !== initialValues.userName ||
    mobileNumber !== initialValues.mobileNumber;

  const hasChangesPassword =
    oldPassword !== "" && newPassword !== "" && renewPassword !== "";

  const onSuccessFn = (data, mes) => {
    success(mes);
    handleGetDetailUser(member?.id, member?.access_token);
  };
  const onErrorFn = (data, mes) => {
    error(mes);
  };
  useEffect(() => {
    setFullName(member?.fullName);
    setEmail(member?.email);
    setUserName(member?.userName);
    setMobileNumber(member?.mobileNumber);
    setPassword(member?.password);
  }, [member]);
  const updateUsers = (data) => {
    const { id, ...rest } = data;
    return updatelUser(id, rest);
  };
  const mutationUpdate = useMutationHook(
    updateUsers,
    (data) => onSuccessFn(data, "Cập nhật thông tin thành công"),
    (data) => onErrorFn(data, "Cập nhật thông tin thất bại")
  );
  const handleUpdate = (event) => {
    event.preventDefault();
    mutationUpdate.mutate({
      id: member?.id,
      userName,
      fullName,
      email,
      password,
      isAdmin: member?.isAdmin,
      mobileNumber,
    });
  };
  const handleChangePassword = async (event) => {
    event.preventDefault();
    const checkOldPass = await checkPassword({
      password: oldPassword,
      id: member?.id,
    });
    if (checkOldPass?.status === "ERR") {
      alert(`Mật khẩu cũ không chính xác`);
      return;
    }
    if (newPassword !== renewPassword) {
      alert(`Mật khẩu nhập lại không chính xác`);
      return;
    }
    mutationUpdate.mutate({
      id: member?.id,
      userName,
      fullName,
      email,
      password: newPassword,
      isAdmin: member?.isAdmin,
      mobileNumber,
    });
    clearPassword()
    toggleOpen()
  };
  const clearPassword=()=>{
    setOldPassword("")
    setNewPassword("")
    setRenewPassword("")
  }
  return (
    <div
      className="d-flex flex-column"
      style={{ padding: "0 20px", gap: "25px" }}
    >
      <div className="d-flex justify-content-start align-items-center">
        <BiSolidUserDetail
          style={{
            fontSize: "30px",
            margin: "1px",
          }}
        />
        <h1 style={{ fontFamily: "inherit", fontSize: "24px", margin: "10px" }}>
          Thông tin người dùng
        </h1>
      </div>
      <MDBContainer fluid>
        <MDBCard
          className="text-black m-5"
          style={{ borderRadius: "25px", fontSize: "20px" }}
        >
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <div>
                  <label>Tên người dùng</label>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <BiSolidUserDetail
                      style={{ fontSize: "20px" }}
                      className="me-3"
                    />
                    <MDBInput
                      id="form2"
                      type="text"
                      value={fullName}
                      style={{ fontSize: "16px" }}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label>Email</label>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <FaEnvelope style={{ fontSize: "20px" }} className="me-3" />
                    <MDBInput
                      id="form2"
                      type="email"
                      value={email}
                      style={{ fontSize: "16px" }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label>Tên đăng nhập</label>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <BiSolidUser
                      style={{ fontSize: "20px" }}
                      className="me11-3"
                    />
                    <MDBInput
                      id="form3"
                      type="text"
                      value={userName}
                      style={{ fontSize: "16px" }}
                      onChange={(e) => setUserName(e.target.value)}
                      disabled={true}
                    />
                  </div>
                </div>

                <div>
                  <label>Số điện thoại</label>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <FaPhone style={{ fontSize: "20px" }} className="me-3" />
                    <MDBInput
                      id="form3"
                      type="phone"
                      value={mobileNumber}
                      style={{ fontSize: "16px" }}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    className="mb-4 me-2"
                    size="lg"
                    onClick={handleUpdate}
                    disabled={!hasChanges}
                  >
                    Lưu thay đổi
                  </Button>
                  <Button
                    className="mb-4"
                    size="lg"
                    onClick={toggleOpen}
                    // disabled={!hasChanges}
                  >
                    Đổi mật khẩu
                  </Button>
                </div>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center justify-content-center"
              >
                <MDBCardImage
                  style={{ width: "200px", height: "300px" }}
                  src={logo}
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
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
                <MDBModalTitle>Đổi mật khẩu</MDBModalTitle>
                <Button
                  className="btn-close"
                  color="none"
                  onClick={() => {
                    toggleOpen();
                    clearPassword()
                  }}
                ></Button>
              </MDBModalHeader>
              <MDBModalBody>
                <div className=" flex-column justify-content-center align-items-center">
                  <div>
                    <label>Mật khẩu cũ</label>
                    <div
                      className="d-flex flex-row align-items-center mb-4"
                      style={{ width: "100%" }}
                    >
                      <RiLockPasswordFill
                        style={{ fontSize: "20px" }}
                        className="me-3"
                      />
                      <div className="position-relative">
                        <MDBInput
                          id="form3"
                          type={showPassword ? "text" : "password"}
                          style={{ width: "100%" }}
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="Nhập mật khẩu cũ"
                        />
                        {oldPassword ? (
                          <span
                            onClick={handleShowPasswrond}
                            className="password-toggle-icon-details"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <label>Mật khẩu mới</label>
                  <div
                    className="d-flex flex-row  align-items-center mb-4"
                    style={{ width: "100%" }}
                  >
                    <RiLockPasswordFill
                      style={{ fontSize: "20px" }}
                      className="me-3"
                    />
                    <div className="position-relative">
                      <MDBInput
                        id="form3"
                        type={showPasswordNew ? "text" : "password"}
                        style={{ flex: 1 }}
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      {newPassword ? (
                        <span
                          onClick={handleShowPasswrordNew}
                          className="password-toggle-icon-details"
                        >
                          {showPasswordNew ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <label>Xác nhận lại mật khẩu mới</label>
                  <div
                    className="d-flex flex-row align-items-center mb-4"
                    style={{ width: "100%" }}
                  >
                    <RiLockPasswordFill
                      style={{ fontSize: "20px" }}
                      className="me-3"
                    />
                    <div className="position-relative">
                      <MDBInput
                        id="form3"
                        type={showPasswordRenew ? "text" : "password"}
                        style={{ flex: 1 }}
                        placeholder="Nhập lại mật khẩu mới"
                        value={renewPassword}
                        onChange={(e) => setRenewPassword(e.target.value)}
                      />
                      {renewPassword ? (
                        <span
                          onClick={handleShowPasswrordRenew}
                          className="password-toggle-icon-details"
                        >
                          {showPasswordRenew ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    toggleOpen();
                    clearPassword()
                  }}
                >
                  Đóng
                </Button>
                <Button
                  onClick={handleChangePassword}
                  disabled={!hasChangesPassword}
                >
                  Đổi mật khẩu
                </Button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </div>
  );
};

export default DetailUserPage;
