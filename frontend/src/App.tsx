import AuthLayout from './_auth/AuthLayout';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminLayout from './_root/admin/AdminLayout';
import EmployeesPage from './_root/admin/Employees';
import SalarySlipCreate from './_root/admin/SalarySlipCreate';
import AdminRoute from './_root/admin/AdminRoute';
import SalarySlipEdit from './_root/admin/SalarySlipEdit';
import EmployeeRoute from './_root/employee/EmployeeRoute';
import EmployeeLayout from './_root/employee/EmployeeLayout';
import EmployeeDashboard from './_root/employee/EmployeeDashboard';
import RoleRedirect from './_root/RoleRedirect';

const queryClient = new QueryClient();

const NotFound = () => (
  <div className="flex items-center justify-center w-screen h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-xl text-gray-600">That page does not exist.</p>
    </div>
  </div>
);

const App = () => {
  return (
    <main className="flex h-screen">
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* Root redirect based on role */}
          <Route path="/" element={<RoleRedirect />} />
          
          {/* Public */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
          </Route>
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<EmployeesPage />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="salary-slips/create" element={<SalarySlipCreate />} />
              <Route path="salary-slips/:id/edit" element={<SalarySlipEdit />} />
            </Route>
          </Route>
          
          {/* Employee routes */}
          <Route path="/employee" element={<EmployeeRoute />}>
            <Route element={<EmployeeLayout />}>
              <Route path="dashboard/:id" element={<EmployeeDashboard />} />
            </Route>
          </Route>
          
          {/* 404 - Catch all undefined routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </main>
  );
};

export default App;