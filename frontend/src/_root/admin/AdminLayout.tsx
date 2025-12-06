import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, FileText, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLogoutUser } from "@/lib/react-query/useAuth";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const logoutMutation = useLogoutUser();

  const navItems = [
    {
      to: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      to: "/admin/employees",
      label: "Employees",
      icon: Users,
    },
    {
      to: "/admin/salary-slips/create",
      label: "Create Salary Slip",
      icon: FileText,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transition-all duration-300 z-50 ${
          sidebarOpen ? "w-64" : "w-0"
        } lg:w-64 overflow-hidden`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white hidden lg:block">
                Admin
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-slate-700 p-2 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 border border-slate-700 hover:border-red-500" onClick={() => logoutMutation.mutate()}>
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-900 hover:bg-slate-100 p-2 rounded-lg transition"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900">Admin</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;