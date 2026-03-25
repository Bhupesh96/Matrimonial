const API_BASE_URL = process.env.REACT_APP_API_URL;

export const apiFetch = async (url, options = {}) => {
  // <-- Add 'export' here
  try {
    const token = localStorage.getItem("login_token");

    // Automatically attach the token to headers if the user is logged in
    const headers = {
      ...options.headers,
      "X-API-KEY": "YourSuperSecretKeyHere123!@#", // <-- MUST MATCH PHP
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      headers["token"] = token; // Added in case your PHP backend looks for a 'token' header
    }

    const res = await fetch(url, {
      credentials: "include", // Enforce cookies
      ...options,
      headers, // Pass the headers with the token
    });

    const data = await res.json();

    if (data.status === 401) {
      localStorage.clear();
      const basename =
        process.env.REACT_APP_BASENAME === "/"
          ? ""
          : process.env.REACT_APP_BASENAME || "";
      window.location.href = `${basename}/login`;
      return data;
    }

    return data;
  } catch (err) {
    throw new Error("Network error: " + err.message);
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

  if (!data || data.status !== 200) throw new Error(data.message);
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

  const url = `${API_BASE_URL}?api=get_profile&ProfileID=${profileID}`;

  const data = await apiFetch(url, {
    method: "GET",
  });

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
  const viewerID = localStorage.getItem("profileID");
  if (!viewerID) throw new Error("No profile ID found");

  const url = `${API_BASE_URL}?api=ver_pproved_list&ViewerID=${viewerID}`;

  const data = await apiFetch(url, {
    method: "GET",
  });

  if (!data || data.status !== 200) throw new Error(data.message);
  return data.data || [];
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

  if (!data || data.status !== 200) throw new Error(data.message);
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
  // Keep the URL completely clean to bypass WAF rules
  const url = `${API_BASE_URL}?api=user_logout`;

  try {
    const data = await apiFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Send a safe, generic body.
      // The PHP file relies entirely on the Session Cookie anyway.
      body: JSON.stringify({ action: "logout_request" }),
    });

    // Always clear localStorage
    localStorage.clear();

    if (!data || data.status !== 200) {
      window.location.href = "/login";
      return; // Exit early
    }

    return data;
  } catch (error) {
    // If the server drops the request, force the frontend to log out anyway
    localStorage.clear();
    window.location.href = "/login";
    console.error("Logout request blocked, but local session cleared.");
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

  const data = await apiFetch(url);

  if (!data || data.status !== 200) throw new Error(data.message);
  return data.data || [];
};
export const checkProfileCompleteness = async (userID) => {
  const url = `${API_BASE_URL}?api=profile_checker&UserID=${userID}`;
  const data = await apiFetch(url);

  if (!data || data.status !== 200) throw new Error(data.message);
  return data;
};
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
  return data.data || [];
};
export const fetchTestimonials = async () => {
  const url = `${API_BASE_URL}?api=testimonial_list`;
  const data = await apiFetch(url);

  if (!data || data.status !== true) throw new Error(data.message);
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
