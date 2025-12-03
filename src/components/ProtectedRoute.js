import React from "react";
import MainMenu from "./MainMenu";
import PoopUpSearch from "./PoopUpSearch";
import TopMenu from "./TopMenu";
import MenuPopUp from "./MenuPopUp";
import ContactExpert from "./ContactExpert";
import MobileMenu from "./MobileMenu";
import DashboardMenu from "./DashBoardMenu";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("profileID");

  React.useEffect(() => {
    if (!isLoggedIn) {
      window.dispatchEvent(new CustomEvent("open-login-modal")); // auto open
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div>
        <PoopUpSearch />
        <TopMenu />
        <MenuPopUp />
        <ContactExpert />
        <MainMenu />
        <MobileMenu />
        <DashboardMenu />

        <div
          style={{
            height: "calc(100vh - 200px)", // adjustable based on your header height
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-login-modal"))
            }
            style={{
              padding: "16px 32px",
              fontSize: "18px",
              borderRadius: "8px",
              background: "#5b3c07",
              color: "#fff",
              cursor: "pointer",
              border: "none",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
