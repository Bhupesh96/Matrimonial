// src/pages/LoginModal.js
import React, { useState } from "react";
import { loginUser } from "../api";
import AlertService from "../services/AlertServices";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ show, onClose, onSuccess }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("en");

  // NEW STATE FOR PASSWORD VISIBILITY
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  if (!show) return null;

  // TRANSLATION TEXTS
  const t = {
    en: {
      title: "Sign in to your account",
      subtitle: "Enter your credentials to continue",
      userId: "User ID",
      placeholderUser: "Enter user ID",
      password: "Password",
      placeholderPass: "Enter password",
      remember: "Remember me",
      signIn: "Sign In",
      noAccount: "Don't have an account?",
      createOne: "Create one",
    },
    hi: {
      title: "अपने खाते में लॉगिन करें",
      subtitle: "जारी रखने के लिए अपनी जानकारी दर्ज करें",
      userId: "यूज़र आईडी",
      placeholderUser: "यूज़र आईडी दर्ज करें",
      password: "पासवर्ड",
      placeholderPass: "पासवर्ड दर्ज करें",
      remember: "मुझे याद रखें",
      signIn: "लॉगिन",
      noAccount: "खाता नहीं है?",
      createOne: "नया खाता बनाएं",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!identifier || !password) {
      AlertService.showError(
        lang === "en"
          ? "Please enter both User ID and password."
          : "कृपया यूज़र आईडी और पासवर्ड दर्ज करें।",
      );
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser({ identifier, password });

      if (data.data?.ProfileID) {
        localStorage.setItem("profileID", data.data.ProfileID);
        localStorage.setItem("userID", data.data.UserID);
        localStorage.setItem("profileName", data.data.ProfileName);
        localStorage.setItem("login_token", data.login_token);
      }

      AlertService.showSuccessAndRedirect(
        lang === "en" ? "Login Successful" : "लॉगिन सफल",
        navigate,
        "/",
      );

      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      AlertService.showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "#f3f3f3",
            border: "none",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {/* Language Switch */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setLang("en")}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "15px",
              fontWeight: lang === "en" ? "700" : "500",
              color: lang === "en" ? "#007bff" : "#666",
              paddingBottom: "4px",
              borderBottom:
                lang === "en" ? "2px solid #007bff" : "2px solid transparent",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            English
          </button>

          <button
            onClick={() => setLang("hi")}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "15px",
              fontWeight: lang === "hi" ? "700" : "500",
              color: lang === "hi" ? "#007bff" : "#666",
              paddingBottom: "4px",
              borderBottom:
                lang === "hi" ? "2px solid #007bff" : "2px solid transparent",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            हिन्दी
          </button>
        </div>

        {/* Title */}
        <h3
          style={{
            marginBottom: "8px",
            fontSize: "24px",
            fontWeight: "700",
            textAlign: "center",
            color: "#222",
          }}
        >
          {t[lang].title}
        </h3>

        <p
          style={{
            marginBottom: "24px",
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
          }}
        >
          {t[lang].subtitle}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label
            style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}
          >
            {t[lang].userId}
          </label>
          <input
            type="text"
            value={identifier}
            placeholder={t[lang].placeholderUser}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              marginBottom: "18px",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{ fontWeight: "600", display: "block", marginBottom: "5px" }}
          >
            {t[lang].password}
          </label>

          {/* UPDATED PASSWORD WRAPPER */}
          <div style={{ position: "relative", marginBottom: "18px" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder={t[lang].placeholderPass}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px",
                paddingRight: "45px", // Room for the eye icon
                borderRadius: "10px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#777",
                fontSize: "18px",
              }}
            >
              <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#007bff",
              padding: "14px",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {loading
              ? lang === "en"
                ? "Signing in..."
                : "लॉगिन हो रहा है..."
              : t[lang].signIn}
          </button>

          <div style={{ marginTop: "18px", textAlign: "center" }}>
            <span style={{ fontSize: "14px", color: "#555" }}>
              {t[lang].noAccount}
            </span>
            <span
              onClick={() => {
                onClose();
                navigate("/sign-up");
              }}
              style={{
                fontSize: "14px",
                color: "#007bff",
                marginLeft: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              {t[lang].createOne}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
