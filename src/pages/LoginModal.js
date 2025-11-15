import React, { useState } from "react";
import { loginUser } from "../api";
import AlertService from "../services/AlertServices";

const LoginModal = ({ show, onClose, onSuccess }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null; // Do not render modal if hidden

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!identifier || !password) {
      AlertService.showError("Please enter both User ID and password.");
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser({ identifier, password });

      if (data.data?.ProfileID) {
        localStorage.setItem("profileID", data.data.ProfileID);
        localStorage.setItem("userID", data.data.UserID);
        localStorage.setItem("profileName", data.data.ProfileName);
      }

      AlertService.showSuccessAndRedirect(
        "Login Successful",
        () => {},
        "" // No redirect needed for modal login
      );

      onSuccess && onSuccess();
      onClose(); // Close modal after success
    } catch (err) {
      AlertService.showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        background: "rgba(0,0,0,0.4)",
        paddingTop: "80px",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: "12px" }}>
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>User ID / Email / Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">Remember me</label>
              </div>

              <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
