import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function RequestForm() {
  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    city: "",
    contactPhone: "",
    contactEmail: "",
    urgent: false,
    neededBy: "",
  });

  const [donorCount, setDonorCount] = useState(null);
  const [showLink, setShowLink] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/requests", form);
      setShowLink(true);
      const count = res.data?.donorCount || 0;
      setDonorCount(count);

      toast.success("✅ Blood request submitted successfully!", {
        theme: "colored",
      });

      if (count > 0) {
        toast.info(
          `📧 Email notifications sent to ${count} donor${
            count > 1 ? "s" : ""
          }!`,
          { theme: "colored" }
        );
      }

      // reset form
      setForm({
        patientName: "",
        bloodGroup: "",
        hospital: "",
        city: "",
        contactPhone: "",
        contactEmail: "",
        urgent: false,
        neededBy: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to submit request. Please try again.", {
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          🚨 Blood Request Form
        </h2>

        <form onSubmit={handleSubmit}>
          {["patientName", "hospital", "city", "contactPhone", "contactEmail"].map(
            (field) => (
              <input
                key={field}
                type={field.includes("Email") ? "email" : "text"}
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full mb-3 p-2 border rounded"
              />
            )
          )}

          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            required
            className="w-full mb-3 p-2 border rounded"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          <label className="flex items-center mb-3 text-gray-700">
            <input
              type="checkbox"
              name="urgent"
              checked={form.urgent}
              onChange={handleChange}
              className="mr-2"
            />
            Mark as Urgent
          </label>

          {!form.urgent && (
            <input
              type="date"
              name="neededBy"
              value={form.neededBy}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Submit Request
          </button>
        </form>

        {showLink && (
          <div className="text-center mt-6">
            <Link
              to={`/donors?city=${encodeURIComponent(
                form.city
              )}&bloodGroup=${encodeURIComponent(form.bloodGroup)}`}
              className="text-blue-600 hover:underline font-semibold"
            >
              View matching donors in {form.city} ({form.bloodGroup})
            </Link>

            {/* ✅ Only show positive donor notifications */}
            {donorCount !== null && donorCount > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                ✅ {donorCount} donor
                {donorCount > 1 ? "s" : ""} notified by email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
