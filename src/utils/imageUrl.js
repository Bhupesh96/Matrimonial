/**
 * Build the correct absolute image URL for any path returned by the API.
 *
 * Path conventions used by the PHP backend:
 *   - "/uploads/banners/foo.jpg"          (leading slash) -> site-root absolute
 *                                                            (banners live at the site root)
 *   - "uploads/testimonials/foo.jpg"      (no leading slash) -> relative to the
 *                                                            "plug" admin folder
 *   - "https://..."                        -> already absolute, return as-is
 *   - null / "" / undefined                -> returns ""
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

export const PLUG_BASE_URL = PLUG_BASE.replace(/\/$/, "");
export const SITE_BASE_URL = SITE_ORIGIN;

export const resolveImageUrl = (path) => {
  if (!path) return "";
  const p = String(path).trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  if (p.startsWith("/")) return `${SITE_ORIGIN}${p}`;
  return `${PLUG_BASE_URL}/${p.replace(/^\/+/, "")}`;
};

export default resolveImageUrl;
