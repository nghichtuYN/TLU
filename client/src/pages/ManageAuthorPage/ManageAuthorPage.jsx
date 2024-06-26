import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  addAuthor,
  getAllAuthor,
  getFilterAuthor,
} from "../../services/AuthorService";
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
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import { SiComposer } from "react-icons/si";
import { SearchComponent } from "../../components/SearchComponent/SearchComponent";

const ManageAuthorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("pages");
  const limit = searchParams.get("limits");
  const [authorName, setAuthorName] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterAuthor, setFilterAuthor] = useState([]);
  const getAllAuthors = () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await getAllAuthor(limit, page - 1);
          setIsLoading(false);
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  };
  const { data: author, refetch } = useQueryHook(
    ["author", page],
    getAllAuthors
  );
  const getAuthorFilters = (searchValue) => {
    setIsLoading(true);
    setTimeout(async () => {
      const res = await getFilterAuthor(5, page - 1, searchValue);
      setFilterAuthor(res.data);
      if (filterAuthor?.length === 0 || filterAuthor?.totalPage <= 1) {
        navigate(`/manage-author?pages=${1}&limits=${limit}`);
      }
      setIsLoading(false);
    }, 500);
  };
  useEffect(() => {
    if (author?.data.length === 0) {
      navigate(`/manage-author?pages=${Math.max(page - 1, 1)}&limits=${limit}`);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [author, page,]);
 useEffect(()=>{
  if (searchValue) {
    getAuthorFilters(searchValue);
  }
  if (searchValue === "") {
    setFilterAuthor([]);
    refetch();
  }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[searchValue])
  const onSuccessFn = (data, mes) => {
    refetch();
    success(mes);
    setIsLoading(false);
  };
  const onErrorFn = (data, mes) => {
    error(mes);
    setIsLoading(false);
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
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div>
      <div
        className="d-flex flex-column"
        style={{ padding: "0 20px", gap: "25px" }}
      >
        <div className="d-flex justify-content-start align-items-center">
          <SiComposer
            style={{
              fontSize: "20px",
              margin: "10px",
              fontWeight: "bold",
            }}
          />
          <h1
            style={{ fontFamily: "inherit", fontSize: "24px", margin: "10px" }}
          >
            Quản lý tác giả
          </h1>
        </div>
        <div className="d-flex justify-content-end">
          <Button onClick={toggleOpen}>Thêm tác giả</Button>
        </div>
        <div className="d-flex flex-column">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <SearchComponent
                value={searchValue}
                onChange={onChange}
                placeholder={"Tìm kiếm tác giả"}
              />
            </div>
            {filterAuthor && filterAuthor.data?.length > 0 ? (
              <p style={{ fontSize: "20px" }}>{filterAuthor?.total} kết quả</p>
            ) : null}
          </div>
          {isLoading ? (
            <SpinnerComponent />
          ) : (
            <div>
              <TableComponent
                author={author?.data}
                filterAuthor={filterAuthor?.data}
                refetch={refetch}
                searchValue={searchValue}
                getAuthorFilters={getAuthorFilters}
              />
              <div className="d-flex justify-content-end">
                <PaginationComponent
                  isAuthor={true}
                  totalPage={
                    filterAuthor?.length === 0
                      ? author?.totalPage
                      : filterAuthor?.totalPage
                  }
                  pageCurrent={
                    filterAuthor?.length === 0
                      ? author?.pageCurrent
                      : filterAuthor?.pageCurrent
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
                <MDBModalTitle>Thêm tác giả</MDBModalTitle>
                <Button
                  className="btn-close"
                  color="none"
                  onClick={toggleOpen}
                ></Button>
              </MDBModalHeader>
              <MDBModalBody>
                <label className="mb-3">
                  <span>Tên tác giả</span>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <MDBInput
                  onChange={(e) => setAuthorName(e.target.value)}
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
