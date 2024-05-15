import React, { useState } from "react";
import { MDBTableBody } from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import ModalComponent from "../ModalComponent/ModalComponent";
import { useMutationHook } from "../../Hook/useMutationHook";
import { error, success } from "../MessageComponent/MessageComponent";
import { deleteAuthor } from "../../services/AuthorService";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import NotFoundMessageComponent from "../NotFoundMessageComponent/NotFoundMessageComponent";
export const ManageAuthorComponent = (props) => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(false);
  const { author, refetch, searchValue, filterAuthor } = props;
  const [authorId, setAuthID] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const handleOpen = (id) => {
    setBasicModal(true);
    if (author) {
      const selectedAuthor = filterAuthor
        ? filterAuthor?.find((auth) => auth?.id === id)
        : author?.find((auth) => auth?.id === id);
      if (selectedAuthor) {
        setAuthID(selectedAuthor?.id);
        setAuthorName(selectedAuthor?.authorName);
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
    if (author) {
      return deleteAuthor(id);
    }
  };
  const mutationDelete = useMutationHook(
    deleteRow,
    (data) => onSuccessFn(data, "Xóa thành công"),
    (data) => onErrorfn(data, "Xóa thất bại")
  );
  const handleDelete = (id) => {
    if (author) {
      mutationDelete.mutate(id);
    }
  };
  return (
    <>
      <MDBTableBody>
        {searchValue !== "" ? (
          filterAuthor && filterAuthor?.length > 0 ? (
            filterAuthor?.map((author) => {
              const formattedDateCreated = format(
                new Date(author?.created_at),
                "dd/MM/yyyy"
              );
              const formattetDateUpdated = author?.updated_at
                ? format(new Date(author?.updated_at), "dd/MM/yyyy")
                : formattedDateCreated;
              return (
                <tr key={author?.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{author?.authorName}</p>
                      </div>
                    </div>
                  </td>
                  <td>{formattedDateCreated}</td>
                  <td>{formattetDateUpdated}</td>
                  <td>
                    <Button
                      variant="primary"
                      rounded="true"
                      onClick={() => handleOpen(author?.id)}
                    >
                      <FaRegEdit style={{ fontSize: "20px" }} />
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="danger"
                      rounded="true"
                      onClick={() => handleDelete(author?.id)}
                    >
                      <MdDeleteForever style={{ fontSize: "20px" }} />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>
                <div className="d-flex justify-content-center align-items-center">
                  <NotFoundMessageComponent />
                </div>
              </td>
            </tr>
          )
        ) : (
          author &&
          author?.map((author) => {
            const formattedDateCreated = format(
              new Date(author?.created_at),
              "dd/MM/yyyy"
            );
            const formattetDateUpdated = author?.updated_at
              ? format(new Date(author?.updated_at), "dd/MM/yyyy")
              : formattedDateCreated;
            return (
              <tr key={author?.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{author?.authorName}</p>
                    </div>
                  </div>
                </td>
                <td>{formattedDateCreated}</td>
                <td>{formattetDateUpdated}</td>
                <td>
                  <Button
                    variant="primary"
                    rounded="true"
                    onClick={() => handleOpen(author?.id)}
                  >
                    <FaRegEdit style={{ fontSize: "20px" }} />
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="danger"
                    rounded="true"
                    onClick={() => handleDelete(author?.id)}
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
        author={author}
        authorId={authorId}
        setAuthID={setAuthID}
        authorName={authorName}
        setAuthorName={setAuthorName}
        refetch={refetch}
        basicModal={basicModal}
        toggleOpen={toggleOpen}
      />
    </>
  );
};
