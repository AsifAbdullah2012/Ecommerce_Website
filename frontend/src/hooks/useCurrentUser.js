import { jwtDecode } from "jwt-decode";

const getStoredToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export const useCurrentUser = () => {
  const token = getStoredToken();
  try {
    if (token) return jwtDecode(token);
  } catch (err) {
    console.error("Invalid token", err);
  }
  return null;
};
