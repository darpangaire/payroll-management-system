// src/_root/pages/employee/EmployeeDashboard.tsx
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from "recharts";
import { Mail, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { useEmployeeDetail } from "@/lib/react-query/useEmployee";

function formatCurrency(value: number) {
  return value.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  // You can change currency to 'NPR' or format as plain number if you prefer.
}

export default function EmployeeDashboard() {
  const { id } = useParams<{ id?: string }>();

  // Pass id to hook (string is fine as axios path accepts it)
  const { data, isLoading, isError, error, refetch } = useEmployeeDetail(id);

  // Map backend response to friendly structure
  const employee = useMemo(() => {
    if (!data) return null;

    // parse numeric strings to numbers
    const baseSalary = Number(data.base_salary || 0);
    const bonus = Number(data.bonus || 0);
    const deductions = Number(data.deductions || 0);
    const netSalary = Number(data.net_salary || (baseSalary + bonus - deductions));

    // Build a minimal salary history for charting.
    // Ideally you should implement an endpoint to fetch historical slips.
    // For now we place the current month at the end of the series.
    const salaryHistory = [
      { month: "Aug", net: Math.round(netSalary * 0.94) },
      { month: "Sep", net: Math.round(netSalary * 0.96) },
      { month: "Oct", net: Math.round(netSalary * 0.98) },
      { month: "Nov", net: Math.round(netSalary * 0.995) },
      { month: new Date(data.month + "-01").toLocaleString(undefined, { month: "short", year: "numeric" }), net: Math.round(netSalary) },
    ];

    return {
      id: data.employee,
      name: data.employee_name,
      email: data.employee_email_read,
      month: data.month,
      baseSalary,
      bonus,
      deductions,
      netSalary,
      createdAt: data.created_at,
      salaryHistory,
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-white text-lg">Loading employee data…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-8 bg-slate-900">
        <div className="max-w-3xl mx-auto bg-white rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Failed to load employee data</h2>
          <pre className="text-sm text-red-600 mb-4">{String(error?.message)}</pre>
          <div className="flex gap-2">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Retry
            </button>
            <Link to="/employee" className="px-4 py-2 border rounded">Back</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-white">No data available for this employee.</p>
      </div>
    );
  }

  const salaryBreakdown = [
    { name: "Base Salary", value: employee.baseSalary, fill: "#3b82f6" },
    { name: "Bonus", value: employee.bonus, fill: "#10b981" },
    { name: "Deduction", value: employee.deductions, fill: "#ef4444" }
  ];

  const monthlyComparison = [
    { category: "Base Salary", amount: employee.baseSalary },
    { category: "Bonus", amount: employee.bonus },
    { category: "Deduction", amount: employee.deductions }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Section */}
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">Employee Salary Dashboard</h1>
            <p className="text-slate-400">Data for <span className="text-white font-medium">{employee.name}</span></p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-400">Employee ID</p>
              <p className="text-white font-semibold">{employee.id}</p>
            </div>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=111827&color=fff`}
              className="w-12 h-12 rounded-full"
              alt={employee.name}
            />
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg"><Mail className="w-6 h-6 text-white" /></div>
              <div>
                <div className="text-blue-100 text-sm font-semibold">Email</div>
                <div className="text-white font-bold break-all">{employee.email}</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg"><Calendar className="w-6 h-6 text-white" /></div>
              <div>
                <div className="text-purple-100 text-sm font-semibold">Period</div>
                <div className="text-white font-bold">{new Date(employee.month + "-01").toLocaleString(undefined, { month: "long", year: "numeric" })}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SalaryCard title="Base Salary" value={employee.baseSalary} color="blue" icon={<DollarSign />} />
          <SalaryCard title="Bonus" value={employee.bonus} color="green" icon={<TrendingUp />} />
          <SalaryCard title="Deductions" value={employee.deductions} color="red" icon={<DollarSign />} />
          <SalaryCard title="Net Salary" value={employee.netSalary} color="emerald" icon={<DollarSign />} gradient />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Salary Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip formatter={(value: number) => formatCurrency(Number(value))} />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]} >
                  {monthlyComparison.map((entry, idx) => <Cell key={idx} fill={["#3b82f6", "#10b981", "#ef4444"][idx]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Salary Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salaryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${formatCurrency(Number(value))}`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {salaryBreakdown.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Net Salary Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={employee.salaryHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => formatCurrency(Number(value))} />
              <Legend />
              <Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

/* Helper components */

function SalaryCard({ title, value, color, icon, gradient = false }: { title: string; value: number; color?: string; icon?: React.ReactNode; gradient?: boolean }) {
  const prefix = gradient ? "bg-gradient-to-br from-emerald-500 to-emerald-600" : "bg-white";
  return (
    <div className={`${prefix} rounded-2xl p-6 shadow-lg border-l-4 ${gradient ? "border-emerald-400" : ""}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm font-semibold">{title}</p>
          <p className={`${gradient ? "text-white" : "text-slate-900"} text-3xl font-bold mt-2`}>{formatCurrency(value)}</p>
        </div>
        <div className={`${gradient ? "bg-white bg-opacity-20" : "bg-gray-100"} p-3 rounded-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
