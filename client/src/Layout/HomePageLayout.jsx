import React from "react";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";

const HomePageLayout = ({children}) => {
  return (
    <div>
      <HeaderComponent isShowLogin={true} />

      {children}
      <FooterComponent />
    </div>
  );
};

export default HomePageLayout;
