const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://dewanganlink.in/matro/admin/plug/api/";

/* ----------------------------------------------------
    GLOBAL FETCH WRAPPER
  ---------------------------------------------------- */
export const apiFetch = async (url, options = {}) => {
  try {
    const rawToken = localStorage.getItem("login_token");
    // Treat the literal strings "undefined" / "null" as absent — they happen
    // when a login response didn't include `login_token` and we accidentally
    // stored the JS undefined value (which `setItem` coerces to "undefined").
    const token =
      rawToken && rawToken !== "undefined" && rawToken !== "null"
        ? rawToken
        : null;
    let finalUrl = url;

    if (token && !finalUrl.includes("login_token=")) {
      finalUrl += `&login_token=${encodeURIComponent(
        token,
      )}&token=${encodeURIComponent(token)}`;
    }

    const headers = {
      "X-API-KEY": "YourSuperSecretKeyHere123!@#",
      ...options.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      headers["token"] = token;
      headers["login_token"] = token;
    }

    const res = await fetch(finalUrl, {
      credentials: "include",
      ...options,
      headers,
    });

    // The PHP backend always responds with JSON. Read text first so we can
    // surface a helpful error if it isn't valid JSON (e.g. HTML 500 page).
    const rawText = await res.text();
    let data;
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch (parseErr) {
      console.error(
        "apiFetch: server returned non-JSON response",
        res.status,
        rawText.slice(0, 200),
      );
      throw new Error(
        `Server error (${res.status}). Please try again in a moment.`,
      );
    }

    // 401 = session expired / not logged in.
    // Only hard-redirect when we *had* a token (real session). Public pages call
    // the same API without a token; if the backend returns 401 for those,
    // redirecting would send every guest from "/" to "/login".
    // Don't auto-redirect during the explicit login attempt itself.
    if (data && data.status === 401) {
      if (
        token &&
        !finalUrl.includes("api=user_login") &&
        !finalUrl.includes("api=admin_login")
      ) {
        localStorage.clear();
        const basename =
          process.env.REACT_APP_BASENAME === "/"
            ? ""
            : process.env.REACT_APP_BASENAME || "";
        window.location.href = `${basename}/login`;
      }
      return data;
    }

    return data;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error(
        "Cannot reach the server. Please check your internet connection.",
      );
    }
    throw err;
  }
};
/* ----------------------------------------------------
    MASTER DATA
  ---------------------------------------------------- */
export const fetchMasterData = async (masterType) => {
  const url = `${API_BASE_URL}?api=get_master&master_type=${masterType}`;
  const data = await apiFetch(url);

  if (!data || data.status !== 200) throw new Error(data.message);
  return data.data || [];
};

/* ----------------------------------------------------
    CREATE PROFILE
  ---------------------------------------------------- */
export const createProfile = async (profileData) => {
  const url = `${API_BASE_URL}?api=create_profile`;

  const data = await apiFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });

  // FIX: Allow both 200 (OK) and 201 (Created)
  if (!data || (data.status !== 200 && data.status !== 201)) {
    throw new Error(data.message);
  }

  return data;
};
/* ----------------------------------------------------
    LOGIN USER
  ---------------------------------------------------- */
export const loginUser = async (credentials) => {
  const url = `${API_BASE_URL}?api=user_login`;

  const data = await apiFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!data || data.status !== 200) throw new Error(data.message);
  return data;
};

/* ----------------------------------------------------
    NEXT USER ID
  ---------------------------------------------------- */
export const fetchNextUserID = async () => {
  const url = `${API_BASE_URL}?api=get_next_user`;
  const data = await apiFetch(url);

  if (!data || data.status !== 200) throw new Error(data.message);
  return data.next_user_id;
};

/* ----------------------------------------------------
    GET PROFILE
  ---------------------------------------------------- */
