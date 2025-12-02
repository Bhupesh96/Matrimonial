import React, { useEffect, useState } from "react";
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
              <div style={{ marginBottom: "25px" }}>
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "profiles" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("profiles")}
                    >
                      All Profiles
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "incoming" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("incoming")}
                    >
                      Incoming Requests ({incoming.length})
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "outgoing" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("outgoing")}
                    >
                      Outgoing Requests ({outgoing.length})
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "matches" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("matches")}
                    >
                      My Matches ({matches.length})
                    </button>
                  </li>
                </ul>
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
                        : "images/default.png";
                      const details = [
                        p.EducationDegreeName || p.EducationDegree || "NA",
                        p.OccupationName || p.OccupationDetail || "NA",
                        calculateAge(p.DateOfBirth),
                        p.HeightValue
                          ? `Height: ${p.HeightValue}`
                          : "Height: NA",
                      ];

                      return (
                        <li key={i}>
                          <div className="all-pro-box">
                            <div
                              className="pro-img"
                              style={{
                                width: "180px",
                                height: "240px",
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
                                <span
                                  className="cta cta-sendint"
                                  data-bs-toggle="modal"
                                  data-bs-target="#sendInter"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setSelectedProfile(p);
                                    setRequestStatus("");
                                  }}
                                >
                                  Send interest
                                </span>
                                <a href="/profile-details">More details</a>
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
                    <p style={{ padding: "20px", fontSize: "16px" }}>
                      No incoming requests
                    </p>
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
                            {req.firstname} {req.lastname} ({req.UserID})
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
                    <p style={{ padding: "20px", fontSize: "16px" }}>
                      No outgoing requests found.
                    </p>
                  )}
                  <ul>
                    {outgoing.map((req, i) => {
                      const fullName = `${req.firstname || ""} ${
                        req.lastname || ""
                      }`;
                      const imageSrc = req.ProfileImageURL
                        ? req.ProfileImageURL
                        : "images/default.png";
                      return (
                        <li key={i}>
                          <div className="all-pro-box">
                            <div
                              className="pro-img"
                              style={{
                                width: "180px",
                                height: "240px",
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
                                  background:
                                    req.RequestStatus === "Accepted"
                                      ? "rgba(40, 167, 69, 0.8)"
                                      : "rgba(0, 0, 0, 0.6)",
                                  textAlign: "center",
                                  color: "#fff",
                                }}
                              >
                                <h5 style={{ margin: 0, fontSize: "12px" }}>
                                  {req.RequestStatus}
                                </h5>
                              </div>
                            </div>
                            <div className="pro-detail">
                              <h4>
                                {fullName} ({req.UserID})
                              </h4>
                              <div className="pro-bio">
                                <span>{req.GenderName}</span>
                                <span>{req.MaritalStatus}</span>
                                <span>{req.HeightValue}</span>
                                <span>Gotra: {req.GotraName}</span>
                              </div>
                              <div className="links">
                                <span
                                  className="cta"
                                  style={{
                                    cursor: "default",
                                    background:
                                      req.RequestStatus === "Pending"
                                        ? "#ffc107"
                                        : "#28a745",
                                    color:
                                      req.RequestStatus === "Pending"
                                        ? "#000"
                                        : "#fff",
                                    border: "none",
                                  }}
                                >
                                  {req.RequestStatus}
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
              {/* -------------------- MATCHES TAB CONTENT -------------------- */}
              {activeTab === "matches" && (
                <div className="all-list-sh">
                  {matches.length === 0 ? (
                    <p style={{ padding: "20px", fontSize: "16px" }}>
                      No connected matches yet.
                    </p>
                  ) : (
                    <ul>
                      {matches.map((match, i) => {
                        if (!match) return null;

                        const fullName = `${match.firstname || "Unknown"} ${
                          match.lastname || ""
                        }`;
                        const imageSrc =
                          match.ProfileImageURL || "images/default.png";

                        return (
                          <li key={i}>
                            <div className="all-pro-box">
                              {/* IMAGE */}
                              <div
                                className="pro-img"
                                style={{
                                  width: "180px",
                                  height: "240px",
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
                                    display: "block",
                                  }}
                                />
                              </div>

                              {/* DETAILS */}
                              <div className="pro-detail">
                                <h4>
                                  {fullName} ({match.UserID})
                                  <span
                                    className="badge bg-success ms-2"
                                    style={{
                                      fontSize: "10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Connected
                                  </span>
                                </h4>

                                <div className="pro-bio">
                                  {/* Basic Info */}
                                  <span>
                                    Age: {calculateAge(match.DateOfBirth)}
                                  </span>
                                  <span>Height: {match.HeightValue}</span>
                                  <span>Gotra: {match.GotraName}</span>

                                  {/* Contact Info (Visible because it's a match) */}
                                  <span
                                    style={{
                                      color: "#28a745",
                                      fontWeight: "500",
                                    }}
                                  >
                                    <i className="fa fa-phone"></i>{" "}
                                    {match.ContactMobile || "NA"}
                                  </span>
                                </div>

                                <div className="links">
                                  {/* 1. WHATSAPP BUTTON */}
                                  {match.ContactMobile && (
                                    <a
                                      href={`https://wa.me/${match.ContactMobile}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="cta"
                                      style={{
                                        background: "#25D366",
                                        border: "none",
                                        color: "#fff",
                                        marginRight: "5px",
                                        textDecoration: "none",
                                        padding: "6px 12px",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      <i className="fa fa-whatsapp"></i>{" "}
                                      WhatsApp
                                    </a>
                                  )}

                                  {/* 2. SHOW DETAILS BUTTON (The new feature) */}
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                      handleViewProfile(match.ProfileID)
                                    }
                                    style={{
                                      padding: "6px 12px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <i
                                      className="fa fa-user-circle-o"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    View Profile
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
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title seninter-tit" id="sendInterLabel">
                Send interest to{" "}
                <span className="intename2">
                  {selectedProfile?.firstname || "User"}
                </span>
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body seninter">
              <div className="lhs">
                <img
                  src={selectedProfile?.ProfilePhoto || "images/default.png"}
                  alt=""
                  className="intephoto2"
                />
              </div>
              <div className="rhs">
                <h4>
                  Permissions:{" "}
                  <span className="intename2">
                    {selectedProfile?.firstname}
                  </span>{" "}
                  can view details
                </h4>
                {requestStatus && (
                  <div className="alert alert-info" role="alert">
                    {requestStatus}
                  </div>
                )}
                <div className="form-floating">
                  <p>Are you sure you want to send a connection request?</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSendInterest}
              >
                Send interest
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileList;
