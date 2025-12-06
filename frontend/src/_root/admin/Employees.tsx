import { useEmployee } from "@/lib/react-query/useEmployee";
import { Link } from "react-router-dom";

const EmployeesPage = () => {
  const { data, isLoading } = useEmployee();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-6">Employees</h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-left">Base Salary</th>
              <th className="p-3 text-left">Bonus</th>
              <th className="p-3 text-left">Deductions</th>
              <th className="p-3 text-left">Created_at</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((emp: any, index: number) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{emp.employee_name}</td>
                <td className="p-3">{emp.employee_email_read}</td>
                <td className="p-3">{emp.month}</td>
                <td className="p-3">{emp.base_salary}</td>
                <td className="p-3">{emp.bonus}</td>
                <td className="p-3">{emp.deductions}</td>
                <td className="p-3">{emp.created_at}</td>

                <td className="p-3 flex gap-2">
                  

                  <Link
                    to={`/admin/salary-slips/${emp.employee}/edit`}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data?.map((emp: any, index: number) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 rounded-lg border"
          >
            <p className="font-semibold text-lg">{emp.employee_name}</p>
            <p className="text-gray-600">{emp.employee_email_read}</p>

            <div className="mt-3 text-sm space-y-1">
              <p><span className="font-semibold">Month:</span> {emp.month}</p>
              <p><span className="font-semibold">Base Salary:</span> {emp.base_salary}</p>
              <p><span className="font-semibold">Bonus:</span> {emp.bonus}</p>
              <p><span className="font-semibold">Deductions:</span> {emp.deductions}</p>
              <p><span className="font-semibold">Created:</span> {emp.created_at}</p>
            </div>

            <div className="flex gap-2 mt-4">
              

              <Link
                to={`/admin/salary-slips/${emp.employee}/edit`}
                className="flex-1 text-center py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
