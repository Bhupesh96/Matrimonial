import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const renderOptions = (list) =>
  list?.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

const UserProfileEdit = () => {
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
  });
  const IMG_BASE =
    process.env.REACT_APP_IMG_BASE_URL ||
    "https://techwithus.in/matro/admin/plug/";

  // NEW HELPER FUNCTION
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "/images/default.png";
    // If it's already a full URL or a local blob (newly uploaded photo), return it directly
    if (imagePath.startsWith("http") || imagePath.startsWith("blob:"))
      return imagePath;

    // Otherwise, attach the base URL from your PHP server
    const cleanPath = imagePath.startsWith("/")
      ? imagePath.substring(1)
      : imagePath;
    return `${IMG_BASE}${cleanPath}`;
  };
  useEffect(() => {
    const loadAll = async () => {
      const profileID = localStorage.getItem("profileID");
      if (!profileID) {
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
      p.EducationDegree = findText(
        dropdowns.educationDegrees,
        p.EducationDegreeID,
      );
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
  } = dropdowns;

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
        style={{ marginTop: "7rem", marginBottom: "6rem" }}
      >
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
                    <select
                      className="form-select"
                      name="Title"
                      value={profileData.Title || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Title</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
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
                </div>

                <div className="row">
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
                    <select
                      className="form-select"
                      name="MotherTongueID"
                      value={profileData.MotherTongueID || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Tongue</option>
                      {renderOptions(motherTongues)}
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Religion</label>
                    <select
                      className="form-select"
                      name="ReligionID"
                      value={profileData.ReligionID || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Religion</option>
                      {renderOptions(religions)}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>Marital Status</label>
                    <select
                      className="form-select"
                      name="MaritalStatusID"
                      value={profileData.MaritalStatusID || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Status</option>
                      {renderOptions(maritalStatuses)}
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Gotra</label>
                    <select
                      className="form-select"
                      name="GotraID"
                      value={profileData.GotraID || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Gotra</option>
                      {renderOptions(gotras)}
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Rashi</label>
                    <select
                      className="form-select"
                      name="Rashi"
                      value={profileData.Rashi || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Rashi</option>
                      {renderOptions(rashis)}
                    </select>
                  </div>
                </div>
              </div>

              {/* PROFILE PHOTO */}
              <div className="col-md-3 d-flex flex-column align-items-center">
                <div
                  style={{
                    width: "180px",
                    height: "230px",
                    background: "#fff",
                    padding: 6,
                    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                    border: "1px solid #ddd",
                    overflow: "hidden",
                    marginBottom: 12,
                  }}
                >
                  <img
                    src={getFullImageUrl(
                      profileData.ProfilePhoto || profileData.ProfileImageURL,
                    )}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <label
                  htmlFor="passportPhotoInput"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      padding: "10px 18px",
                      borderRadius: 30,
                      backgroundColor: "#007bff",
                      color: "#fff",
                    }}
                  >
                    Choose Photo
                  </div>
                </label>

                <input
                  id="passportPhotoInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onPhotoChange}
                />

                <div style={{ marginTop: 8, fontSize: 13 }}>
                  {profilePhotoName || "No file chosen"}
                </div>
              </div>
              {/* ---------------- GALLERY UPLOAD ---------------- */}
              <div className="mt-4">
                <h5 style={{ fontWeight: 600 }}>Photo Gallery</h5>

                {/* 1. SHOW EXISTING GALLERY IMAGES FROM SERVER */}
                {profileData.gallery_images &&
                  profileData.gallery_images.length > 0 && (
                    <div style={{ marginBottom: "15px" }}>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#666",
                          marginBottom: "8px",
                        }}
                      >
                        Existing Photos:
                      </div>
                      <div
                        style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
                      >
                        {profileData.gallery_images.map((img, i) => (
                          <img
                            key={i}
                            src={getFullImageUrl(img)} // <-- Wrap img in the helper here
                            alt="gallery"
                            style={{
                              width: 90,
                              height: 90,
                              objectFit: "cover",
                              borderRadius: 10,
                              border: "1px solid #ddd",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                {/* 2. UPLOAD BUTTON */}
                <label
                  htmlFor="galleryInput"
                  style={{ cursor: "pointer", marginTop: "10px" }}
                >
                  <div
                    style={{
                      padding: "10px 18px",
                      borderRadius: 30,
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      display: "inline-block",
                      marginBottom: 12,
                    }}
                  >
                    <i
                      className="fa fa-camera"
                      style={{ marginRight: "6px" }}
                    ></i>
                    Upload New Gallery Photos
                  </div>
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
                  <div style={{ marginTop: "10px" }}>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#007bff",
                        marginBottom: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      New Photos to Upload (Will be saved on Update):
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      {galleryPreview.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="preview"
                          style={{
                            width: 90,
                            height: 90,
                            objectFit: "cover",
                            borderRadius: 10,
                            border: "2px dashed #007bff",
                            boxShadow: "0 3px 8px rgba(0,123,255,0.2)",
                          }}
                        />
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
                <select
                  className="form-select"
                  name="HeightID"
                  value={profileData.HeightID || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Height</option>
                  {renderOptions(dropdowns.heights)}
                </select>
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
                <select
                  className="form-select"
                  name="BloodGroupID"
                  value={profileData.BloodGroupID || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Group</option>
                  {renderOptions(bloodGroups)}
                </select>
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
                <label>Father Status</label>
                <input
                  className="form-control"
                  name="FatherStatus"
                  value={profileData.FatherStatus || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Mother Occupation</label>
                <input
                  className="form-control"
                  name="MotherOccupation"
                  value={profileData.MotherOccupation || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* -------------------------------------- */}
          {/* EDUCATION & JOB */}
          {/* -------------------------------------- */}
          <div className="edit-pro-parti mb-5">
            <h4>Education & Job</h4>

            <div className="mt-3">
              <label>Education Degree</label>
              <select
                className="form-select mb-3"
                name="EducationDegreeID"
                value={profileData.EducationDegreeID || ""}
                onChange={handleChange}
              >
                <option value="">Select Degree</option>
                {renderOptions(educationDegrees)}
              </select>

              <label>Education Detail</label>
              <input
                className="form-control mb-3"
                name="EducationDetail"
                value={profileData.EducationDetail || ""}
                onChange={handleChange}
              />

              <label>Occupation</label>
              <select
                className="form-select mb-3"
                name="OccupationID"
                value={profileData.OccupationID || ""}
                onChange={handleChange}
              >
                <option value="">Select Occupation</option>
                {renderOptions(occupations)}
              </select>

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
              <select
                className="form-select mb-3"
                name="AnnualIncomeID"
                value={profileData.AnnualIncomeID || ""}
                onChange={handleChange}
              >
                <option value="">Select Income</option>
                {renderOptions(incomeRanges)}
              </select>
            </div>
          </div>

          {/* -------------------------------------- */}
          {/* PREFERENCES */}
          {/* -------------------------------------- */}
          <div className="edit-pro-parti mb-5">
            <h4>Preferences</h4>

            <div className="mt-3">
              <label>Preferred Area of Marriage</label>
              <select
                className="form-select mb-3"
                name="PreferredAreaOfMarriage"
                value={profileData.PreferredAreaOfMarriage || ""}
                onChange={handleChange}
              >
                <option value="">Select Area</option>
                {renderOptions(preferenceMarriageAreas)}
              </select>

              <label>Paitthi/Nivas Khor</label>
              <input
                className="form-control mb-3"
                name="PaitthiNivasKhor"
                value={profileData.PaitthiNivasKhor || ""}
                onChange={handleChange}
              />

              <label>Diet</label>
              <select
                className="form-select mb-3"
                name="DietID"
                value={profileData.DietID || ""}
                onChange={handleChange}
              >
                <option value="">Select Diet</option>
                {renderOptions(diets)}
              </select>

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
                  <select
                    className="form-select"
                    name="ContactPersonRelationshipID"
                    value={profileData.ContactPersonRelationshipID || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Relationship</option>
                    {renderOptions(relationships)}
                  </select>
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
              <select
                className="form-select"
                name="ContactCityID"
                value={profileData.ContactCityID || ""}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {renderOptions(cities)}
              </select>
            </div>
          </div>

          {/* -------------------------------------- */}
          {/* SUBMIT */}
          {/* -------------------------------------- */}
          <div className="text-end mt-4">
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "12px 30px",
                borderRadius: "50px",
                backgroundColor: "#007bff",
                border: "none",
                color: "white",
                fontSize: "17px",
                fontWeight: "500",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                cursor: "pointer",
              }}
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
