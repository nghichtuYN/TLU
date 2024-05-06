import React, {  useState } from "react";
import { MDBTable, MDBTableHead } from "mdb-react-ui-kit";
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
    filterBook,
    searchValue
  } = props;
  const [filterCat, setFilterCat] = useState([]);
 
  
  
  // useEffect(() => {
  //   if (searchValue !== "") {
  //     if (category) {
  //       setFilterCat(
  //         category?.filter((cat) =>
  //           cat?.categoryName.toLowerCase().includes(searchValue.toLowerCase())
  //         )
  //       );
  //     }
  //     if (book) {
  //       getBookFilters(searchValue);
  //     }
  //   } else if (searchValue === "") {
  //     if (book) {
  //       setFilterBook([]);
  //     }
  //     if (category) {
  //       setFilterCat([]);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category,, book]);
  return (
    <div>
      
      <div>
        <MDBTable
          align="middle"
          style={{ fontSize: "16px", borderRadius: "1px solid" }}
          bordered
        >
          <MDBTableHead color="primary-color">
            {category ? (
              <tr className="table-secondary">
                <th scope="col">Tên danh mục</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Ngày sửa</th>
                <th scope="col">Hoạt động</th>
              </tr>
            ) : author ? (
              <tr className="table-secondary">
                <th scope="col">Tên tác giả</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Ngày sửa</th>
                <th scope="col">Hoạt động</th>
              </tr>
            ) : book ? (
              <tr className="table-secondary">
                <th scope="col">Tên sách</th>
                <th scope="col">Loại Sách</th>
                <th scope="col">Tác giả</th>
                <th scope="col">ISBN Number</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Đang mượn</th>
                <th scope="col">Hoạt động</th>
              </tr>
            ) : student ? (
              <tr className="table-secondary">
                <th scope="col">Mã SV</th>
                <th scope="col">Tên độc giả</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Ngày đăng ký</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Hoạt động</th>
              </tr>
            ) : order ? (
              <tr className="table-secondary">
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
            <ManageCategoryComponent
              refetch={refetch}
              category={category}
              filterCat={filterCat}
              setFilterCat={setFilterCat}
            />
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
              // allBook={allBook}
              filterBook={filterBook}
              searchValue={searchValue}
            />
          ) : // body học sinh
          student ? (
            <ManageStudentComponent refetch={refetch} student={student} />
          ) : // body đơn hàng
          order ? (
            <ManageOrderComponent
              refetchBook={refetchBook}
              refetch={refetch}
              order={order}
            />
          ) : null}
        </MDBTable>
      </div>
    </div>
  );
};
export default TableComponent;
