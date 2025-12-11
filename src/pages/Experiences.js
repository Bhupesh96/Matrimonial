import React, { useEffect, useState } from "react";
import { fetchTestimonials, addTestimonial } from "../api";
import "../assets/css/ExperiencePage.css";

const Experiences = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);

  const storedProfileID = localStorage.getItem("profileID");

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
        console.log("Testimonial load error:", err);
      }
    };

    loadReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storedProfileID && name.trim() === "") {
      alert("Please enter your name");
      return;
    }
    if (message.trim() === "") {
      alert("Please write your experience");
      return;
    }

    const formData = new FormData();

    if (storedProfileID) {
      formData.append("ProfileID", storedProfileID);
    } else {
      formData.append("PersonName", name);
    }

    formData.append("Message", message);
    formData.append("IsApproved", 0);

    if (photo) {
      formData.append("PersonPhoto", photo);
    }

    try {
      setLoading(true);

      const res = await addTestimonial(formData);

      alert("Experience submitted successfully! Waiting for approval.");

      setName("");
      setMessage("");
      setPhoto(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="experience-page container" style={{ marginTop: "120px" }}>
      <h2 className="exp-title">Member Experiences</h2>
      <p className="exp-subtext">Read experiences shared by happy members.</p>

      {/* ALL EXPERIENCES */}
      <div className="exp-list">
        {reviews.map((r) => (
          <div className="exp-card" key={r.TestimonialID}>
            <div className="exp-img-box">
              <img
                src={
                  r.PersonPhoto
                    ? fullURL(r.PersonPhoto)
                    : process.env.PUBLIC_URL + "/images/default.png"
                }
                alt={r.PersonName}
              />
            </div>

            <div className="exp-content">
              <h4>{r.PersonName}</h4>
              <p className="exp-message">{r.TestimonialMessage}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT FORM */}
      <div className="exp-form-box">
        <h3>Share Your Experience</h3>

        <form className="exp-form" onSubmit={handleSubmit}>
          {!storedProfileID && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <textarea
            rows="4"
            placeholder="Write your experience here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="exp-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Experience"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Experiences;
