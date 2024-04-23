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
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import TableComponent from "../../components/TableComponent/TableComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import { addBook, getAllBooks } from "../../services/BookService";
import { getAllAuthor } from "../../services/AuthorService";
import { getAllCategories } from "../../services/CategoryService";
import { updateBook } from "../../redux/Slice/BookSlice";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  const getAllBook = async () => {
    const res = await getAllBooks(limit, page - 1);
    dispatch(updateBook({ book: res.data }));
    return res.data;
  };
  const { data: book, refetch } = useQueryHook(["book", page], getAllBook);
  useEffect(() => {
    if (book?.data.length === 0) {
      navigate(`/manage-book?pages=${Math.max(page - 1, 1)}&limits=${limit}`);
      console.log("UseEffect");
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
    success(mes);
  };
  const onErrorFn = (data, mes) => {
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
      !bookPrice
    ) {
      return alert(`Vui lòng nhập đủ thông tin`);
    }
    muationAdd.mutate({
      bookName,
      category_id,
      authorId,
      bookImage,
      ISBNNumber,
      bookPrice,
      isBorrowed: "false",
    });
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
  };
  return (
    <div>
      <div
        className="d-flex flex-column"
        style={{ padding: "0 20px", gap: "25px" }}
      >
        <h1 style={{ fontFamily: "inherit", fontSize: "24px", margin: "10px" }}>
          Quản lý Sách
        </h1>
        <div className="d-flex justify-content-end">
          <Button onClick={toggleOpen}>Thêm Sách</Button>
        </div>
        <div className="d-flex flex-column">
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
                  onClick={toggleOpen}
                ></Button>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  onChange={(e) => setBookName(e.target.value)}
                  label={
                    <div>
                      <span>Tên sách</span>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                  }
                  id="bookName"
                  type="text"
                  wrapperClass="mb-4"
                />
                <MDBInput
                  type="text"
                  label={
                    <div>
                      <span>Danh mục</span>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                  }
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
                <MDBInput
                  wrapperClass="mb-4"
                  type="text"
                  label={
                    <div>
                      <span>Tác giả</span>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                  }
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
                <MDBInput
                  wrapperClass="mb-4"
                  onChange={(e) => setISBN_Number(e.target.value)}
                  label={
                    <div>
                      <span>ISBN</span>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                  }
                  id="ISBN"
                  type="text"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  onChange={(e) => setBookImage(e.target.value)}
                  label={
                    <div>
                      <span> URL ảnh Sách</span>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                  }
                  id="bookImage"
                  type="text"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  onChange={(e) => setBookPrice(e.target.value)}
                  label={
                    <div>
                      <span> Giá</span>
                      <span style={{ color: "red" }}>*</span>
                    </div>
                  }
                  id="bookImage"
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