export const getProfileDetails = async () => {
  const profileID = localStorage.getItem("profileID");
  if (!profileID) throw new Error("No ProfileID saved");

  // Pass ViewerID = own ProfileID so the backend's privacy mask treats us
  // as the owner and returns ALL fields (mobile, email, address, DOB,
  // birth time/place, etc.) instead of stripping them.
  const url =
    `${API_BASE_URL}?api=get_profile&ProfileID=${encodeURIComponent(profileID)}` +
    `&ViewerID=${encodeURIComponent(profileID)}`;

  const data = await apiFetch(url, { method: "GET" });

  if (!data || data.status !== 200) throw new Error(data.message);
  return data.data?.[0];
};

/* ----------------------------------------------------
    UPDATE PROFILE (FORMDATA)
  ---------------------------------------------------- */
const PROFILE_FIELDS = [
  "ProfileID",
  "UserID",
  "Password",
  "ProfileImageURL",
  "Title",
  "firstname",
  "lastname",
  "MiddleName",
  "GenderID",
  "MaritalStatusID",
  "ReligionID",
  "MotherTongueID",
  "GotraID",
  "NanaGotraId",
  "DateOfBirth",
  "BirthPlace",
  "BirthTime",
  "BirthName",
  "Manglik",
  "Rashi",
  "Complexion",
  "HeightID",
  "Weight",
  "BloodGroupID",
  "FatherName",
  "FatherOccupationID",
  "FatherStatus",
  "MotherName",
  "MotherOccupation",
  "NoOfBrothers",
  "NoOfBrothersMarried",
  "NoOfSisters",
  "NoOfSistersMarried",
  "EducationDegreeID",
  "EducationDegree",
  "EducationDetail",
  "OccupationID",
  "OccupationDetail",
  "OrganizationName",
  "OrganizationLocation",
  "WorkingAs",
  "AnnualIncomeID",
  "AnnualIncome",
  "LocationCityID",
  "PreferredAreaOfMarriage",
  "PaitthiNivasKhor",
  "Hobbies",
  "DietID",
  "Diet",
  "PartnerExpectations",
  "ContactPersonName",
  "ContactPersonRelationshipID",
  "ContactPersonRelationship",
  "ContactMobile",
  "ContactMobile2",
  "ContactPhone",
  "ContactEmail",
  "Address",
  "ContactCityID",
  "ContactCity",
];

export const updateProfile = async (payload) => {
  const profileID = localStorage.getItem("profileID");
  const userID = localStorage.getItem("userID");

  payload.ProfileID = profileID;
  payload.UserID = userID;

  const formData = new FormData();

  Object.keys(payload).forEach((key) => {
    if (payload[key] !== undefined && payload[key] !== null) {
      formData.append(key, payload[key]);
    }
  });

  const data = await apiFetch(`${API_BASE_URL}?api=update_profile`, {
    method: "POST",
    body: formData,
  });

  if (!data || data.status !== 200) {
    throw new Error(data.message || "Profile update failed");
  }

  return data;
};

/* ----------------------------------------------------
    LIST ALL PROFILES
  ---------------------------------------------------- */
export const fetchAllProfiles = async () => {
  const url = `${API_BASE_URL}?api=get_list`;
  const data = await apiFetch(url);

  if (!data || data.status !== 200) throw new Error(data.message);
  return data.data || [];
};

/* ----------------------------------------------------
    LIST APPROVED PROFILES
  ---------------------------------------------------- */
export const fetchApprovedProfiles = async () => {
  // ViewerID is OPTIONAL now. When the visitor isn't logged in we still call
  // the public endpoint and the backend returns approved profiles with
  // sensitive fields stripped.
  const viewerID = localStorage.getItem("profileID");

  let url = `${API_BASE_URL}?api=ver_pproved_list`;
  if (viewerID && viewerID !== "undefined" && viewerID !== "null") {
    url += `&ViewerID=${encodeURIComponent(viewerID)}`;
  }

  const data = await apiFetch(url, { method: "GET" });

  if (!data || data.status !== 200) {
    const err = new Error(data?.message || "Failed to load profiles");
    err.status = data?.status;
    err.profileIncomplete = !!data?.profile_incomplete;
    throw err;
  }

  return {
    data: data.data || [],
    count: data.count || 0,
    hint: data.hint || null,
    profileIncomplete: !!data.profile_incomplete,
    genderFilterApplied: data.gender_filter_applied !== false,
    isAuthenticated: !!data.is_authenticated,
  };
};

