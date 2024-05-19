import React, { useState } from "react";
import { MDBTableBody, MDBBadge } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import ModalComponent from "../ModalComponent/ModalComponent";
import { useMutationHook } from "../../Hook/useMutationHook";
import { error, success } from "../MessageComponent/MessageComponent";
import { deleteStudent } from "../../services/StudentService";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import NotFoundMessageComponent from "../NotFoundMessageComponent/NotFoundMessageComponent";
const ManageStudentComponent = (props) => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(false);
  const { student, refetch, filterStudent, searchValue,getStudentFilters } = props;
  const [studentId, setStudentId] = useState(0);
  const [studentCode, setStudentCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleOpen = (id) => {
    setBasicModal(true);
    if (student) {
      const selectedStudent = filterStudent
        ? filterStudent.find((student) => student?.id === id)
        : student?.find((student) => student?.id === id);
      if (selectedStudent) {
        setStudentId(selectedStudent?.id);
        setFullName(selectedStudent?.fullName);
        setEmail(selectedStudent?.email);
        setMobileNumber(selectedStudent?.mobileNumber);
        setStudentCode(selectedStudent?.studentCode);
        setStatus(selectedStudent?.status);
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
    if (student) {
      return deleteStudent(id);
    }
  };
  const mutationDelete = useMutationHook(
    deleteRow,
    (data) => onSuccessFn(data, "Xóa thành công"),
    (data) => onErrorfn(data, "Xóa thất bại")
  );
  const handleDelete = (id) => {
    if (student) {
      mutationDelete.mutate(id);
    }
  };
  console.log(searchValue)
  return (
    <>
      <MDBTableBody>
        {searchValue !== "" ? (
          filterStudent && filterStudent?.length > 0 ? (
            filterStudent?.map((student) => {
              const formattedDateCreated = student?.created_at
                ? format(new Date(student?.created_at), "dd/MM/yyyy")
                : "";
              return (
                <tr key={student?.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p
                          className="fw-bold mb-1"
                          title={student?.studentCode}
                        >
                          {student?.studentCode}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={student?.fullName}>
                          {student?.fullName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={student?.email}>
                          {student?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p
                          className="fw-bold mb-1"
                          title={student?.mobileNumber}
                        >
                          {student?.mobileNumber}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{formattedDateCreated}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center ">
                      {student?.status ? (
                        <MDBBadge color="success" pill>
                          Active
                        </MDBBadge>
                      ) : (
                        <MDBBadge color="danger" pill>
                          Inactive
                        </MDBBadge>
                      )}
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      rounded="true"
                      onClick={() => handleOpen(student?.id)}
                    >
                      <FaRegEdit style={{ fontSize: "20px" }} />
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="danger"
                      rounded="true"
                      onClick={() => handleDelete(student?.id)}
                    >
                      <MdDeleteForever style={{ fontSize: "20px" }} />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7}>
                <div className="d-flex justify-content-center align-items-center">
                  <NotFoundMessageComponent />
                </div>
              </td>
            </tr>
          )
        ) : (
          student &&
          student?.map((student) => {
            const formattedDateCreated = student?.created_at
              ? format(new Date(student?.created_at), "dd/MM/yyyy")
              : "";
            return (
              <tr key={student?.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1" title={student?.studentCode}>
                        {student?.studentCode}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1" title={student?.fullName}>
                        {student?.fullName}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1" title={student?.email}>
                        {student?.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1" title={student?.mobileNumber}>
                        {student?.mobileNumber}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{formattedDateCreated}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center ">
                    {student?.status ? (
                      <MDBBadge color="success" pill>
                        Active
                      </MDBBadge>
                    ) : (
                      <MDBBadge color="danger" pill>
                        Inactive
                      </MDBBadge>
                    )}
                  </div>
                </td>
                <td>
                  <Button
                    variant="primary"
                    rounded="true"
                    onClick={() => handleOpen(student?.id)}
                  >
                    <FaRegEdit style={{ fontSize: "20px" }} />
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="danger"
                    rounded="true"
                    onClick={() => handleDelete(student?.id)}
                  >
                    <MdDeleteForever style={{ fontSize: "20px" }} />
                  </Button>
                </td>
              </tr>
            );
          })
        )}
      </MDBTableBody>
      {/* Modal */}
      <ModalComponent
        studentId={studentId}
        setStudentId={setStudentId}
        studentCode={studentCode}
        setStudentCode={setStudentCode}
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        setEmail={setEmail}
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        student={student}
        status={status}
        setStatus={setStatus}
        refetch={refetch}
        basicModal={basicModal}
        toggleOpen={toggleOpen}
        searchValue={searchValue}
        getStudentFilters={getStudentFilters}
      />
    </>
  );
};

export default ManageStudentComponent;
