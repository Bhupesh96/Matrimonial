import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import AlertService from "../services/AlertServices"; // <-- 1. Import AlertService

// Import layout components
import Preloader from "../components/Preloader";
import PoopUpSearch from "../components/PoopUpSearch";
import TopMenu from "../components/TopMenu";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";
import Footer from "../components/Footer";
import CopyRight from "../components/CopyRight";

const Login = () => {
  // 1. State for form fields, loading
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState(""); // <-- 2. No longer needed

  const navigate = useNavigate();

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!identifier || !password) {
      AlertService.showError("Please enter both UserID and password."); // <-- 3. Use AlertService
      setLoading(false);
      return;
    }

    try {
      // 4. Call the API
      const data = await loginUser({ identifier, password });

      // 5. On successful login:

      // --- THIS IS THE MOST IMPORTANT PART ---
      // Your PHP script returns the user in a 'data' object.
      if (data.data && data.data.ProfileID) {
        localStorage.setItem("profileID", data.data.ProfileID);
        localStorage.setItem("userID", data.data.UserID);
        localStorage.setItem("profileName", data.data.ProfileName);
      } else {
        // This shouldn't happen if the API is correct, but good to check.
        throw new Error("Login response was successful but missing user data.");
      }
      // ----------------------------------------

      // 6. Show success toast and redirect
      AlertService.showSuccessAndRedirect(
        data.message || "Login successful!",
        navigate,
        "/user-profile-edit" // <-- Redirect to dashboard (or "/")
      );
    } catch (error) {
      // 7. On failure, show error toast
      AlertService.showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Preloader />;
  }

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
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="inn">
                <div className="lhs">
                  <div className="tit">
                    <h2>
                      Now{" "}
                      <b>
                        Find <br /> your life partner
                      </b>{" "}
                      Easy and fast.
                    </h2>
                  </div>
                  <div className="im">
                    <img src="images/login-couple.png" alt="" />
                  </div>
                  <div className="log-bg">&nbsp;</div>
                </div>
                <div className="rhs">
                  <div>
                    <div className="form-tit">
                      <h4>Start for free</h4>
                      <h1>Sign in to Matrimony</h1>
                      <p>
                        Not a member? <Link to="sign-up">Register</Link>

                      </p>
                    </div>
                    <div className="form-login">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label className="lb">User Id</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter User Id, Email, or Mobile"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="lb">Password:</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>

                        {/* 8. Message display is no longer needed, toasts handle it */}
                        {/* {message && ( ... )} */}

                        <div className="form-group form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="agree"
                            />{" "}
                            Remember me
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? "Signing In..." : "Sign in"}
                        </button>
                      </form>
                    </div>
                  </div>
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

export default Login;
