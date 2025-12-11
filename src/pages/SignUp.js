import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createProfile, fetchMasterData, fetchNextUserID } from "../api";
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
    console.log("Sending details: ", JSON.stringify(payload, null, 2));
    try {
      const result = await createProfile(payload);

      AlertService.showSuccessAndRedirect(result.message, navigate, "/login");
    } catch (err) {
      AlertService.showError(err.message);
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

      {/* LANGUAGE SWITCH CSS */}
      <style>{`
        .lang-btn {
          background: transparent;
          border: none;
          color: #777;
          font-size: 15px;
          cursor: pointer;
        }
        .active-lang-btn {
          font-weight: bold;
          color: #007bff;
          border-bottom: 2px solid #007bff;
        }
      `}</style>
    </div>
  );
};

export default SignUp;
