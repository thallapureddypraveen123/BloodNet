import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function AdminPanel() {
  const [tab, setTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [summary, setSummary] = useState(null);

  // ✅ Load Requests / Donors
  const loadData = async () => {
    try {
      if (tab === "requests") {
        const res = await api.get("/requests");
        setRequests(res.data);
      } else {
        const res = await api.get("/donors");
        setDonors(res.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to load data");
    }
  };

  // ✅ Load Dashboard Summary
  const loadSummary = async () => {
    try {
      const res = await api.get("/requests/summary");
      setSummary(res.data);
    } catch (err) {
      console.error("Summary load failed:", err);
    }
  };

  useEffect(() => {
    loadData();
    loadSummary();
  }, [tab]);

  // ✅ Handle edit change
  const handleEditChange = (e, id, field) => {
    const value = e.target.value;
    if (tab === "requests") {
      setRequests((reqs) =>
        reqs.map((r) => (r.id === id ? { ...r, [field]: value } : r))
      );
    } else {
      setDonors((dons) =>
        dons.map((d) => (d.id === id ? { ...d, [field]: value } : d))
      );
    }
  };

  // ✅ Save edits
  const handleSave = async (id) => {
    try {
      if (tab === "requests") {
        const updated = requests.find((r) => r.id === id);
        await api.put(`/requests/${id}`, updated);
        toast.success("✅ Request updated successfully!");
      } else {
        const updated = donors.find((d) => d.id === id);
        await api.put(`/donors/${id}?email=admin@example.com`, updated);
        toast.success("✅ Donor updated successfully!");
      }
      setEditRow(null);
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed");
    }
  };

  // ✅ Delete record
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      if (tab === "requests") {
        await api.delete(`/requests/${id}`);
        setRequests(requests.filter((r) => r.id !== id));
      } else {
        await api.delete(`/donors/${id}`);
        setDonors(donors.filter((d) => d.id !== id));
      }
      toast.success("✅ Deleted successfully");
      loadSummary();
    } catch (err) {
      console.error(err);
      toast.error("❌ Delete failed");
    }
  };

  // ✅ Open donor modal
  const openDonorModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  // ✅ Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  const rows = tab === "requests" ? requests : donors;

  return (
    <div className="p-6">
      {/* 🧭 Navigation Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setTab("requests")}
          className={`px-4 py-2 rounded ${
            tab === "requests" ? "bg-red-600 text-white" : "bg-gray-200"
          }`}
        >
          Manage Requests
        </button>
        <button
          onClick={() => setTab("donors")}
          className={`px-4 py-2 rounded ${
            tab === "donors" ? "bg-red-600 text-white" : "bg-gray-200"
          }`}
        >
          Manage Donors
        </button>
      </div>

      {/* 🧾 Summary Dashboard */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
            <p className="text-sm text-gray-600">Total Donors</p>
            <h3 className="text-2xl font-bold text-red-700">
              {summary.totalDonors}
            </h3>
          </div>

          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-600">Total Requests</p>
            <h3 className="text-2xl font-bold text-blue-700">
              {summary.totalRequests}
            </h3>
          </div>

          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-sm text-gray-600">Urgent Requests</p>
            <h3 className="text-2xl font-bold text-yellow-700">
              {summary.urgentOpen}
            </h3>
          </div>

          <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm text-gray-600">Accepted Donations</p>
            <h3 className="text-2xl font-bold text-green-700">
              {summary.acceptedTotal}
            </h3>
          </div>
        </div>
      )}

      {/* 📋 Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              {tab === "requests" ? (
                <>
                  <th className="border p-2">Patient</th>
                  <th className="border p-2">Blood Group</th>
                  <th className="border p-2">City</th>
                  <th className="border p-2">Hospital</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Urgent</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Accepted Donors</th>
                </>
              ) : (
                <>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Blood Group</th>
                  <th className="border p-2">City</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Age</th>
                </>
              )}
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                <td className="border p-2 text-center">{row.id}</td>

                {/* Dynamic Fields */}
                {tab === "requests"
                  ? [
                      ["patientName"],
                      ["bloodGroup"],
                      ["city"],
                      ["hospital"],
                      ["contactPhone"],
                      ["contactEmail"],
                      ["urgent"],
                      ["status"],
                    ].map(([field]) => (
                      <td key={field} className="border p-1">
                        {editRow === row.id ? (
                          <input
                            className="border p-1 w-full"
                            value={row[field] || ""}
                            onChange={(e) => handleEditChange(e, row.id, field)}
                          />
                        ) : field === "urgent" ? (
                          row.urgent ? "✅ Yes" : "❌ No"
                        ) : (
                          row[field]
                        )}
                      </td>
                    ))
                  : [
                      ["name"],
                      ["bloodGroup"],
                      ["city"],
                      ["contactNumber"],
                      ["email"],
                      ["age"],
                    ].map(([field]) => (
                      <td key={field} className="border p-1">
                        {editRow === row.id ? (
                          <input
                            className="border p-1 w-full"
                            value={row[field] || ""}
                            onChange={(e) => handleEditChange(e, row.id, field)}
                          />
                        ) : (
                          row[field]
                        )}
                      </td>
                    ))}

                {/* Accepted Donors Count */}
                {tab === "requests" && (
                  <td
                    className="border p-2 text-center text-blue-600 font-semibold cursor-pointer hover:underline"
                    onClick={() => openDonorModal(row)}
                  >
                    {row.acceptedDonors?.length || 0}
                  </td>
                )}

                {/* Actions */}
                <td className="border p-2 text-center">
                  {editRow === row.id ? (
                    <button
                      onClick={() => handleSave(row.id)}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditRow(row.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🧩 Accepted Donors Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-2xl font-semibold text-center mb-4 text-red-600">
              Accepted Donors for Request #{selectedRequest.id}
            </h3>

            {selectedRequest.acceptedDonors?.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {selectedRequest.acceptedDonors.map((email, idx) => (
                  <li key={idx} className="p-2 text-gray-700">
                    📧 {email}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No donors accepted yet.
              </p>
            )}

            <button
              onClick={closeModal}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
