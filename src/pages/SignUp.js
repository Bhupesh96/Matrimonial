import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// IMPORT loginUser and apiFetch for auto-login
import {
  createProfile,
  fetchMasterData,
  fetchNextUserID,
  loginUser,
  apiFetch,
} from "../api";
import AlertService from "../services/AlertServices";

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

const renderOptions = (data) =>
  data?.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

const SignUp = () => {
  const navigate = useNavigate();

  /* 🌐 BILINGUAL LANGUAGE STATE */
  const [lang, setLang] = useState("en");

  const t = {
    en: {
      headline1: "Now",
      headline2: "Find your life partner",
      headline3: "Easy and fast.",
      startFree: "Start for free",
      createTitle: "Create Your Matrimony Profile",
      alreadyMember: "Already a member?",
      login: "Login",
      newUserId: "Your New User ID",
      phone: "Mobile Contact",
      phonePlaceholder: "Enter 10-digit mobile number",
      fname: "First Name",
      fnamePlaceholder: "Enter your first name",
      surname: "Surname",
      surnamePlaceholder: "Enter your surname",
      gender: "Gender",
      marital: "Marital Status",
      gotra: "Gotra (Self)",
      nanaGotra: "Nana Gotra (Maternal)",
      height: "Height",
      weight: "Weight (in kg)",
      complexion: "Complexion",
      complexionPlaceholder: "e.g., Fair, Wheatish, Dark",
      fatherName: "Father's Name",
      fatherPlaceholder: "Enter father's name",
      motherName: "Mother's Name",
      motherPlaceholder: "Enter mother's name",
      city: "City",
      terms: "Creating an account means you're okay with our",
      createBtn: "Create Profile",
      creating: "Creating...",
      errorMobile: "Mobile number must be exactly 10 digits.",
      fillRequired: "Please fill all required fields.",
      agreeError: "You must agree to the Terms of Service.",
      invalidMobile: "Please enter a valid 10-digit mobile number.",
    },

    hi: {
      headline1: "अब",
      headline2: "अपना जीवनसाथी खोजें",
      headline3: "आसान और तेज़ी से।",
      startFree: "मुफ़्त में शुरू करें",
      createTitle: "अपनी मैट्रिमोनी प्रोफ़ाइल बनाएँ",
      alreadyMember: "पहले से सदस्य हैं?",
      login: "लॉगिन करें",
      newUserId: "आपकी नई यूज़र आईडी",
      phone: "मोबाइल नंबर",
      phonePlaceholder: "10 अंकों का मोबाइल नंबर दर्ज करें",
      fname: "पहला नाम",
      fnamePlaceholder: "अपना पहला नाम दर्ज करें",
      surname: "उपनाम",
      surnamePlaceholder: "अपना उपनाम दर्ज करें",
      gender: "लिंग",
      marital: "वैवाहिक स्थिति",
      gotra: "गोत्र (स्वयं)",
      nanaGotra: "नाना गोत्र (मातृ)",
      height: "लंबाई",
      weight: "वजन (किलोग्राम में)",
      complexion: "रंग",
      complexionPlaceholder: "जैसे: गोरा, गेहुआँ, सांवला",
      fatherName: "पिता का नाम",
      fatherPlaceholder: "पिता का नाम दर्ज करें",
      motherName: "माता का नाम",
      motherPlaceholder: "माता का नाम दर्ज करें",
      city: "शहर",
      terms: "खाता बनाकर आप हमारी शर्तों से सहमत होते हैं",
      createBtn: "प्रोफ़ाइल बनाएँ",
      creating: "बनाई जा रही है...",
      errorMobile: "मोबाइल नंबर बिल्कुल 10 अंकों का होना चाहिए।",
      fillRequired: "कृपया सभी आवश्यक फ़ील्ड भरें।",
      agreeError: "कृपया शर्तों से सहमत हों।",
      invalidMobile: "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",
    },
  };

  /* STATES */
  const [genders, setGenders] = useState([]);
  const [maritalStatuses, setMaritalStatuses] = useState([]);
  const [cities, setCities] = useState([]);
  const [gotras, setGotras] = useState([]);
  const [heights, setHeights] = useState([]);
  const [nanaGotras, setNanaGotras] = useState([]);

  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [genderID, setGenderID] = useState("");
  const [maritalStatusID, setMaritalStatusID] = useState("");
  const [cityID, setCityID] = useState("");
  const [gotraID, setGotraID] = useState("");
  const [nanaGotraID, setNanaGotraID] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [heightID, setHeightID] = useState("");
  const [weight, setWeight] = useState("");
  const [complexion, setComplexion] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  const [loading, setLoading] = useState(true);
  const [phoneError, setPhoneError] = useState("");

  // NEW STATE: Controls the visibility of the success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleMobileChange = (e) => {
    const numeric = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    setPhone(numeric);

    if (numeric.length > 0 && numeric.length !== 10)
      setPhoneError(t[lang].errorMobile);
    else setPhoneError("");
  };

  // Text-only handler
  const handleTextOnly = (setter) => (e) =>
    setter(e.target.value.replace(/[^a-zA-Z\s]/g, ""));

  /* LOAD MASTER DATA */
  useEffect(() => {
    const loadData = async () => {
      try {
        const nextID = await fetchNextUserID();
        setUserID(nextID);

        await Promise.all([
          fetchMasterData("genders").then(setGenders),
          fetchMasterData("maritalstatuses").then(setMaritalStatuses),
          fetchMasterData("preference_marriage_area").then(setCities),
          fetchMasterData("gotras").then((g) => {
            setGotras(g);
            setNanaGotras(g);
          }),
          fetchMasterData("heights").then(setHeights),
        ]);
      } catch (err) {
        AlertService.showError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* SUBMIT FORM */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) return AlertService.showError(t[lang].agreeError);

    if (phone.length !== 10)
      return AlertService.showError(t[lang].invalidMobile);

    if (!genderID || !maritalStatusID || !cityID || !gotraID || !nanaGotraID)
      return AlertService.showError(t[lang].fillRequired);

    setLoading(true);

    const payload = {
      UserID: userID,
      GenderID: parseInt(genderID),
      MaritalStatusID: parseInt(maritalStatusID),
      LocationCityID: parseInt(cityID),
      firstname: firstName,
      lastname: surname,
      GotraID: parseInt(gotraID),
      NanaGotraId: parseInt(nanaGotraID),
      FatherName: fatherName,
      MotherName: motherName,
      HeightID: parseInt(heightID),
      Weight: parseInt(weight),
      Complexion: complexion,
      contact_mobile: phone,
    };

    try {
      // 1. Create Profile
      await createProfile(payload);

      // 2. Auto-Login right after creation
      try {
        // The mobile number acts as the password
        const loginData = await loginUser({
          identifier: userID,
          password: phone,
        });

        if (loginData.data && loginData.data.ProfileID) {
          localStorage.setItem("profileID", loginData.data.ProfileID);
          localStorage.setItem("userID", loginData.data.UserID);
          localStorage.setItem("profileName", loginData.data.ProfileName);
          localStorage.setItem("login_token", loginData.login_token);

          // Fetch profile photo
          apiFetch(
            `${API_BASE_URL}?api=get_profile&ProfileID=${loginData.data.ProfileID}`,
          )
            .then((profileRes) => {
              const photo = profileRes?.data?.[0]?.ProfilePhoto;
              if (photo) {
                localStorage.setItem("profilePhoto", photo);
              }
            })
            .catch((err) =>
              console.error("Failed to fetch profile photo:", err),
            );
        }

        // 3. Show Custom Success Modal instead of Alert
        setShowSuccessModal(true);
      } catch (loginErr) {
        // Fallback: If login fails for some odd reason, redirect to login page
        AlertService.showSuccessAndRedirect(
          lang === "en"
            ? "Registration successful! Please login."
            : "पंजीकरण सफल! कृपया लॉगिन करें।",
          navigate,
          "/login",
        );
      }
    } catch (err) {
      AlertService.showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Close Modal and Redirect Handler
  const handleCloseModalAndRedirect = () => {
    setShowSuccessModal(false);
    navigate("/"); // Redirect to home page
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
                {/* LEFT */}
                <div className="lhs">
                  <div className="tit">
                    <h2>
                      {t[lang].headline1} <b>{t[lang].headline2}</b>{" "}
                      {t[lang].headline3}
                    </h2>
                  </div>
                  <div className="im">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/login-couple.png`}
                      alt=""
                    />
                  </div>
                  <div className="log-bg"></div>
                </div>

                {/* RIGHT */}
                <div className="rhs">
                  {/* 🌐 LANGUAGE SWITCH */}
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => setLang("en")}
                      className={lang === "en" ? "active-lang-btn" : "lang-btn"}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLang("hi")}
                      className={lang === "hi" ? "active-lang-btn" : "lang-btn"}
                    >
                      हिन्दी
                    </button>
                  </div>

                  <div className="form-tit">
                    <h4>{t[lang].startFree}</h4>
                    <h1>{t[lang].createTitle}</h1>
                    <p>
                      {t[lang].alreadyMember}{" "}
                      <Link to="/login">{t[lang].login}</Link>
                    </p>
                  </div>

                  <div className="form-login">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        {/* LEFT COLUMN */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>{t[lang].newUserId}</label>
                            <input
                              className="form-control"
                              readOnly
                              value={userID}
                              style={{ background: "#eee", fontWeight: "bold" }}
                            />
                          </div>

                          <div className="form-group">
                            <label>{t[lang].phone}</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={t[lang].phonePlaceholder}
                              value={phone}
                              onChange={handleMobileChange}
                            />
                            {phoneError && (
                              <small style={{ color: "red" }}>
                                {phoneError}
                              </small>
                            )}
                          </div>

                          <div className="form-group">
                            <label>{t[lang].fname}</label>
                            <input
                              className="form-control"
                              placeholder={t[lang].fnamePlaceholder}
                              value={firstName}
                              onChange={handleTextOnly(setFirstName)}
                            />
                          </div>

                          <div className="form-group">
                            <label>{t[lang].surname}</label>
                            <input
                              className="form-control"
                              placeholder={t[lang].surnamePlaceholder}
                              value={surname}
                              onChange={handleTextOnly(setSurname)}
                            />
                          </div>

                          <div className="form-group">
                            <label>{t[lang].gender}</label>
                            <select
                              className="form-control"
                              value={genderID}
                              onChange={(e) => setGenderID(e.target.value)}
                            >
                              <option value="">--</option>
                              {renderOptions(genders)}
                            </select>
                          </div>

                          <div className="form-group">
                            <label>{t[lang].marital}</label>
                            <select
                              className="form-control"
                              value={maritalStatusID}
                              onChange={(e) =>
                                setMaritalStatusID(e.target.value)
                              }
                            >
                              <option value="">--</option>
                              {renderOptions(maritalStatuses)}
                            </select>
                          </div>

                          <div className="form-group">
                            <label>{t[lang].gotra}</label>
                            <select
                              className="form-control"
                              value={gotraID}
                              onChange={(e) => setGotraID(e.target.value)}
                            >
                              <option value="">--</option>
                              {renderOptions(gotras)}
                            </select>
                          </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>{t[lang].nanaGotra}</label>
                            <select
                              className="form-control"
                              value={nanaGotraID}
                              onChange={(e) => setNanaGotraID(e.target.value)}
                            >
                              <option value="">--</option>
                              {renderOptions(nanaGotras)}
                            </select>
                          </div>

                          <div className="form-group">
                            <label>{t[lang].height}</label>
                            <select
                              className="form-control"
                              value={heightID}
                              onChange={(e) => setHeightID(e.target.value)}
                            >
                              <option value="">--</option>
                              {renderOptions(heights)}
                            </select>
                          </div>

                          <div className="form-group">
                            <label>{t[lang].weight}</label>
                            <input
                              type="number"
                              className="form-control"
                              value={weight}
                              onChange={(e) => setWeight(e.target.value)}
                            />
                          </div>

                          <div className="form-group">
                            <label>{t[lang].complexion}</label>
                            <input
                              className="form-control"
                              placeholder={t[lang].complexionPlaceholder}
                              value={complexion}
                              onChange={handleTextOnly(setComplexion)}
                            />
                          </div>

                          <div className="form-group">
                            <label>{t[lang].fatherName}</label>
                            <input
                              className="form-control"
                              placeholder={t[lang].fatherPlaceholder}
                              value={fatherName}
                              onChange={handleTextOnly(setFatherName)}
                            />
                          </div>

                          <div className="form-group">
                            <label>{t[lang].motherName}</label>
                            <input
                              className="form-control"
                              placeholder={t[lang].motherPlaceholder}
                              value={motherName}
                              onChange={handleTextOnly(setMotherName)}
                            />
                          </div>

                          <div className="form-group">
                            <label>{t[lang].city}</label>
                            <select
                              className="form-control"
                              value={cityID}
                              onChange={(e) => setCityID(e.target.value)}
                            >
                              <option value="">--</option>
                              {renderOptions(cities)}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Terms */}
                      <div className="form-group form-check">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                          />{" "}
                          {t[lang].terms}
                        </label>
                      </div>

                      <button type="submit" className="btn btn-primary">
                        {loading ? t[lang].creating : t[lang].createBtn}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CopyRight />

      {/* CUSTOM SUCCESS MODAL (ELEGANT WEDDING THEME) */}
      {showSuccessModal && (
        <div
          onClick={handleCloseModalAndRedirect}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="wedding-modal"
            style={{
              backgroundColor: "#ffffff",
              padding: "40px 30px",
              borderRadius: "12px",
              textAlign: "center",
              maxWidth: "420px",
              width: "90%",
              boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
              border: "1px solid #eaddd7", // Subtle cream/gold border
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Elegant Top Accent Line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "5px",
                background: "#8C5A3C", // Solid brand color
              }}
            ></div>

            {/* Professional Checkmark Icon */}
            <div
              style={{
                width: "70px",
                height: "70px",
                margin: "0 auto 20px auto",
                background: "#fffafb",
                border: "2px solid #8C5A3C",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 15px rgba(211, 33, 99, 0.1)",
              }}
            >
              <i
                className="fa fa-check"
                style={{ fontSize: "30px", color: "#8C5A3C" }}
              ></i>
            </div>

            <h2
              style={{
                color: "#222",
                fontWeight: "700",
                fontSize: "24px",
                marginBottom: "12px",
                fontFamily: "Georgia, serif", // Gives a wedding invitation feel
              }}
            >
              {lang === "en" ? "Registration Successful" : "पंजीकरण सफल!"}
            </h2>
            <p
              style={{
                color: "#555",
                fontSize: "15px",
                marginBottom: "25px",
                lineHeight: "1.5",
              }}
            >
              {lang === "en"
                ? "Your profile has been successfully created. Please save your login credentials below."
                : "आपकी प्रोफ़ाइल सफलतापूर्वक बन गई है। कृपया अपना लॉगिन विवरण नीचे सुरक्षित रखें।"}
            </p>

            {/* Elegant Credentials Box (Ivory/Cream tone) */}
            <div
              style={{
                backgroundColor: "#fbfaf8",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #eaddd7",
                marginBottom: "30px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "#888",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {lang === "en" ? "User ID" : "यूज़र आईडी"}
                </span>
                <span
                  style={{ color: "#222", fontSize: "18px", fontWeight: "700" }}
                >
                  {userID}
                </span>
              </div>

              {/* Divider Line */}
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "#eaddd7",
                  marginBottom: "12px",
                }}
              ></div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "#888",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {lang === "en" ? "Password" : "पासवर्ड"}
                </span>
                <span
                  style={{
                    color: "#8C5A3C",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  {phone}
                </span>
              </div>
            </div>

            <button
              className="wedding-btn"
              onClick={handleCloseModalAndRedirect}
              style={{
                width: "100%",
                padding: "14px",
                background: "#8C5A3C",
                color: "#fff",
                border: "none",
                borderRadius: "6px", // Structured button instead of pill
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              {lang === "en" ? "Continue to Dashboard" : "डैशबोर्ड पर जाएं"}
            </button>
          </div>
        </div>
      )}

      {/* LANGUAGE SWITCH & WEDDING ANIMATION CSS */}
      <style>{`
        .lang-btn {
          background: transparent;
          border: none;
          color: #777;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s;
        }
        .active-lang-btn {
          font-weight: bold;
          color: #d32163;
          border-bottom: 2px solid #d32163;
        }
        
        /* Modal Appearance Animation */
        .wedding-modal {
          animation: modalFadeIn 0.3s ease-out forwards;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Button Hover */
        .wedding-btn:hover {
          background-color: #704931 !important;
        }
      `}</style>
    </div>
  );
};

export default SignUp;
