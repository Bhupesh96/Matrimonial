import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import InvalidRoute from "./pages/InvalidRoute";
import AboutUs from "./pages/AboutUs";
import AllProfiles from "./pages/AllProfiles";
import BolgDetail from "./pages/BolgDetail";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfileEdit from "./pages/UserProfileEdit";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      {/* <Router basename={process.env.REACT_APP_BASENAME}> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        newestOnTop
        theme="colored"
        style={{
          marginTop: "80px",
        }}
      />

      <Routes>
        <Route index element={<Home />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="all-profiles" element={<AllProfiles />} />
        <Route path="blog-detail" element={<BolgDetail />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="user-profile-edit" element={<UserProfileEdit />} />
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
