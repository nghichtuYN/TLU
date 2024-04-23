import DefaultLayout from "./Layout/DefaultLayout";
import { Route, Routes } from "react-router-dom";
import { publicRoute } from "./routes/routes";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getDetailsUser } from "./services/AdminService";
import { updateMember } from "./redux/Slice/MemberSlice";
import { getAllBooks } from "./services/BookService";
import { updateBook } from "./redux/Slice/BookSlice";
import { getAllAuthor } from "./services/AuthorService";
import { updateAuthor } from "./redux/Slice/AuthorSlice";
import { getAllCategories } from "./services/CategoryService";
import { updateCategory } from "./redux/Slice/CategorySlice";
import { getAllStudents } from "./services/StudentService";
import { updateStudent } from "./redux/Slice/StudentSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let storageData = localStorage.getItem("access_token");
    if (storageData) {
      storageData = JSON.parse(storageData);
      const decoded = jwtDecode(storageData);
      if (decoded?.id) {
        handleGetDetailUser(decoded?.id, storageData);
        getAllBook();
        getAllAuthors();
        getAllCategory();
        getAllStudent();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const getAllStudent = async () => {
    const res = await getAllStudents();
    dispatch(updateStudent({ student: res.data }));
  };
  const getAllBook = async () => {
    const res = await getAllBooks();
    dispatch(updateBook({ book: res.data }));
  };
  const getAllCategory = async () => {
    const res = await getAllCategories();
    dispatch(updateCategory({ category: res.data }));
  };
  const getAllAuthors = async () => {
    const res = await getAllAuthor();
    dispatch(updateAuthor({ author: res.data }));
  };

  const handleGetDetailUser = async (id, token) => {
    const res = await getDetailsUser(id, token);
    dispatch(updateMember({ ...res?.data, access_token: token }));
  };

  return (
    <div className="App">
      <Routes>
        {publicRoute.map((route, index) => {
          const Layout = route.isShowHeader ? DefaultLayout : Fragment;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
