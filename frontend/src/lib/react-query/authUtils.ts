import { jwtDecode } from "jwt-decode";

export type JWTPayload = {
  exp: number;
  user_id?: string;
  username?: string;
  email?: string;
  role?: string;
};

export const getAccessToken = () => localStorage.getItem("access");
export const getRefreshToken = () => localStorage.getItem("refresh");

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
};

export const removeTokens = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<JWTPayload>(token);

    // invalid user
    if (!decoded.user_id) return false;

    // check expiration
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const getUserFromToken = () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<JWTPayload>(token);

    return {
      id: decoded.user_id ?? null,
      username: decoded.username ?? null,
      email: decoded.email ?? null,
      role: decoded.role ?? "employee", // default if missing
    };
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  removeTokens();
  console.log("User logged out");
  window.location.href = "/sign-in";
};


