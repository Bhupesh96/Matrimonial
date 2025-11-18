// src/pages/UserProfile.js
import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

const API = "/api";

// master types (lowercase)
const masterTypes = [
  "heights",
  "religions",
  "educationdegrees",
  "occupations",
  "cities",
  "preference_marriage_area",
  "gotras",
  "rashis",
  "diets",
  "incomeranges",
];

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [masters, setMasters] = useState({});

  const IMG_BASE = "https://techwithus.in/matro/admin/plug/";
  const DEFAULT_IMG = "images/default.png";

  useEffect(() => {
    (async () => {
      try {
        // load masters in parallel
        const masterPromises = masterTypes.map((t) =>
          fetch(`${API}?api=get_master&master_type=${t}`).then((r) => r.json())
        );
        const masterResults = await Promise.all(masterPromises);
        const masterObj = {};
        masterTypes.forEach((t, i) => {
          masterObj[t] = (masterResults[i] && masterResults[i].data) || [];
        });
        setMasters(masterObj);

        // load profile
        const profileID = localStorage.getItem("profileID");
        if (!profileID) {
          setProfile(null);
          setLoading(false);
          return;
        }
        const res = await fetch(
          `${API}?api=get_profile&ProfileID=${profileID}`
        );
        const json = await res.json();
        if (json.status === 200 && Array.isArray(json.data) && json.data[0]) {
          // normalize keys to match edit page if needed
          const p = json.data[0];
          // keep original keys
          setProfile(p);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("UserProfile load error:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const lookup = (type, id) => {
    if (!id) return "NA";
    const list = masters[type] || [];
    const found = list.find((x) => String(x.id) === String(id));
    return found ? found.name : "NA";
  };

  const calcAge = (dob) => {
    if (!dob) return "NA";
    const diff = Date.now() - new Date(dob).getTime();
    return `${new Date(diff).getUTCFullYear() - 1970} Years`;
  };

  if (loading) return <Preloader />;

  if (!profile) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        No profile found. Please login or set <code>profileID</code> in
        localStorage.
      </div>
    );
  }

  const imageSrc = profile.ProfilePhoto
    ? IMG_BASE + profile.ProfilePhoto
    : DEFAULT_IMG;

  // two-line partner expectation fallback
  const partnerExpectations =
    profile.PartnerExpectations && profile.PartnerExpectations.trim().length > 0
      ? profile.PartnerExpectations
      : "Looking for a caring and educated partner who values family and traditions.\nShould be supportive, kind and ready to build a happy married life together.";

  // Inline styles (clean, integrated look)
  const containerStyle = { marginTop: "6.5rem", marginBottom: "3rem" };
  const headerRow = { display: "flex", gap: "20px", alignItems: "center" };
  const passportStyle = {
    width: 120,
    height: 150,
    objectFit: "cover",
    borderRadius: 6,
    border: "1px solid #e6e6e6",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  };
  const nameStyle = { margin: 0, fontSize: 22, fontWeight: 600, color: "#222" };
  const uidStyle = { color: "#666", marginTop: 6, marginBottom: 12 };
  const badge = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 20,
    background: "#f8f0f4",
    color: "#d32163",
    fontSize: 13,
    marginRight: 8,
    marginBottom: 8,
  };
  const sectionTitle = {
    fontSize: 18,
    marginBottom: 12,
    color: "#d32163",
    fontWeight: 600,
  };
  const fieldLabel = { color: "#666", fontSize: 13, marginBottom: 4 };
  const fieldValue = { color: "#222", fontSize: 15, marginBottom: 10 };
  const threeColRow = { marginBottom: 20 };
  const modernBtn = {
    padding: "9px 18px",
    background: "linear-gradient(90deg,#d32163,#ff5a8f)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    boxShadow: "0 6px 18px rgba(211,33,99,0.18)",
    cursor: "pointer",
    textDecoration: "none",
  };

  // Helper to render a 3-column row with label/value pairs
  const RenderThreeCols = ({ items }) => {
    // items: array of { label, value }
    return (
      <div className="row" style={threeColRow}>
        {items.map((it, idx) => (
          <div className="col-md-4" key={idx}>
            <div>
              <div style={fieldLabel}>{it.label}</div>
              <div style={fieldValue}>{it.value ?? "NA"}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />

      <div
        className="container"
        style={{ marginTop: "7rem", marginBottom: "4rem" }}
      >
        {/* -------- PROFILE HEADER -------- */}
        <div className="row align-items-center mb-5 pb-4 border-bottom">
          <div className="col-md-3 text-center">
            <img
              src={imageSrc}
              alt="Profile"
              className="img-fluid rounded shadow-sm"
              style={{ width: 160, height: 200, objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold mb-1" style={{ color: "#222" }}>
              {profile.Title ? `${profile.Title} ` : ""}
              {profile.firstname} {profile.MiddleName} {profile.lastname}
            </h2>

            <div className="text-muted mb-3">
              <strong>User ID:</strong> {profile.UserID} &nbsp; | &nbsp;
              <strong>Age:</strong> {calcAge(profile.DateOfBirth)}
            </div>

            {/* BADGES */}
            <div className="d-flex flex-wrap gap-2">
              <span
                className="badge rounded-pill px-3 py-2"
                style={{ background: "#f7e7ef", color: "#d32163" }}
              >
                {lookup("heights", profile.HeightID)}
              </span>
              <span
                className="badge rounded-pill px-3 py-2"
                style={{ background: "#e8f4ff", color: "#1578d3" }}
              >
                {lookup("religions", profile.ReligionID)}
              </span>
              <span
                className="badge rounded-pill px-3 py-2"
                style={{ background: "#fff4e5", color: "#d87a00" }}
              >
                {lookup("cities", profile.ContactCityID)}
              </span>
              <span className="badge rounded-pill px-3 py-2 bg-light text-dark">
                {profile.Complexion ?? "Complexion: NA"}
              </span>
            </div>
          </div>

          <div className="col-md-3 text-end mt-4 mt-md-0">
            <Link
              to="/user-profile-edit"
              className="btn text-white fw-semibold px-4 py-2"
              style={{
                background: "linear-gradient(90deg,#d32163,#ff5a8f)",
                borderRadius: "8px",
              }}
            >
              Edit Profile
            </Link>
            <br />
            <a
              href="/"
              className="btn btn-outline-secondary fw-semibold mt-3 px-4"
            >
              Back to Dashboard
            </a>
          </div>
        </div>

        {/* ----------- SECTIONS ----------- */}

        {/* BASIC DETAILS */}
        <h4 className="section-title mb-3 mt-4 text-primary">Basic Details</h4>
        <div className="row mb-4 pb-3 border-bottom">
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Title</div>
            <div className="fw-semibold">{profile.Title || "NA"}</div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-muted small">First Name</div>
            <div className="fw-semibold">{profile.firstname || "NA"}</div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Middle Name</div>
            <div className="fw-semibold">{profile.MiddleName || "NA"}</div>
          </div>
        </div>

        {/* BIRTH DETAILS */}
        <h4 className="section-title mb-3 mt-4 text-primary">
          Birth & Astrological Details
        </h4>
        <div className="row mb-4 pb-3 border-bottom">
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Date of Birth</div>
            <div className="fw-semibold">{profile.DateOfBirth || "NA"}</div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Birth Place</div>
            <div className="fw-semibold">{profile.BirthPlace || "NA"}</div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Birth Time</div>
            <div className="fw-semibold">{profile.BirthTime || "NA"}</div>
          </div>
        </div>

        {/* EDUCATION & JOB */}
        <h4 className="section-title mb-3 mt-4 text-primary">
          Education & Job
        </h4>
        <div className="row mb-4 pb-3 border-bottom">
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Education Degree</div>
            <div className="fw-semibold">
              {lookup("educationdegrees", profile.EducationDegreeID)}
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Occupation</div>
            <div className="fw-semibold">
              {lookup("occupations", profile.OccupationID)}
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Annual Income</div>
            <div className="fw-semibold">
              {lookup("incomeranges", profile.AnnualIncomeID)}
            </div>
          </div>
        </div>

        {/* FAMILY */}
        <h4 className="section-title mb-3 mt-4 text-primary">Family Details</h4>
        <div className="row mb-4 pb-3 border-bottom">
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Father Name</div>
            <div className="fw-semibold">{profile.FatherName || "NA"}</div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Mother Name</div>
            <div className="fw-semibold">{profile.MotherName || "NA"}</div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Siblings</div>
            <div className="fw-semibold">
              Brothers: {profile.NoOfBrothers} (Married:{" "}
              {profile.NoOfBrothersMarried}) | Sisters: {profile.NoOfSisters}{" "}
              (Married: {profile.NoOfSistersMarried})
            </div>
          </div>
        </div>

        {/* MARRIAGE PREFERENCES */}
        <h4 className="section-title mb-3 mt-4 text-primary">
          Marriage Preferences
        </h4>
        <div className="row mb-4 pb-3 border-bottom">
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Preferred Marriage Area</div>
            <div className="fw-semibold">
              {lookup(
                "preference_marriage_area",
                profile.PreferredAreaOfMarriage
              )}
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="text-muted small">Diet</div>
            <div className="fw-semibold">{lookup("diets", profile.DietID)}</div>
          </div>

          <div className="col-md-12 mt-3">
            <div className="text-muted small">Partner Expectations</div>
            <div className="fw-semibold" style={{ whiteSpace: "pre-line" }}>
              {partnerExpectations}
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <h4 className="section-title mb-3 mt-4 text-primary">
          Contact Details
        </h4>
        <div className="row mb-4 pb-3 border-bottom">
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Primary Mobile</div>
            <div className="fw-semibold">{profile.ContactMobile || "NA"}</div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Email</div>
            <div className="fw-semibold">{profile.ContactEmail || "NA"}</div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="text-muted small">Address</div>
            <div className="fw-semibold">{profile.Address || "NA"}</div>
          </div>
        </div>
      </div>

      <Footer />
      <CopyRight />
    </div>
  );
};

export default UserProfile;
