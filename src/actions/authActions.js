import { login, register, logout } from '../services/AuthServices';

export const loginUser = (email, password) => {
  return login(email, password);
};

export const registerUser = (email, password, name) => {
  return register(email, password, name);
};

export const logoutUser = () => {
  return logout();
};