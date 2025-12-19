import clientApi from "@/shared/api/axios";
import { ISignup, ILogin } from "../types/types";

export const registerUser = async (data: ISignup) => {
  const response = await clientApi.post("/register", data);
  return response.data;
};

export const login = async (data: ILogin) => {
  console.log(data);
  // return;
  const response = await clientApi.post("/login", data);
  return response.data;
};

export const verifyPhone = async (data: { otp_code: string }) => {
  const response = await clientApi.post("/verify-phone", data);
  return response.data;
};
