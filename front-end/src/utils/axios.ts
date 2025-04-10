import type { AxiosRequestConfig } from "axios";

import axios from "axios";

import { CONFIG } from "../config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: "auth/me",
    login: "auth/login",
  },
  property: {
    list: "properties",
    details: (id: string) => `properties/${id}`,
  },
  review: {
    create: (id: string) => `properties/${id}/reviews`,
    pending: (id: string) => `properties/${id}/reviews/for/approval`,
    approve: (id: string, reviewId: string) => `properties/${id}/reviews/${reviewId}/status`,
  }
};
