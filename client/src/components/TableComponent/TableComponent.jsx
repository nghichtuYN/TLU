import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead } from "mdb-react-ui-kit";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import "./style.css";
import { ManageCategoryComponent } from "../MangageCategoryCompoent/ManageCategoryComponent";
import { ManageAuthorComponent } from "../MangageAuthorCompoent/ManageAuthorComponent";
import { ManageBookComponent } from "../ManageBookComponent/ManageBookComponent";
import ManageStudentComponent from "../ManageStudentComponent/ManageStudentComponent";
import ManageOrderComponent from "../MangeOrderComponent/MangeOrderComponent";
const TableComponent = (props) => {
  const {
    category,
    author,
    book,
    refetch,
    refetchBook,
    student,
    order,
    categoryList,
    authorList,
  } = props;
  const [searchValue, setSearchValue] = useState("");
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const [filterCat,setFilterCat]=useState([])
  const [filterBook,setFilterBook]=useState([])
  useEffect(() => {
    if (category) {
      setFilterCat(
        category?.filter((cat) =>
          cat?.categoryName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
    if(book){
      setFilterBook(
        book?.filter((book) =>
          book?.bookName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [category, searchValue, author,book]);

  return (
    <div>
      <div>
        <SearchComponent value={searchValue} onChange={onChange} />
      </div>
      <div>
        <MDBTable align="middle" style={{ fontSize: "16px" }}>
          <MDBTableHead>
            {category ? (
              <tr>
                <th scope="col">Tên danh mục</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Ngày sửa</th>
                <th scope="col">Hoạt động</th>
              </tr>
            ) : author ? (
              <tr>
                <th scope="col">Tên tác giả</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Ngày sửa</th>
                <th scope="col">Hoạt động</th>
              </tr>
            ) : book ? (
              <tr>
                <th scope="col">Tên sách</th>
                <th scope="col">Loại Sách</th>
                <th scope="col">Tác giả</th>
                <th scope="col">ISBN Number</th>
                <th scope="col">Giá</th>
                <th scope="col">Hoạt động</th>
              </tr>
            ) : student ? (
              <tr>
                <th scope="col">Mã SV</th>
                <th scope="col">Tên độc giả</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Ngày đăng ký</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Hoạt động</th>
              </tr>
            ) : order ? (
              <tr>
                <th scope="col">Mã SV</th>
                <th scope="col">Tên độc giả</th>
                <th scope="col">Tên sách</th>
                <th scope="col">ISBN</th>
                <th scope="col">Ngày mượn</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Hoạt động</th>
              </tr>
            ) : null}
          </MDBTableHead>
          {/* Body danh muc */}
          {category ? (
            <ManageCategoryComponent refetch={refetch} category={category} filterCat={filterCat} setFilterCat={setFilterCat}/>
          ) : author ? (
          // Body tác giả
            <ManageAuthorComponent refetch={refetch} author={author} />
          ) : book ? (
            // body sách
            <ManageBookComponent
              refetch={refetch}
              book={book}
              categoryList={categoryList}
              authorList={authorList}
              filterBook={filterBook}
            />
            // body học sinh
          ) : student ? (
            <ManageStudentComponent refetch={refetch} student={student} />
            // body đơn hàng
          ) : order ? (
            <ManageOrderComponent refetchBook={refetchBook} refetch={refetch} order={order} />
          ) : null}
        </MDBTable>
      </div>
    </div>
  );
};
export default TableComponent;
