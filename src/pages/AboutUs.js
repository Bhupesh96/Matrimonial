import React, { useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import PoopUpSearch from "../components/PoopUpSearch";
import TopMenu from "../components/TopMenu";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";
import WhyChooseUs from "../components/WhyChooseUs";
import MeetOurTeam from "../components/MeetOurTeam";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import CopyRight from "../components/CopyRight";
import CustomerReviews from "../components/CustomerReview";
import MyAboutUS from "../components/MyAboutUS";

const AboutUs = () => {
  return (
    <div>
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />
      <section>
        <div className="str">
          <div className="ban-inn ab-ban">
            <div className="container">
              <div className="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    <span>
                      <i className="no1">#1</i> Wedding Website
                    </span>
                    <h1>About us</h1>
                    <p>
                      Most Trusted and premium Matrimony Service in the World.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MyAboutUS />

      <CustomerReviews />
      <MeetOurTeam />
      <FAQSection />
      <Footer />
      <CopyRight />
    </div>
  );
};

export default AboutUs;
