// AdminRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/lib/react-query/useUser";

const AdminRoute = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/sign-in" replace />;

  if (user.role !== "admin") return <Navigate to="/employee" replace />;

  return <Outlet />;
};

export default AdminRoute;
