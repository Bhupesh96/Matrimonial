import React, { useEffect, useState } from "react";
import "../assets/css/ProfileList.css";
import {
  fetchApprovedProfiles,
  sendConnectionRequest,
  fetchMyRequests,
  manageConnectionRequest,
  fetchMasterData,
} from "../api";
import Preloader from "../components/Preloader";
import { useNavigate } from "react-router-dom";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");
  const [cities, setCities] = useState([]);
  const [gotras, setGotras] = useState([]);

  const [activeTab, setActiveTab] = useState("profiles");
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [matches, setMatches] = useState([]);
  const [filterAge, setFilterAge] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterGotra, setFilterGotra] = useState("");
  const navigate = useNavigate();

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
        const data = await fetchApprovedProfiles();
        setProfiles(data);
      } catch (err) {
        console.error("Profile load error:", err);
      }
      setLoading(false);
    };
    loadProfiles();
  }, []);

  /* ---------------- FETCH REQUESTS ---------------- */
  useEffect(() => {
    const loadRequests = async () => {
      try {
        const reqData = await fetchMyRequests();

        const allIncoming = reqData.incoming_requests || [];
        const allOutgoing = reqData.outgoing_requests || [];

        const pendingIncoming = allIncoming.filter(
          (r) => r.RequestStatus === "Pending"
        );
        const pendingOutgoing = allOutgoing.filter(
          (r) => r.RequestStatus === "Pending"
        );

        const acceptedMatches = [
          ...allIncoming.filter((r) => r.RequestStatus === "Accepted"),
          ...allOutgoing.filter((r) => r.RequestStatus === "Accepted"),
        ];

        setIncoming(pendingIncoming);
        setOutgoing(pendingOutgoing);
        console.log("Accepted Matches Raw Data:", acceptedMatches);

        setMatches(acceptedMatches);
      } catch (err) {
        console.error("Request load error:", err);
      }
    };

    loadRequests();
  }, []);

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
          prev.filter((req) => req.RequestID !== requestId)
        );
      }

      if (action === "Accept") {
        const acceptedReq = incoming.find((r) => r.RequestID === requestId);

        setIncoming((prev) =>
          prev.filter((req) => req.RequestID !== requestId)
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

  /* ---------------- REMOVE MATCHED FROM ALL PROFILES ---------------- */
  const filteredProfiles = profiles
    .filter((p) => !matches.some((m) => m.ProfileID === p.ProfileID))
    .filter((p) => {
      // Age filter
      if (filterAge) {
        const [minAge, maxAge] = filterAge.split("-");
        const age = calculateAge(p.DateOfBirth).split(" ")[0]; // numeric only

        if (filterAge === "40+" && age < 40) return false;
        if (maxAge && (age < minAge || age > maxAge)) return false;
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
              <div className="filt-com lhs-cate">
                <h4>
                  <i className="fa fa-search"></i> Filters
                </h4>

                {/* Age Filter */}
                <div className="form-group">
                  <label>Age</label>
                  <select
                    className="chosen-select form-control"
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
                  <label>City</label>
                  <select
                    className="chosen-select form-control"
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
                  <label>Gotra</label>
                  <select
                    className="chosen-select form-control"
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
              {/* TABS */}
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

              {/* ---------------- ALL PROFILES ---------------- */}
              {activeTab === "profiles" && (
                <div className="all-list-sh">
                  <ul>
                    {filteredProfiles.map((p, i) => {
                      const fullName = `${p.firstname || ""} ${
                        p.lastname || ""
                      }`;
                      const imageSrc =
                        p.ProfilePhoto || "matro/images/default.png";

                      return (
                        <li key={i}>
                          <div className="profile-card">
                            <div className="profile-image-wrapper">
                              <img src={imageSrc} alt={fullName} />
                            </div>

                            <div className="profile-details">
                              <h4>{fullName}</h4>

                              <div className="profile-info">
                                <span>Age: {calculateAge(p.DateOfBirth)}</span>
                                <span>City: {p.ContactCity || "NA"}</span>
                                <span>Gotra: {p.GotraName || "NA"}</span>
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
                    {incoming.map((req, i) => (
                      <li key={i}>
                        <div className="profile-card">
                          <div className="profile-details">
                            <h4>
                              {req.firstname} {req.lastname}
                            </h4>

                            <div className="profile-info">
                              <span>Gotra: {req.GotraName}</span>
                              <span>{req.HeightValue}</span>
                              <span>{req.MaritalStatus}</span>
                            </div>

                            <div className="card-actions">
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
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ---------------- OUTGOING REQUESTS (MATCHING UI) ---------------- */}
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
                      const imageSrc =
                        req.ProfilePhoto || "matro/images/default.png";

                      return (
                        <li key={i}>
                          <div className="profile-card">
                            <div className="profile-image-wrapper">
                              <img src={imageSrc} alt={fullName} />

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
                        const imageSrc =
                          match.ProfilePhoto || "matro/images/default.png";

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

            <div className="modal-body">
              <img
                src={
                  selectedProfile?.ProfilePhoto || "matro/images/default.png"
                }
                alt=""
                style={{ width: 150, height: 180, borderRadius: 10 }}
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
    </section>
  );
};

export default ProfileList;
