import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import usePageTitle from "../hooks/usePageTitle";
import { resolveImageUrl } from "../utils/imageUrl";
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

import {
  fetchMasterData,
  getProfileDetails,
  updateProfile,
  updateProfilePicture,
} from "../api";
import AlertService from "../services/AlertServices";
import SearchableSelect from "../components/SearchableSelect";

import "../assets/css/UserProfileEdit.css";

// Hard-coded option set for the Title dropdown (not stored in master tables).
const TITLE_OPTIONS = [
  { id: "Mr.", name: "Mr." },
  { id: "Mrs.", name: "Mrs." },
  { id: "Ms.", name: "Ms." },
  { id: "Dr.", name: "Dr." },
];

const UserProfileEdit = () => {
  usePageTitle("Edit My Profile", {
    description:
      "Update your matrimonial details, photos, education, family, and partner expectations on Dewangan Links.",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [profileData, setProfileData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoName, setProfilePhotoName] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [dropdowns, setDropdowns] = useState({
    cities: [],
    heights: [],
    gotras: [],
    rashis: [],
    educationDegrees: [],
    occupations: [],
    incomeRanges: [],
    diets: [],
    preferenceMarriageAreas: [],
    religions: [],
    maritalStatuses: [],
    motherTongues: [],
    bloodGroups: [],
    relationships: [],
    genders: [],
  });
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "/images/default.png";
    // Local blob preview from a freshly chosen file
    if (imagePath.startsWith("blob:")) return imagePath;
    return resolveImageUrl(imagePath) || "/images/default.png";
  };
  useEffect(() => {
    const loadAll = async () => {
      const profileID = localStorage.getItem("profileID");
      if (
        !profileID ||
        profileID === "undefined" ||
        profileID === "null"
      ) {
        setLoading(false);
        AlertService.showError("You are not logged in.");
        navigate("/login");
        return;
      }

      try {
        const masters = [
          "cities",
          "heights",
          "gotras",
          "rashis",
          "educationdegrees",
          "occupations",
          "incomeranges",
          "diets",
          "preference_marriage_area",
          "religions",
          "maritalstatuses",
          "mothertongues",
          "bloodgroups",
          "relationships",
          "genders",
        ];

        const masterResults = await Promise.all(
          masters.map((m) => fetchMasterData(m)),
        );

        const profile = await getProfileDetails();

        // Fix wrong DB value: OccupationDetail = ID
        if (profile.OccupationDetail && !profile.OccupationID) {
          profile.OccupationID = String(profile.OccupationDetail);
        }

        if (profile.Diet && !profile.DietID && !isNaN(profile.Diet)) {
          profile.DietID = String(profile.Diet);
        }

        if (
          profile.AnnualIncome &&
          !profile.AnnualIncomeID &&
          !isNaN(profile.AnnualIncome)
        ) {
          profile.AnnualIncomeID = String(profile.AnnualIncome);
        }

        if (profile?.DateOfBirth) {
          profile.DateOfBirth = String(profile.DateOfBirth).split(" ")[0];
        }

        setDropdowns({
          cities: masterResults[0],
          heights: masterResults[1],
          gotras: masterResults[2],
          rashis: masterResults[3],
          educationDegrees: masterResults[4],
          occupations: masterResults[5],
          incomeRanges: masterResults[6],
          diets: masterResults[7],
          preferenceMarriageAreas: masterResults[8],
          religions: masterResults[9],
          maritalStatuses: masterResults[10],
          motherTongues: masterResults[11],
          bloodGroups: masterResults[12],
          relationships: masterResults[13],
          genders: masterResults[14],
        });

        setProfileData(profile);
        // Convert Rashi TEXT → ID
        if (profile.Rashi) {
          const found = masterResults[3].find(
            (x) => x.name.toLowerCase() === profile.Rashi.toLowerCase(),
          );
          if (found) profile.Rashi = String(found.id);
        }
        if (profile.PreferredAreaOfMarriage) {
          const pref = masterResults[8].find(
            (x) =>
              x.name.toLowerCase() ===
              String(profile.PreferredAreaOfMarriage).toLowerCase(),
          );
          if (pref) profile.PreferredAreaOfMarriage = String(pref.id);
        }
      } catch (e) {
        AlertService.showError("Failed to load data.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const onPhotoChange = (e) => {
    if (!e.target.files?.[0]) return;

    setProfilePhoto(e.target.files[0]);
    setProfilePhotoName(e.target.files[0].name);

    setProfileData((prev) => ({
      ...prev,
      ProfilePhoto: URL.createObjectURL(e.target.files[0]),
    }));
  };
  const onGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setGalleryFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreview(previews);
  };

  const buildPayload = () => {
    const p = { ...profileData };

    if (p.DateOfBirth?.length === 10) {
      p.DateOfBirth = p.DateOfBirth + " 00:00:00";
    }

    const findText = (list, id) => {
      const item = list.find((x) => String(x.id) === String(id));
      return item ? item.name : "";
    };

    if (p.EducationDegreeID) {
      // Split the comma-separated IDs, find their text names, and join them back
      const selectedIds = String(p.EducationDegreeID).split(",");
      const selectedNames = selectedIds
        .map((id) => findText(dropdowns.educationDegrees, id.trim()))
        .filter(Boolean); // Remove empty values

      p.EducationDegree = selectedNames.join(", ");
    }

    if (p.OccupationID) {
      p.OccupationDetail = findText(dropdowns.occupations, p.OccupationID);
    }

    if (p.AnnualIncomeID) {
      p.AnnualIncome = findText(dropdowns.incomeRanges, p.AnnualIncomeID);
    }

    if (p.DietID) {
      p.Diet = findText(dropdowns.diets, p.DietID);
    }

    if (p.ContactCityID) {
      p.ContactCity = findText(dropdowns.cities, p.ContactCityID);
    }

    if (p.PreferredAreaOfMarriage) {
      p.PreferredAreaOfMarriage = findText(
        dropdowns.preferenceMarriageAreas,
        p.PreferredAreaOfMarriage,
      );
    }

    if (p.Rashi) {
      p.Rashi = findText(dropdowns.rashis, p.Rashi);
    }

    return p;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = buildPayload();

      // 1️⃣ Update profile TEXT data only
      await updateProfile(payload);

      // 2️⃣ Upload profile photo + gallery (only if selected)
      if (profilePhoto || galleryFiles.length > 0) {
        await updateProfilePicture(profilePhoto, galleryFiles);
      }

      const gid = payload.GenderID ?? profileData.GenderID;
      if (gid != null && gid !== "") {
        localStorage.setItem("viewerGenderID", String(gid));
      }

      AlertService.showSuccessAndRedirect(
        "Profile updated successfully!",
        navigate,
        "/",
      );
    } catch (err) {
      AlertService.showError(err.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Preloader />;

  const {
    cities,
    heights,
    gotras,
    rashis,
    educationDegrees,
    occupations,
    incomeRanges,
    diets,
    preferenceMarriageAreas,
    religions,
    maritalStatuses,
    motherTongues,
    bloodGroups,
    relationships,
    genders,
  } = dropdowns;

  return (
    <div className="dw-edit-page">
      <PoopUpSearch />
      <TopMenu />
      <MenuPopUp />
      <ContactExpert />
      <MainMenu />
      <MobileMenu />
      <DashboardMenu />

      <div className="container dw-edit-container">
        <form onSubmit={handleSubmit}>
          {/* -------------------------------------- */}
          {/* BASIC DETAILS */}
          {/* -------------------------------------- */}
          <div className="edit-pro-parti mb-5">
            <h4>Basic Details</h4>

            <div className="row mt-3">
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label>Title</label>
                    <SearchableSelect
                      name="Title"
                      value={profileData.Title || ""}
                      options={TITLE_OPTIONS}
                      onChange={handleChange}
                      placeholder="Select Title"
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>Firstname</label>
                    <input
                      className="form-control"
                      required
                      name="firstname"
                      value={profileData.firstname || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>Middlename</label>
                    <input
                      className="form-control"
                      name="MiddleName"
                      value={profileData.MiddleName || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label>Lastname</label>
                    <input
                      className="form-control"
                      required
                      name="lastname"
                      value={profileData.lastname || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>
                      Gender <span style={{ color: "#dc3545" }}>*</span>
                    </label>
                    <SearchableSelect
                      name="GenderID"
                      value={profileData.GenderID || ""}
                      options={genders}
                      onChange={handleChange}
                      placeholder="Select Gender"
                      showClear={false}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="DateOfBirth"
                      value={profileData.DateOfBirth || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Birth Place</label>
                    <input
                      className="form-control"
                      name="BirthPlace"
                      value={profileData.BirthPlace || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>Birth Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="BirthTime"
                      value={profileData.BirthTime || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Birth Name</label>
                    <input
                      className="form-control"
                      name="BirthName"
                      value={profileData.BirthName || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Mother Tongue</label>
                    <SearchableSelect
                      name="MotherTongueID"
                      value={profileData.MotherTongueID || ""}
                      options={motherTongues}
                      onChange={handleChange}
                      placeholder="Search Mother Tongue"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>Religion</label>
                    <SearchableSelect
                      name="ReligionID"
                      value={profileData.ReligionID || ""}
                      options={religions}
                      onChange={handleChange}
                      placeholder="Search Religion"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Marital Status</label>
                    <SearchableSelect
                      name="MaritalStatusID"
                      value={profileData.MaritalStatusID || ""}
                      options={maritalStatuses}
                      onChange={handleChange}
                      placeholder="Search Marital Status"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Gotra</label>
                    <SearchableSelect
                      name="GotraID"
                      value={profileData.GotraID || ""}
                      options={gotras}
                      onChange={handleChange}
                      placeholder="Search Gotra"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>Rashi</label>
                    <SearchableSelect
                      name="Rashi"
                      value={profileData.Rashi || ""}
                      options={rashis}
                      onChange={handleChange}
                      placeholder="Search Rashi"
                    />
                  </div>
                </div>
              </div>

              {/* PROFILE PHOTO */}
              <div className="col-md-3 d-flex flex-column align-items-center">
                <div className="dw-photo-frame">
                  <img
                    src={getFullImageUrl(
                      profileData.ProfilePhoto || profileData.ProfileImageURL,
                    )}
                    alt="Profile"
                  />
                </div>

                <label htmlFor="passportPhotoInput" style={{ cursor: "pointer" }}>
                  <span className="dw-upload-btn">
                    <i className="fa fa-camera" aria-hidden="true"></i>
                    Choose Photo
                  </span>
                </label>

                <input
                  id="passportPhotoInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onPhotoChange}
                />

                <div className="dw-photo-filename">
                  {profilePhotoName || "No file chosen"}
                </div>
              </div>

              {/* ---------------- GALLERY UPLOAD ---------------- */}
              <div className="dw-gallery-section">
                <h5>Photo Gallery</h5>

                {/* 1. SHOW EXISTING GALLERY IMAGES FROM SERVER */}
                {profileData.gallery_images &&
                  profileData.gallery_images.length > 0 && (
                    <div style={{ marginBottom: "16px" }}>
                      <div className="dw-gallery-existing-label">
                        Existing Photos
                      </div>
                      <div className="dw-gallery-grid">
                        {profileData.gallery_images.map((img, i) => (
                          <img
                            key={i}
                            src={getFullImageUrl(img)}
                            alt="gallery"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                {/* 2. UPLOAD BUTTON */}
                <label
                  htmlFor="galleryInput"
                  style={{ cursor: "pointer", display: "inline-block", marginBottom: 12 }}
                >
                  <span className="dw-upload-btn dw-upload-btn-ghost">
                    <i className="fa fa-camera" aria-hidden="true"></i>
                    Upload New Gallery Photos
                  </span>
                </label>

                <input
                  id="galleryInput"
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={onGalleryChange}
                />

                {/* 3. PREVIEW NEWLY SELECTED IMAGES */}
                {galleryPreview.length > 0 && (
                  <div>
                    <div className="dw-gallery-new-label">
                      New Photos to Upload (Will be saved on Update)
                    </div>
                    <div className="dw-gallery-grid dw-gallery-new">
                      {galleryPreview.map((img, i) => (
                        <img key={i} src={img} alt="preview" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* -------------------------------------- */}
          {/* PHYSICAL */}
          {/* -------------------------------------- */}
          <div className="edit-pro-parti mb-5">
            <h4>Physical</h4>

            <div className="row mt-3">
              <div className="col-md-4 mb-3">
                <label>Height</label>
                <SearchableSelect
                  name="HeightID"
                  value={profileData.HeightID || ""}
                  options={heights}
                  onChange={handleChange}
                  placeholder="Search Height"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  name="Weight"
                  value={profileData.Weight || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Complexion</label>
                <input
                  className="form-control"
                  name="Complexion"
                  value={profileData.Complexion || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-3">
                <label>Blood Group</label>
                <SearchableSelect
                  name="BloodGroupID"
                  value={profileData.BloodGroupID || ""}
                  options={bloodGroups}
                  onChange={handleChange}
                  placeholder="Search Blood Group"
                />
              </div>
            </div>
          </div>

          {/* -------------------------------------- */}
          {/* FAMILY */}
          {/* -------------------------------------- */}
          <div className="edit-pro-parti mb-5">
            <h4>Family Details</h4>

            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <label>Father Name</label>
                <input
                  className="form-control"
                  name="FatherName"
                  value={profileData.FatherName || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Mother Name</label>
                <input
                  className="form-control"
                  name="MotherName"
                  value={profileData.MotherName || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Father Occupation</label>
                <SearchableSelect
                  name="FatherOccupationID"
                  value={profileData.FatherOccupationID || ""}
                  options={occupations}
                  onChange={handleChange}
                  placeholder="Search father's occupation"
                />
                <small className="text-muted">
                  Shown on your profile as &quot;Father Occupation&quot;. This is
                  separate from Father Status below.
                </small>
              </div>

              <div className="col-md-6 mb-3">
                <label>Mother Occupation</label>
                <input
                  className="form-control"
                  name="MotherOccupation"
                  value={profileData.MotherOccupation || ""}
                  onChange={handleChange}
                  placeholder="e.g. Homemaker, Teacher"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Father Status</label>
                <input
                  className="form-control"
                  name="FatherStatus"
                  value={profileData.FatherStatus || ""}
                  onChange={handleChange}
                  placeholder="e.g. Alive, Retired, Employed"
                />
                <small className="text-muted">
                  Use this for living or employment status — not the same as
                  occupation (choose occupation above).
                </small>
              </div>
            </div>
          </div>

          {/* -------------------------------------- */}
          {/* EDUCATION & JOB */}
          {/* -------------------------------------- */}
          <div className="edit-pro-parti mb-5">
            <h4>Education & Job</h4>
            <label>Degree</label>
            <div className="mt-3">
              <div style={{ marginBottom: "16px" }}>
                <SearchableSelect
                  multi
                  name="EducationDegreeID"
                  value={profileData.EducationDegreeID || ""}
                  options={educationDegrees}
                  onChange={handleChange}
                  placeholder="Search & select degrees"
                />
              </div>

              <label>Education Detail</label>

              <input
                className="form-control mb-3"
                name="EducationDetail"
                value={profileData.EducationDetail || ""}
                onChange={handleChange}
              />

              <label>Occupation</label>
              <div className="mb-3">
                <SearchableSelect
                  name="OccupationID"
                  value={profileData.OccupationID || ""}
                  options={occupations}
                  onChange={handleChange}
                  placeholder="Search Occupation"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Organization Name</label>
                  <input
                    className="form-control"
                    name="OrganizationName"
                    value={profileData.OrganizationName || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Organization Location</label>
                  <input
                    className="form-control"
                    name="OrganizationLocation"
                    value={profileData.OrganizationLocation || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label>Annual Income</label>
              <div className="mb-3">
                <SearchableSelect
                  name="AnnualIncomeID"
                  value={profileData.AnnualIncomeID || ""}
                  options={incomeRanges}
                  onChange={handleChange}
                  placeholder="Search Income Range"
                />
              </div>
            </div>
          </div>

          {/* -------------------------------------- */}
          {/* PREFERENCES */}
          {/* -------------------------------------- */}
          <div className="edit-pro-parti mb-5">
            <h4>Preferences</h4>

            <div className="mt-3">
              <label>Preferred Area of Marriage</label>
              <div className="mb-3">
                <SearchableSelect
                  name="PreferredAreaOfMarriage"
                  value={profileData.PreferredAreaOfMarriage || ""}
                  options={preferenceMarriageAreas}
                  onChange={handleChange}
                  placeholder="Search Area"
                />
              </div>

              <label>Paitrik/Niwas</label>
              <input
                className="form-control mb-3"
                name="PaitthiNivasKhor"
                value={profileData.PaitthiNivasKhor || ""}
                onChange={handleChange}
              />

              <label>Diet</label>
              <div className="mb-3">
                <SearchableSelect
                  name="DietID"
                  value={profileData.DietID || ""}
                  options={diets}
                  onChange={handleChange}
                  placeholder="Search Diet"
                />
              </div>

              <label>Hobbies</label>
              <input
                className="form-control mb-3"
                name="Hobbies"
                value={profileData.Hobbies || ""}
                onChange={handleChange}
              />

              <label>Partner Expectations</label>
              <textarea
                className="form-control"
                rows="4"
                name="PartnerExpectations"
                value={profileData.PartnerExpectations || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* -------------------------------------- */}
          {/* CONTACT */}
          {/* -------------------------------------- */}
          <div className="edit-pro-parti mb-5">
            <h4>Contact</h4>

            <div className="mt-3">
              <label>Contact Person Name</label>
              <input
                className="form-control mb-3"
                name="ContactPersonName"
                value={profileData.ContactPersonName || ""}
                onChange={handleChange}
              />

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Relationship</label>
                  <SearchableSelect
                    name="ContactPersonRelationshipID"
                    value={profileData.ContactPersonRelationshipID || ""}
                    options={relationships}
                    onChange={handleChange}
                    placeholder="Search Relationship"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Contact Phone</label>
                  <input
                    className="form-control"
                    name="ContactPhone"
                    value={profileData.ContactPhone || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Contact Mobile</label>
                  <input
                    className="form-control"
                    name="ContactMobile"
                    value={profileData.ContactMobile || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Contact Mobile 2</label>
                  <input
                    className="form-control"
                    name="ContactMobile2"
                    value={profileData.ContactMobile2 || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label>Contact Email</label>
              <input
                type="email"
                className="form-control mb-3"
                name="ContactEmail"
                value={profileData.ContactEmail || ""}
                onChange={handleChange}
              />

              <label>Address</label>
              <textarea
                className="form-control mb-3"
                name="Address"
                value={profileData.Address || ""}
                onChange={handleChange}
              />

              <label>Contact City</label>
              <SearchableSelect
                name="ContactCityID"
                value={profileData.ContactCityID || ""}
                options={cities}
                onChange={handleChange}
                placeholder="Search City"
              />
              
            </div>
          </div>

          {/* -------------------------------------- */}
          {/* SUBMIT */}
          {/* -------------------------------------- */}
          <div className="dw-submit-row">
            <button
              type="submit"
              disabled={submitting}
              className="dw-submit-btn"
            >
              {submitting ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>

      <Footer />
      <CopyRight />
    </div>
  );
};

export default UserProfileEdit;
