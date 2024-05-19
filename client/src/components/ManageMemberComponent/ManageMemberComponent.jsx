import React, { useState } from "react";
import { MDBTableBody } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { useMutationHook } from "../../Hook/useMutationHook";
import { error, success } from "../MessageComponent/MessageComponent";
import { FaRegEdit } from "react-icons/fa";
import NotFoundMessageComponent from "../NotFoundMessageComponent/NotFoundMessageComponent";

import { MdDeleteForever } from "react-icons/md";
import ModalComponent from "../ModalComponent/ModalComponent";

const ManageMemberComponent = (props) => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(false);
  const { member, filterMember, refetch, searchValue } = props;
  const onSuccessFn = (data, mes) => {
    refetch();
    success(mes);
  };
  const onErrorfn = (data, mes) => {
    error(mes);
  };
  const handleOpen = (id) => {};
  const deleteRow = (id) => {};

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
                      // onClick={() => handleDelete(member?.id)}
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
      {/* Modal */}
      {/* <ModalComponent
      quantity={quantity}
      setQuantity={setQuantity}
      isBorrowed={isBorrowed}
      member={member}
      authorName={authorName}
      authorId={authorId}
      setAuthorName={setAuthorName}
      setAuthID={setAuthID}
      category_id={category_id}
      categoryName={categoryName}
      setCategoryName={setCategoryName}
      memberImage={memberImage}
      setCatID={setCatID}
      setmemberImage={setmemberImage}
      ISBNNumber={ISBNNumber}
      setISBN_Number={setISBN_Number}
      memberName={memberName}
      setmemberName={setmemberName}
      memberID={memberID}
      setmemberID={setmemberID}
      memberPrice={memberPrice}
      setmemberPrice={setmemberPrice}
      categoryList={categoryList}
      authorList={authorList}
      refetch={refetch}
      basicModal={basicModal}
      toggleOpen={toggleOpen}
    /> */}
    </>
  );
};

export default ManageMemberComponent;
