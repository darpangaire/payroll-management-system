import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/lib/react-query/axiosInstance";
import { useUpdateSalaryslip } from "@/lib/react-query/useUpdateSalarySlip";

const SalarySlipEdit = () => {
  const { id } = useParams();
  const updateMutation = useUpdateSalaryslip();

  const [form, setForm] = useState({
    employee_email: "",
    month: "",
    base_salary: "",
    bonus: "",
    deductions: "",
  });

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load existing data
  useEffect(() => {
    const fetchSlip = async () => {
      const res = await axiosInstance.get(`/salarySlip/api/${id}/`);
      const data = res.data;
      setForm({
        employee_email: data.employee_email_read,
        month: data.month,
        base_salary: data.base_salary,
        bonus: data.bonus,
        deductions: data.deductions,
      });
    };
    fetchSlip();
  }, [id]);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setMessage(null);

    updateMutation.mutate(
      { id, payload: form },
      {
        onSuccess: () => {
          setMessage({ type: "success", text: "Salary slip updated successfully!" });
        },
        onError: (error: any) => {
          const errorText =
            error?.response?.data?.detail ||
            JSON.stringify(error?.response?.data) ||
            "Something went wrong";

          setMessage({ type: "error", text: errorText });
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg mt-10 p-8 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Edit Salary Slip</h1>

      {message && (
        <div
          className={`p-3 rounded mb-5 text-center ${
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
        <Input
          label="Employee Email"
          value={form.employee_email}
          onChange={(e:any) =>
            setForm({ ...form, employee_email: e.target.value })
          }
          disabled
        />

        {/* MONTH */}
        <Input
          label="Month (YYYY-MM)"
          value={form.month}
          onChange={(e:any) => setForm({ ...form, month: e.target.value })}
        />

        {/* BASE SALARY */}
        <Input
          label="Base Salary"
          value={form.base_salary}
          onChange={(e:any) =>
            setForm({ ...form, base_salary: e.target.value.replace(/,/g, "") })
          }
        />

        {/* BONUS */}
        <Input
          label="Bonus"
          value={form.bonus}
          onChange={(e:any) =>
            setForm({ ...form, bonus: e.target.value.replace(/,/g, "") })
          }
        />

        {/* DEDUCTIONS */}
        <Input
          label="Deductions"
          value={form.deductions}
          onChange={(e:any) =>
            setForm({ ...form, deductions: e.target.value.replace(/,/g, "") })
          }
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          Update Slip
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, ...props }: { label: string; [key: string]: any }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      {...props}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default SalarySlipEdit;
