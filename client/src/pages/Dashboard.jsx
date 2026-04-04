import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-1">Welcome, {user?.name} 👋</h2>
        <p className="text-gray-500 text-sm mb-1">Email: {user?.email}</p>
        <p className="text-gray-500 text-sm mb-1">
          Blood Group: <strong className="text-red-600">{user?.bloodGroup}</strong>
        </p>
        <p className="text-gray-500 text-sm mb-1">City: {user?.city}</p>
        <p className="text-gray-500 text-sm mb-6">State: {user?.state}</p>
        <p className="text-green-600 text-sm font-medium mb-6">
          Phase 2 complete — Frontend auth is working!
        </p>
        <button onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}