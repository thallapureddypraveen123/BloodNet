import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

export default function DonorRegistration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    bloodGroup: "",
    city: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Validate before submission
  const validateForm = () => {
    if (!form.name || !form.email || !form.contactNumber || !form.city || !form.bloodGroup) {
      toast.warn("⚠️ Please fill out all required fields.", { theme: "colored" });
      return false;
    }

    if (!/^\d{10}$/.test(form.contactNumber)) {
      toast.error("📞 Contact number must be exactly 10 digits.", { theme: "colored" });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("📧 Please enter a valid email address.", { theme: "colored" });
      return false;
    }

    if (form.age && (form.age < 18 || form.age > 65)) {
      toast.error("🎯 Age must be between 18 and 65.", { theme: "colored" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await api.post("/donors", form);
      toast.success(`✅ Donor ${res.data.name} registered successfully!`, { theme: "colored" });
      setForm({
        name: "",
        email: "",
        contactNumber: "",
        bloodGroup: "",
        city: "",
        age: "",
      });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        toast.error("⚠️ Email already exists! Try another.", { theme: "colored" });
      } else {
        toast.error("❌ Failed to register donor. Please try again later.", { theme: "colored" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          🩸 Register as a Blood Donor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number (10 digits)"
            value={form.contactNumber}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Age (optional)"
            value={form.age}
            onChange={handleChange}
            min="18"
            max="65"
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition ${
              loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Registering..." : "Register Donor"}
          </button>
        </form>

        <div className="text-center mt-6">
          <a
            href="/donors"
            className="text-blue-600 hover:underline font-semibold"
          >
            View All Donors
          </a>
        </div>
      </div>
    </div>
  );
}