/* ----------------------------------------------------
    GET ONE PROFILE (public, with optional viewer)
  ---------------------------------------------------- */
export const fetchProfileById = async (profileID) => {
  if (!profileID) throw new Error("ProfileID is required");
  const viewerID = localStorage.getItem("profileID");
  let url = `${API_BASE_URL}?api=get_profile&ProfileID=${encodeURIComponent(
    profileID,
  )}`;
  if (viewerID && viewerID !== "undefined" && viewerID !== "null") {
    url += `&ViewerID=${encodeURIComponent(viewerID)}`;
  }
  const data = await apiFetch(url);
  if (!data || data.status !== 200) {
    throw new Error(data?.message || "Failed to load profile");
  }
  return data;
};

/* ----------------------------------------------------
    UPDATE PROFILE PICTURE
  ---------------------------------------------------- */
export const updateProfilePicture = async (profilePhoto, galleryFiles = []) => {
  const formData = new FormData();

  formData.append("ProfileID", localStorage.getItem("profileID"));
  formData.append("UserID", localStorage.getItem("userID"));

  if (profilePhoto) {
    formData.append("ProfilePhoto", profilePhoto);
  }

  galleryFiles.forEach((file) => {
    formData.append("GalleryImages[]", file);
  });

  const data = await apiFetch(`${API_BASE_URL}?api=update_profile_picture`, {
    method: "POST",
    body: formData,
  });

  if (!data || data.status !== 200) {
    throw new Error(data.message || "Image upload failed");
  }

  return data;
};

/* ----------------------------------------------------
    SEND CONNECTION REQUEST
    NB: backend (send_request.php) returns HTTP 201 on success,
    so we accept BOTH 200 and 201 as success.
  ---------------------------------------------------- */
export const sendConnectionRequest = async (receiverID) => {
  const requesterID = localStorage.getItem("profileID");
  if (!requesterID) throw new Error("You are not logged in.");

  const url = `${API_BASE_URL}?api=send_request`;

  const data = await apiFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      RequesterID: requesterID,
      ReceiverID: receiverID,
    }),
  });

  if (!data || (data.status !== 200 && data.status !== 201)) {
    throw new Error(data?.message || "Failed to send request");
  }
  return data;
};

/* ----------------------------------------------------
    ACCEPT / REJECT REQUEST
  ---------------------------------------------------- */
export const manageConnectionRequest = async (requestID, action) => {
  const receiverID = localStorage.getItem("profileID");

  const url = `${API_BASE_URL}?api=manage_request`;

  const data = await apiFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      RequestID: requestID,
      ReceiverID: receiverID,
      Action: action,
    }),
  });

  if (!data || data.status !== 200) throw new Error(data.message);
  return data;
};

/* ----------------------------------------------------
    FETCH MY REQUESTS
  ---------------------------------------------------- */
export const fetchMyRequests = async () => {
  const viewerID = localStorage.getItem("profileID");
  if (!viewerID) throw new Error("No profile ID found");

  const url = `${API_BASE_URL}?api=my_request&ViewerID=${viewerID}`;

  const data = await apiFetch(url);

  if (!data || data.status !== 200) throw new Error(data.message);
  return data.data;
};
/* ----------------------------------------------------
    LOGOUT USER
  ---------------------------------------------------- */
export const logoutUser = async () => {
  // 1. Grab ID BEFORE clearing anything
  const profileID = localStorage.getItem("profileID") || "";

  const url = `${API_BASE_URL}?api=user_logout&profile_id=${profileID}`;

  try {
    const data = await apiFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // 2. CRITICAL: Send a body so the server firewall doesn't throw a 403 Forbidden
      body: JSON.stringify({ action: "logout", profile_id: profileID }),
    });

    return data;
  } catch (err) {
    console.warn(
      "Server logout rejected, but forcing local logout anyway.",
      err,
    );
    return null;
  } finally {
    // 3. ALWAYS clear local storage at the very end
    localStorage.clear();
  }
};
/* ----------------------------------------------------
    CONTACT US
  ---------------------------------------------------- */
