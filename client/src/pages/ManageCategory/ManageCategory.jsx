import TableComponent from "../../components/TableComponent/TableComponent";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  // MDBFile,
  MDBRadio,
} from "mdb-react-ui-kit";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import { addCategory, getAllCategories } from "../../services/CategoryService";
import { useLocation } from "react-router-dom";
import { useMutationHook, useQueryHook } from "../../Hook/useMutationHook";
import {
  error,
  success,
} from "../../components/MessageComponent/MessageComponent";
import { useNavigate } from "react-router-dom";

const ManageCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("pages");
  const limit = searchParams.get("limits");
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);

  const getAllCategory = async () => {
    const res = await getAllCategories(limit, page - 1);
    return res.data;
  };
  const { data: category, refetch } = useQueryHook(
    ["category", page],
    getAllCategory
  );
  useEffect(() => {
    if (category?.data.length === 0) {
      navigate(
        `/manage-category?pages=${Math.max(page - 1, 1)}&limits=${limit}`
      );
    }
    console.log("UseEffect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page]);
  const onSuccessFn = (data, mes) => {
    refetch();
    success(mes);
  };
  const onErrorFn = (data, mes) => {
    error(mes);
  };
  const muationAdd = useMutationHook(
    (data) => addCategory(data),
    (data) => onSuccessFn(data, "Tạo danh mục thành công"),
    (data) => onErrorFn(data, "Tên danh mục đã tồn tại")
  );
  const handleAdd = (event) => {
    event.preventDefault();
    if (!categoryName || !status) {
      return alert(`Vui lòng nhập đủ thông tin`);
    }
    muationAdd.mutate({ categoryName, status });
    toggleOpen();
  };
  return (
    <div>
      <div
        className="d-flex flex-column"
        style={{ padding: "0 20px", gap: "25px" }}
      >
        <h1 style={{ fontFamily: "inherit", fontSize: "24px", margin: "10px" }}>
          Quản lý Danh mục
        </h1>
        <div className="d-flex justify-content-end">
          <Button onClick={toggleOpen}>Thêm Danh mục</Button>
        </div>
        <div className="d-flex flex-column">
          <TableComponent  category={category?.data} refetch={refetch} />
          <div className="d-flex justify-content-end">
            <PaginationComponent
            isCategory={true}
              totalPage={category?.totalPage}
              pageCurrent={category?.pageCurrent}
              limit={limit}
            />
          </div>
        </div>
      </div>
      <div>
        <MDBModal open={basicModal} setOpen={setBasicModal}
            staticBackdrop={true}
            tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Thêm danh mục</MDBModalTitle>
                <Button
                  className="btn-close"
                  color="none"
                  onClick={toggleOpen}
                ></Button>
              </MDBModalHeader>
              <MDBModalBody>
                {/* <MDBFile label="Default file input example" id="customFile" /> */}
                <MDBInput
                  onChange={(e) => setCategoryName(e.target.value)}
                  label="Tên danh mục"
                  id="categoryName1"
                  type="text"
                />
                <MDBRadio
                  name="inlineRadio"
                  id="inlineRadio3"
                  value="false"
                  label="Ẩn"
                  onChange={(e) => setStatus(e.target.value)}
                  inline
                />
                <MDBRadio
                  name="inlineRadio"
                  id="inlineRadio"
                  value="true"
                  onChange={(e) => setStatus(e.target.value)}
                  label="Kích hoạt"
                  inline
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

export default ManageCategory;
