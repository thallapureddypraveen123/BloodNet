import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export default function Donors() {
  const [searchParams] = useSearchParams();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    bloodGroup: searchParams.get("bloodGroup") || "",
  });

  // ✅ Fetch donors from backend
  const fetchDonors = async () => {
    setLoading(true);
    try {
      const res = await api.get("/donors", {
        params: {
          city: filters.city?.trim() || null,
          bloodGroup: filters.bloodGroup?.trim() || null,
        },
      });
      setDonors(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching donors:", err);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Debounce user typing
  useEffect(() => {
    const delay = setTimeout(fetchDonors, 400);
    return () => clearTimeout(delay);
  }, [filters.city, filters.bloodGroup]);

  // ✅ Filter change handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Manual search button
  const handleSearch = (e) => {
    e.preventDefault();
    fetchDonors();
  };

  // ✅ Send email
  const handleSendEmail = async (donor) => {
    const subject = prompt(`Subject for ${donor.name}:`);
    if (!subject) return;
    const message = prompt("Enter message:");
    if (!message) return;

    try {
      const res = await api.post(`/donors/${donor.id}/notify`, null, {
        params: { subject, message },
      });
      toast.success(res.data || "✅ Email sent successfully!", { theme: "colored" });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to send email.", { theme: "colored" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-4">
        ❤️ Available Donors
      </h2>

      {/* ➕ Register link */}
      <div className="text-center mb-6">
        <a
          href="/register-donor"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          ➕ Register as a Donor
        </a>
      </div>

      {/* 🔍 Filter */}
      <form
        onSubmit={handleSearch}
        className="flex flex-wrap justify-center gap-4 mb-8 bg-white shadow p-4 rounded-xl"
      >
        <input
          type="text"
          name="city"
          placeholder="Search by city"
          value={filters.city}
          onChange={handleFilterChange}
          className="border p-2 rounded w-48"
        />
        <select
          name="bloodGroup"
          value={filters.bloodGroup}
          onChange={handleFilterChange}
          className="border p-2 rounded w-40"
        >
          <option value="">All Groups</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
            <option key={bg}>{bg}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Search
        </button>
      </form>

      {/* 🩸 Results */}
      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading donors...</p>
      ) : (
        donors.length > 0 && (
          <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Blood Group</th>
                  <th className="p-2 border">City</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((d, i) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition">
                    <td className="border p-2 text-center">{i + 1}</td>
                    <td className="border p-2 font-medium">{d.name}</td>
                    <td className="border p-2 text-center text-red-600 font-bold">
                      {d.bloodGroup}
                    </td>
                    <td className="border p-2 text-center">{d.city}</td>
                    <td className="border p-2 text-center">{d.contactNumber}</td>
                    <td className="border p-2 text-blue-600 text-center">
                      {d.email}
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleSendEmail(d)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Send Email
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
