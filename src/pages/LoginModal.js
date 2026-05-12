// src/pages/LoginModal.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfileDetails, loginUser, resolvePostLoginHomePath } from "../api";
import AlertService from "../services/AlertServices";
import "../assets/css/Login.css";

const LoginModal = ({ show, onClose, onSuccess }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("en");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!show) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show, onClose]);

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

      if (data.data?.ProfileID) {
        localStorage.setItem("profileID", data.data.ProfileID);
        localStorage.setItem("userID", data.data.UserID);
        localStorage.setItem("profileName", data.data.ProfileName);
        if (data.login_token) {
          localStorage.setItem("login_token", data.login_token);
        } else {
          localStorage.removeItem("login_token");
        }
        getProfileDetails()
          .then((me) => {
            if (me?.GenderID != null && me.GenderID !== "") {
              localStorage.setItem("viewerGenderID", String(me.GenderID));
            }
          })
          .catch(() => {});
      }

      let path = "/";
      try {
        path = await resolvePostLoginHomePath(data.data?.UserID);
      } catch {
        path = "/";
      }

      AlertService.showSuccessAndRedirect(
        lang === "en" ? "Login successful!" : "लॉगिन सफल!",
        navigate,
        path,
      );

      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      AlertService.showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="dw-login-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="dw-login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dw-login-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="dw-login-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="dw-login-modal__grid">
          <div className="dw-login-modal__lhs">
            <div className="dw-login-modal__lhs-tit">
              <h2>
                {t[lang].headline1} <br />
                <b>{t[lang].headline2}</b>
                <br />
                {t[lang].headline3}
              </h2>
            </div>
            <div className="dw-login-modal__lhs-im">
              <img
                src={`${process.env.PUBLIC_URL}/images/login-couple.png`}
                alt=""
              />
            </div>
          </div>

          <div className="dw-login-modal__rhs">
            <div className="dw-login-modal__lang">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={lang === "en" ? "active-lang-btn" : "lang-btn"}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                className={lang === "hi" ? "active-lang-btn" : "lang-btn"}
              >
                हिन्दी
              </button>
            </div>

            <div className="form-tit">
              <h4>{t[lang].subtitle}</h4>
              <h1 id="dw-login-modal-title">{t[lang].title}</h1>
              <p>
                {t[lang].noAccount}{" "}
                <Link
                  to="/sign-up"
                  onClick={() => {
                    onClose();
                  }}
                >
                  {t[lang].register}
                </Link>
              </p>
            </div>

            <div className="form-login">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="lb" htmlFor="dw-login-modal-user">
                    {t[lang].userId}
                  </label>
                  <input
                    id="dw-login-modal-user"
                    type="text"
                    className="form-control"
                    placeholder={t[lang].placeholderUser}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>

                <div className="form-group">
                  <label className="lb" htmlFor="dw-login-modal-pass">
                    {t[lang].password}
                  </label>
                  <div className="dw-login-modal__pw-wrap">
                    <input
                      id="dw-login-modal-pass"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder={t[lang].placeholderPass}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ paddingRight: "44px" }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="dw-login-modal__eye"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      tabIndex={-1}
                    >
                      <i
                        className={
                          showPassword ? "fa fa-eye-slash" : "fa fa-eye"
                        }
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>

                <div className="form-group form-check">
                  <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" />{" "}
                    {t[lang].remember}
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? t[lang].signing : t[lang].signIn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
