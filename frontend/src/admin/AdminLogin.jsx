import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      console.log("🔐 Sending login request:", formData);
      const res = await api.post("/admin/login", formData);

      console.log("✅ Response:", res.data);

      if (res.status === 200 && res.data.includes("Welcome")) {
        setMessage("✅ Login successful! Redirecting...");
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminEmail", formData.email);
        setTimeout(() => navigate("/admin-panel"), 1000);
    } else {
        setMessage("❌ Invalid credentials. Please check your email or password.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      if (err.response?.status === 404) {
        setMessage("❌ No user found with that email.");
      } else if (err.response?.status === 403) {
        setMessage("❌ Incorrect password or not an admin.");
      } else {
        setMessage("⚠️ Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border-t-4 border-red-600">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          🩸 Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Enter admin email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("✅")
                ? "text-green-600"
                : message.includes("⚠️")
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
