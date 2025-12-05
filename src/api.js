const API_BASE_URL = process.env.REACT_APP_API_URL;

/* ----------------------------------------------------
   GLOBAL FETCH WRAPPER – handles 401 & auto-logout
---------------------------------------------------- */
const apiFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();

    // 🔥 Auto logout when backend returns 401
    if (data.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return;
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
    credentials: "include",
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

export const updateProfile = async (payload, profilePhoto) => {
  const profileID = localStorage.getItem("profileID");
  const userID = localStorage.getItem("userID");

  payload.ProfileID = profileID;
  payload.UserID = userID;

  const formData = new FormData();

  PROFILE_FIELDS.forEach((field) => {
    if (payload[field] !== undefined && payload[field] !== null) {
      formData.append(field, payload[field]);
    }
  });

  if (profilePhoto) {
    formData.append("ProfilePhoto", profilePhoto);
  }

  const data = await apiFetch(`${API_BASE_URL}?api=update_profile`, {
    method: "POST",
    body: formData,
  });

  if (!data || data.status !== 200) throw new Error(data.message);
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
    credentials: "include",
  });

  if (!data || data.status !== 200) throw new Error(data.message);
  return data.data || [];
};

/* ----------------------------------------------------
   UPDATE PROFILE PICTURE
---------------------------------------------------- */
export const updateProfilePicture = async (file) => {
  const profileID = localStorage.getItem("profileID");
  const userID = localStorage.getItem("userID");

  const formData = new FormData();
  formData.append("ProfileID", profileID);
  formData.append("UserID", userID);
  formData.append("ProfilePhoto", file);

  const data = await apiFetch(`${API_BASE_URL}?api=update_profile_picture`, {
    method: "POST",
    body: formData,
  });

  if (!data || data.status !== 200) throw new Error(data.message);
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
  const url = `${API_BASE_URL}?api=user_logout`;

  const data = await apiFetch(url, {
    method: "POST",
    credentials: "include",
  });

  // Always clear localStorage
  localStorage.clear();

  if (!data || data.status !== 200) throw new Error(data.message);
  return data;
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
