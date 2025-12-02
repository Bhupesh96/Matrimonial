import "./App.css";
import { Routes, Route } from "react-router-dom";

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
import MyRequests from "./pages/MyRequests";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        style={{ marginTop: "80px" }}
      />

      <Routes>
        <Route index element={<Home />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="all-profiles" element={<AllProfiles />} />
        <Route path="blog-detail" element={<BolgDetail />} />
        <Route path="user-profile/:id" element={<UserProfile />} />
        <Route path="user-profile-edit" element={<UserProfileEdit />} />
        <Route path="my-requests" element={<MyRequests />} />
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </>
  );
}

export default App;
