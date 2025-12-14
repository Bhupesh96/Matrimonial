import React, { useEffect, useState } from "react";
import { fetchTestimonials, addTestimonial } from "../api";
import "../assets/css/ExperiencePage.css";

import PoopUpSearch from "../components/PoopUpSearch";
import TopMenu from "../components/TopMenu";
import MenuPopUp from "../components/MenuPopUp";
import ContactExpert from "../components/ContactExpert";
import MainMenu from "../components/MainMenu";
import MobileMenu from "../components/MobileMenu";
import DashboardMenu from "../components/DashBoardMenu";
import Footer from "../components/Footer";
import CopyRight from "../components/CopyRight";
import AlertService from "../services/AlertServices";

const Experiences = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);

  // Default preview image
  const defaultPreview = "/images/default.png";
  const [photoPreview, setPhotoPreview] = useState(defaultPreview);

  const fullURL = (img) =>
    img?.startsWith("http")
      ? img
      : `https://techwithus.in/matro/admin/plug/${img}`;

  useEffect(() => {
    const loadReviews = async () => {
      try {
        let data = await fetchTestimonials();

        const approved = data.filter(
          (t) => Number(t.IsApproved) === 1 && t.DeleteFlag === "N"
        );

        setReviews(approved);
      } catch (err) {
        AlertService.showError("Failed to load reviews");
      }
    };

    loadReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      AlertService.showError("Please enter your name");
      return;
    }
    if (message.trim() === "") {
      AlertService.showError("Please write your experience");
      return;
    }

    const formData = new FormData();
    formData.append("PersonName", name);
    if (photo) formData.append("PersonPhoto", photo);
    formData.append("Message", message);
    formData.append("IsApproved", 0);

    try {
      setLoading(true);
      const data = await addTestimonial(formData);

      AlertService.showSuccess(data.message);

      setName("");
      setMessage("");
      setPhoto(null);
      setPhotoPreview(defaultPreview);
    } catch (err) {
      AlertService.showError(err.message);
    } finally {
      setLoading(false);
    }
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

      <div className="qa-wrapper">
        <div className="home-tit">
          <p>Read experiences shared by happy members.</p>
          <h2>
            <span>Member Experiences</span>
          </h2>
          <span className="leaf1"></span>
        </div>

        {/* 2 COLUMN LAYOUT */}
        <div className="exp-container">
          {/* LEFT — FORM */}
          <div className="exp-left">
            <div className="exp-form-box">
              <form className="exp-form" onSubmit={handleSubmit}>
                <div>
                  <h2>Share Your Experience</h2>
                  <p>
                    <span>How has the platform helped you grow?</span>
                  </p>
                </div>

                <div className="exp-field">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="exp-field mt-15">
                  <label>Your Story</label>
                  <textarea
                    rows="4"
                    placeholder="Share your experience…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* PHOTO + PREVIEW + BUTTONS */}
                <div className="exp-actions-row">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="photo-preview-inline"
                  />

                  <label className="file-btn-inline">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#333"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 7h4l2-3h4l2 3h4v12H4z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                    <span>Upload</span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setPhoto(file);
                        if (file) setPhotoPreview(URL.createObjectURL(file));
                        else setPhotoPreview(defaultPreview);
                      }}
                    />
                  </label>

                  <button
                    type="submit"
                    className="post-btn-inline"
                    disabled={loading}
                  >
                    {loading ? "Posting..." : "Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT — REVIEWS */}
          <div className="exp-right">
            <div className="exp-list">
              {reviews.map((r) => (
                <div className="exp-card" key={r.TestimonialID}>
                  <div className="exp-card-header">
                    <div className="review-photo-wrapper">
                      <img
                        src={
                          r.PersonPhoto
                            ? fullURL(r.PersonPhoto)
                            : "/images/default.png"
                        }
                        alt={r.PersonName}
                        className="review-photo"
                      />
                    </div>
                    <h5>{r.PersonName}</h5>
                  </div>

                  <div className="exp-inner-divider"></div>

                  <p className="exp-message">{r.TestimonialMessage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CopyRight />
    </div>
  );
};

export default Experiences;
