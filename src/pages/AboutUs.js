import React from "react";
import Preloader from "../components/Preloader";
import PoopUpSearch from "../components/PoopUpSearch";
import TopMenu from "../components/TopMenu";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";
import WhyChooseUs from "../components/WhyChooseUs";

const AboutUs = () => {
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
      <WhyChooseUs />
      <section>
        <div className="ab-sec2">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div>
                    <img src="images/icon/prize.png" alt="Genuine profiles" />
                    <h4>Genuine profiles</h4>
                    <p>The most trusted wedding matrimony brand</p>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="images/icon/trust.png" alt="Most trusted" />
                    <h4>Most trusted</h4>
                    <p>The most trusted wedding matrimony brand</p>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="images/icon/rings.png" alt="2000+ weddings" />
                    <h4>2000+ weddings</h4>
                    <p>The most trusted wedding matrimony brand</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
