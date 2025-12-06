import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSalarySlipDetail = (id: string | number) => {
  return useQuery({
    queryKey: ["salary-slip", id],
    queryFn: async () => {
      const res = await axios.get(`salarySlip/api/${id}/`);
      return res.data;
    },
  });
};
