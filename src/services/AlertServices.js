import { toast } from "react-toastify";

/**
 * Modern success toast + redirect
 */
const showSuccessAndRedirect = (message, navigate, path) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      borderRadius: "12px",
      fontSize: "15px",
      padding: "14px 18px",
      boxShadow: "0px 4px 18px rgba(0,0,0,0.15)",
    },
    onClose: () => navigate(path),
  });
};

/**
 * Modern success toast (No Redirect)
 * ADD THIS FUNCTION
 */
const showSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      borderRadius: "12px",
      fontSize: "15px",
      padding: "14px 18px",
      boxShadow: "0px 4px 18px rgba(0,0,0,0.15)",
    },
  });
};

/**
 * Modern error toast
 */
const showError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      borderRadius: "12px",
      fontSize: "15px",
      padding: "14px 18px",
      boxShadow: "0px 4px 18px rgba(0,0,0,0.15)",
    },
  });
};

const AlertService = {
  showSuccessAndRedirect,
  showSuccess, // <--- Don't forget to export it here
  showError,
};

export default AlertService;
