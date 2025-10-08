import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-red-600">
        🩸 BloodNet
      </Link>

      <div className="space-x-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-red-600">Dashboard</Link>
        <Link to="/donors" className="hover:text-red-600">Donors</Link>
        <Link to="/requests" className="hover:text-red-600">Requests</Link>
        <Link to="/register-donor" className="hover:text-red-600">Become a Donor</Link>
        <Link to="/new-request" className="hover:text-red-600">Request Blood</Link>

        {isAdmin ? (
          <>
            <Link to="/admin-panel" className="hover:text-red-600">Admin Panel</Link>
            <button onClick={handleLogout} className="hover:text-red-600">Logout</button>
          </>
        ) : (
          <Link to="/admin-login" className="hover:text-red-600">Admin</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
