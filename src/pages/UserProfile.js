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

const API = process.env.REACT_APP_API_URL;

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
    if (!id) return "-";
    const list = masters[type] || [];
    const found = list.find((x) => String(x.id) === String(id));
    return found ? found.name : "-";
  };

  const calcAge = (dob) => {
    if (!dob) return "-";
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

  const imageSrc = profile.ProfilePhoto ? profile.ProfilePhoto : DEFAULT_IMG;

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
              <div style={fieldValue}>{it.value ?? "-"}</div>
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
        style={{ marginTop: "7rem", marginBottom: "5rem" }}
      >
        {/* HEADER CARD */}
        <div
          className="p-4 rounded shadow-sm mb-5"
          style={{
            background: "white",
            border: "1px solid #eee",
            borderRadius: 15,
          }}
        >
          <div className="row align-items-center">
            {/* IMAGE */}
            <div className="col-md-3 text-center">
              <div
                style={{
                  width: 160,
                  height: 200,
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                  margin: "0 auto",
                }}
              >
                <img
                  src={imageSrc}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* NAME & BASICS */}
            <div className="col-md-6 mt-4 mt-md-0">
              <h2 className="fw-bold mb-1" style={{ fontSize: 28 }}>
                {profile.Title ? `${profile.Title} ` : ""}
                {profile.firstname} {profile.MiddleName} {profile.lastname}
              </h2>

              <div className="text-muted mb-3" style={{ fontSize: 15 }}>
                <strong>UserID:</strong> {profile.UserID} &nbsp; | &nbsp;
                <strong>Age:</strong> {calcAge(profile.DateOfBirth)}
              </div>

              {/* BADGES */}
              <div className="d-flex flex-wrap gap-2 mt-2">
                <span className="badge bg-light text-dark px-3 py-2">
                  {lookup("heights", profile.HeightID)}
                </span>
                <span className="badge bg-light text-dark px-3 py-2">
                  {lookup("religions", profile.ReligionID)}
                </span>
                <span className="badge bg-light text-dark px-3 py-2">
                  {lookup("cities", profile.ContactCityID)}
                </span>
                <span className="badge bg-light text-dark px-3 py-2">
                  {profile.Complexion || "Complexion: -"}
                </span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="col-md-3 text-md-end text-center mt-4 mt-md-0">
              <Link
                to="/user-profile-edit"
                className="fw-semibold px-4 py-2 d-inline-block"
                style={{
                  background: "linear-gradient(90deg,#d32163,#ff5a8f)",
                  borderRadius: 8,
                  color: "white",
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(211,33,99,0.25)",
                }}
              >
                Edit Profile
              </Link>

              <div className="mt-3">
                <a
                  href="/"
                  className="btn btn-outline-secondary px-4 py-2"
                  style={{ borderRadius: 8 }}
                >
                  Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============= SECTIONS ============= */}

        {/* REUSABLE SECTION WRAPPER */}
        {[
          {
            title: "Basic Details",
            rows: [
              { label: "Title", value: profile.Title },
              { label: "First Name", value: profile.firstname },
              { label: "Middle Name", value: profile.MiddleName },
              { label: "Last Name", value: profile.lastname },
              { label: "Gender", value: profile.GenderName },
              { label: "Marital Status", value: profile.MaritalStatus },
            ],
          },
          {
            title: "Birth & Astrology",
            rows: [
              { label: "Date of Birth", value: profile.DateOfBirth },
              { label: "Birth Time", value: profile.BirthTime },
              { label: "Birth Place", value: profile.BirthPlace },
              { label: "Birth Name", value: profile.BirthName },
              { label: "Rashi", value: profile.Rashi },
              { label: "Gotra", value: profile.GotraName },
              { label: "Nana Gotra", value: profile.NanaGotraName },
              { label: "Manglik", value: profile.Manglik == 1 ? "Yes" : "No" },
            ],
          },
          {
            title: "Physical Details",
            rows: [
              { label: "Height", value: lookup("heights", profile.HeightID) },
              { label: "Weight", value: profile.Weight },
              { label: "Complexion", value: profile.Complexion },
              { label: "Blood Group", value: profile.BloodGroupID },
            ],
          },
          {
            title: "Education & Job",
            rows: [
              { label: "Degree", value: profile.EducationDegreeName },
              { label: "Education Detail", value: profile.EducationDetail },
              { label: "Occupation", value: profile.OccupationName },
              { label: "Organization", value: profile.OrganizationName },
              { label: "Location", value: profile.OrganizationLocation },
              {
                label: "Annual Income",
                value: lookup("incomeranges", profile.AnnualIncomeID),
              },
            ],
          },
          {
            title: "Family Details",
            rows: [
              { label: "Father Name", value: profile.FatherName },
              { label: "Father Status", value: profile.FatherStatus },
              { label: "Mother Name", value: profile.MotherName },
              { label: "Mother Occupation", value: profile.MotherOccupation },
              { label: "Brothers", value: profile.NoOfBrothers },
              { label: "Sisters", value: profile.NoOfSisters },
            ],
          },
          {
            title: "Marriage Preferences",
            rows: [
              {
                label: "Preferred Area",
                value: profile.PreferredAreaOfMarriage,
              },
              { label: "Diet", value: profile.Diet },
              {
                label: "Partner Expectations",
                fullWidth: true,
                value: profile.PartnerExpectations,
              },
            ],
          },
          {
            title: "Contact Details",
            rows: [
              { label: "Email", value: profile.ContactEmail },
              { label: "Contact Mobile", value: profile.ContactMobile },
              { label: "Phone", value: profile.ContactPhone },
              { label: "Address", value: profile.Address, fullWidth: true },
            ],
          },
        ].map((section, idx) => (
          <div
            key={idx}
            className="p-4 mb-4 rounded shadow-sm"
            style={{
              background: "white",
              border: "1px solid #eee",
              borderRadius: 15,
            }}
          >
            <h4 className="fw-bold mb-4" style={{ color: "#d32163" }}>
              {section.title}
            </h4>

            <div className="row">
              {section.rows.map((item, i) => (
                <div
                  className={item.fullWidth ? "col-md-12" : "col-md-4"}
                  key={i}
                  style={{ marginBottom: 20 }}
                >
                  <div className="text-muted small">{item.label}</div>
                  <div className="fw-semibold">{item.value || "-"}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
      <CopyRight />
    </div>
  );
};

export default UserProfile;
