import { Link } from "react-router-dom";
import bloodImg from "../assets/blood.jpg";

export default function Home() {
  return (
    <div className="bg-[#fffafa] text-gray-800">
      {/* --- Hero Section --- */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto py-16 px-6">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold text-red-600 leading-tight">
            Save Lives with <span className="text-gray-900">BloodNet</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Connect donors and those in need. Register, search, and respond — all in one trusted platform.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/donors"
              className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
            >
              View Available Donors
            </Link>
            <Link
               to="/register-donor"
               className="border border-red-500 text-red-600 px-5 py-2 rounded-lg hover:bg-red-50 transition"
            >
               Become a Donor
            </Link>

            <Link
              to="/new-request"
              className="border border-red-500 text-red-600 px-5 py-2 rounded-lg hover:bg-red-50 transition"
            >
              Request Blood
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={bloodImg}
            alt="Blood Donation"
            className="w-80 md:w-96 rounded-2xl shadow-lg border border-red-100"
          />
        </div>
      </section>

      {/* --- Info Section (3 Cards) --- */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg border-t-4 border-red-500 transition-all duration-300">
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Find Donors Fast
            </h3>
            <p className="text-gray-600">
              Search instantly by blood type and city to locate life-saving donors near you.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg border-t-4 border-blue-500 transition-all duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Track Urgent Requests
            </h3>
            <p className="text-gray-600">
              Stay updated with current blood requirements and respond in time to save lives.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg border-t-4 border-green-500 transition-all duration-300">
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Join Our Network
            </h3>
            <p className="text-gray-600">
              Become a donor today and help build a connected community that saves lives.
            </p>
          </div>
        </div>
      </section>

      {/* --- Footer CTA --- */}
      <section className="bg-red-600 text-white text-center py-10 mt-10">
        <h3 className="text-2xl font-semibold mb-3">
          Every Drop Counts ❤️
        </h3>
        <p className="text-red-100 mb-5">
          Join BloodNet and make an impact today — register, request, or respond in minutes.
        </p>
        <Link
          to="/register-donor"
          className="bg-white text-red-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-red-50 transition"
        >
          Become a Donor
        </Link>
      </section>
    </div>
  );
}
