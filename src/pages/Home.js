import React from "react";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import PoopUpSearch from "../components/PoopUpSearch";
import TopMenu from "../components/TopMenu";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";
import HeroSection from "../components/HeroSection";
import BannerSlider from "../components/BannerSlider";
import QuickAccess from "../components/QuickAccess";
import CustomerReviews from "../components/CustomerReview";
import WhyChooseUs from "../components/WhyChooseUs";
import AboutSection2 from "../components/AboutSection2";
import AboutWelcome from "../components/AboutWelcome";
import AboutCounter from "../components/AboutCounter";
import HowItWorks from "../components/HowItWorks";
import RecentCouples from "../components/RecentCouples";
import MeetOurTeam from "../components/MeetOurTeam";
import PhotoGallery from "../components/PhotoGallery";
import BlogSection from "../components/BlogSection";
import FindMatchSection from "../components/FindMatchSection";
import CopyRight from "../components/CopyRight";

const Home = () => {
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
      <HeroSection />
      <BannerSlider />
      <QuickAccess />
      <CustomerReviews />
      <WhyChooseUs />
      <AboutSection2 />
      <AboutWelcome />
      <AboutCounter />
      <HowItWorks />
      <RecentCouples />
      <MeetOurTeam />
      <PhotoGallery />
      <BlogSection />
      <FindMatchSection />
      <Footer />
      <CopyRight />
    </div>
  );
};

export default Home;
