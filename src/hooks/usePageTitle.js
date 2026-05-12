import { useEffect } from "react";

/**
 * SITE_NAME is the brand suffix appended to every page title.
 * Change once here to update the entire site.
 */
export const SITE_NAME = "Dewangan Links";
const DEFAULT_DESCRIPTION =
  "India's most trusted matrimonial platform for the Dewangan community. Browse verified profiles and find your perfect life partner.";

/**
 * Set the document title for a page.
 *
 *   usePageTitle("Login")              // "Login | Dewangan Links"
 *   usePageTitle("Home", { suffix: false })  // "Dewangan Links"
 *   usePageTitle("About Us", { description: "About our matrimony service..." })
 *
 * Cleans up by restoring the previous title when the component unmounts.
 */
export default function usePageTitle(title, options = {}) {
  const { suffix = true, description } = options;

  useEffect(() => {
    const prevTitle = document.title;

    const finalTitle = title
      ? suffix
        ? `${title} | ${SITE_NAME}`
        : title
      : SITE_NAME;

    document.title = finalTitle;

    let prevDescription;
    if (description) {
      let metaTag = document.querySelector('meta[name="description"]');
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("name", "description");
        document.head.appendChild(metaTag);
      }
      prevDescription = metaTag.getAttribute("content");
      metaTag.setAttribute("content", description || DEFAULT_DESCRIPTION);
    }

    return () => {
      document.title = prevTitle;
      if (description && prevDescription !== undefined) {
        const metaTag = document.querySelector('meta[name="description"]');
        if (metaTag) metaTag.setAttribute("content", prevDescription);
      }
    };
  }, [title, suffix, description]);
}
