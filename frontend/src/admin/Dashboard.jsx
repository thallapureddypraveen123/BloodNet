// src/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const COLORS = ["#ef4444", "#facc15", "#22c55e", "#3b82f6"];

  // 🔄 Fetch summary stats from backend
  useEffect(() => {
    api
      .get("/requests/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => {
        console.error("Error loading summary:", err);
        toast.error("❌ Failed to load dashboard data.");
        setSummary({
          totalDonors: 0,
          totalRequests: 0,
          urgentOpen: 0,
          acceptedTotal: 0,
        });
      });
  }, []);

  if (!summary)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        Loading dashboard...
      </p>
    );

  // 📊 Bar chart data
  const barData = [
    { name: "Total Donors", value: summary.totalDonors },
    { name: "Total Requests", value: summary.totalRequests },
    { name: "Urgent Requests", value: summary.urgentOpen },
    { name: "Accepted Donations", value: summary.acceptedTotal },
  ];

  // 🩸 Pie chart data (Urgent vs Normal)
  const pieData = [
    { name: "Urgent", value: summary.urgentOpen },
    {
      name: "Normal",
      value: summary.totalRequests - summary.urgentOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-8">
        🩸 BloodNet Admin Dashboard
      </h1>

      {/* 📦 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-green-100 border-l-4 border-green-600 p-5 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Donors</p>
          <h3 className="text-3xl font-bold text-green-700">
            {summary.totalDonors}
          </h3>
        </div>

        <div className="bg-blue-100 border-l-4 border-blue-600 p-5 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Requests</p>
          <h3 className="text-3xl font-bold text-blue-700">
            {summary.totalRequests}
          </h3>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-5 rounded-lg shadow">
          <p className="text-sm text-gray-600">Urgent Requests</p>
          <h3 className="text-3xl font-bold text-yellow-700">
            {summary.urgentOpen}
          </h3>
        </div>

        <div className="bg-red-100 border-l-4 border-red-600 p-5 rounded-lg shadow">
          <p className="text-sm text-gray-600">Accepted Donations</p>
          <h3 className="text-3xl font-bold text-red-700">
            {summary.acceptedTotal}
          </h3>
        </div>
      </div>

      {/* 📈 Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            📊 Overall System Statistics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ef4444" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            🩸 Urgent vs Normal Requests
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🕒 Footer */}
      <div className="text-center mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} BloodNet Analytics Dashboard
      </div>
    </div>
  );
}
