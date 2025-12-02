import React, { useEffect, useState } from "react";
import { fetchMyRequests, manageConnectionRequest } from "../api";

const MyRequests = () => {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const data = await fetchMyRequests();
      setIncoming(data.incoming_requests || []);
      setOutgoing(data.outgoing_requests || []);
    } catch (err) {
      console.error("Error loading request list:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAction = async (requestID, action) => {
    try {
      await manageConnectionRequest(requestID, action);
      loadRequests(); // refresh
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <h2>Loading requests...</h2>;

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h2>Incoming Requests</h2>

      {incoming.length === 0 && <p>No incoming requests.</p>}

      {incoming.map((req) => (
        <div
          key={req.RequestID}
          style={{
            padding: "15px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h4>
            {req.firstname} {req.lastname} ({req.UserID})
          </h4>
          <p>Gotra: {req.GotraName}</p>
          <p>Status: {req.RequestStatus}</p>

          <button
            className="btn btn-success"
            onClick={() => handleAction(req.RequestID, "Accept")}
          >
            Accept
          </button>

          <button
            className="btn btn-danger"
            onClick={() => handleAction(req.RequestID, "Reject")}
            style={{ marginLeft: "10px" }}
          >
            Reject
          </button>
        </div>
      ))}

      <hr />

      <h2>Outgoing Requests</h2>

      {outgoing.length === 0 && <p>No outgoing requests.</p>}

      {outgoing.map((req) => (
        <div
          key={req.RequestID}
          style={{
            padding: "15px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h4>
            {req.firstname} {req.lastname} ({req.UserID})
          </h4>
          <p>Request Status: {req.RequestStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
