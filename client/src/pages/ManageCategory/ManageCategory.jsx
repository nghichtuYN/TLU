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
  MDBRadio,
} from "mdb-react-ui-kit";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import {
  addCategory,
  getAllCategories,
  getFilterCategory,
} from "../../services/CategoryService";
import { useLocation } from "react-router-dom";
import { useMutationHook, useQueryHook } from "../../Hook/useMutationHook";
import {
  error,
  success,
} from "../../components/MessageComponent/MessageComponent";
import { useNavigate } from "react-router-dom";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import { BiSolidCategory } from "react-icons/bi";
import { SearchComponent } from "../../components/SearchComponent/SearchComponent";

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
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const getAllCategory = () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await getAllCategories(limit, page - 1);
          setIsLoading(false);
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  };
  const { data: category, refetch } = useQueryHook(
    ["category", page],
    getAllCategory
  );
  const getCategoriesFilter = (searchValue) => {
    setIsLoading(true);
    setTimeout(async () => {
      const res = await getFilterCategory(5, page - 1, searchValue);
      setFilterCategory(res.data);
      if (filterCategory?.length === 0 || filterCategory?.totalPage <= 1) {
        navigate(`/manage-category?pages=${1}&limits=${limit}`);
      }
      setIsLoading(false);
    }, 500);
  };
  useEffect(() => {
    if (category?.data.length === 0) {
      navigate(
        `/manage-category?pages=${Math.max(page - 1, 1)}&limits=${limit}`
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page]);
  useEffect(() => {
    if (searchValue !== "") {
      getCategoriesFilter(searchValue);
    }
    if (searchValue === "") {
      setFilterCategory([]);
      refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
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
        <div className="d-flex justify-content-start align-items-center">
          <BiSolidCategory
            style={{
              fontSize: "20px",
              margin: "1px",
            }}
          />
          <h1
            style={{ fontFamily: "inherit", fontSize: "24px", margin: "10px" }}
          >
            Quản lý Danh mục
          </h1>
        </div>
        <div className="d-flex justify-content-end">
          <Button onClick={toggleOpen}>Thêm Danh mục</Button>
        </div>
        <div className="d-flex flex-column">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <SearchComponent
                value={searchValue}
                onChange={onChange}
                placeholder={"Tìm kiếm danh mục"}
              />
            </div>
            {filterCategory && filterCategory?.data?.length > 0 ? (
              <p style={{ fontSize: "20px" }}>
                {filterCategory?.total} kết quả
              </p>
            ) : null}
          </div>
          {isLoading ? (
            <SpinnerComponent />
          ) : (
            <div>
              <TableComponent
                category={category?.data}
                filterCategory={filterCategory?.data}
                searchValue={searchValue}
                refetch={refetch}
                getCategoriesFilter={getCategoriesFilter}
              />
              <div className="d-flex justify-content-end">
                <PaginationComponent
                  isCategory={true}
                  totalPage={
                    filterCategory?.length === 0
                      ? category?.totalPage
                      : filterCategory?.totalPage
                  }
                  pageCurrent={
                    filterCategory?.length === 0
                      ? category?.pageCurrent
                      : filterCategory?.pageCurrent
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
                <MDBModalTitle>Thêm danh mục</MDBModalTitle>
                <Button
                  className="btn-close"
                  color="none"
                  onClick={toggleOpen}
                ></Button>
              </MDBModalHeader>
              <MDBModalBody>
                <label className="mb-1">
                  <span>Tên danh mục</span>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <MDBInput
                  onChange={(e) => setCategoryName(e.target.value)}
                  wrapperClass="mb-4"
                  id="categoryName1"
                  type="text"
                />
                <label>
                  <span>Trạng thái</span>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <MDBRadio
                  name="inlineRadio"
                  id="inlineRadio3"
                  value="false"
                  label="Ẩn"
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ marginLeft: "3px" }}
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
