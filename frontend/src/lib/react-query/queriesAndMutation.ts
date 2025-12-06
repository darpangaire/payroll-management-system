// queriesAndMutation.ts
import axiosInstance from "./axiosInstance";

export type RegisterInput = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export const registerUser = async (data: RegisterInput) => {
  const response = await axiosInstance.post("/account/api/register/", data);
  return response.data;
};

export type LoginInput = {
  email: string;
  password: string;
};

export const loginUser = async (data: LoginInput) => {
  const response = await axiosInstance.post("/account/api/token/", data);
  return response.data; // contains access + refresh + role also
};



