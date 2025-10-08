import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function RequestDetails() {
  const { id } = useParams();
  const [req, setReq] = useState(null);

  useEffect(() => {
    api.get(`/requests/${id}`).then((res) => setReq(res.data));
  }, [id]);

  if (!req) return <p className="text-center mt-10">Loading request...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Request Details
      </h2>
      <ul className="space-y-2 text-gray-700">
        <li><strong>Patient:</strong> {req.patientName}</li>
        <li><strong>Blood Group:</strong> {req.bloodGroup}</li>
        <li><strong>Hospital:</strong> {req.hospital}</li>
        <li><strong>City:</strong> {req.city}</li>
        <li><strong>Contact:</strong> {req.contactPhone}</li>
        <li><strong>Email:</strong> {req.contactEmail}</li>
        <li>
          <strong>Status:</strong>{" "}
          <span className={`font-semibold ${req.urgent ? "text-red-600" : "text-green-600"}`}>
            {req.urgent ? "Urgent" : "Scheduled"}
          </span>
        </li>
      </ul>
    </div>
  );
}
