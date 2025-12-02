import React, { useEffect, useState } from "react";
import { fetchMyRequests, manageConnectionRequest } from "./api"; // Import API
import Preloader from "./components/Preloader";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load requests on mount
  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await fetchMyRequests();
      // Assuming API returns { incoming: [...] } or just an array.
      // Adjust 'data.incoming' based on your actual API response structure.
      setRequests(data.incoming || data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading requests", error);
      setLoading(false);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      await manageConnectionRequest(requestId, action);
      alert(`Request ${action}ed successfully!`);
      loadRequests(); // Refresh list
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  if (loading) return <Preloader />;

  return (
    <div className="container mt-5">
      <h2>Connection Requests</h2>
      <div className="row">
        {requests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          requests.map((req) => (
            <div className="col-md-6" key={req.RequestID}>
              <div className="card mb-3">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <h5>{req.SenderName || "Unknown User"}</h5>
                    <p className="text-muted">Sent you a request</p>
                  </div>
                  <div>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleAction(req.RequestID, "Accept")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleAction(req.RequestID, "Reject")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requests;
