import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
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

export default function Emergency() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    patientName: '', bloodGroup: '', units: 1,
    hospital: '', state: '', city: '',
    contactPhone: '', message: '', urgency: 'urgent',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/requests', form);
      navigate('/requests');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-xl mx-auto px-6 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
          <span className="text-red-700 text-sm font-medium">Post an emergency blood request</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Patient name</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400"
                  name="patientName" placeholder="Ravi Das"
                  value={form.patientName} onChange={handleChange} required />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Blood group</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 bg-white"
                  name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required>
                  <option value="">Select</option>
                  {BLOOD_GROUPS.map(bg => <option key={bg}>{bg}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Units needed</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400"
                  name="units" type="number" min="1" max="10"
                  value={form.units} onChange={handleChange} required />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Urgency</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 bg-white"
                  name="urgency" value={form.urgency} onChange={handleChange}>
                  <option value="critical">Critical</option>
                  <option value="urgent">Urgent</option>
                  <option value="moderate">Moderate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Hospital name</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400"
                name="hospital" placeholder="GMCH Guwahati"
                value={form.hospital} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">State</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 bg-white"
                  name="state" value={form.state} onChange={handleChange} required>
                  <option value="">Select state</option>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">City</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400"
                  name="city" placeholder="Guwahati"
                  value={form.city} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Contact phone</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400"
                name="contactPhone" placeholder="9876543210"
                value={form.contactPhone} onChange={handleChange} required />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 block mb-1">Message <span className="text-gray-400">(optional)</span></label>
              <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-red-400 resize-none"
                name="message" placeholder="Any additional details..."
                rows={3} value={form.message} onChange={handleChange} />
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 text-white rounded-lg py-2.5 text-sm font-medium transition-colors">
              {loading ? 'Posting...' : 'Post Emergency Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}