export const handleTextOnlyChange = (setter) => (e) => {
  const value = e.target.value;
  // Allow everything except numbers (0–9)
  const noNumbersValue = value.replace(/[0-9]/g, "");
  setter(noNumbersValue);
};

export const validateMobileChange = (value, setPhone, setPhoneError) => {
  // 1. Filter out all non-digit characters
  const numericValue = value.replace(/[^0-9]/g, "");

  // 2. Limit to 10 characters (Indian Mobile Number length)
  const limitedValue = numericValue.slice(0, 10);

  setPhone(limitedValue);

  // 3. Simple validation check for display
  if (limitedValue.length > 0 && limitedValue.length !== 10) {
    setPhoneError("Mobile number must be exactly 10 digits.");
  } else {
    setPhoneError("");
  }
};
