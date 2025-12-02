import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// 1. Import API functions (ADJUST THIS PATH)
import { createProfile, fetchMasterData, fetchNextUserID } from "../api"; // <-- Verify this path!

// 2. Import Alert Service (ADJUST THIS PATH)
import AlertService from "../services/AlertServices";

// 3. Import all your layout components (MOCKED below for a runnable file)
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

// 4. Helper function to render dropdown options
const renderOptions = (data) => {
  if (!data || data.length === 0) return null;
  return data.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));
};

const SignUp = () => {
  const navigate = useNavigate();

  // 5. State for Dropdown Data
  const [genders, setGenders] = useState([]);
  const [maritalStatuses, setMaritalStatuses] = useState([]);
  const [cities, setCities] = useState([]);
  const [gotras, setGotras] = useState([]);
  const [heights, setHeights] = useState([]);
  const [nanaGotras, setNanaGotras] = useState([]);

  // 6. State for all Form Fields
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

  // 7. State for Loading and Inline Validation
  const [loading, setLoading] = useState(true);
  const [phoneError, setPhoneError] = useState(""); // <-- Kept for inline validation

  // --- START: Input Validation Handlers ---

  const handleMobileChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    const limitedValue = numericValue.slice(0, 10);
    setPhone(limitedValue);
    if (limitedValue.length > 0 && limitedValue.length !== 10) {
      setPhoneError("Mobile number must be exactly 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  const handleTextOnlyChange = (setter) => (e) => {
    const value = e.target.value;
    // Regex to only allow letters (a-z, A-Z), spaces, and hyphens (for names)
    const textOnlyValue = value.replace(/[^a-zA-Z\s\-]/g, "");
    setter(textOnlyValue);
  };

  // --- END: Input Validation Handlers ---

  // 8. useEffect to fetch ALL data on load
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);

      try {
        const nextID = await fetchNextUserID();
        if (nextID) {
          setUserID(nextID);
        } else {
          throw new Error("Could not fetch a new UserID.");
        }

        // Fetch all dropdown data in parallel
        await Promise.all([
          fetchMasterData("genders").then(setGenders),
          fetchMasterData("maritalstatuses").then(setMaritalStatuses),
          fetchMasterData("preference_marriage_area").then(setCities),
          fetchMasterData("gotras").then((data) => {
            setGotras(data);
            setNanaGotras(data);
          }),
          fetchMasterData("heights").then(setHeights),
        ]);
      } catch (error) {
        AlertService.showError(
          `Error: ${
            error.message || "Failed to load initial data."
          } Please refresh.`
        );
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // 9. Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // --- Validation Checks with AlertService ---
    if (!agree) {
      AlertService.showError("You must agree to the Terms of Service.");
      return;
    }

    if (phone.length !== 10 || !!phoneError) {
      AlertService.showError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (
      !genderID ||
      !maritalStatusID ||
      !cityID ||
      !gotraID ||
      !nanaGotraID ||
      !heightID
    ) {
      AlertService.showError("Please select all required dropdown fields.");
      return;
    }

    setLoading(true);

    // 10. Construct the final payload for the API
    const profileData = {
      UserID: userID,
      Gender: parseInt(genderID), // <-- Ensure this is parsed
      MaritalStatusID: parseInt(maritalStatusID),
      LocationCityID: parseInt(cityID),
      FirstName: firstName,
      Surname: surname,
      GotraID: parseInt(gotraID),
      NanaGotraId: parseInt(nanaGotraID),
      FatherName: fatherName,
      MotherName: motherName,
      HeightID: parseInt(heightID),
      Weight: parseInt(weight),
      Complexion: complexion,
      contact_mobile: phone,
    };
    console.log(
      "Sending payload to createProfile:",
      JSON.stringify(profileData, null, 2)
    );

    try {
      const result = await createProfile(profileData);

      if (result.status >= 200 && result.status < 300) {
        // --- SUCCESS ---
        const alertMessage = `${result.message}\n\nUse your phone number as the password for your first login. You can change it later from your profile settings.`;

        // Show alert and redirect to /login
        AlertService.showSuccessAndRedirect(alertMessage, navigate, "/login");
      } else {
        // --- API FAILURE (e.g., 400, 409) ---
        AlertService.showError(
          result.message ||
            "Failed to create account. Please check your details."
        );
      }
    } catch (error) {
      // --- CATCH BLOCK (e.g., network error) ---
      AlertService.showError(
        error.message || "An error occurred: Please try again."
      );
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
                      Now <b>Find your life partner</b> Easy and fast.
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
                <div className="rhs">
                  <div>
                    <div className="form-tit">
                      <h4>Start for free</h4>
                      <h1>Create Your Matrimony Profile</h1>
                      <p>
                        Already a member? <Link to="/login">Login</Link>
                      </p>
                    </div>

                    <div className="form-login">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          {/* -------------------- Column 1 (Left) -------------------- */}
                          <div className="col-md-6">
                            {/* --- UserID Display --- */}
                            <div className="form-group">
                              <label className="lb">Your New User ID:</label>
                              <input
                                type="text"
                                className="form-control"
                                value={userID || "Fetching ID..."}
                                readOnly
                                style={{
                                  backgroundColor: "#e9ecef",
                                  fontWeight: "bold",
                                  color: "#007bff",
                                }}
                              />
                            </div>

                            {/* --- Mobile Number Input --- */}
                            <div className="form-group">
                              <label className="lb">Mobile Contact:</label>
                              <input
                                type="tel"
                                className="form-control"
                                placeholder="Enter 10-digit mobile number"
                                value={phone}
                                onChange={handleMobileChange}
                                maxLength="10"
                                inputMode="numeric"
                                required
                              />
                              {phoneError && (
                                <small style={{ color: "red" }}>
                                  {phoneError}
                                </small>
                              )}
                            </div>

                            {/* --- First Name --- */}
                            <div className="form-group">
                              <label className="lb">First Name:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={handleTextOnlyChange(setFirstName)}
                                required
                              />
                            </div>

                            {/* --- Surname --- */}
                            <div className="form-group">
                              <label className="lb">Surname:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your surname"
                                value={surname}
                                onChange={handleTextOnlyChange(setSurname)}
                                required
                              />
                            </div>

                            {/* --- Gender Dropdown --- */}
                            <div className="form-group">
                              <label className="lb">Gender:</label>
                              <select
                                className="form-control"
                                value={genderID}
                                onChange={(e) => setGenderID(e.target.value)}
                                required
                                disabled={loading && genders.length === 0}
                              >
                                <option value="">Select Gender</option>
                                {renderOptions(genders)}
                              </select>
                            </div>

                            {/* --- Marital Status Dropdown --- */}
                            <div className="form-group">
                              <label className="lb">Marital Status:</label>
                              <select
                                className="form-control"
                                value={maritalStatusID}
                                onChange={(e) =>
                                  setMaritalStatusID(e.target.value)
                                }
                                required
                                disabled={
                                  loading && maritalStatuses.length === 0
                                }
                              >
                                <option value="">Select Marital Status</option>
                                {renderOptions(maritalStatuses)}
                              </select>
                            </div>

                            {/* --- Gotra Dropdown (Self) --- */}
                            <div className="form-group">
                              <label className="lb">Gotra (Self):</label>
                              <select
                                className="form-control"
                                value={gotraID}
                                onChange={(e) => setGotraID(e.target.value)}
                                required
                                disabled={loading && gotras.length === 0}
                              >
                                <option value="">Select Gotra</option>
                                {renderOptions(gotras)}
                              </select>
                            </div>

                            {/* Nana Gotra is NOW IN COLUMN 2 */}
                          </div>
                          {/* -------------------- End Column 1 -------------------- */}

                          {/* -------------------- Column 2 (Right) -------------------- */}
                          <div className="col-md-6">
                            {/* --- Nana Gotra Dropdown (Maternal) (MOVED HERE) --- */}
                            <div className="form-group">
                              <label className="lb">
                                Nana Gotra (Maternal):
                              </label>
                              <select
                                className="form-control"
                                value={nanaGotraID}
                                onChange={(e) => setNanaGotraID(e.target.value)}
                                required
                                disabled={loading && nanaGotras.length === 0}
                              >
                                <option value="">Select Nana Gotra</option>
                                {renderOptions(nanaGotras)}
                              </select>
                            </div>

                            {/* --- Height Dropdown --- */}
                            <div className="form-group">
                              <label className="lb">Height:</label>
                              <select
                                className="form-control"
                                value={heightID}
                                onChange={(e) => setHeightID(e.target.value)}
                                required
                                disabled={loading && heights.length === 0}
                              >
                                <option value="">Select Height</option>
                                {renderOptions(heights)}
                              </select>
                            </div>

                            {/* --- Weight Input --- */}
                            <div className="form-group">
                              <label className="lb">Weight (in kg):</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter weight (30-200 kg)"
                                value={weight}
                                onChange={(e) =>
                                  setWeight(e.target.value.slice(0, 3))
                                }
                                min="30"
                                max="200"
                                required
                              />
                            </div>

                            {/* --- Complexion --- */}
                            <div className="form-group">
                              <label className="lb">Complexion:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="e.g., Fair, Wheatish, Dark"
                                value={complexion}
                                onChange={handleTextOnlyChange(setComplexion)}
                                required
                              />
                            </div>

                            {/* --- Father's Name --- */}
                            <div className="form-group">
                              <label className="lb">Father's Name:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter father's name"
                                value={fatherName}
                                onChange={handleTextOnlyChange(setFatherName)}
                                required
                              />
                            </div>

                            {/* --- Mother's Name --- */}
                            <div className="form-group">
                              <label className="lb">Mother's Name:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter mother's name"
                                value={motherName}
                                onChange={handleTextOnlyChange(setMotherName)}
                                required
                              />
                            </div>

                            {/* --- City Dropdown --- */}
                            <div className="form-group">
                              <label className="lb">City:</label>
                              <select
                                className="form-control"
                                value={cityID}
                                onChange={(e) => setCityID(e.target.value)}
                                required
                                disabled={loading && cities.length === 0}
                              >
                                <option value="">Select City</option>
                                {renderOptions(cities)}
                              </select>
                            </div>
                          </div>
                          {/* -------------------- End Column 2 -------------------- */}
                        </div>
                        {/* --- End Bootstrap Row --- */}

                        {/* --- Full-width items --- */}
                        <div className="form-group form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={agree}
                              onChange={(e) => setAgree(e.target.checked)}
                              required
                            />{" "}
                            Creating an account means you’re okay with our{" "}
                            <a href="#">Terms of Service</a>...
                          </label>
                        </div>

                        {/* --- THIS IS NO LONGER NEEDED --- */}
                        {/* {message && ( ... )} */}

                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={
                            loading ||
                            !!phoneError ||
                            !userID ||
                            !agree ||
                            phone.length !== 10
                          }
                        >
                          {loading ? "Creating..." : "Create Profile"}
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

export default SignUp;
