import { useState } from 'react';
import Navbar from '../components/Navbar';
import DonorCard from '../components/DonorCard';
import api from '../api/axios';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];

export default function Search() {
  const [form, setForm] = useState({ bloodGroup: '', state: '', city: '' });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const [meta, setMeta] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const params = new URLSearchParams({
        bloodGroup: form.bloodGroup,
        state: form.state,
        ...(form.city && { city: form.city }),
      });

      const { data } = await api.get(`/search?${params}`);
      setDonors(data.donors);
      setMeta(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Search header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Find Blood Donors</h2>
        <form onSubmit={handleSearch} className="flex gap-3 flex-wrap items-end">
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Blood group</label>
            <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 bg-white">
              <option value="">Select</option>
              {BLOOD_GROUPS.map(bg => <option key={bg}>{bg}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">State</label>
            <select name="state" value={form.state} onChange={handleChange} required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 bg-white">
              <option value="">Select state</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">City <span className="text-gray-400">(optional)</span></label>
            <input name="city" value={form.city} onChange={handleChange}
              placeholder="Guwahati"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 w-36" />
          </div>

          <button type="submit" disabled={loading}
            className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="max-w-3xl mx-auto px-6 py-6">
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        {searched && !loading && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">
              {donors.length > 0
                ? `${donors.length} donor${donors.length > 1 ? 's' : ''} found in ${meta?.city || meta?.state}`
                : 'No donors found — try a different location or blood group'}
            </span>
            {donors.length > 0 && (
              <span className="text-xs text-gray-400">Sorted by best match</span>
            )}
          </div>
        )}

        {loading && (
          <div className="text-center py-12 text-gray-400 text-sm">Searching donors...</div>
        )}

        <div className="space-y-3">
          {donors.map((donor) => (
            <DonorCard key={donor._id} donor={donor} />
          ))}
        </div>

        {!searched && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🩸</div>
            <div className="text-sm">Select blood group and state to find donors</div>
          </div>
        )}
      </div>
    </div>
  );
}