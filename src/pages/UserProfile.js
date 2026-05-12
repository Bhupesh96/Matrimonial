// src/pages/UserProfile.js
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../api";
import usePageTitle from "../hooks/usePageTitle";
import ContactExpert from "../components/ContactExpert";
import CopyRight from "../components/CopyRight";
import DashboardMenu from "../components/DashBoardMenu";
import Footer from "../components/Footer";
import MainMenu from "../components/MainMenu";
import MenuPopUp from "../components/MenuPopUp";
import MobileMenu from "../components/MobileMenu";
import PoopUpSearch from "../components/PoopUpSearch";
import Preloader from "../components/Preloader";
import TopMenu from "../components/TopMenu";

import "../assets/css/UserProfile.css";

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
  "bloodgroups",
  "mothertongues",
  "relationships",
];

/** Show sibling row only when total or married count is > 0 (hide default 0/0). */
function hasNonZeroSiblingCount(total, married) {
  const t = Number(total);
  const m = Number(married);
  return (Number.isFinite(t) && t > 0) || (Number.isFinite(m) && m > 0);
}

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [masters, setMasters] = useState({});

  const profileTitle = profile
    ? `${profile.firstname || ""} ${profile.lastname || ""}`.trim() ||
    "View Profile"
    : "View Profile";
  usePageTitle(profileTitle, {
    description:
      "View detailed matrimonial profile on Dewangan Links — education, family, partner expectations and more.",
  });

  const IMG_BASE = process.env.REACT_APP_IMG_BASE_URL;
  const DEFAULT_IMG = "images/default.png";
  const { id } = useParams();
  const navigate = useNavigate();
  const viewerID = localStorage.getItem("profileID");
  const isAuthenticated =
    !!viewerID && viewerID !== "undefined" && viewerID !== "null";

  useEffect(() => {
    (async () => {
      try {
        // Use apiFetch for master data
        const masterPromises = masterTypes.map((t) =>
          apiFetch(`${API}?api=get_master&master_type=${t}`),
        );
        const masterResults = await Promise.all(masterPromises);
        const masterObj = {};
        masterTypes.forEach((t, i) => {
          masterObj[t] = (masterResults[i] && masterResults[i].data) || [];
        });
        setMasters(masterObj);

        // load profile
        const profileID = id || localStorage.getItem("profileID");
        if (!profileID) {
          setProfile(null);
          setLoading(false);
          return;
        }

        // Pass ViewerID so the backend knows whether to mask sensitive fields
        let url = `${API}?api=get_profile&ProfileID=${profileID}`;
        if (isAuthenticated) {
          url += `&ViewerID=${encodeURIComponent(viewerID)}`;
        }
        const json = await apiFetch(url);

        if (json.status === 200 && Array.isArray(json.data) && json.data[0]) {
          const p = json.data[0];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const lookup = (type, id) => {
    if (!id) return "-";
    const list = masters[type] || [];
    const found = list.find((x) => String(x.id) === String(id));
    return found ? found.name : "-";
  };

  /** Father occupation: master ID, or any text column the API may return. */
  const fatherOccupationDisplay = (p) => {
    const fromMaster = lookup("occupations", p.FatherOccupationID);
    if (fromMaster && fromMaster !== "-") return fromMaster;
    if (p.FatherOccupation) return p.FatherOccupation;
    if (p.FatherOccupationName) return p.FatherOccupationName;
    return "-";
  };

  const calcAge = (dob, fallbackAge) => {
    if (fallbackAge) return `${fallbackAge} Years`;
    if (!dob) return "-";
    const diff = Date.now() - new Date(dob).getTime();
    return `${new Date(diff).getUTCFullYear() - 1970} Years`;
  };

  if (loading) return <Preloader />;

  if (!profile) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        No profile found. The profile may have been removed.
      </div>
    );
  }

  const canSeeSensitiveContact = !!profile.IsConnected || !!profile.IsOwner;
  const connectionStatus = profile.ConnectionStatus; // null | Pending | Accepted | Rejected

  /** Extra gallery images — only after login (main profile photo is public). */
  const canSeeGallery = isAuthenticated;
  const galleryCount = Array.isArray(profile.gallery_images)
    ? profile.gallery_images.length
    : 0;

  const lockPlaceholder = (title, label) => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        color: "#a07a16",
        fontWeight: 600,
        background: "#fff8e1",
        border: "1px dashed #f0c14b",
        borderRadius: 6,
        padding: "3px 10px",
        fontSize: 13,
      }}
      title={title}
    >
      <i className="fa fa-lock" aria-hidden="true"></i>
      {label}
    </span>
  );

  /** Email / phone / full address — only after mutual connection (or own profile). */
  const maskedContact = (value) => {
    if (canSeeSensitiveContact) return value || "-";
    return lockPlaceholder(
      "Visible after your connection is accepted",
      "Visible after match",
    );
  };

  /** DOB / birth details — hidden for guests only; visible to any logged-in viewer. */
  const maskedBirthForGuest = (value) => {
    if (isAuthenticated) return value || "-";
    return lockPlaceholder("Log in to view this detail", "Log in to view");
  };

  // --- NEW HELPER FUNCTION FOR IMAGES ---
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return DEFAULT_IMG;
    // If it's already a full URL, return it
    if (imagePath.startsWith("http")) return imagePath;

    // Otherwise, attach the base URL from your PHP server
    const cleanPath = imagePath.startsWith("/")
      ? imagePath.substring(1)
      : imagePath;
    return `${IMG_BASE}${cleanPath}`;
  };

  // Safely grab the main profile picture. Prefer the newer "ProfileImageURL"
  // column (set by the photo-upload endpoint) over the legacy "ProfilePhoto"
  // value, so a freshly uploaded photo always wins even if the older column
  // still holds a stale path.
  const rawImageSrc = profile?.ProfileImageURL || profile?.ProfilePhoto;
  const placeholderSrc = `${process.env.PUBLIC_URL}/${DEFAULT_IMG}`;
  /* Main profile photo: visible to everyone (guests included). */
  const imageSrc = rawImageSrc
    ? getFullImageUrl(rawImageSrc)
    : placeholderSrc;

  const publicCity =
    profile.ContactCity ||
    lookup("cities", profile.ContactCityID) ||
    "-";

  const contactSectionRows = !isAuthenticated
    ? [
        {
          label: "City (general location)",
          value: publicCity !== "-" ? publicCity : "—",
        },
        { label: "Email", value: maskedContact(profile.ContactEmail) },
        {
          label: "Contact Mobile",
          value: maskedContact(profile.ContactMobile),
        },
        { label: "Phone", value: maskedContact(profile.ContactPhone) },
        {
          label: "Address",
          value: maskedContact(profile.Address),
          fullWidth: true,
        },
      ]
    : [
        { label: "Email", value: maskedContact(profile.ContactEmail) },
        {
          label: "Contact Mobile",
          value: maskedContact(profile.ContactMobile),
        },
        { label: "Phone", value: maskedContact(profile.ContactPhone) },
        {
          label: "Address",
          value: maskedContact(profile.Address),
          fullWidth: true,
        },
      ];

  return (
    <div className="dw-profile-page">
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />

      <div className="container dw-profile-container">
        {/* HEADER CARD */}
        <div className="dw-pf-header">
          <div className="row align-items-center">
            {/* IMAGE */}
            <div className="col-md-3 text-center">
              <div className="dw-pf-photo">
                <img src={imageSrc} alt="Profile" />
                {!isAuthenticated && galleryCount > 0 && (
                  <p className="dw-pf-photo-hint text-muted small mt-2 mb-0 px-1">
                    Log in to view the photo gallery ({galleryCount} more
                    {galleryCount === 1 ? " photo" : " photos"}).
                  </p>
                )}
              </div>
            </div>

            {/* NAME & BASICS */}
            <div className="col-md-9 mt-4 mt-md-0">
              <h2 className="dw-pf-name">
                {profile.Title ? `${profile.Title} ` : ""}
                {profile.firstname} {profile.MiddleName} {profile.lastname}
              </h2>

              <div className="dw-pf-meta">
                <strong>UserID:</strong> {profile.UserID} &nbsp;|&nbsp;
                <strong>Age:</strong>{" "}
                {calcAge(profile.DateOfBirth, profile.Age)}
              </div>

              {/* Contextual CTA */}
              <div className="dw-pf-actions">
                {!isAuthenticated && (
                  <Link to="/login" className="btn btn-primary">
                    <i className="fa fa-sign-in"></i>
                    Login to Connect
                  </Link>
                )}
                {isAuthenticated &&
                  !profile.IsOwner &&
                  !connectionStatus && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => navigate("/all-profiles")}
                    >
                      <i className="fa fa-paper-plane"></i>
                      Send Interest
                    </button>
                  )}
                {isAuthenticated && connectionStatus === "Pending" && (
                  <span className="badge bg-warning text-dark">
                    <i className="fa fa-hourglass-half"></i>
                    Request Pending
                  </span>
                )}
                {isAuthenticated && connectionStatus === "Accepted" && (
                  <span className="badge bg-success">
                    <i className="fa fa-check-circle"></i>
                    Connected
                  </span>
                )}
              </div>

              {/* QUICK-FACT PILLS */}
              <div className="dw-pf-pills">
                <span className="badge">
                  <i className="fa fa-arrows-v" style={{ marginRight: 5 }}></i>
                  {lookup("heights", profile.HeightID)}
                </span>
                <span className="badge">
                  <i className="fa fa-star-o" style={{ marginRight: 5 }}></i>
                  {lookup("religions", profile.ReligionID)}
                </span>
                <span className="badge">
                  <i
                    className="fa fa-map-marker"
                    style={{ marginRight: 5 }}
                  ></i>
                  {lookup("cities", profile.ContactCityID)}
                </span>
                <span className="badge">
                  <i className="fa fa-tint" style={{ marginRight: 5 }}></i>
                  {profile.Complexion || "Complexion: -"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery teaser for guests (no thumbnails of extra photos) */}
        {!isAuthenticated && galleryCount > 0 && (
          <div className="dw-pf-section dw-pf-gallery-teaser">
            <h4 className="dw-pf-section-title">Photo gallery</h4>
            <p className="dw-pf-field-value mb-0" style={{ lineHeight: 1.65 }}>
              This profile has{" "}
              <strong>
                {galleryCount} additional{" "}
                {galleryCount === 1 ? "photo" : "photos"}
              </strong>{" "}
              in the gallery.{" "}
              <Link to="/login">Log in</Link> to view them. Street address,
              phone and email stay hidden until a match accepts your connection.
            </p>
          </div>
        )}

        {/* ================= GALLERY (logged-in only) ================= */}
        {canSeeGallery &&
          profile.gallery_images &&
          profile.gallery_images.length > 0 && (
            <div className="dw-pf-section">
              <h4 className="dw-pf-section-title">Photo Gallery</h4>
              <div className="dw-pf-gallery">
                {profile.gallery_images.map((img, i) => (
                  <div
                    key={i}
                    className="dw-pf-gallery-item"
                    onClick={() => window.open(getFullImageUrl(img), "_blank")}
                  >
                    <img src={getFullImageUrl(img)} alt={`Gallery ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

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
              {
                label: "Date of Birth",
                value: maskedBirthForGuest(profile.DateOfBirth),
              },
              {
                label: "Birth Time",
                value: maskedBirthForGuest(profile.BirthTime),
              },
              {
                label: "Birth Place",
                value: maskedBirthForGuest(profile.BirthPlace),
              },
              {
                label: "Birth Name",
                value: maskedBirthForGuest(profile.BirthName),
              },
              { label: "Rashi", value: profile.Rashi },
              { label: "Gotra", value: profile.GotraName },
              { label: "Nana Gotra", value: profile.NanaGotraName },
              {
                label: "Manglik",
                value:
                  profile.Manglik === undefined || profile.Manglik === null
                    ? "-"
                    : Number(profile.Manglik) === 1
                      ? "Yes"
                      : "No",
              },
            ],
          },
          {
            title: "Physical Details",
            rows: [
              {
                label: "Height",
                value:
                  profile.HeightValue || lookup("heights", profile.HeightID),
              },
              { label: "Weight", value: profile.Weight },
              { label: "Complexion", value: profile.Complexion },
              {
                label: "Blood Group",
                value:
                  profile.BloodGroupName ||
                  lookup("bloodgroups", profile.BloodGroupID),
              },
            ],
          },
          {
            title: "Education & Job",
            rows: [
              {
                label: "Degree",
                value: profile.EducationDegree || profile.EducationDegreeName,
              }, // <--- Updated!
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
              {
                label: "Father Occupation",
                value: fatherOccupationDisplay(profile),
              },
              { label: "Mother Name", value: profile.MotherName },
              { label: "Mother Occupation", value: profile.MotherOccupation },
              ...(hasNonZeroSiblingCount(
                profile.NoOfBrothers,
                profile.NoOfBrothersMarried,
              )
                ? [
                    {
                      label: "Brothers (Total / Married)",
                      value: `${profile.NoOfBrothers ?? 0} / ${profile.NoOfBrothersMarried ?? 0}`,
                    },
                  ]
                : []),
              ...(hasNonZeroSiblingCount(
                profile.NoOfSisters,
                profile.NoOfSistersMarried,
              )
                ? [
                    {
                      label: "Sisters (Total / Married)",
                      value: `${profile.NoOfSisters ?? 0} / ${profile.NoOfSistersMarried ?? 0}`,
                    },
                  ]
                : []),
            ],
          },
          {
            title: "Marriage Preferences",
            rows: [
              {
                label: "Preferred Area",
                value: profile.PreferredAreaOfMarriage,
              },
              {
                label: "Paitrik / Niwas (city)",
                value: profile.PaitthiNivasKhor,
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
            rows: contactSectionRows,
          },
        ].map((section, idx) => (
          <div key={idx} className="dw-pf-section">
            <h4 className="dw-pf-section-title">{section.title}</h4>

            <div className="row">
              {section.rows.map((item, i) => (
                <div
                  className={item.fullWidth ? "col-md-12" : "col-md-4"}
                  key={i}
                >
                  <div className="dw-pf-field-label">{item.label}</div>
                  <div className="dw-pf-field-value">
                    {item.value === undefined ||
                    item.value === null ||
                    item.value === ""
                      ? "-"
                      : item.value}
                  </div>
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
