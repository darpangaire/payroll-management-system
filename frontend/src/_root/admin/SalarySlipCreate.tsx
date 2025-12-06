import { useState } from "react";
import { useCreateSalarySlip } from "@/lib/react-query/useCreateSalarySlip";
import { Mail, Calendar, DollarSign, Gift, Minus, Check, AlertCircle, Loader } from "lucide-react";

const SalarySlipCreate = () => {
  const [form, setForm] = useState({
    employee_email: "",
    month: "",
    base_salary: "",
    bonus: "",
    deductions: "",
  });

  const [message, setMessage] = useState<null | { type: string; text: string }>(null);
  const mutation = useCreateSalarySlip();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessage(null);

    mutation.mutate(form, {
      onSuccess: () => {
        setMessage({
          type: "success",
          text: "Salary slip created successfully!",
        });

        setForm({
          employee_email: "",
          month: "",
          base_salary: "",
          bonus: "",
          deductions: "",
        });

        setTimeout(() => setMessage(null), 5000);
      },

      onError: (error: any) => {
        const errorText =
          error?.response?.data?.detail ||
          JSON.stringify(error?.response?.data) ||
          "Something went wrong";

        setMessage({ type: "error", text: errorText });
      },
    });
  };

  const baseAmount = parseFloat(form.base_salary) || 0;
  const bonusAmount = parseFloat(form.bonus) || 0;
  const deductionAmount = parseFloat(form.deductions) || 0;
  const netAmount = baseAmount + bonusAmount - deductionAmount;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Create Salary Slip</h1>
          <p className="text-slate-600">Fill in the employee information to generate a new salary slip</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Message Alert */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-2xl border-2 flex items-center gap-3 animate-in fade-in ${
                message.type === "success"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              )}
              <p
                className={`font-medium ${
                  message.type === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {message.text}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Email & Month */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    Employee Email
                  </div>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder-slate-400"
                  placeholder="employee@example.com"
                  value={form.employee_email}
                  onChange={(e) => setForm({ ...form, employee_email: e.target.value })}
                />
              </div>

              {/* MONTH */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    Month (YYYY-MM)
                  </div>
                </label>
                <input
                  type="month"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  placeholder="2025-05"
                  value={form.month}
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                />
              </div>
            </div>

            {/* Row 2: Salary Components */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* BASE SALARY */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Base Salary
                  </div>
                </label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all placeholder-slate-400"
                  placeholder="50000"
                  value={form.base_salary}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      base_salary: e.target.value.replace(/,/g, ""),
                    })
                  }
                />
              </div>

              {/* BONUS */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-5 h-5 text-emerald-600" />
                    Bonus
                  </div>
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all placeholder-slate-400"
                  placeholder="0"
                  value={form.bonus}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      bonus: e.target.value.replace(/,/g, ""),
                    })
                  }
                />
              </div>

              {/* DEDUCTIONS */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Minus className="w-5 h-5 text-red-600" />
                    Deductions
                  </div>
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all placeholder-slate-400"
                  placeholder="0"
                  value={form.deductions}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      deductions: e.target.value.replace(/,/g, ""),
                    })
                  }
                />
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-600 mb-1">Base</p>
                <p className="text-xl font-bold text-slate-900">${baseAmount.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-emerald-600 mb-1">+ Bonus</p>
                <p className="text-xl font-bold text-emerald-600">${bonusAmount.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-red-600 mb-1">- Deductions</p>
                <p className="text-xl font-bold text-red-600">${deductionAmount.toLocaleString()}</p>
              </div>
              <div className="text-center border-l-2 border-slate-300 pl-4">
                <p className="text-xs font-semibold text-blue-600 mb-1">Net Salary</p>
                <p className={`text-2xl font-bold ${netAmount >= 0 ? "text-blue-600" : "text-red-600"}`}>
                  ${netAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold py-4 rounded-xl mt-6 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50 disabled:shadow-none"
            >
              {mutation.isPending ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating Slip...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Create Salary Slip
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalarySlipCreate;