import axiosInstance from './axiosInstance'

export const getUser = async () => 
  axiosInstance.get<User>('/users/me');
