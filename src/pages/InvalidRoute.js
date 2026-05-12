import React from "react";
import usePageTitle from "../hooks/usePageTitle";
import Preloader from "../components/Preloader";
import PoopUpSearch from "../components/PoopUpSearch";
import TopMenu from "../components/TopMenu";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CopyRight from "../components/CopyRight";

const InvalidRoute = () => {
  usePageTitle("Page Not Found (404)", {
    description:
      "The page you're looking for doesn't exist on Dewangan Links. Return home to continue browsing matches.",
  });
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
      <section>
        <div className="login pg-404">
          <div className="container">
            <div className="row">
              <div className="inn">
                <div className="lhs">
                  <div className="tit">
                    <h2>
                      Page not found <b>404</b>
                    </h2>
                    <h5>We can't seem to find the page you are looking for.</h5>
                    {/* Use React Router's Link instead of <a href=""> */}
                    <Link to="//" className="cta-4">
                      Visit home page now
                    </Link>
                  </div>
                  <div className="log-bg">&nbsp;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <CopyRight />
    </div>
  );
};

export default InvalidRoute;
