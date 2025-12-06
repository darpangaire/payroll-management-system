import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";


export const useCreateSalarySlip = ()=> {
  return useMutation({
    mutationFn: async(payload: any) => {
      const res = await axiosInstance.post("/salarySlip/api/", payload);
      return res
    },
  })
}

