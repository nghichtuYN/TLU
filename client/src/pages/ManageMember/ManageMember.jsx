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
  MDBFile,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import TableComponent from "../../components/TableComponent/TableComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import { FaBookOpen } from "react-icons/fa";
import { SearchComponent } from "../../components/SearchComponent/SearchComponent";
import { getAllUser, getMemberFilter } from "../../services/AdminService";
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
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const getMemberFilters = (searchValue) => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const res = await getMemberFilter(5, page - 1, searchValue);
        setFilterMember(res.data);
        if (filterMember.length===0 || filterMember?.totalPage <= 1) {
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
  const { data: member, refetch } = useQueryHook(["member", page], getAllMember);
  useEffect(() => {
    if (member?.data?.length === 0) {
      navigate(`/manage-book?pages=${Math.max(page - 1, 1)}&limits=${limit}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (searchValue !== "") {
      getMemberFilters(searchValue);
    }
    if (searchValue === "") {
      setFilterMember([]);
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member, page, searchValue]);
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
      {/* <div>
        <MDBModal
          open={basicModal}
          setOpen={setBasicModal}
          staticBackdrop={true}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Thêm Sách</MDBModalTitle>
                <Button
                  className="btn-close"
                  color="none"
                  onClick={() => {
                    toggleOpen();
                    clearBookFields();
                  }}
                ></Button>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span>Tên sách</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBInput
                      onChange={(e) => setBookName(e.target.value)}
                      value={bookName}
                      id="bookName"
                      type="text"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span>Danh mục</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      value={categoryName}
                      style={{
                        width: "100%",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      onChange={(e) => {
                        const selectedCat = categoryList?.data.find(
                          (cat) => cat?.categoryName === e.target.value
                        );
                        if (selectedCat) {
                          setCatId(selectedCat.id);
                          setCategoryName(selectedCat.categoryName);
                        } else {
                          setCatId("");
                          setCategoryName(e.target.value);
                        }
                      }}
                    >
                      <option value="">--Chọn danh mục--</option>
                      {categoryList?.data.map((cat) => (
                        <option key={cat?.id} value={cat?.categoryName}>
                          {cat?.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col">
                    <label>
                      <span>Tác giả</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      type="select"
                      value={authorName}
                      style={{
                        width: "100%",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      onChange={(e) => {
                        const selectedAuthor = authorList?.data.find(
                          (author) => author.authorName === e.target.value
                        );
                        if (selectedAuthor) {
                          setAuthorId(selectedAuthor.id);
                          setAuthorName(selectedAuthor.authorName);
                        } else {
                          setAuthorId("");
                          setAuthorName(e.target.value);
                        }
                      }}
                    >
                      <option value="">--Chọn tác giả--</option>
                      {authorList?.data.map((author) => (
                        <option key={author?.id} value={author?.authorName}>
                          {author?.authorName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span>ISBN</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBInput
                      value={ISBNNumber}
                      onChange={(e) => setISBN_Number(e.target.value)}
                      id="ISBN"
                      type="text"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span>Đính kèm ảnh</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBFile
                      id="customFile"
                      onChange={(e) => setBookImage(e.target.files[0])}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span> Giá</span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBInput
                      value={bookPrice}
                      onChange={(e) => setBookPrice(e.target.value)}
                      id="bookPrice"
                      type="number"
                      min={0}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label>
                      <span> Số lượng </span>
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <MDBInput
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      id="bookQuantity"
                      type="number"
                      min={0}
                    />
                  </div>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    toggleOpen();
                    clearBookFields();
                  }}
                >
                  Close
                </Button>
                <Button onClick={handleAdd}>Save changes</Button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div> */}
    </div>
  )
}

export default ManageMember