export const submitContactForm = async (formData) => {
  const url = `${API_BASE_URL}?api=contact_us`;

  const data = await apiFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!data || (data.status !== 200 && data.status !== 201)) {
    throw new Error(data.message);
  }

  return data;
};
/* ----------------------------------------------------
    FETCH BANNERS BY POSITION
  ---------------------------------------------------- */
export const fetchBanners = async (position = "top") => {
  const url = `${API_BASE_URL}?api=banner_list&position=${position}`;

  try {
    const data = await apiFetch(url);
    const ok =
      data &&
      (data.status === 200 ||
        data.status === 201 ||
        data.status === true);
    if (!ok) {
      console.warn("fetchBanners: unexpected status", data?.status, data?.message);
      return [];
    }
    const raw = data.data ?? data.banners ?? data.rows ?? [];
    return Array.isArray(raw) ? raw : [];
  } catch (e) {
    console.warn("fetchBanners failed:", e?.message || e);
    return [];
  }
};
export const checkProfileCompleteness = async (userID) => {
  const url = `${API_BASE_URL}?api=profile_checker&UserID=${userID}`;
  const data = await apiFetch(url);

  if (!data || data.status !== 200) throw new Error(data.message);
  return data;
};

/** True when backend profile_checker marks the profile as complete. */
export function profileCheckerSaysComplete(check) {
  if (!check || typeof check !== "object") return false;
  const v = check.is_complete;
  return (
    v === true ||
    v === 1 ||
    v === "1" ||
    v === "Y" ||
    v === "y" ||
    String(v).toLowerCase() === "true"
  );
}

/**
 * After login: home if profile is complete; otherwise edit profile so members
 * finish education, family, photos, etc. (same rule as send-interest flow.)
 */
export async function resolvePostLoginHomePath(userID) {
  if (!userID) return "/";
  try {
    const check = await checkProfileCompleteness(userID);
    if (!profileCheckerSaysComplete(check)) {
      return "/user-profile-edit?complete=1";
    }
  } catch {
    return "/";
  }
  return "/";
}
/* ----------------------------------------------------
    FETCH COMMUNITY EVENTS (Active + Expired)
  ---------------------------------------------------- */
export const fetchCommunityEvents = async () => {
  const url = `${API_BASE_URL}?api=list_community&active=1`;

  const data = await apiFetch(url);

  if (!data || data.status !== true) throw new Error(data.message);
  return data.data || [];
};
export const fetchCoupleStories = async () => {
  const url = `${API_BASE_URL}?api=list_couple_stories&active=1`;
  const data = await apiFetch(url);

  if (!data || data.status !== true) throw new Error(data.message);
  const rows = Array.isArray(data.data) ? data.data : [];
  /* Backend sometimes still returns IsActive "0"; only expose active rows in UI. */
  return rows.filter((s) => Number(s?.IsActive) === 1);
};
export const fetchTestimonials = async () => {
  const url = `${API_BASE_URL}?api=testimonial_list`;
  const data = await apiFetch(url);

  if (!data || data.status !== true) throw new Error(data.message);
  return data.data || [];
};

/* ----------------------------------------------------
    FETCH ACTIVE (APPROVED) TESTIMONIALS — public endpoint
    Lighter response than testimonial_list and only approved rows.
  ---------------------------------------------------- */
export const fetchActiveTestimonials = async () => {
  const url = `${API_BASE_URL}?api=testimonial_active`;
  const data = await apiFetch(url);

  if (!data || data.status !== true) {
    throw new Error(data?.message || "Failed to load testimonials");
  }
  return data.data || [];
};
export const addTestimonial = async (formData) => {
  // Use apiFetch instead of raw fetch!
  const data = await apiFetch(`${API_BASE_URL}?api=testimonial_add`, {
    method: "POST",
    body: formData, // apiFetch handles the headers for FormData automatically
  });

  // Check for both 200 AND true
  if (data.status !== 200 && data.status !== true) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
