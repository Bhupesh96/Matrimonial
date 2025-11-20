import React, { useEffect, useState } from "react";
import { fetchApprovedProfiles } from "../api";
import Preloader from "../components/Preloader";
const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // --- Helper: Calculate Age ---
  const calculateAge = (dob) => {
    if (!dob) return "NA";
    const diff = Date.now() - new Date(dob).getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return `${age} Years old`;
  };

  // --- Fetch approved profiles ---
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await fetchApprovedProfiles();
        setProfiles(data);
      } catch (err) {
        console.error("Profile load error:", err);
      }
      setLoading(false);
    };

    loadProfiles();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 50, textAlign: "center", fontSize: 22 }}>
        <Preloader />
      </div>
    );
  }

  return (
    <section>
      <div className="all-weddpro all-jobs all-serexp chosenini">
        <div className="container">
          <div className="row">
            {/* LEFT FILTERS */}
            <div className="col-md-3 fil-mob-view">
              <span className="filter-clo">+</span>

              <div className="filt-com lhs-cate">
                <h4>
                  <i className="fa fa-search"></i> I'm looking for
                </h4>
                <div className="form-group">
                  <select className="chosen-select form-control">
                    <option>I'm looking for</option>
                    <option value="1">Men</option>
                    <option value="2">Women</option>
                  </select>
                </div>
              </div>

              <div className="filt-com lhs-cate">
                <h4>
                  <i className="fa fa-clock-o"></i> Age
                </h4>
                <div className="form-group">
                  <select className="chosen-select form-control">
                    <option>Select age</option>
                    <option>18 to 30</option>
                    <option>31 to 40</option>
                    <option>41 to 50</option>
                    <option>51 to 60</option>
                  </select>
                </div>
              </div>

              <div className="filt-com lhs-cate">
                <h4>
                  <i className="fa fa-bell-o"></i> Select Religion
                </h4>
                <div className="form-group">
                  <select className="chosen-select form-control">
                    <option>Religion</option>
                    <option>Hindu</option>
                    <option>Muslim</option>
                    <option>Jain</option>
                    <option>Christian</option>
                  </select>
                </div>
              </div>

              <div className="filt-com lhs-cate">
                <h4>
                  <i className="fa fa-map-marker"></i> Location
                </h4>
                <div className="form-group">
                  <select className="chosen-select form-control">
                    <option>Bhilai</option>
                    <option>Raipur</option>
                    <option>Bilaspur</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT: PROFILE LIST */}
            <div className="col-md-9">
              <div className="short-all">
                <div className="short-lhs">
                  Showing <b>{profiles.length}</b> profiles
                </div>
                <div className="short-rhs">
                  <ul>
                    <li>Sort by:</li>
                    <li>
                      <div className="form-group">
                        <select className="chosen-select form-control">
                          <option>Most relative</option>
                          <option>Newest</option>
                          <option>Oldest</option>
                        </select>
                      </div>
                    </li>
                    <li>
                      <div className="sort-grid sort-grid-1">
                        <i className="fa fa-th-large"></i>
                      </div>
                    </li>
                    <li>
                      <div className="sort-grid sort-grid-2 act">
                        <i className="fa fa-bars"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="all-list-sh">
                <ul>
                  {profiles.map((p, i) => {
                    const fullName = `${p.Title || ""} ${p.firstname || ""} ${
                      p.lastname || ""
                    }`;

                    const imageSrc = p.ProfilePhoto
                      ? p.ProfilePhoto
                      : "images/default.png";

                    const details = [
                      p.EducationDegreeName || p.EducationDegree || "NA",
                      p.OccupationName || p.OccupationDetail || "NA",
                      calculateAge(p.DateOfBirth),
                      p.HeightValue ? `Height: ${p.HeightValue}` : "Height: NA",
                    ];

                    return (
                      <li key={i}>
                        <div className="all-pro-box" data-useravil="avilyes">
                          <div
                            className="pro-img"
                            style={{
                              width: "180px",
                              height: "240px", // portrait shape
                              borderRadius: "10px",
                              overflow: "hidden",
                              background: "#f3f3f3",
                              position: "relative",
                              marginBottom: "10px",
                            }}
                          >
                            <img
                              src={imageSrc}
                              alt={fullName}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                                display: "block",
                              }}
                            />

                            <div
                              className="pro-avl-status"
                              style={{
                                position: "absolute",
                                bottom: "0",
                                left: "0",
                                width: "100%",
                                padding: "5px 0",
                                background: "rgba(0,0,0,0.5)",
                                textAlign: "center",
                                color: "#fff",
                              }}
                            >
                              <h5 style={{ margin: 0, fontSize: "12px" }}>
                                Available Online
                              </h5>
                            </div>
                          </div>

                          <div className="pro-detail">
                            <h4>{fullName}</h4>

                            <div className="pro-bio">
                              {details.map((d, idx) => (
                                <span key={idx}>{d}</span>
                              ))}
                            </div>

                            <div className="links">
                              <a href="#!">WhatsApp</a>
                              <a
                                href="#!"
                                className="cta cta-sendint"
                                data-bs-toggle="modal"
                                data-bs-target="#sendInter"
                              >
                                Send interest
                              </a>
                              <a href="/profile-details">More details</a>
                            </div>
                          </div>

                          <span
                            className="enq-sav"
                            data-bs-toggle="tooltip"
                            title="Save this profile"
                          >
                            <i className="fa fa-thumbs-o-up"></i>
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileList;
