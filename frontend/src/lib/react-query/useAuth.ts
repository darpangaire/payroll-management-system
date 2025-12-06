// useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser, type RegisterInput, type LoginInput } from "./queriesAndMutation";
import { logoutUser, setTokens } from "./authUtils";

// REGISTER USER HOOK
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: RegisterInput) => registerUser(data),
  });
};

// LOGIN USER HOOK
export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await loginUser(data);
      setTokens(res.access, res.refresh); // store tokens
      return res;
    },
  });
};

// LOGOUT HOOK
export const useLogoutUser = () => {
  return useMutation({
    mutationFn: async () => {
      // No backend API for logout? Fine, just resolve.
      return Promise.resolve();
    },
    onSuccess: () => {
      logoutUser(); // clear tokens
    },
  });
};
