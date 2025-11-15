import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PoopUpSearch from "../components/PoopUpSearch";
import TopMenu from "../components/TopMenu";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";
import CopyRight from "../components/CopyRight";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import { getProfileDetails, updateProfile, fetchMasterData } from "../api";

import AlertService from "../services/AlertServices";

// Reusable dropdown renderer
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

  const [dropdowns, setDropdowns] = useState({
    cities: [],
    heights: [],
    gotras: [],
    rashis: [],
    educationDegrees: [],
    occupations: [],
    incomeRanges: [],
    diets: [],
  });

  // Fetch profile + all master data
  useEffect(() => {
    const loadAll = async () => {
      const profileID = localStorage.getItem("profileID");
      if (!profileID) {
        AlertService.showError("You are not logged in.");
        navigate("/login");
        return;
      }

      try {
        const [
          profile,
          cities,
          heights,
          gotras,
          rashis,
          educationDegrees,
          occupations,
          incomeRanges,
          diets,
          preferenceMarriageAreas,
        ] = await Promise.all([
          getProfileDetails(),

          fetchMasterData("cities"),
          fetchMasterData("heights"),
          fetchMasterData("gotras"),
          fetchMasterData("rashis"),
          fetchMasterData("educationdegrees"),
          fetchMasterData("occupations"),
          fetchMasterData("incomeranges"),
          fetchMasterData("diets"),
          fetchMasterData("preference_marriage_area"),
        ]);

        // Fix date formatting
        if (profile.DateOfBirth) {
          profile.DateOfBirth = profile.DateOfBirth.split(" ")[0];
        }

        setProfileData(profile || {});

        setDropdowns({
          cities,
          heights,
          gotras,
          rashis,
          educationDegrees,
          occupations,
          incomeRanges,
          diets,
          preferenceMarriageAreas,
        });
      } catch (e) {
        AlertService.showError(e.message);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await updateProfile(profileData);

      AlertService.showSuccessAndRedirect(
        result.message || "Profile updated!",
        navigate,
        "/"
      );
    } catch (e) {
      AlertService.showError(e.message);
    } finally {
      setSubmitting(false);
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

      <div
        className="container"
        style={{ marginTop: "7rem", marginBottom: "6rem" }}
      >
        <form onSubmit={handleSubmit}>
          {/* ---------------- BASIC DETAILS ---------------- */}
          <div className="edit-pro-parti mb-5">
            <h4>Basic Details</h4>
            <div className="row mt-3">
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

            <div className="mb-3">
              <label>Birth Name</label>
              <input
                className="form-control"
                name="BirthName"
                value={profileData.BirthName || ""}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Manglik</label>
                <select
                  className="form-select"
                  name="Manglik"
                  value={profileData.Manglik || ""}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Don't Know">Don't Know</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Rashi</label>
                <select
                  className="form-select"
                  name="Rashi"
                  value={profileData.Rashi || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Rashi</option>
                  {renderOptions(dropdowns.rashis)}
                </select>
              </div>
            </div>
          </div>

          {/* ----------- PHYSICAL DETAILS ----------- */}
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
                <label>Weight</label>
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
            </div>
          </div>

          {/* -------------- FAMILY DETAILS -------------- */}
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

            <div className="row">
              <div className="col-md-3 mb-3">
                <label>No of Brothers</label>
                <input
                  type="number"
                  className="form-control"
                  name="NoOfBrothers"
                  value={profileData.NoOfBrothers || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label>No of Brothers Married</label>
                <input
                  type="number"
                  className="form-control"
                  name="NoOfBrothersMarried"
                  value={profileData.NoOfBrothersMarried || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label>No of Sisters</label>
                <input
                  type="number"
                  className="form-control"
                  name="NoOfSisters"
                  value={profileData.NoOfSisters || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-3">
                <label>No of Sisters Married</label>
                <input
                  type="number"
                  className="form-control"
                  name="NoOfSistersMarried"
                  value={profileData.NoOfSistersMarried || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* ----------- EDUCATION + JOB ------------ */}
          <div className="edit-pro-parti mb-5">
            <h4>Education & Job</h4>

            <div className="mt-3">
              <label>Education Degree</label>
              <select
                className="form-select mb-3"
                name="EducationDegree"
                value={profileData.EducationDegree || ""}
                onChange={handleChange}
              >
                <option value="">Select Degree</option>
                {renderOptions(dropdowns.educationDegrees)}
              </select>

              <label>Education Detail</label>
              <input
                className="form-control mb-3"
                name="EducationDetail"
                value={profileData.EducationDetail || ""}
                onChange={handleChange}
              />

              <label>Occupation Detail</label>
              <select
                className="form-select mb-3"
                name="OccupationDetail"
                value={profileData.OccupationDetail || ""}
                onChange={handleChange}
              >
                <option value="">Select Occupation</option>
                {renderOptions(dropdowns.occupations)}
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
                name="AnnualIncome"
                value={profileData.AnnualIncome || ""}
                onChange={handleChange}
              >
                <option value="">Select Income</option>
                {renderOptions(dropdowns.incomeRanges)}
              </select>
            </div>
          </div>

          {/* ------------- Preferences ----------- */}
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
                <option value="">Select Preferred Marriage Area</option>
                {renderOptions(dropdowns.preferenceMarriageAreas)}
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
                name="Diet"
                value={profileData.Diet || ""}
                onChange={handleChange}
              >
                <option value="">Select Diet</option>
                {renderOptions(dropdowns.diets)}
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
              ></textarea>
            </div>
          </div>

          {/* -------- Contact Section -------- */}
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
                  <label>Contact Mobile 2</label>
                  <input
                    className="form-control"
                    name="ContactMobile2"
                    value={profileData.ContactMobile2 || ""}
                    onChange={handleChange}
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
              ></textarea>

              <label>Contact City</label>
              <select
                className="form-select"
                name="ContactCity"
                value={profileData.ContactCity || ""}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {renderOptions(dropdowns.cities)}
              </select>
            </div>
          </div>

          {/* -------- SUBMIT BUTTON -------- */}

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
                transition: "0.2s",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 14px rgba(0,0,0,0.25)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
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
