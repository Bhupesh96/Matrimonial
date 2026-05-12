import "./App.css";
import "./assets/css/Header.css";
import "./assets/css/MobileResponsive.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import InvalidRoute from "./pages/InvalidRoute";
import AboutUs from "./pages/AboutUs";
import AllProfiles from "./pages/AllProfiles";
import BolgDetail from "./pages/BolgDetail";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import UserProfileEdit from "./pages/UserProfileEdit";
import UserProfile from "./pages/UserProfile";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./components/ProtectedRoute";
import GuestAuthPromo from "./components/GuestAuthPromo";
import LoginModal from "./pages/LoginModal";
import Community from "./pages/Community";
import CoupleStories from "./pages/CoupleStories";
import Experiences from "./pages/Experiences";

function App() {
  const [showLogin, setShowLogin] = React.useState(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);
  useEffect(() => {
    const handler = () => setShowLogin(true);
    window.addEventListener("open-login-modal", handler);
    return () => window.removeEventListener("open-login-modal", handler);
  }, []);

  return (
    <Router basename={process.env.REACT_APP_BASENAME}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      {/* GLOBAL LOGIN MODAL */}

      <LoginModal
        show={showLogin}
        onClose={closeLogin}
        onSuccess={() => {
          setShowLogin(false);
          window.location.reload(); // Force react to re-evaluate local storage
        }}
      />
      <GuestAuthPromo openLoginModal={openLogin} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog-detail" element={<BolgDetail />} />
        <Route path="community" element={<Community />} />
        <Route path="experiences" element={<Experiences />} />
        {/* Public: guests see approved listings & profile detail (contact fields masked in UI / API). */}
        <Route path="all-profiles" element={<AllProfiles />} />
        <Route path="user-profile/:id" element={<UserProfile />} />
        <Route path="couple-stories" element={<CoupleStories />} />
        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="user-profile-edit"
          element={
            <ProtectedRoute openLogin={openLogin}>
              <UserProfileEdit />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
