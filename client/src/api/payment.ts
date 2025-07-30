import axiosInstance from './axiosInstance'

export const createCheckoutSession = async (priceId: string) =>
  axiosInstance.post<string>('/payment/session', { priceId });

// get user's updated credits
export const onPaymentSuccess = async (sessionId: string) =>
  axiosInstance.post<number>('/payment/succdess', sessionId);
