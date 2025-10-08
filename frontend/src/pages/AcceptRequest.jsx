import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export default function AcceptRequest() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("processing");

  const requestId = searchParams.get("requestId");
  const donorEmail = searchParams.get("donorEmail");

  useEffect(() => {
    const confirmAcceptance = async () => {
      if (!requestId || !donorEmail) {
        setStatus("invalid");
        return;
      }

      try {
        const res = await api.post(`/requests/${requestId}/accept`, null, {
          params: { donorEmail },
        });
        toast.success(res.data || "✅ Acceptance recorded successfully!", { theme: "colored" });
        setStatus("success");
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to confirm acceptance.", { theme: "colored" });
        setStatus("error");
      }
    };

    confirmAcceptance();
  }, [requestId, donorEmail]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
        {status === "processing" && (
          <>
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Verifying your confirmation...
            </h2>
            <p className="text-gray-500">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              ❤️ Thank You for Donating!
            </h2>
            <p className="text-gray-600 mb-4">
              Your willingness to help has been recorded successfully.
            </p>
            <a
              href="/"
              className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
            >
              Back to Home
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              ❌ Error Occurred
            </h2>
            <p className="text-gray-500">
              We couldn’t process your confirmation. Please try again later.
            </p>
          </>
        )}

        {status === "invalid" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              ⚠️ Invalid Link
            </h2>
            <p className="text-gray-500">
              This confirmation link appears to be invalid or expired.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
