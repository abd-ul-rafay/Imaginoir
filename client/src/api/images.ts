import axiosInstance from './axiosInstance'

export const getAllImages = async () =>
  axiosInstance.get<Image[]>('/images');

export const generateImage = (prompt: string) =>
  axiosInstance.post<GenerateImageResponse>('/images', { prompt });

export const getMyImages = async () => 
  axiosInstance.get<Image[]>('/images/mine');

export const updateImage = (imageId: string) =>
  axiosInstance.patch(`/images/${imageId}`, { isPublic: true });

export const deleteImage = (imageId: string) =>
  axiosInstance.delete(`/images/${imageId}`);
