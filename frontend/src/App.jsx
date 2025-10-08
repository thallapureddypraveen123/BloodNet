import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


// 🏠 Public Pages
import Home from "./pages/Home";
import Donors from "./pages/Donors";
import Requests from "./pages/Requests";
import RequestDetails from "./pages/RequestDetails";
import RequestForm from "./pages/RequestForm";
import DonorRegistration from "./pages/DonorRegistration";
import AcceptRequest from "./pages/AcceptRequest";



// 🔐 Admin Pages
import AdminLogin from "./admin/AdminLogin";
import AdminPanel from "./admin/AdminPanel";
import Dashboard from "./admin/Dashboard";

// 🔒 Auth Component
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/* 🌐 Navbar */}
        <Navbar />

        {/* 🧩 Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* 🩸 Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/request/:id" element={<RequestDetails />} />
            <Route path="/new-request" element={<RequestForm />} />
            <Route path="/register-donor" element={<DonorRegistration />} />
            

            {/* 🧑‍💼 Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin-panel"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/accept" element={<AcceptRequest />} />

            {/* 🚫 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <h2 className="text-4xl font-bold text-red-600 mb-3">
                    404 — Page Not Found
                  </h2>
                  <p className="text-gray-500 mb-6">
                    The page you’re looking for doesn’t exist or was moved.
                  </p>
                  <a
                    href="/"
                    className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
                  >
                    Go Back Home
                  </a>
                </div>
              }
            />
          </Routes>
        </main>

        {/* ⚙️ Footer */}
        <Footer />
        {/* 🔔 Toast container globally available */}
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </BrowserRouter>
  );
}

export default App;
