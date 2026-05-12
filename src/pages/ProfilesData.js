import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/ProfileList.css";

import {
  checkProfileCompleteness,
  fetchApprovedProfiles,
  fetchMasterData,
  fetchMyRequests,
  getProfileDetails,
  manageConnectionRequest,
  profileCheckerSaysComplete,
  sendConnectionRequest,
} from "../api";
import "../assets/css/ProfileData.css";
import Preloader from "../components/Preloader";
import { resolveImageUrl } from "../utils/imageUrl";

const ProfileList = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const defaultAge = query.get("age") || "";
  const defaultCity = query.get("city") || "";
  const defaultGotra = query.get("gotra") || "";

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [profileHint, setProfileHint] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("profileID"),
  );

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");
  const [cities, setCities] = useState([]);
  const [gotras, setGotras] = useState([]);
  const [profileCheck, setProfileCheck] = useState(null);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);

  const [activeTab, setActiveTab] = useState("profiles");
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [matches, setMatches] = useState([]);
  const [filterAge, setFilterAge] = useState(defaultAge);
  const [filterCity, setFilterCity] = useState(defaultCity);
  const [filterGotra, setFilterGotra] = useState(defaultGotra);
  /** Logged-in viewer's GenderID — used to hide same-gender profiles from browse. */
  const [viewerGenderId, setViewerGenderId] = useState(() => {
    const g = localStorage.getItem("viewerGenderID");
    return g && g !== "undefined" && g !== "null" ? g : null;
  });

  const navigate = useNavigate();

  const PLACEHOLDER_PROFILE_IMG = `${process.env.PUBLIC_URL}/images/default.png`;

  const resolveProfileThumb = (raw) => {
    if (!raw) return PLACEHOLDER_PROFILE_IMG;
    return resolveImageUrl(raw) || PLACEHOLDER_PROFILE_IMG;
  };

  /** Main profile thumbnail: visible to everyone (gallery is login-only on detail page). */
  const browseCardImageSrc = (p) => {
    if (!p) return PLACEHOLDER_PROFILE_IMG;
    return resolveProfileThumb(p.ProfileImageURL || p.ProfilePhoto);
  };

  // --- HELPER: Handle Broken Images ---
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = `${process.env.PUBLIC_URL}/images/default.png`;
  };

  const calculateAge = (dob) => {
    if (!dob) return "NA";
    const diff = Date.now() - new Date(dob).getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return `${age} Years old`;
  };

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const cityData = await fetchMasterData("cities");
        const gotraData = await fetchMasterData("gotras");

        setCities(cityData);
        setGotras(gotraData);
      } catch (err) {
        console.error("Master data load error:", err);
      }
    };

    loadMasterData();
  }, []);

  /* ---------------- FETCH PROFILES ---------------- */
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const result = await fetchApprovedProfiles();
        setProfiles(result.data || []);
        setProfileHint(result.hint || null);
        setIsAuthenticated(!!result.isAuthenticated);
        setLoadError(null);
      } catch (err) {
        console.error("Profile load error:", err);
        setProfiles([]);
        setLoadError({
          message: err.message,
          profileIncomplete: !!err.profileIncomplete,
        });
      }
      setLoading(false);
    };
    loadProfiles();
  }, []);

  /* Resolve viewer gender for opposite-gender browse (existing sessions may lack localStorage). */
  useEffect(() => {
    if (!isAuthenticated) {
      setViewerGenderId(null);
      return;
    }
    const raw = localStorage.getItem("viewerGenderID");
    if (raw && raw !== "undefined" && raw !== "null") {
      setViewerGenderId(raw);
      return;
    }
    let cancelled = false;
    getProfileDetails()
      .then((me) => {
        if (cancelled || me?.GenderID == null || me.GenderID === "") return;
        const gid = String(me.GenderID);
        localStorage.setItem("viewerGenderID", gid);
        setViewerGenderId(gid);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  /* ---------------- FETCH REQUESTS ---------------- */
  useEffect(() => {
    // Anonymous visitors don't have requests to load.
    if (!isAuthenticated) return;
    const loadRequests = async () => {
      try {
        const reqData = await fetchMyRequests();

        const allIncoming = reqData.incoming_requests || [];
        const allOutgoing = reqData.outgoing_requests || [];

        const pendingIncoming = allIncoming.filter(
          (r) => r.RequestStatus === "Pending",
        );
        const pendingOutgoing = allOutgoing.filter(
          (r) => r.RequestStatus === "Pending",
        );

        const acceptedMatches = [
          ...allIncoming.filter((r) => r.RequestStatus === "Accepted"),
          ...allOutgoing.filter((r) => r.RequestStatus === "Accepted"),
        ];

        setIncoming(pendingIncoming);
        setOutgoing(pendingOutgoing);
        setMatches(acceptedMatches);
      } catch (err) {
        console.error("Request load error:", err);
      }
    };

    loadRequests();
  }, [isAuthenticated]);

  const handleCheckBeforeSend = async (p) => {
    const userID = localStorage.getItem("userID");

    // Anonymous visitors can't send interest — push them to login.
    if (!userID || !isAuthenticated) {
      navigate(
        `/login?next=${encodeURIComponent(location.pathname + location.search)}`,
      );
      return;
    }

    try {
      const check = await checkProfileCompleteness(userID);

      if (!profileCheckerSaysComplete(check)) {
        setProfileCheck(check);
        setShowIncompleteModal(true);
        return;
      }

      // ✔ Profile complete → open Send Interest modal
      setSelectedProfile(p);
      setRequestStatus("");
      document.getElementById("openSendInterestBtn").click();
    } catch (error) {
      alert("Error checking profile: " + error.message);
    }
  };

  /* ---------------- SEND REQUEST ---------------- */
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

  /* --------------- ACCEPT / REJECT ---------------- */
  const handleRequestAction = async (requestId, action) => {
    if (!window.confirm(`Are you sure you want to ${action} this request?`))
      return;

    try {
      await manageConnectionRequest(requestId, action);

      if (action === "Reject") {
        setIncoming((prev) =>
          prev.filter((req) => req.RequestID !== requestId),
        );
      }

      if (action === "Accept") {
        const acceptedReq = incoming.find((r) => r.RequestID === requestId);

        setIncoming((prev) =>
          prev.filter((req) => req.RequestID !== requestId),
        );

        if (acceptedReq) {
          const updatedMatch = { ...acceptedReq, RequestStatus: "Accepted" };
          setMatches((prev) => [...prev, updatedMatch]);

          if (window.confirm("Request Accepted! View in Matches tab?")) {
            setActiveTab("matches");
          }
        }
      }
    } catch (error) {
      alert("Failed to perform action: " + error.message);
    }
  };

  const handleViewProfile = (id) => navigate(`/user-profile/${id}`);

  /* ---------------- REMOVE MATCHED & APPLY FILTERS ---------------- */
  const filteredProfiles = profiles
    .filter((p) => !matches.some((m) => m.ProfileID === p.ProfileID))
    /* Logged in: show only opposite gender (exclude own gender from browse). */
    .filter((p) => {
      if (!isAuthenticated || !viewerGenderId) return true;
      const gid = p.GenderID;
      if (gid == null || gid === "") return true;
      return String(gid) !== String(viewerGenderId);
    })
    .filter((p) => {
      // Safely check age and handle "NA"
      if (filterAge) {
        const ageString = calculateAge(p.DateOfBirth).split(" ")[0];
        if (ageString === "NA") return false;

        const ageNum = parseInt(ageString, 10);

        if (filterAge === "40+" && ageNum < 40) return false;

        if (filterAge !== "40+") {
          const [minAge, maxAge] = filterAge.split("-");
          if (ageNum < parseInt(minAge, 10) || ageNum > parseInt(maxAge, 10)) {
            return false;
          }
        }
      }

      // City filter
      if (
        filterCity &&
        !p.ContactCity?.toLowerCase().includes(filterCity.toLowerCase())
      )
        return false;

      // Gotra filter
      if (
        filterGotra &&
        !p.GotraName?.toLowerCase().includes(filterGotra.toLowerCase())
      )
        return false;

      return true;
    });

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

              <div className="filter-box-premium">
                <h4 className="filter-title">
                  <i className="fa fa-search"></i> Filters
                </h4>

                {/* Age Filter */}
                <div className="form-group">
                  <label className="filter-label">Age</label>
                  <select
                    className="filter-select"
                    value={filterAge}
                    onChange={(e) => setFilterAge(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="18-25">18 - 25</option>
                    <option value="26-30">26 - 30</option>
                    <option value="31-35">31 - 35</option>
                    <option value="36-40">36 - 40</option>
                    <option value="40+">40+</option>
                  </select>
                </div>

                {/* City Filter */}
                <div className="form-group">
                  <label className="filter-label">City</label>
                  <select
                    className="filter-select"
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                  >
                    <option value="">All Cities</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gotra Filter */}
                <div className="form-group">
                  <label className="filter-label">Gotra</label>
                  <select
                    className="filter-select"
                    value={filterGotra}
                    onChange={(e) => setFilterGotra(e.target.value)}
                  >
                    <option value="">All Gotras</option>
                    {gotras.map((g) => (
                      <option key={g.id} value={g.name}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="col-md-9">
              {/* TABS — request/match tabs only make sense for logged-in users */}
              <div className="modern-tabs-wrapper">
                <div className="modern-tabs">
                  <button
                    className={activeTab === "profiles" ? "tab active" : "tab"}
                    onClick={() => setActiveTab("profiles")}
                  >
                    All Profiles
                  </button>
                  {isAuthenticated && (
                    <>
                      <button
                        className={
                          activeTab === "incoming" ? "tab active" : "tab"
                        }
                        onClick={() => setActiveTab("incoming")}
                      >
                        Incoming ({incoming.length})
                      </button>
                      <button
                        className={
                          activeTab === "outgoing" ? "tab active" : "tab"
                        }
                        onClick={() => setActiveTab("outgoing")}
                      >
                        Outgoing ({outgoing.length})
                      </button>
                      <button
                        className={
                          activeTab === "matches" ? "tab active" : "tab"
                        }
                        onClick={() => setActiveTab("matches")}
                      >
                        Matches ({matches.length})
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* ---------------- ALL PROFILES ---------------- */}
              {activeTab === "profiles" && (
                <div className="all-list-sh">
                  {/* Friendly notice when backend told us viewer's profile is
                      incomplete (e.g. missing GenderID), or when the load
                      itself failed */}
                  {(profileHint ||
                    (loadError && loadError.profileIncomplete)) && (
                    <div
                      className="alert alert-warning d-flex flex-wrap align-items-center justify-content-between"
                      style={{
                        gap: 12,
                        padding: "12px 16px",
                        marginBottom: 16,
                        borderRadius: 8,
                      }}
                    >
                      <span>
                        <i
                          className="fa fa-info-circle me-2"
                          aria-hidden="true"
                        ></i>
                        {profileHint || loadError?.message}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-warning"
                        style={{ fontWeight: 600 }}
                        onClick={() => navigate("/user-profile-edit")}
                      >
                        Complete Profile
                      </button>
                    </div>
                  )}

                  {loadError && !loadError.profileIncomplete && (
                    <div
                      className="alert alert-danger"
                      style={{
                        padding: "12px 16px",
                        marginBottom: 16,
                        borderRadius: 8,
                      }}
                    >
                      <i
                        className="fa fa-exclamation-triangle me-2"
                        aria-hidden="true"
                      ></i>
                      {loadError.message ||
                        "Could not load profiles. Please try again."}
                    </div>
                  )}

                  {isAuthenticated && viewerGenderId && !loadError && (
                    <div
                      className="alert alert-light border d-flex align-items-center"
                      style={{
                        gap: 10,
                        padding: "10px 14px",
                        marginBottom: 16,
                        borderRadius: 8,
                      }}
                    >
                      <i
                        className="fa fa-venus-mars text-secondary"
                        aria-hidden="true"
                      ></i>
                      <span className="small text-muted mb-0">
                        This list shows opposite-gender profiles based on the
                        gender saved on <strong>your</strong> account. If
                        anything looks off, log in as that member and update
                        your details (including gender) under{" "}
                        <Link to="/user-profile-edit">Edit profile</Link>
                        — after you save, the list will match correctly.
                      </span>
                    </div>
                  )}

                  {!isAuthenticated && !loadError && (
                    <div
                      className="alert alert-info d-flex flex-wrap align-items-center justify-content-between"
                      style={{
                        gap: 12,
                        padding: "12px 16px",
                        marginBottom: 16,
                        borderRadius: 8,
                      }}
                    >
                      <span>
                        <i
                          className="fa fa-lock me-2"
                          aria-hidden="true"
                        ></i>
                        You're browsing publicly. General city is shown on
                        profiles; email, phone, address and extra gallery photos
                        appear after you log in (and match for private contact).
                      </span>
                      <span>
                        <Link
                          to="/login"
                          className="btn btn-sm btn-primary me-2"
                        >
                          Login
                        </Link>
                        <Link to="/sign-up" className="btn btn-sm btn-success">
                          Register Free
                        </Link>
                      </span>
                    </div>
                  )}

                  {!loadError && filteredProfiles.length === 0 && (
                    <div className="empty-state">
                      <i className="fa fa-user-circle-o"></i>
                      <h4>No matching profiles</h4>
                      <p>Try removing some filters to see more profiles.</p>
                    </div>
                  )}

                  <ul>
                    {filteredProfiles.map((p, i) => {
                      const fullName = `${p.firstname || ""} ${
                        p.lastname || ""
                      }`;
                      const imageSrc = browseCardImageSrc(p);
                      // Prefer the server-computed Age (works even when DOB
                      // is masked for unconnected viewers).
                      const ageDisplay = p.Age
                        ? `${p.Age} Years old`
                        : calculateAge(p.DateOfBirth);
                      const status = p.ConnectionStatus; // null|Pending|Accepted|Rejected

                      let actionLabel = "Send Interest";
                      let actionClass = "btn-interest";
                      let actionDisabled = false;
                      if (!isAuthenticated) {
                        actionLabel = "Login to Connect";
                      } else if (status === "Accepted" || p.IsConnected) {
                        actionLabel = "View Full Profile";
                      } else if (status === "Pending") {
                        actionLabel = "Request Pending";
                        actionDisabled = true;
                      } else if (status === "Rejected") {
                        actionLabel = "Send Interest";
                      }

                      return (
                        <li key={i}>
                          <div className="profile-card">
                            <div className="profile-image-wrapper">
                              <img
                                src={imageSrc}
                                alt={fullName}
                                onError={handleImageError}
                              />
                            </div>

                            <div className="profile-details">
                              <h4>{fullName}</h4>

                              <div className="profile-info">
                                <span>Age: {ageDisplay}</span>
                                <span>
                                  City:{" "}
                                  {p.ContactCity || p.CityName || "NA"}
                                </span>
                                <span>Gotra: {p.GotraName || "NA"}</span>
                              </div>

                              <div className="card-actions">
                                {/* View Profile is ALWAYS available so
                                    anyone can inspect the public details
                                    without committing to send a request. */}
                                <button
                                  type="button"
                                  className="btn-interest btn-view-profile"
                                  onClick={() => handleViewProfile(p.ProfileID)}
                                >
                                  <i className="fa fa-user-circle-o me-1"></i>
                                  View Profile
                                </button>

                                <span
                                  className={`${actionClass}${
                                    actionDisabled ? " disabled" : ""
                                  }`}
                                  style={
                                    actionDisabled
                                      ? {
                                          opacity: 0.6,
                                          cursor: "not-allowed",
                                          pointerEvents: "none",
                                        }
                                      : undefined
                                  }
                                  onClick={() => {
                                    if (actionDisabled) return;
                                    if (
                                      status === "Accepted" ||
                                      p.IsConnected
                                    ) {
                                      handleViewProfile(p.ProfileID);
                                    } else {
                                      handleCheckBeforeSend(p);
                                    }
                                  }}
                                >
                                  {actionLabel}
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

              {/* ---------------- INCOMING REQUESTS ---------------- */}
              {activeTab === "incoming" && (
                <div className="all-list-sh">
                  {incoming.length === 0 && (
                    <div className="empty-state">
                      <i className="fa fa-envelope-open"></i>
                      <h4>No Incoming Requests</h4>
                      <p>Profiles who send you interest will appear here.</p>
                    </div>
                  )}

                  <ul>
                    {incoming.map((req, i) => {
                      const reqImg = resolveProfileThumb(
                        req.ProfileImageURL || req.ProfilePhoto,
                      );
                      return (
                        <li key={i}>
                          <div className="profile-card">
                            <div className="profile-image-wrapper">
                              <img
                                src={reqImg}
                                alt={`${req.firstname} ${req.lastname}`}
                                onError={handleImageError}
                              />
                            </div>

                            <div className="profile-details">
                              <h4>
                                {req.firstname} {req.lastname}
                              </h4>

                              <div className="profile-info">
                                <span>Gotra: {req.GotraName || "NA"}</span>
                                <span>{req.HeightValue || ""}</span>
                                <span>{req.MaritalStatus || ""}</span>
                              </div>

                              <div className="card-actions">
                                <button
                                  type="button"
                                  className="btn-interest btn-view-profile"
                                  onClick={() =>
                                    handleViewProfile(req.ProfileID)
                                  }
                                >
                                  <i className="fa fa-user-circle-o me-1"></i>
                                  View Profile
                                </button>

                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() =>
                                    handleRequestAction(
                                      req.RequestID,
                                      "Accept",
                                    )
                                  }
                                >
                                  <i className="fa fa-check me-1"></i>
                                  Accept
                                </button>

                                <button
                                  className="btn btn-danger btn-sm ms-2"
                                  onClick={() =>
                                    handleRequestAction(
                                      req.RequestID,
                                      "Reject",
                                    )
                                  }
                                >
                                  <i className="fa fa-times me-1"></i>
                                  Reject
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* ---------------- OUTGOING REQUESTS ---------------- */}
              {activeTab === "outgoing" && (
                <div className="all-list-sh">
                  {outgoing.length === 0 && (
                    <div className="empty-state">
                      <i className="fa fa-paper-plane"></i>
                      <h4>No Outgoing Requests</h4>
                      <p>Profiles you send interest to will show up here.</p>
                    </div>
                  )}

                  <ul>
                    {outgoing.map((req, i) => {
                      const fullName = `${req.firstname} ${req.lastname}`;
                      const imageSrc = resolveProfileThumb(
                        req.ProfileImageURL || req.ProfilePhoto,
                      );
                      return (
                        <li key={i}>
                          <div className="profile-card">
                            <div className="profile-image-wrapper">
                              <img
                                src={imageSrc}
                                alt={fullName}
                                onError={handleImageError}
                              />

                              <div
                                className={`status-badge ${
                                  req.RequestStatus === "Accepted"
                                    ? "accepted"
                                    : ""
                                }`}
                              >
                                {req.RequestStatus}
                              </div>
                            </div>

                            <div className="profile-details">
                              <h4>{fullName}</h4>

                              <div className="profile-info">
                                <span>
                                  Age: {calculateAge(req.DateOfBirth)}
                                </span>
                                <span>City: {req.ContactCity || "NA"}</span>
                                <span>Gotra: {req.GotraName}</span>
                              </div>

                              <div className="card-actions">
                                <button
                                  className="btn-interest"
                                  onClick={() =>
                                    handleViewProfile(req.ProfileID)
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
                </div>
              )}

              {/* ---------------- MATCHES ---------------- */}
              {activeTab === "matches" && (
                <div className="all-list-sh">
                  {matches.length === 0 ? (
                    <div className="empty-state">
                      <i className="fa fa-heart"></i>
                      <h4>No Matches</h4>
                      <p>Accepted profiles will appear here.</p>
                    </div>
                  ) : (
                    <ul>
                      {matches.map((match, i) => {
                        const fullName = `${match.firstname} ${match.lastname}`;
                        const imageSrc = resolveProfileThumb(
                          match.ProfileImageURL || match.ProfilePhoto,
                        );
                        return (
                          <li key={i}>
                            <div className="profile-card">
                              {/* IMAGE */}
                              <div className="profile-image-wrapper">
                                <img
                                  src={imageSrc}
                                  alt={fullName}
                                  onError={handleImageError}
                                />
                              </div>

                              {/* DETAILS */}
                              <div className="profile-details">
                                <h4>{fullName}</h4>

                                <div className="profile-info">
                                  <span>
                                    Age: {calculateAge(match.DateOfBirth)}
                                  </span>
                                  <span>
                                    City:{" "}
                                    {match.ContactCity
                                      ? match.ContactCity
                                      : "NA"}
                                  </span>
                                  <span>Gotra: {match.GotraName}</span>
                                </div>

                                <div className="card-actions">
                                  <button
                                    className="btn-interest"
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

      {/* SEND INTEREST MODAL */}
      <div
        className="modal fade"
        id="sendInter"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Send Interest</h4>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body text-center">
              <img
                src={browseCardImageSrc(selectedProfile)}
                alt="Profile"
                style={{
                  width: 150,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 10,
                  margin: "0 auto 15px auto",
                }}
                onError={handleImageError}
              />

              <h5>{selectedProfile?.firstname}</h5>

              {requestStatus && (
                <div className="alert alert-info">{requestStatus}</div>
              )}

              <p>Are you sure you want to send interest?</p>
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={handleSendInterest}>
                Send
              </button>
              <button className="btn btn-danger" data-bs-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        id="openSendInterestBtn"
        style={{ display: "none" }}
        data-bs-toggle="modal"
        data-bs-target="#sendInter"
      ></button>

      {/* INCOMPLETE PROFILE MODAL */}
      {showIncompleteModal && (
        <div
          className="modal fade show custom-modal-backdrop"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content complete-profile-modal">
              {/* HEADER */}
              <div className="modal-header border-0 pb-0">
                <h4 className="modal-title modal-title-premium">
                  Complete Your Profile
                </h4>
                <button
                  className="btn-close"
                  onClick={() => setShowIncompleteModal(false)}
                ></button>
              </div>

              {/* BODY */}
              <div className="modal-body text-center">
                <div className="premium-icon-wrapper">
                  <i className="fa fa-heart premium-heart-icon"></i>
                </div>

                <h5 className="premium-heading">A few more details needed</h5>

                <p className="premium-subtext">
                  Please fill the following essentials to send connection
                  requests. Your contact info is{" "}
                  <strong>not required</strong> — it stays private until a
                  match accepts you.
                </p>

                {profileCheck?.missing_fields &&
                  profileCheck.missing_fields.length > 0 && (
                    <ul
                      className="text-start mt-3 mb-0"
                      style={{
                        background: "#fff8e1",
                        border: "1px solid #f0c14b",
                        borderRadius: 8,
                        padding: "10px 16px 10px 32px",
                        listStyle: "disc",
                      }}
                    >
                      {profileCheck.missing_fields.map((m, i) => (
                        <li
                          key={i}
                          style={{ color: "#7a5400", fontWeight: 600 }}
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>

              {/* FOOTER */}
              <div className="modal-footer premium-footer">
                <button
                  className="btn btn-primary px-4 premium-btn"
                  onClick={() => {
                    setShowIncompleteModal(false);
                    navigate("/user-profile-edit");
                  }}
                >
                  Complete Profile
                </button>

                <button
                  className="btn btn-outline-secondary px-4 premium-btn-outline"
                  onClick={() => setShowIncompleteModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileList;
