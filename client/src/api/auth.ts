import axiosInstance from "./axiosInstance";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export const login = async (formData: LoginFormData) =>
  await axiosInstance.post<UserResponse>('/auth/login', formData);

export const register = async (formData: RegisterFormData) =>
  await axiosInstance.post<UserResponse>('/auth/register', formData);

export const googleSignin = async (idToken: string) =>
  await axiosInstance.post<UserResponse>('/auth/google', { idToken });
