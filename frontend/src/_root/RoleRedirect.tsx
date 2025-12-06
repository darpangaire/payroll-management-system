import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/react-query/useUser";

const RoleRedirect = () => {
  const { data: user, isLoading } = useUser();
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (isLoading || hasNavigated.current) return;

    if (!user) {
      navigate("/sign-in", { replace: true });
    } else if (user.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/employee", { replace: true });
    }

    hasNavigated.current = true; // prevent future navigations
  }, [user, isLoading, navigate]);

  return <div>Loading...</div>;
};

export default RoleRedirect;
