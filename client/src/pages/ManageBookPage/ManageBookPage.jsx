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
import { addBook, getAllBooks } from "../../services/BookService";
import { getAllAuthor } from "../../services/AuthorService";
import { getAllCategories } from "../../services/CategoryService";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import { FaBookOpen } from "react-icons/fa";

const ManageBookPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("pages");
  const limit = searchParams.get("limits");
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const [authorName, setAuthorName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [ISBNNumber, setISBN_Number] = useState("");
  const [bookName, setBookName] = useState("");
  const [category_id, setCatId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [bookPrice, setBookPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const getAllBook = async () => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await getAllBooks(limit, page - 1);
          setIsLoading(false);
          resolve(res.data);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  };
  const { data: book, refetch } = useQueryHook(["book", page], getAllBook);
  useEffect(() => {
    if (book?.data.length === 0) {
      navigate(`/manage-book?pages=${Math.max(page - 1, 1)}&limits=${limit}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book, page]);
  const getAllAuthors = async () => {
    const res = await getAllAuthor();
    return res.data;
  };
  const getAllCategory = async () => {
    const res = await getAllCategories();
    return res.data;
  };
  const { data: authorList } = useQueryHook(
    ["authorList", page],
    getAllAuthors
  );

  const { data: categoryList } = useQueryHook(
    ["categoryList", page],
    getAllCategory
  );
  const onSuccessFn = (data, mes) => {
    refetch();
    setIsLoading(false);
    success(mes);
  };
  const onErrorFn = (data, mes) => {
    setIsLoading(false);
    error(mes);
  };
  const muationAdd = useMutationHook(
    (data) => addBook(data),
    (data) => onSuccessFn(data, "Tạo sách thành công"),
    (data) => onErrorFn(data, "Tên sách đã tồn tại")
  );
  const handleAdd = (event) => {
    event.preventDefault();
    if (
      !bookName ||
      !authorName ||
      !categoryName ||
      !bookImage ||
      !ISBNNumber ||
      !bookPrice ||
      !quantity
    ) {
      return alert(`Vui lòng nhập đủ thông tin`);
    }
    const formData = new FormData();
    formData.append("bookName", bookName);
    formData.append("bookImage", bookImage);
    formData.append("bookPrice", bookPrice);
    formData.append("ISBNNumber", ISBNNumber);
    formData.append("category_id", category_id);
    formData.append("authorId", authorId);
    formData.append("isBorrowed", 0);
    formData.append("quantity", quantity);
    muationAdd.mutate(formData);
    toggleOpen();
  };
  const clearBookFields = () => {
    setBookName("");
    setCategoryName("");
    setCatId("");
    setAuthorName("");
    setAuthorId("");
    setBookImage("");
    setBookPrice(0);
    setISBN_Number("");
    setQuantity(0);
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
            Quản lý Sách
          </h1>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              toggleOpen();
              clearBookFields();
            }}
          >
            Thêm Sách
          </Button>
        </div>
        <div className="d-flex flex-column">
          {isLoading ? (
            <SpinnerComponent />
          ) : (
            <div>
              <TableComponent
                categoryList={categoryList?.data}
                authorList={authorList?.data}
                book={book?.data}
                refetch={refetch}
              />
              <div className="d-flex justify-content-end">
                <PaginationComponent
                  isBook={true}
                  totalPage={book?.totalPage}
                  pageCurrent={book?.pageCurrent}
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
                <label>
                  <span>Tên sách</span>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <MDBInput
                  onChange={(e) => setBookName(e.target.value)}
                  id="bookName"
                  type="text"
                  wrapperClass="mb-4"
                />
                <label>
                  <span>Danh mục</span>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <MDBInput
                  type="text"
                  value={categoryName}
                  wrapperClass="mb-4"
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
                  list="optionsCat"
                />
                <datalist id="optionsCat">
                  {categoryList?.data.map((cat) => (
                    <option key={cat?.id} value={cat?.categoryName} />
                  ))}
                </datalist>
                <label>
                  <span>Tác giả</span>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <MDBInput
                  wrapperClass="mb-4"
                  type="text"
                  value={authorName}
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
                  list="optionAuthor"
                />
                <datalist id="optionAuthor">
                  {authorList?.data.map((author) => (
                    <option key={author?.id} value={author?.authorName} />
                  ))}
                </datalist>
                <label>
                  <span>ISBN</span>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <MDBInput
                  wrapperClass="mb-4"
                  onChange={(e) => setISBN_Number(e.target.value)}
                  id="ISBN"
                  type="text"
                />
                <label>
                  <span>Đính kèm ảnh</span>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <MDBFile
                  id="customFile"
                  onChange={(e) => setBookImage(e.target.files[0])}
                  wrapperClass="mb-5"
                  required
                />
                <label>
                  <span> Giá</span>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <MDBInput
                  wrapperClass="mb-4"
                  onChange={(e) => setBookPrice(e.target.value)}
                  id="bookPrice"
                  type="number"
                />
                <label>
                  <span> Số lượng </span>
                  <span style={{ color: "red" }}>*</span>
                </label>
                <MDBInput
                  wrapperClass="mb-4"
                  onChange={(e) => setQuantity(e.target.value)}
                  id="bookQuantity"
                  type="number"
                />
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
      </div>
    </div>
  );
};

export default ManageBookPage;
