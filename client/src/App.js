import DefaultLayout from "./Layout/DefaultLayout";
import { Route, Routes } from "react-router-dom";
import { publicRoute } from "./routes/routes";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getDetailsUser } from "./services/AdminService";
import { updateMember } from "./redux/Slice/MemberSlice";
import HomePageLayout from "./Layout/HomePageLayout";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let storageData = localStorage.getItem("access_token");
    if (storageData) {
      storageData = JSON.parse(storageData);
      const decoded = jwtDecode(storageData);
      if (decoded?.id) {
        handleGetDetailUser(decoded?.id, storageData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetDetailUser = async (id, token) => {
    const res = await getDetailsUser(id, token);
    dispatch(updateMember({ ...res?.data, access_token: token }));
  };

  return (
    <div className="App">
      <Routes>
        {publicRoute.map((route, index) => {
          const Page = route.component;
          const Layout = route.isShowHeader ? DefaultLayout : route.noHeader ? Fragment : HomePageLayout;
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
