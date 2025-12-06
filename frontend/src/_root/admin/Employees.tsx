import { useEmployee } from "@/lib/react-query/useEmployee";
import { Link } from "react-router-dom";
import { Edit2, Mail, Calendar, DollarSign, Users, Loader } from "lucide-react";

const EmployeesPage = () => {
  const { data, isLoading } = useEmployee();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-700">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Employees</h1>
          <p className="text-slate-600 mt-2">Manage and view all employees salary information</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-200">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-slate-900">{data?.length || 0} Total</span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Month</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Base Salary</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Bonus</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Deductions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Created Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {data?.map((emp: any, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50/50 transition-colors duration-200 group"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{emp.employee_name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <a
                        href={`mailto:${emp.employee_email_read}`}
                        className="text-blue-600 hover:text-blue-700 text-sm break-all"
                      >
                        {emp.employee_email_read}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-700 font-medium">{emp.month}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-slate-900">
                        {parseFloat(emp.base_salary).toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                      ${parseFloat(emp.bonus).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                      ${parseFloat(emp.deductions).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {new Date(emp.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/admin/salary-slips/${emp.employee}/edit`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 font-medium text-sm group-hover:scale-105"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data?.map((emp: any, index: number) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-slate-200 p-5 transition-all duration-200"
          >
            {/* Card Header */}
            <div className="mb-4 pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">{emp.employee_name}</h3>
              <a
                href={`mailto:${emp.employee_email_read}`}
                className="flex items-center gap-2 text-blue-600 text-sm mt-1"
              >
                <Mail className="w-4 h-4" />
                {emp.employee_email_read}
              </a>
            </div>

            {/* Card Content - Grid */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-600 font-semibold mb-1">Month</p>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <p className="font-bold text-slate-900">{emp.month}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-600 font-semibold mb-1">Created</p>
                <p className="font-semibold text-slate-900 text-sm">
                  {new Date(emp.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <p className="text-xs text-green-700 font-semibold mb-1">Base Salary</p>
                <p className="font-bold text-green-700">
                  ${parseFloat(emp.base_salary).toLocaleString()}
                </p>
              </div>

              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                <p className="text-xs text-emerald-700 font-semibold mb-1">Bonus</p>
                <p className="font-bold text-emerald-700">
                  ${parseFloat(emp.bonus).toLocaleString()}
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                <p className="text-xs text-red-700 font-semibold mb-1">Deductions</p>
                <p className="font-bold text-red-700">
                  ${parseFloat(emp.deductions).toLocaleString()}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-blue-700 font-semibold mb-1">Net Salary</p>
                <p className="font-bold text-blue-700">
                  ${(parseFloat(emp.base_salary) + parseFloat(emp.bonus) - parseFloat(emp.deductions)).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Card Footer - Action */}
            <Link
              to={`/admin/salary-slips/${emp.employee}/edit`}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 font-semibold"
            >
              <Edit2 className="w-5 h-5" />
              Edit Salary Slip
            </Link>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-300">
          <Users className="w-16 h-16 text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No employees found</h3>
          <p className="text-slate-600">Start by creating salary slips for your employees</p>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;