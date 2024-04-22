import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addAuthor, getAllAuthor } from "../../services/AuthorService";
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

const ManageAuthorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("pages");
  const limit = searchParams.get("limits");
  const [authorName, setAuthorName] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const getAllAuthors = async () => {
    const res = await getAllAuthor(limit, page - 1);
    return res.data;
  };
  const { data: author, refetch } = useQueryHook(
    ["author", page],
    getAllAuthors
  );
  console.log(author);
  useEffect(() => {
    if (author?.data.length === 0) {
      navigate(`/manage-author?pages=${Math.max(page - 1, 1)}&limits=${limit}`);
    }
    console.log("UseEffect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [author, page]);
  const onSuccessFn = (data, mes) => {
    refetch();
    success(mes);
  };
  const onErrorFn = (data, mes) => {
    error(mes);
  };

  const muationAdd = useMutationHook(
    (data) => addAuthor(data),
    (data) => onSuccessFn(data, "Tạo tác giả thành công"),
    (data) => onErrorFn(data, "Tên tác giả đã tồn tại")
  );
  const handleAdd = (event) => {
    event.preventDefault();
    if (!authorName) {
      return alert(`Vui lòng nhập đủ thông tin`);
    }
    muationAdd.mutate({ authorName });
    toggleOpen();
  };
  return (
    <div>
      <div
        className="d-flex flex-column"
        style={{ padding: "0 20px", gap: "25px" }}
      >
        <h1 style={{ fontFamily: "inherit", fontSize: "24px", margin: "10px" }}>
          Quản lý tác giả
        </h1>
        <div className="d-flex justify-content-end">
          <Button onClick={toggleOpen}>Thêm tác giả</Button>
        </div>
        <div className="d-flex flex-column">
          <TableComponent author={author?.data} refetch={refetch} />
          <div className="d-flex justify-content-end">
            <PaginationComponent
              isAuthor={true}
              totalPage={author?.totalPage}
              pageCurrent={author?.pageCurrent}
              limit={limit}
            />
          </div>
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
                <MDBModalTitle>Thêm tác giả</MDBModalTitle>
                <Button
                  className="btn-close"
                  color="none"
                  onClick={toggleOpen}
                ></Button>
              </MDBModalHeader>
              <MDBModalBody>
                {/* <MDBFile label="Default file input example" id="customFile" /> */}
                <MDBInput
                  onChange={(e) => setAuthorName(e.target.value)}
                  label="Tên tác giả"
                  id="authorName1"
                  type="text"
                />
              </MDBModalBody>

              <MDBModalFooter>
                <Button variant="outline-secondary" onClick={toggleOpen}>
                  Close
                </Button>
                <Button onClick={handleAdd}>Save changes</Button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
    </div>
  );
};

export default ManageAuthorPage;
