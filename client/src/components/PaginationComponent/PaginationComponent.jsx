import React from "react";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
const PaginationComponent = (props) => {
  const navigate = useNavigate();
  const {
    pageCurrent,
    totalPage,
    limit,
    isAuthor,
    isCategory,
    isBook,
    isStudent,
    isOrder,isBookByCategory,catId,
    categoryName,
    isFilterBookBySearch
  } = props;
  const totalPages = (totalPage) => {
    return Array.from({ length: totalPage }, (_, index) => index);
  };
  const renderPaginationItems = () => {
    const maxVisiblePages = 5; // Số trang tối đa hiển thị
    const pages = totalPages(totalPage);
    // Nếu số trang ít hơn hoặc bằng số trang tối đa hiển thị, hiển thị tất cả các trang
    if (pages.length <= maxVisiblePages) {
      return pages.map((index) => (
        <MDBPaginationItem
          key={index}
          active={index === pageCurrent - 1}
          aria-current={index === pageCurrent - 1 ? "page" : null}
        >
          <MDBPaginationLink
            onClick={() => {
              if (isAuthor)
                navigate(`/manage-author?pages=${index + 1}&limits=${limit}`);
              else if (isCategory) {
                navigate(`/manage-category?pages=${index + 1}&limits=${limit}`);
              } else if (isBook) {
                navigate(`/manage-book?pages=${index + 1}&limits=${limit}`);
              } else if (isStudent) {
                navigate(`/manage-student?pages=${index + 1}&limits=${limit}`);
              }else if (isOrder) {
                navigate(`/manage-order?pages=${index + 1}&limits=${limit}`);
              }
              else if (isBookByCategory) {
                navigate(`/category/?pages=${index + 1}&limits=${limit}&cat=${catId}`,{state:categoryName});
              }else if (isFilterBookBySearch) {
                navigate(`/home-page?pages=${index + 1}&limits=${limit}`);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {index + 1}
          </MDBPaginationLink>
        </MDBPaginationItem>
      ));
    }

    // Nếu số trang lớn hơn số trang tối đa hiển thị, hiển thị các trang gần trang hiện tại và ký hiệu ...
    const firstPage = Math.max(
      pageCurrent - Math.floor(maxVisiblePages / 2),
      1
    );
    const lastPage = Math.min(
      pageCurrent + Math.floor(maxVisiblePages / 2),
      totalPage
    );

    const items = [];
    for (let i = firstPage; i <= lastPage; i++) {
      items.push(
        <MDBPaginationItem
          key={i}
          active={i === pageCurrent}
          aria-current={i === pageCurrent ? "page" : null}
        >
          <MDBPaginationLink
            onClick={() => {
              if (isAuthor)
                navigate(`/manage-author?pages=${i}&limits=${limit}`);
              else if (isCategory) {
                navigate(`/manage-category?pages=${i}&limits=${limit}`);
              } else if (isBook) {
                navigate(`/manage-book?pages=${i}&limits=${limit}`);
              } else if (isStudent) {
                navigate(`/manage-student?pages=${i}&limits=${limit}`);
              }else if (isOrder) {
                navigate(`/manage-order?pages=${i}&limits=${limit}`);
              }else if (isBookByCategory) {
                navigate(`/category/?pages=${i}&limits=${limit}&cat=${catId}`,{state:categoryName});
              }else if (isFilterBookBySearch) {
                navigate(`/home-page?pages=${i}&limits=${limit}`);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {i}
          </MDBPaginationLink>
        </MDBPaginationItem>
      );
    }
    if (firstPage > 1) {
      items.unshift(
        <MDBPaginationItem key="start">
          <MDBPaginationLink disabled style={{ cursor: "not-allowed" }}>
            ...
          </MDBPaginationLink>
        </MDBPaginationItem>
      );
    }
    if (lastPage < totalPage) {
      items.push(
        <MDBPaginationItem key="end">
          <MDBPaginationLink disabled style={{ cursor: "not-allowed" }}>
            ...
          </MDBPaginationLink>
        </MDBPaginationItem>
      );
    }

    return items;
  };
  return (
    <nav aria-label="...">
      <MDBPagination className="mb-0">
        <MDBPaginationItem disabled={pageCurrent === 1}>
          <MDBPaginationLink
            tabIndex={-1}
            aria-disabled="true"
            onClick={() => {
              if (isAuthor)
                navigate(
                  `/manage-author?pages=${pageCurrent - 1}&limits=${limit}`
                );
              else if (isCategory) {
                navigate(
                  `/manage-category?pages=${pageCurrent - 1}&limits=${limit}`
                );
              } else if (isBook) {
                navigate(
                  `/manage-book?pages=${pageCurrent - 1}&limits=${limit}`
                );
              } else if (isStudent) {
                navigate(
                  `/manage-student?pages=${pageCurrent - 1}&limits=${limit}`
                );
              }else if (isOrder) {
                navigate(
                  `/manage-order?pages=${pageCurrent - 1}&limits=${limit}`
                );
              }else if (isBookByCategory) {
                navigate(`/category/?pages=${pageCurrent - 1}&limits=${limit}&cat=${catId}`,{state:categoryName});
              }else if (isFilterBookBySearch) {
                navigate(`/home-page?pages=${pageCurrent - 1}&limits=${limit}`);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        {renderPaginationItems()}
        <MDBPaginationItem disabled={pageCurrent === totalPage}>
          <MDBPaginationLink
            onClick={() => {
              if (isAuthor)
                navigate(
                  `/manage-author?pages=${pageCurrent + 1}&limits=${limit}`
                );
              else if (isCategory) {
                navigate(
                  `/manage-category?pages=${pageCurrent + 1}&limits=${limit}`
                );
              } else if (isBook) {
                navigate(
                  `/manage-book?pages=${pageCurrent + 1}&limits=${limit}`
                );
              } else if (isStudent) {
                navigate(
                  `/manage-student?pages=${pageCurrent + 1}&limits=${limit}`
                );
              }else if (isOrder) {
                navigate(
                  `/manage-order?pages=${pageCurrent + 1}&limits=${limit}`
                );
              }else if (isBookByCategory) {
                navigate(`/category/?pages=${pageCurrent + 1}&limits=${limit}&cat=${catId}`,{state:categoryName});
              }else if (isFilterBookBySearch) {
                navigate(`/home-page?pages=${pageCurrent + 1}&limits=${limit}`);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </nav>
  );
};

export default PaginationComponent;
