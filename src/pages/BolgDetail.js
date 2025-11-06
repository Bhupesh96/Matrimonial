import React from "react";
import TopMenu from "../components/TopMenu";
import Preloader from "../components/Preloader";
import PoopUpSearch from "../components/PoopUpSearch";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";

const BolgDetail = () => {
  return (
    <div>
      <Preloader />
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />
    </div>
  );
};

export default BolgDetail;
