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
  const formData = new FormData();

  for (let key in profileData) {
    formData.append(key, profileData[key]);
  }

  const url = `${API_BASE_URL}?api=create_profile`;

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

// ---------------------------
// LOGIN USER (POST → FormData)
// ---------------------------
export const loginUser = async (credentials) => {
  const formData = new FormData();
  formData.append("identifier", credentials.identifier);
  formData.append("password", credentials.password);

  const url = `${API_BASE_URL}?api=user_login`;

  const res = await fetch(url, {
    method: "POST",
    body: formData,
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

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok || data.status === 401) throw new Error(data.message);

  return data.data?.[0];
};

// ---------------------------
// UPDATE PROFILE (POST → FormData)
// ---------------------------
export const updateProfile = async (profileData) => {
  const profileID = localStorage.getItem("profileID");
  const userID = localStorage.getItem("userID");

  const formData = new FormData();

  for (let key in profileData) {
    formData.append(key, profileData[key]);
  }

  formData.append("ProfileID", profileID);
  formData.append("UserID", userID);

  const url = `${API_BASE_URL}?api=update_profile`;

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
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
