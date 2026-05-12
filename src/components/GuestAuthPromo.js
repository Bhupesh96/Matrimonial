import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/GuestAuthPromo.css";

/** localStorage: hide-until timestamp (ms) after "Remind me later" */
const STORAGE_HIDE_UNTIL = "dw-auth-promo-hide-until";
/** localStorage: hide-until after "Don't show for 7 days" */
const STORAGE_SILENT_7D = "dw-auth-promo-silent-7d";

/** Pop up every N ms while user remains a guest and hasn't dismissed long-term. */
const POPUP_INTERVAL_MS = 10 * 1000;
const DEFAULT_HIDE_HOURS = 24;

function isGuest() {
  try {
    return !localStorage.getItem("profileName");
  } catch {
    return true;
  }
}

function isQuietPath(pathname) {
  const p = (pathname || "").replace(/\/+$/, "") || "/";
  return (
    p.endsWith("/login") ||
    p === "/login" ||
    p.endsWith("/sign-up") ||
    p === "/sign-up" ||
    p === "/all-profiles" ||
    p === "/couple-stories" ||
    p.startsWith("/user-profile/")
  );
}

function nowHiddenByPreference() {
  try {
    const t = parseInt(localStorage.getItem(STORAGE_HIDE_UNTIL) || "0", 10);
    if (t && Date.now() < t) return true;
    const s7 = parseInt(localStorage.getItem(STORAGE_SILENT_7D) || "0", 10);
    if (s7 && Date.now() < s7) return true;
  } catch {
    /* ignore */
  }
  return false;
}

/**
 * @param {{ openLoginModal?: () => void }} props
 */
export default function GuestAuthPromo({ openLoginModal }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [silent7d, setSilent7d] = useState(false);
  const timerRef = useRef(null);

  /* Show the popup every POPUP_INTERVAL_MS while the visitor stays a guest.
     Effect re-runs whenever the user closes the popup (open -> false) or
     navigates to a different route, which restarts the 10-second timer. */
  useEffect(() => {
    if (!isGuest()) {
      setOpen(false);
      return;
    }
    if (isQuietPath(location.pathname)) {
      setOpen(false);
      return;
    }
    if (nowHiddenByPreference()) {
      setOpen(false);
      return;
    }
    if (open) return; // popup is currently visible — wait until it closes

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      /* Re-check guards at fire time — login state or preference may have
         changed during the 10-second wait. */
      if (!isGuest()) return;
      if (isQuietPath(window.location.pathname)) return;
      if (nowHiddenByPreference()) return;
      setOpen(true);
    }, POPUP_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname, open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Plain close: hides the popup; it will reappear after POPUP_INTERVAL_MS. */
  const close = () => setOpen(false);

  /* User explicitly asks for a longer reprieve via the "Maybe later" button
     (or 7-day checkbox). This is the only way to stop the recurring popup
     without registering / logging in. */
  const remindLater = () => {
    try {
      if (silent7d) {
        const week = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_SILENT_7D, String(week));
        localStorage.removeItem(STORAGE_HIDE_UNTIL);
      } else {
        const until = Date.now() + DEFAULT_HIDE_HOURS * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_HIDE_UNTIL, String(until));
      }
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  /* Clicking the dim backdrop is a casual dismiss → reappears in 10s,
     same as the X icon. (Use "Maybe later" for a longer hide.) */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) close();
  };

  if (!open) return null;

  return (
    <div
      className="dw-auth-promo-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dw-auth-promo-title"
      onClick={handleOverlayClick}
    >
      <div className="dw-auth-promo-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="dw-auth-promo-close"
          onClick={close}
          aria-label="Close"
        >
          <i className="fa fa-times" aria-hidden="true" />
        </button>

        <div className="dw-auth-promo-icon" aria-hidden="true">
          <i className="fa fa-heart" />
        </div>

        <h2 id="dw-auth-promo-title">Find your match with us</h2>
        <p>
          Log in to connect with profiles you like, or create a free account to
          get started today.
        </p>

        <div className="dw-auth-promo-actions">
          <Link
            to="/sign-up"
            className="dw-auth-btn dw-auth-btn-primary"
            onClick={close}
          >
            <i className="fa fa-heart" aria-hidden="true" />
            Join free
          </Link>
          {typeof openLoginModal === "function" ? (
            <button
              type="button"
              className="dw-auth-btn dw-auth-btn-ghost"
              onClick={() => {
                close();
                openLoginModal();
              }}
            >
              <i className="fa fa-sign-in" aria-hidden="true" />
              Login
            </button>
          ) : (
            <Link
              to="/login"
              className="dw-auth-btn dw-auth-btn-ghost"
              onClick={close}
            >
              <i className="fa fa-sign-in" aria-hidden="true" />
              Login
            </Link>
          )}
        </div>

        <div className="dw-auth-promo-footer" hidden>
          <label className="dw-auth-promo-check">
            <input
              type="checkbox"
              checked={silent7d}
              onChange={(e) => setSilent7d(e.target.checked)}
            />
            Don&apos;t show this again for 7 days (after &quot;Later&quot;)
          </label>
          <button type="button" className="dw-auth-promo-muted" onClick={remindLater}>
            Maybe later — remind me in {DEFAULT_HIDE_HOURS} hours
          </button>
        </div>
      </div>
    </div>
  );
}
