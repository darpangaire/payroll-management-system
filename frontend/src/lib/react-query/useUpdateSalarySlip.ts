import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";


export const useUpdateSalaryslip = ()=> {
  return useMutation({
    mutationFn: async({id,payload}:any) => {
      const res = await axiosInstance.put(`/salarySlip/api/${id}/`, payload);
      return res.data
    }
  })
}

