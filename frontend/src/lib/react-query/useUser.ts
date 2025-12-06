import { useQuery } from "@tanstack/react-query";
import { getUserFromToken } from "./authUtils";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserFromToken(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
