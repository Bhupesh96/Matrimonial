const API_BASE_URL = process.env.REACT_APP_API_URL;

// ---------------------------
// FETCH MASTER DATA
// ---------------------------
export const fetchMasterData = async (masterType) => {
  const url = `${API_BASE_URL}?api=get_master&master_type=${masterType}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data.data || [];
};

// ---------------------------
// CREATE PROFILE  (POST → FormData)
// ---------------------------
export const createProfile = async (profileData) => {
  const url = `${API_BASE_URL}?api=create_profile`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// ---------------------------
// LOGIN USER (POST → FormData)
// ---------------------------
export const loginUser = async (credentials) => {
  const url = `${API_BASE_URL}?api=user_login`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
};

// ---------------------------
// NEXT USER ID
// ---------------------------
export const fetchNextUserID = async () => {
  const url = `${API_BASE_URL}?api=get_next_user`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status === 200 && data.next_user_id) return data.next_user_id;
  throw new Error(data.message || "Unable to fetch next user ID");
};

// ---------------------------
// GET PROFILE
// ---------------------------
export const getProfileDetails = async () => {
  const profileID = localStorage.getItem("profileID");
  if (!profileID) throw new Error("No ProfileID saved");

  const url = `${API_BASE_URL}?api=get_profile&ProfileID=${profileID}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include", // <-- REQUIRED
  });

  const data = await res.json();

  if (!res.ok || data.status === 401) throw new Error(data.message);

  return data.data?.[0];
};

// ---------------------------
// UPDATE PROFILE (POST → FormData)
// ---------------------------
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

// -------------------------------
// FINAL WORKING updateProfile()
// -------------------------------
export const updateProfile = async (payload, profilePhoto) => {
  const profileID = localStorage.getItem("profileID");
  const userID = localStorage.getItem("userID");

  payload.ProfileID = profileID;
  payload.UserID = userID;

  const formData = new FormData();

  // Append ONLY allowed fields
  PROFILE_FIELDS.forEach((field) => {
    if (payload[field] !== undefined && payload[field] !== null) {
      formData.append(field, payload[field]);
    }
  });

  // Append profile photo if selected
  if (profilePhoto) {
    formData.append("ProfilePhoto", profilePhoto);
  }

  // Debugging (OPTIONAL)
  console.log("---- FINAL SENT PAYLOAD ----");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  const response = await fetch(`${API_BASE_URL}?api=update_profile`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Update failed");
  }

  return data;
};
// ---------------------------
// GET ALL PROFILES LIST
// ---------------------------
export const fetchAllProfiles = async () => {
  const url = `${API_BASE_URL}?api=get_list`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok || data.status !== 200) {
    throw new Error(data.message || "Failed to fetch profiles");
  }

  return data.data || [];
};
// ---------------------------
// GET APPROVED PROFILES LIST
// ---------------------------
export const fetchApprovedProfiles = async () => {
  const viewerID = localStorage.getItem("profileID");
  if (!viewerID) throw new Error("No profile ID found");

  const url = `${API_BASE_URL}?api=ver_pproved_list&ViewerID=${viewerID}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok || data.status !== 200) {
    throw new Error(data.message || "Failed to fetch approved list");
  }

  return data.data || [];
};

// ---------------------------
// UPDATE PROFILE PHOTO (POST → FormData)
// ---------------------------
export const updateProfilePicture = async (file) => {
  const profileID = localStorage.getItem("profileID");
  const userID = localStorage.getItem("userID");

  const formData = new FormData();
  formData.append("ProfileID", profileID);
  formData.append("UserID", userID);

  // The API documentation says "ProfilePhoto" is the key
  formData.append("ProfilePhoto", file);

  const res = await fetch(`${API_BASE_URL}?api=update_profile_picture`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  // Adjust error check based on your API's success response (usually 200)
  if (!res.ok || (data.status !== 200 && data.status !== "success")) {
    throw new Error(data.message || "Failed to upload photo");
  }

  return data;
};
export const sendConnectionRequest = async (receiverID) => {
  const requesterID = localStorage.getItem("profileID"); // Assuming "Me"
  if (!requesterID) throw new Error("You are not logged in.");

  const url = `${API_BASE_URL}?api=send_request`;
  const payload = {
    RequesterID: requesterID,
    ReceiverID: receiverID,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send request");
  return data;
};

// 2. Manage Request (Accept/Reject)
export const manageConnectionRequest = async (requestID, action) => {
  // Action must be "Accept" or "Reject"
  const receiverID = localStorage.getItem("profileID"); // Me reacting to incoming

  const url = `${API_BASE_URL}?api=manage_request`;
  const payload = {
    RequestID: requestID,
    ReceiverID: receiverID,
    Action: action,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update request");
  return data;
};

// 3. Get My Requests (Incoming & Outgoing)

export const fetchMyRequests = async () => {
  const viewerID = localStorage.getItem("profileID"); // viewerID = logged-in user

  if (!viewerID) throw new Error("No profile ID found");

  const url = `${API_BASE_URL}?api=my_request&ViewerID=${viewerID}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to fetch requests");

  return data.data; // returns { incoming_requests: [], outgoing_requests: [] }
};
export const logoutUser = async () => {
  const profileID = localStorage.getItem("profileID");
  const token = localStorage.getItem("login_token");

  if (!profileID) throw new Error("No profile ID found");
  if (!token) throw new Error("Login token missing");

  const url = `${API_BASE_URL}?api=user_logout`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      profile_id: profileID,
      login_token: token,
    }),
  });

  const data = await res.json();

  if (!res.ok || data.status !== 200) {
    throw new Error(data.message || "Logout failed");
  }

  // Clear all session info
  localStorage.removeItem("profileID");
  localStorage.removeItem("userID");
  localStorage.removeItem("profileName");
  localStorage.removeItem("login_token");

  return data;
};

