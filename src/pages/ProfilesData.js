import React, { useEffect, useState } from "react";
import "../assets/css/ProfileList.css";
// 1. Add manageConnectionRequest to the import
import {
  fetchApprovedProfiles,
  sendConnectionRequest,
  fetchMyRequests,
  manageConnectionRequest,
} from "../api";
import Preloader from "../components/Preloader";
import { useNavigate } from "react-router-dom";
const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for the Modal
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");
  const [activeTab, setActiveTab] = useState("profiles");
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
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
        console.log("Approved profile list: ", JSON.stringify(data, null, 2));
        setProfiles(data);
      } catch (err) {
        console.error("Profile load error:", err);
      }
      setLoading(false);
    };
    loadProfiles();
  }, []);

  // --- Fetch incoming/outgoing requests ---
  useEffect(() => {
    const loadRequests = async () => {
      try {
        const reqData = await fetchMyRequests();

        // 1. RAW LISTS
        const allIncoming = reqData.incoming_requests || [];
        const allOutgoing = reqData.outgoing_requests || [];

        // 2. FILTER PENDING VS ACCEPTED
        // Incoming Pending (Wait for me to accept)
        const pendingIncoming = allIncoming.filter(
          (r) => r.RequestStatus === "Pending"
        );

        // Outgoing Pending (Wait for them to accept)
        const pendingOutgoing = allOutgoing.filter(
          (r) => r.RequestStatus === "Pending"
        );

        // Matches (Accepted by either side)
        const myMatches = [
          ...allIncoming.filter((r) => r.RequestStatus === "Accepted"),
          ...allOutgoing.filter((r) => r.RequestStatus === "Accepted"),
        ];

        setIncoming(pendingIncoming);
        setOutgoing(pendingOutgoing);
        setMatches(myMatches); // Store accepted profiles here
      } catch (err) {
        console.error("Request load error:", err);
      }
    };

    loadRequests();
  }, []);

  // --- Handle Send Request (For "All Profiles" tab) ---
  const handleSendInterest = async () => {
    if (!selectedProfile) return;
    setRequestStatus("Sending...");

    try {
      await sendConnectionRequest(selectedProfile.ProfileID);
      setRequestStatus("Request Sent Successfully!");
      setTimeout(() => setRequestStatus(""), 3000);
    } catch (error) {
      setRequestStatus("Error: " + error.message);
    }
  };

  // --- NEW: Handle Accept/Reject Action ---
  const handleRequestAction = async (requestId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this request?`))
      return;

    try {
      await manageConnectionRequest(requestId, action);

      if (action === "Reject") {
        // If rejected, just remove it
        setIncoming((prev) =>
          prev.filter((req) => req.RequestID !== requestId)
        );
      } else if (action === "Accept") {
        // 1. Find the request in incoming list
        const acceptedRequest = incoming.find(
          (req) => req.RequestID === requestId
        );

        // 2. Remove from Incoming
        setIncoming((prev) =>
          prev.filter((req) => req.RequestID !== requestId)
        );

        // 3. Add to Matches (Update status locally to Accepted)
        if (acceptedRequest) {
          const newMatch = { ...acceptedRequest, RequestStatus: "Accepted" };
          setMatches((prev) => [...prev, newMatch]);

          // Optional: Switch tab to show the user where it went
          if (window.confirm("Request Accepted! View in Matches tab?")) {
            setActiveTab("matches");
          }
        }
      }
    } catch (error) {
      alert("Failed to perform action: " + error.message);
    }
  };
  const handleViewProfile = (profileId) => {
    // Navigate to the details page with the ID
    navigate(`/user-profile/${profileId}`);
  };
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
            {/* LEFT FILTERS (Unchanged) */}
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
            </div>

            {/* RIGHT: PROFILE LIST */}
            <div className="col-md-9">
              {/* -------------------- TABS -------------------- */}
              <div className="modern-tabs-wrapper">
                <div className="modern-tabs">
                  <button
                    className={activeTab === "profiles" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("profiles")}
                  >
                    All Profiles
                  </button>

                  <button
                    className={activeTab === "incoming" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("incoming")}
                  >
                    Incoming ({incoming.length})
                  </button>

                  <button
                    className={activeTab === "outgoing" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("outgoing")}
                  >
                    Outgoing ({outgoing.length})
                  </button>

                  <button
                    className={activeTab === "matches" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("matches")}
                  >
                    Matches ({matches.length})
                  </button>
                </div>
              </div>

              {/* -------------------- TAB CONTENT -------------------- */}

              {/* 1. ALL PROFILES */}
              {activeTab === "profiles" && (
                <div className="all-list-sh">
                  <ul>
                    {profiles.map((p, i) => {
                      const fullName = `${p.firstname || ""} ${
                        p.lastname || ""
                      }`;
                      const imageSrc = p.ProfilePhoto
                        ? p.ProfilePhoto
                        : "matro/images/default.png";
                      const details = [
                        p.EducationDegreeName || p.EducationDegree || "NA",
                        p.OccupationName || p.OccupationDetail || "NA",
                        `Age: ${calculateAge(p.DateOfBirth)}`,
                        p.HeightValue
                          ? `Height: ${p.HeightValue}`
                          : "Height: NA",
                        p.GotraName ? `Gotra: ${p.GotraName}` : "Gotra: NA",
                      ];

                      return (
                        <li key={i}>
                          <div className="profile-card">
                            <div className="profile-image-wrapper">
                              <img src={imageSrc} alt={fullName} />
                            </div>

                            <div className="profile-details">
                              <h4>{fullName}</h4>

                              <div className="profile-info">
                                {details.map((d, idx) => (
                                  <span key={idx}>{d}</span>
                                ))}
                              </div>

                              <div className="card-actions">
                                <span
                                  className="btn-interest"
                                  data-bs-toggle="modal"
                                  data-bs-target="#sendInter"
                                  onClick={() => {
                                    setSelectedProfile(p);
                                    setRequestStatus("");
                                  }}
                                >
                                  Send Interest
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* 2. INCOMING REQUESTS (UPDATED) */}
              {activeTab === "incoming" && (
                <div className="all-list-sh">
                  {incoming.length === 0 && (
                    <div className="empty-state">
                      <i className="fa fa-envelope-open"></i>
                      <h4>No Incoming Requests</h4>
                      <p>Profiles who send you interest will appear here.</p>

                      <h4 style={{ marginTop: "12px" }}>
                        कोई इनकमिंग रिक्वेस्ट नहीं
                      </h4>
                      <p>
                        जो प्रोफ़ाइल आपको इंटरेस्ट भेजेंगे, वे यहाँ दिखाई देंगे।
                      </p>
                    </div>
                  )}
                  <ul>
                    {incoming.map((req, i) => (
                      <li key={i}>
                        <div
                          className="all-pro-box"
                          style={{
                            padding: "20px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                          }}
                        >
                          <h4>
                            {req.firstname} {req.lastname}
                          </h4>
                          <div className="pro-bio">
                            <span>Gotra: {req.GotraName}</span>
                            <span>{req.HeightValue}</span>
                            <span>{req.MaritalStatus}</span>
                            <span>Request Status: {req.RequestStatus}</span>
                          </div>

                          {/* BUTTONS WIRED TO API */}
                          <div style={{ marginTop: "15px" }}>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                handleRequestAction(req.RequestID, "Accept")
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-danger btn-sm ms-2"
                              onClick={() =>
                                handleRequestAction(req.RequestID, "Reject")
                              }
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3. OUTGOING REQUESTS (Using the UI from previous step) */}
              {activeTab === "outgoing" && (
                <div className="all-list-sh">
                  {outgoing.length === 0 && (
                    <div className="empty-state">
                      <i className="fa fa-paper-plane"></i>
                      <h4>No Outgoing Requests</h4>
                      <p>Profiles you send interest to will show up here.</p>

                      <h4 style={{ marginTop: "12px" }}>
                        कोई आउटगोइंग रिक्वेस्ट नहीं
                      </h4>
                      <p>
                        जिन प्रोफ़ाइल को आप इंटरेस्ट भेजेंगे, वे यहाँ दिखाई
                        देंगे।
                      </p>
                    </div>
                  )}

                  <ul>
                    {outgoing.map((req, i) => {
                      const fullName = `${req.firstname || ""} ${
                        req.lastname || ""
                      }`;
                      const imageSrc =
                        req.ProfileImageURL || "matro/images/default.png";

                      return (
                        <li key={i}>
                          <div
                            className="profile-card"
                            style={{
                              display: "flex",
                              gap: "20px",
                              padding: "18px",
                              borderRadius: "14px",
                              background: "#fff",
                              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                              marginBottom: "20px",
                              border: "1px solid #eee",
                            }}
                          >
                            {/* IMAGE */}
                            <div
                              style={{
                                width: "140px",
                                height: "190px",
                                borderRadius: "12px",
                                overflow: "hidden",
                                background: "#f4f4f4",
                                flexShrink: 0,
                                position: "relative",
                              }}
                            >
                              <img
                                src={imageSrc}
                                alt={fullName}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />

                              {/* PREMIUM STATUS BADGE */}
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: "10px",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  padding: "4px 12px",
                                  borderRadius: "20px",
                                  background:
                                    req.RequestStatus === "Accepted"
                                      ? "linear-gradient(135deg, #2ecc71, #27ae60)"
                                      : "linear-gradient(135deg, #ffc107, #ffb300)",
                                  color:
                                    req.RequestStatus === "Accepted"
                                      ? "#fff"
                                      : "#000",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
                                }}
                              >
                                {req.RequestStatus}
                              </div>
                            </div>

                            {/* DETAILS */}
                            <div style={{ flexGrow: 1 }}>
                              <h4
                                style={{
                                  marginBottom: "6px",
                                  fontSize: "18px",
                                  fontWeight: "700",
                                  color: "#2d2d2d",
                                }}
                              >
                                {fullName}
                              </h4>

                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "10px",
                                  marginBottom: "12px",
                                }}
                              >
                                <span className="detail-tag">
                                  {req.GenderName}
                                </span>
                                <span className="detail-tag">
                                  {req.MaritalStatus}
                                </span>
                                <span className="detail-tag">
                                  {req.HeightValue}
                                </span>
                                <span className="detail-tag">
                                  Gotra: {req.GotraName}
                                </span>
                              </div>

                              {/* INFO TAGS STYLE */}
                              <style>
                                {`
                  .detail-tag {
                    background: #f4f4f4;
                    padding: 6px 12px;
                    border-radius: 8px;
                    font-size: 13px;
                    color: #444;
                    border: 1px solid #e5e5e5;
                  }
                `}
                              </style>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* -------------------- MATCHES TAB CONTENT -------------------- */}
              {activeTab === "matches" && (
                <div className="all-list-sh">
                  {matches.length === 0 ? (
                    <div className="empty-state">
                      <i className="fa fa-heart"></i>
                      <h4>No Matches Yet</h4>
                      <p>
                        Once profiles accept your interest, they will appear
                        here.
                      </p>

                      <h4 style={{ marginTop: "12px" }}>अभी तक कोई मैच नहीं</h4>
                      <p>
                        जब कोई प्रोफ़ाइल आपका इंटरेस्ट स्वीकार करेगा, तो वह यहाँ
                        दिखाई देगा।
                      </p>
                    </div>
                  ) : (
                    <ul>
                      {matches.map((match, i) => {
                        if (!match) return null;

                        const fullName = `${match.firstname || "Unknown"} ${
                          match.lastname || ""
                        }`;
                        const imageSrc =
                          match.ProfileImageURL || "matro/images/default.png";

                        return (
                          <li key={i}>
                            <div className="profile-card">
                              {/* IMAGE */}
                              <div className="profile-image-wrapper">
                                <img src={imageSrc} alt={fullName} />
                              </div>

                              {/* DETAILS */}
                              <div className="profile-details">
                                <h4>{fullName}</h4>

                                {/* INFO */}
                                <div className="profile-info">
                                  <span>
                                    Age: {calculateAge(match.DateOfBirth)}
                                  </span>
                                  <span>Height: {match.HeightValue}</span>

                                  <span
                                    style={{
                                      background: "#e9f8ef",
                                      borderColor: "#b7e4c2",
                                      color: "#2e8b57",
                                    }}
                                  >
                                    <i className="fa fa-phone"></i>{" "}
                                    {match.ContactMobile || "NA"}
                                  </span>
                                </div>

                                {/* ACTIONS */}
                                <div className="card-actions">
                                  {match.ContactMobile && (
                                    <a
                                      href={`https://wa.me/${match.ContactMobile}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{
                                        background: "#25D366",
                                        color: "#fff",
                                        borderRadius: "8px",
                                        padding: "8px 14px",
                                        fontWeight: "600",
                                        marginRight: "8px",
                                        display: "inline-block",
                                      }}
                                    >
                                      <i className="fa fa-whatsapp"></i>{" "}
                                      WhatsApp
                                    </a>
                                  )}

                                  <button
                                    className="btn-interest"
                                    style={{ padding: "8px 14px" }}
                                    onClick={() =>
                                      handleViewProfile(match.ProfileID)
                                    }
                                  >
                                    <i className="fa fa-user-circle-o"></i> View
                                    Profile
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL FOR SENDING INTEREST (Unchanged) */}
      <div
        className="modal fade"
        id="sendInter"
        tabIndex="-1"
        aria-labelledby="sendInterLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            className="modal-content"
            style={{
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
              border: "none",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                background: "linear-gradient(135deg, #6b4a0d, #4a3208)",
                padding: "20px 28px",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Soft overlay behind text */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "70%", // only behind the text
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.25)", // subtle blur
                  backdropFilter: "blur(2px)",
                  zIndex: 1,
                }}
              ></div>

              <h4
                style={{
                  margin: 0,
                  lineHeight: "1.4",
                  position: "relative",
                  zIndex: 2,
                  color: "#fdfdfd",
                  textShadow: "0 1px 4px rgba(0,0,0,0.45)", // makes text super crisp
                }}
              >
                <span style={{ fontWeight: "600", fontSize: "20px" }}>
                  Send Interest
                </span>{" "}
                <span style={{ fontSize: "15px", opacity: 0.9 }}>
                  / इंटरेस्ट भेजें
                </span>
                <br />
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "18px",
                    color: "#ffffff",
                    textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                  }}
                >
                  {selectedProfile?.firstname || "User"}
                </span>
              </h4>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ zIndex: 2 }}
              ></button>
            </div>

            {/* BODY */}
            <div
              className="modal-body"
              style={{ padding: "28px", display: "flex", gap: "22px" }}
            >
              {/* LEFT IMAGE */}
              <div
                style={{
                  width: "180px",
                  height: "220px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "#eee",
                  flexShrink: 0,
                }}
              >
                <img
                  src={
                    selectedProfile?.ProfilePhoto || "matro/images/default.png"
                  }
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>

              {/* RIGHT SIDE */}
              <div style={{ flex: 1 }}>
                <h5 style={{ marginBottom: "12px", fontWeight: "600" }}>
                  Permissions Granted / अनुमति
                </h5>

                <p style={{ fontSize: "15px", marginBottom: "14px" }}>
                  By sending interest,{" "}
                  <strong>{selectedProfile?.firstname}</strong> will be able to
                  view your profile details.
                  <br />
                  इंटरेस्ट भेजने के बाद{" "}
                  <strong>{selectedProfile?.firstname}</strong> आपकी प्रोफ़ाइल
                  जानकारी देख पाएंगे।
                </p>

                {requestStatus && (
                  <div
                    className="alert alert-info"
                    style={{
                      fontSize: "14px",
                      borderRadius: "8px",
                    }}
                  >
                    {requestStatus}
                  </div>
                )}

                <div
                  style={{
                    background: "#f8f8f8",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "15px",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: "500" }}>
                    Are you sure you want to send a connection request?
                  </p>
                  <p style={{ margin: 0, color: "#555" }}>
                    क्या आप वाकई इंटरेस्ट भेजना चाहते हैं?
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div
              className="modal-footer"
              style={{
                borderTop: "1px solid #eee",
                padding: "16px 22px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                type="button"
                className="btn"
                style={{
                  background: "linear-gradient(135deg, #583c07, #3e2b05)",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: "8px",
                  padding: "10px 20px",
                }}
                onClick={handleSendInterest}
              >
                Send Interest / इंटरेस्ट भेजें
              </button>

              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
                style={{
                  borderRadius: "8px",
                  padding: "10px 20px",
                }}
              >
                Cancel / रद्द करें
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileList;
