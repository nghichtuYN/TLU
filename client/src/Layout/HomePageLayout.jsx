import React, { useState } from "react";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";
import { Container, Nav, NavLink, NavDropdown, Navbar } from "react-bootstrap";
import { getAllCategories } from "../services/CategoryService";
import { useQueryHook } from "../Hook/useMutationHook";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetSearchBook } from "../redux/Slice/BookSlice";
const HomePageLayout = ({ children }) => {
  const navigate = useNavigate();
  const bookLimit = 8;
  const bookPage = 1;
  const getAllCategory = async () => {
    const res = await getAllCategories();
    return res.data;
  };
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const clonedChild = React.cloneElement(children, { setSearchValue });
  const { data: categoryList } = useQueryHook(["categoryList"], getAllCategory);
  return (
    <div>
      <HeaderComponent
        isShowLogin={true}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Container
        style={{
          minHeight: "100vh",
          paddingTop: "20px",
          backgroundColor: "#E0E0E0",
        }}
      >
        <div>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand
                onClick={() => navigate(`/home-page`)}
                style={{
                  cursor: "pointer",
                  height: "auto",
                  width: "auto",
                  fontSize: "20px",
                  gap: "25px",
                  fontWeight: "bold",
                }}
              >
                Trang chủ
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                  className="me-auto"
                  style={{
                    height: "auto",
                    width: "auto",
                    fontSize: "15px",
                    gap: "25px",
                    fontWeight: "bold",
                  }}
                  variant="underline"
                >
                  {categoryList?.data
                    ?.filter((cat) => cat?.status === true)
                    .slice(0, 3)
                    .map((cat) => {
                      return (
                        <NavLink
                          onClick={() => {
                            dispatch(resetSearchBook());
                            setSearchValue("");
                            navigate(
                              `/category/?pages=${bookPage}&limits=${bookLimit}&cat=${cat?.id}`,
                              { state: { categoryName: cat?.categoryName } }
                            );
                          }}
                          style={{ color: "black" }}
                        >
                          {cat?.categoryName}
                        </NavLink>
                      );
                    })}
                  <NavDropdown title="Xem thêm" id="basic-nav-dropdown">
                    {categoryList?.data
                      ?.filter((cat) => cat?.status === true)
                      .slice(3)
                      .map((cat) => {
                        return (
                          <NavDropdown.Item
                            onClick={() => {
                              dispatch(resetSearchBook());
                              setSearchValue("");
                              navigate(
                                `/category/?pages=${bookPage}&limits=${bookLimit}&cat=${cat?.id}`,
                                { state: cat?.categoryName }
                              );
                            }}
                            style={{
                              color: "black",
                              height: "auto",
                              width: "auto",
                              fontSize: "15px",
                              gap: "25px",
                              fontWeight: "bold",
                            }}
                          >
                            {cat?.categoryName}
                          </NavDropdown.Item>
                        );
                      })}
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        {clonedChild}
      </Container>

      <FooterComponent />
    </div>
  );
};

export default HomePageLayout;
