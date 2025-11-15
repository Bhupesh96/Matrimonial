import React, { useState, useEffect } from "react"; // <-- 1. Import hooks
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
  // 2. Add loading state, default to true
  const [loading, setLoading] = useState(true);

  // 3. Use useEffect to run code once when the component mounts
  useEffect(() => {
    // This simulates a 1.5 second page load (1500 milliseconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // This is a cleanup function to prevent memory leaks
    return () => clearTimeout(timer);
  }, []); // The empty array [] means this effect runs only once

  // 4. If loading is true, show ONLY the preloader
  if (loading) {
    return <Preloader />;
  }

  // 5. When loading is false, show the full page
  return (
    <div>
      {/* <Preloader /> <-- Removed from here */}
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
