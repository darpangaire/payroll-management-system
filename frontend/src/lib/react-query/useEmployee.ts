import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export const useEmployee = ()=> {
  return useQuery({
    queryKey:["employee"],
    queryFn: async ()=> {
      const res = await axiosInstance.get("/salarySlip/api/");

      return res.data;
    }
  })
  
}

import type { AxiosError } from "axios";

export type EmployeeApiResponse = {
  employee_name: string;
  employee_email_read: string;
  employee: number;
  month: string;            // e.g. "2025-06"
  base_salary: string;     // e.g. "500000.00"
  bonus: string;           // e.g. "1500.00"
  deductions: string;      // e.g. "0.00"
  created_at: string;      // ISO timestamp
  net_salary: number;      // float
};

const fetchEmployeeById = async (id: number | string) => {
  const res = await axiosInstance.get<EmployeeApiResponse>(`/salarySlip/api/${id}/`);
  return res.data;
};

export const useEmployeeDetail = (id: number | string | undefined) => {
  return useQuery<EmployeeApiResponse, AxiosError>({
    queryKey: ["employee", id],
    enabled: id !== undefined && id !== null && id !== "",
    queryFn: () => fetchEmployeeById(id as number | string),
    retry: (failureCount, error) => {
      // Do not retry on 404 (not found) — only retry on network/server errors
      if (error?.response?.status === 404) return false;
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    
  });
};


