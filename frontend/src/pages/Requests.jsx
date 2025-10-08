import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
  const fetch = async () => {
    const res = await api.get("/requests");
    setRequests(res.data);
    if (res.data.message) toast.info(res.data.message, { theme: "colored" });
  };
  fetch();
}, []);

  const filteredRequests =
    filter === "urgent"
      ? requests.filter((r) => r.urgent)
      : requests;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 flex justify-between items-center">
        🩸 Active Blood Requests
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-1"
        >
          <option value="all">All Requests</option>
          <option value="urgent">Urgent Only</option>
        </select>
      </h2>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Patient</th>
            <th className="border p-2">Blood Group</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Hospital</th>
            <th className="border p-2">Urgency</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((r) => (
              <tr key={r.id} className="text-center hover:bg-gray-50">
                <td className="border p-2">
                  <Link
                    to={`/request/${r.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {r.patientName}
                  </Link>
                </td>
                <td className="border p-2">{r.bloodGroup}</td>
                <td className="border p-2">{r.city}</td>
                <td className="border p-2">{r.hospital}</td>
                <td className="border p-2">
                  {r.urgent ? (
                    <span className="text-red-600 font-semibold">Urgent</span>
                  ) : (
                    <span className="text-green-600">Scheduled</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-gray-500">
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
