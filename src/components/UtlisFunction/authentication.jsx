import { jwtDecode } from "jwt-decode";

export const userInfo = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token or token verification failed", error);
    logOut();
    return null;
  }
};

export const logOut = () => {
  localStorage.removeItem("token");
};
