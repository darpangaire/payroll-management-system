// File: src/components/RoleRedirect.tsx
import { Navigate } from 'react-router-dom';
import { useUser } from '@/lib/react-query/useUser';

const RoleRedirect = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to sign in
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Authenticated - redirect based on role
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Default to employee dashboard
  return <Navigate to={`/employee/dashboard/${user.id}`} replace />;
};

export default RoleRedirect;