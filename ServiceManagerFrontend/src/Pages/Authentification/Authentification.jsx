import { jwtDecode , InvalidTokenError } from "jwt-decode";

export const VerifierExpiredToken = (token) => {

  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now();
    return decoded.exp * 1000 < now;
  } catch (error) {
    return true;
  }
};

export const UserIdAndRole = (token) => {

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      user_Id: decoded.user_id,
      role: decoded.role,
    };
  } catch (error) {
    return null;
  }
};

export const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJyb2xlIjoidXNlciIsImlhdCI6MTc0NzA5OTcyOSwiZXhwIjoxNzQ3NzA0NTI5fQ.kDcNEY8GmUW10ZdR8M_1-vRgsPI9rKTp_Tm9GFRcQH0`;

