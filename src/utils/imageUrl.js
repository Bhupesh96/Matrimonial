/**
 * Build the correct absolute image URL for any path returned by the API.
 *
 * Path conventions used by the PHP backend:
 *   - "/uploads/banners/foo.jpg"          (leading slash) -> site-root absolute
 *   - "uploads/testimonials/foo.jpg"      (no leading slash) -> relative to the
 *                                                            "plug" admin folder
 *   - "https://..."                        -> absolute; optional legacy host rewrite
 *   - null / "" / undefined                -> returns ""
 *
 * Production host: https://dewanganlink.in (see REACT_APP_IMG_BASE_URL).
 *
 * Optional legacy rewrite: if the database still has image URLs on an old host,
 * set REACT_APP_IMG_LEGACY_HOSTS=oldhost.com,www.oldhost.com
 * Those absolute URLs are then rewritten to REACT_APP_IMG_BASE_URL's origin
 * (same pathname). If unset, no legacy hosts are rewritten.
 */
const PLUG_BASE =
  process.env.REACT_APP_IMG_BASE_URL ||
  "https://dewanganlink.in/matro/admin/plug/";

let SITE_ORIGIN = "https://dewanganlink.in";
try {
  SITE_ORIGIN = new URL(PLUG_BASE).origin;
} catch (_) {
  // keep default
}

function legacyImageHosts() {
  const raw = process.env.REACT_APP_IMG_LEGACY_HOSTS;
  if (raw === undefined || raw === null) {
    return [];
  }
  const trimmed = String(raw).trim();
  if (trimmed === "") {
    return [];
  }
  return trimmed
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
}

function rewriteLegacyAbsoluteUrl(urlString) {
  try {
    const u = new URL(urlString);
    const host = u.hostname.toLowerCase();
    const legacy = legacyImageHosts();
    if (!legacy.length || !legacy.includes(host)) {
      return urlString;
    }
    return `${SITE_ORIGIN}${u.pathname}${u.search}${u.hash}`;
  } catch {
    return urlString;
  }
}

export const PLUG_BASE_URL = PLUG_BASE.replace(/\/$/, "");
export const SITE_BASE_URL = SITE_ORIGIN;

export const resolveImageUrl = (path) => {
  if (!path) return "";
  const p = String(path).trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) {
    return rewriteLegacyAbsoluteUrl(p);
  }
  if (p.startsWith("//")) {
    return rewriteLegacyAbsoluteUrl(`https:${p}`);
  }
  if (p.startsWith("/")) {
    return `${SITE_ORIGIN}${p}`;
  }
  return `${PLUG_BASE_URL}/${p.replace(/^\/+/, "")}`;
};

export default resolveImageUrl;
