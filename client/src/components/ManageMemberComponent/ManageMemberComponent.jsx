import React from "react";
import { MDBTableBody } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { useMutationHook } from "../../Hook/useMutationHook";
import { error, success } from "../MessageComponent/MessageComponent";
import NotFoundMessageComponent from "../NotFoundMessageComponent/NotFoundMessageComponent";

import { MdDeleteForever } from "react-icons/md";
import { deleteMember } from "../../services/AdminService";

const ManageMemberComponent = (props) => {
  const { member, filterMember, refetch, searchValue } = props;
  const onSuccessFn = (data, mes) => {
    refetch();
    success(mes);
  };
  const onErrorfn = (data, mes) => {
    error(mes);
  };
  
  const deleteRow = (id) => {
    if (member) {
      return deleteMember(id);
    }
  };
  const mutationDelete = useMutationHook(
    deleteRow,
    (data) => onSuccessFn(data, "Xóa thành công"),
    (data) => onErrorfn(data, "Xóa thất bại")
  );
  const handleDelete = (id) => {
    if(member){
      mutationDelete.mutate(id)
    }
  };
  return (
    <>
      <MDBTableBody>
        {searchValue !== "" ? (
          filterMember && filterMember.length > 0 ? (
            filterMember?.map((member) => {
              return (
                <tr key={member?.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={member?.fullName}>
                          {member?.fullName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1" title={member?.email}>
                          {member?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex align-items-center "
                      title={member?.mobileNumber}
                    >
                      {member?.mobileNumber}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center  align-items-center">
                      <Button
                        style={{ marginLeft: "5px" }}
                        variant="danger"
                        rounded="true"
                        // onClick={() => handleDelete(member?.id)}
                      >
                        <MdDeleteForever style={{ fontSize: "20px" }} />
                      </Button>
                    </div>
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
          member &&
          member?.map((member) => {
            return (
              <tr key={member?.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1" title={member?.fullName}>
                        {member?.fullName}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1" title={member?.email}>
                        {member?.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    className="d-flex align-items-center "
                    title={member?.mobileNumber}
                  >
                    {member?.mobileNumber}
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center ">
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="danger"
                      rounded="true"
                      onClick={() => handleDelete(member?.id)}
                    >
                      <MdDeleteForever style={{ fontSize: "20px" }} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </MDBTableBody>
    </>
  );
};

export default ManageMemberComponent;
