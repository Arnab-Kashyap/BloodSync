import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="font-bold text-xl">
        <span className="text-red-600">Blood</span>Sync
      </Link><Link to="/requests" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
  Requests
      </Link>
       <Link to="/emergency" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
        Post Emergency
       </Link>
      <div className="flex items-center gap-3">
        <Link to="/search" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          Find Donors
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              Dashboard
            </Link>
            <button onClick={handleLogout}
              className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-lg transition-colors">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login"
            className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-lg transition-colors">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}