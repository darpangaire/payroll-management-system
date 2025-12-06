
import { NavLink, Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Employee Panel</h1>

        <nav className="flex flex-col gap-3">
          <NavLink
            to="/employee/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/employee/eexpenses"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`
            }
          >
            Expenses
          </NavLink>

          <NavLink
            to="/employee/create-expenses"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`
            }
          >
            Create Expenses
          </NavLink>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
