// AuthActipns.js (updated)
import { login, register, logout, resetPassword } from '../services/AuthServices';

export const registerUser = (email, password, name) => {
  return register(email, password, name);
};

export const loginUser = (email, password) => {
  return login(email, password);
};

export const resetPasswordUser = async (email) => {
  return resetPassword (email);
};

export const logoutUser = () => {
  return logout();
};