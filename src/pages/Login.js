import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, apiFetch } from "../api";
import AlertService from "../services/AlertServices";

// Layout Components
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

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [lang, setLang] = useState("en"); // 🌐 Language State
  const navigate = useNavigate();

  // 🌐 TRANSLATION TEXTS
  const t = {
    en: {
      headline1: "Now find",
      headline2: "your life partner",
      headline3: "Easy and fast.",
      title: "Sign in to Matrimony",
      subtitle: "Enter your credentials to continue",
      userId: "User ID",
      placeholderUser: "Enter User ID, Email, or Mobile",
      password: "Password",
      placeholderPass: "Enter password",
      remember: "Remember me",
      signIn: "Sign In",
      noAccount: "Not a member?",
      register: "Register",
      requiredMsg: "Please enter both User ID and password.",
      signing: "Signing In...",
    },

    hi: {
      headline1: "अब पाएँ",
      headline2: "अपना जीवनसाथी",
      headline3: "आसानी से और तेज़ी से।",
      title: "मैट्रिमोनी में लॉगिन करें",
      subtitle: "जारी रखने के लिए अपनी जानकारी दर्ज करें",
      userId: "यूज़र आईडी",
      placeholderUser: "यूज़र आईडी, ईमेल या मोबाइल दर्ज करें",
      password: "पासवर्ड",
      placeholderPass: "पासवर्ड दर्ज करें",
      remember: "मुझे याद रखें",
      signIn: "लॉगिन",
      noAccount: "अभी सदस्य नहीं हैं?",
      register: "रजिस्टर करें",
      requiredMsg: "कृपया यूज़र आईडी और पासवर्ड दर्ज करें।",
      signing: "लॉगिन हो रहा है...",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!identifier || !password) {
      AlertService.showError(t[lang].requiredMsg);
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser({ identifier, password });
      console.log("Login data: ", JSON.stringify(data, null, 2));
      if (data.data && data.data.ProfileID) {
        localStorage.setItem("profileID", data.data.ProfileID);
        localStorage.setItem("userID", data.data.UserID);
        localStorage.setItem("profileName", data.data.ProfileName);
        localStorage.setItem("login_token", data.login_token);

        // Fetch profile photo
        apiFetch(
          `${API_BASE_URL}?api=get_profile&ProfileID=${data.data.ProfileID}`,
        )
          .then((profileRes) => {
            const photo = profileRes?.data?.[0]?.ProfilePhoto;
            if (photo) {
              localStorage.setItem("profilePhoto", photo);
            }
          })
          .catch((err) => console.error("Failed to fetch profile photo:", err));
      }

      // ADD THIS INSTEAD:
      // Optional: If you still want the popup to show up while the page changes instantly
      if (AlertService.showSuccess) {
        AlertService.showSuccess(
          lang === "en" ? "Login successful!" : "लॉगिन सफल!",
        );
      }

      // Redirect immediately without waiting
      navigate("/");
    } catch (error) {
      AlertService.showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Preloader />;

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
                {/* LEFT SIDE */}
                <div className="lhs">
                  <div className="tit">
                    <h2>
                      {t[lang].headline1} <br />
                      <b>{t[lang].headline2}</b>
                      <br />
                      {t[lang].headline3}
                    </h2>
                  </div>

                  <div className="im">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/login-couple.png`}
                      alt=""
                    />
                  </div>

                  <div className="log-bg">&nbsp;</div>
                </div>

                {/* RIGHT SIDE */}
                <div className="rhs">
                  <div>
                    {/* 🌐 LANGUAGE SWITCHER */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "16px",
                        marginBottom: "25px",
                      }}
                    >
                      <button
                        onClick={() => setLang("en")}
                        className={
                          lang === "en" ? "active-lang-btn" : "lang-btn"
                        }
                      >
                        English
                      </button>

                      <button
                        onClick={() => setLang("hi")}
                        className={
                          lang === "hi" ? "active-lang-btn" : "lang-btn"
                        }
                      >
                        हिन्दी
                      </button>
                    </div>

                    <div className="form-tit">
                      <h4>{t[lang].subtitle}</h4>
                      <h1>{t[lang].title}</h1>

                      <p>
                        {t[lang].noAccount}{" "}
                        <Link to="/sign-up">{t[lang].register}</Link>
                      </p>
                    </div>

                    {/* LOGIN FORM */}
                    <div className="form-login">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label className="lb">{t[lang].userId}</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t[lang].placeholderUser}
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="lb">{t[lang].password}</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder={t[lang].placeholderPass}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />{" "}
                            {t[lang].remember}
                          </label>
                        </div>

                        <button type="submit" className="btn btn-primary">
                          {loading ? t[lang].signing : t[lang].signIn}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                {/* RHS END */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CopyRight />

      {/* Language Switcher CSS */}
      <style>{`
        .lang-btn {
          background: transparent;
          border: none;
          font-size: 15px;
          color: #777;
          padding-bottom: 4px;
          cursor: pointer;
        }
        .active-lang-btn {
          font-weight: 700;
          color: #007bff;
          border-bottom: 2px solid #007bff;
        }
      `}</style>
    </div>
  );
};

export default Login;
