import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdHome } from "react-icons/io";
import { FaBookOpen, FaBookReader } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { SiComposer } from "react-icons/si";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { MdOutlineEditNote } from "react-icons/md";
import "./style.css";
import { resetMember } from "../../redux/Slice/MemberSlice";
import { useNavigate } from "react-router-dom";

const NavbarCompoent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const styleIcon = { marginRight: "20px", marginBottom: "3px" };
  const handleLogout = (event) => {
    event.preventDefault();
    navigate("/");
    console.log('isClick')
    dispatch(resetMember());
    localStorage.removeItem("access_token");
    // navigate()
  };
  const member = useSelector((state) => state.member);
  const page=1;
  const limit=5;
  const menu = [
    { path: "/home", title: "Trang chủ", icon: <IoMdHome /> },
    { path: `/manage-book?pages=${page}&limits=${limit}`, title: "Quản lý sách", icon: <FaBookOpen /> },
    { path: `/manage-author?pages=${page}&limits=${limit}`, title: "Quản lý tác giả", icon: <SiComposer /> },
    {
      path: `/manage-student?pages=${page}&limits=${limit}`,
      title: "Quản lý độc giả",
      icon: <FaBookReader />,
    },
    {
      path: `/manage-category?pages=${page}&limits=${limit}`,
      title: "Quản lý danh mục",
      icon: <BiSolidCategory />,
    },
    {
      path: `/manage-order?pages=${page}&limits=${limit}`,
      title: "Quản lý đơn mượn",
      icon: <MdOutlineEditNote />,
    },
  ];
  const handldPath=(event,path)=>{
    event.preventDefault();
    navigate(path)
  }
  return (
    <Nav
    variant="underline" defaultActiveKey="/home"

      className="flex-column"
      style={{
        height: "100%",
        width: "100%",
        fontSize: "20px",
        gap: "25px",
        margin: "15px",
        fontWeight: "bold",
      }}
    >
      {menu.map((item, index) => {
        return (
          <div key={index}>
            <NavLink
            eventKey={item?.path}
              onClick={(e)=>handldPath(e,item.path)}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="nav d-flex justify-content-start align-items-center">
                <div style={styleIcon}>{item.icon}</div>
                <div>{item.title}</div>
              </div>
            </NavLink>
            <hr style={{ marginRight: "10px" ,color:'#A0A0A0'}} />
          </div>
        );
      })}
      {member?.isAdmin ? (
        <div>
          <NavLink
            to="/manage-member"
            style={{ textDecoration: "none", color: "black", gap: "30px" }}
          >
            <div className="nav d-flex justify-content-start align-items-center">
              <div style={styleIcon}>
                <IoPersonSharp />
              </div>
              <div>Quản lý thủ thư</div>
              <hr style={{ marginRight: "10px",color:'#A0A0A0' }} />
            </div>
          </NavLink>
          <hr style={{ marginRight: "10px" }} />
        </div>
      ) : null}
      {member ? (
        <div>
          <NavLink
            style={{ textDecoration: "none", color: "black", gap: "30px" }}
          >
            <div
              className="nav d-flex justify-content-start align-items-center"
              onClick={handleLogout}
            >
              <div style={styleIcon}>
                <IoIosLogOut />
              </div>
              <div>Đăng xuất</div>
            </div>
          </NavLink>
          <hr style={{ marginRight: "10px",color:'#A0A0A0' }} />
        </div>
      ) : null}
    </Nav>
  );
};

export default NavbarCompoent;
