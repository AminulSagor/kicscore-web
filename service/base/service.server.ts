import axios from "axios";
import { cookies } from "next/headers";

const serviceServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

serviceServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("accessToken")?.value ||
    cookieStore.get("token")?.value ||
    cookieStore.get("authToken")?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default serviceServer;
