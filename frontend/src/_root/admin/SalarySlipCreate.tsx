import { useState } from "react";
import { useCreateSalarySlip } from "@/lib/react-query/useCreateSalarySlip";

const SalarySlipCreate = () => {
  const [form, setForm] = useState({
    employee_email: "",
    month: "",
    base_salary: "",
    bonus: "",
    deductions: "",
  });

  const [message, setMessage] = useState<null | { type: string; text: string }>(
    null
  );

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

  return (
    <div className="min-h-screen w-full bg-gray-100  p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 md:p-10">

        {/* Header */}
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Create Salary Slip
        </h2>

        {/* Message */}
        {message && (
          <div
            className={`p-4 mb-6 rounded-lg text-center font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Employee Email
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="employee@example.com"
              value={form.employee_email}
              onChange={(e) => setForm({ ...form, employee_email: e.target.value })}
            />
          </div>

          {/* MONTH */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Month (YYYY-MM)
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="2025-05"
              value={form.month}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
            />
          </div>

          {/* BASE SALARY */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Base Salary
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            <label className="block mb-1 font-medium text-gray-700">Bonus</label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="1500"
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
            <label className="block mb-1 font-medium text-gray-700">
              Deductions
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

          {/* SUBMIT BUTTON */}
          <button
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white p-3 rounded-lg mt-4 text-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-60"
          >
            {mutation.isPending ? "Creating..." : "Create Slip"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SalarySlipCreate;
