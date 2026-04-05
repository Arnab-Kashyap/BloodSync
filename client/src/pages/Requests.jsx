import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RequestCard from '../components/RequestCard';
import api from '../api/axios';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bloodGroup, setBloodGroup] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = bloodGroup ? `?bloodGroup=${bloodGroup}` : '';
      const { data } = await api.get(`/requests${params}`);
      setRequests(data.requests);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [bloodGroup]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Emergency Requests</h2>
            <p className="text-sm text-gray-500 mt-0.5">Active blood requests across India</p>
          </div>
          <Link to="/emergency"
            className="bg-red-600 hover:bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-300 animate-pulse" />
            Post Request
          </Link>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-sm text-gray-500">Filter:</span>
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-red-400 bg-white">
            <option value="">All blood groups</option>
            {BLOOD_GROUPS.map(bg => <option key={bg}>{bg}</option>)}
          </select>
        </div>

        {loading && (
          <div className="text-center py-12 text-gray-400 text-sm">Loading requests...</div>
        )}

        {!loading && requests.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🩸</div>
            <div className="text-sm">No active requests found</div>
            <Link to="/emergency" className="text-red-600 text-sm mt-2 inline-block">
              Post the first request
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {requests.map((request) => (
            <RequestCard key={request._id} request={request} />
          ))}
        </div>
      </div>
    </div>
  );
}