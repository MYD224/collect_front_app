import clientApi from "@/shared/api/axios";
import { ISignup } from "../types/types";

export const registerUser = async (data: ISignup) => {
  const response =  await clientApi.post('/register', data);
  return response.data;
}

