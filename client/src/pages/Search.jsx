import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/AppLayout';
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
  const { user } = useAuth();
  const [form, setForm] = useState({ bloodGroup: '', state: user?.state || '', city: '' });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [meta, setMeta] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams({ bloodGroup: form.bloodGroup, state: form.state, ...(form.city && { city: form.city }) });
      const { data } = await api.get(`/search?${params}`);
      setDonors(data.donors);
      setMeta(data);
    } catch {
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  const select = {
    width: '100%', padding: '9px 12px',
    border: '1.5px solid #E5E7EB', borderRadius: 8,
    fontSize: 13, fontFamily: 'inherit', outline: 'none',
    background: 'white', color: '#111', boxSizing: 'border-box',
  };

  const label = {
    fontSize: 11, fontWeight: 700, color: '#6B7280',
    display: 'block', marginBottom: 5, letterSpacing: 0.4,
    textTransform: 'uppercase',
  };

  return (
    <AppLayout title="Find Donors">
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16, alignItems: 'start' }}>

        <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '20px', position: 'sticky', top: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16, letterSpacing: '-0.2px' }}>Search filters</div>
          <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={label}>Blood group</label>
              <select style={select} name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required>
                <option value="">Select group</option>
                {BLOOD_GROUPS.map(bg => <option key={bg}>{bg}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>State</label>
              <select style={select} name="state" value={form.state} onChange={handleChange} required>
                <option value="">Select state</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>City <span style={{ color: '#C4C9D4', fontWeight: 400, textTransform: 'none' }}>(optional)</span></label>
              <input style={select} name="city" value={form.city} onChange={handleChange} placeholder="e.g. Guwahati" />
            </div>

            <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 14, marginTop: 2 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 10 }}>Compatibility note</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6 }}>
                Compatible donors are automatically included. For example, searching O+ also shows O- donors.
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '10px',
              background: '#8B0000', color: 'white',
              border: 'none', borderRadius: 8,
              fontSize: 13, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', marginTop: 4,
            }}>
              {loading ? 'Searching...' : 'Search Donors'}
            </button>
          </form>
        </div>

        <div>
          {!searched && (
            <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '48px 32px', textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, background: '#FFF0EF', borderRadius: 12, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 6 }}>Find a donor</div>
              <div style={{ fontSize: 13, color: '#9CA3AF' }}>Select blood group and state to search for available donors</div>
            </div>
          )}

          {loading && (
            <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#9CA3AF' }}>Searching donors...</div>
            </div>
          )}

          {searched && !loading && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>
                  {donors.length > 0 ? `${donors.length} donor${donors.length > 1 ? 's' : ''} found` : 'No donors found'}
                  {meta?.city ? ` in ${meta.city}` : meta?.state ? ` in ${meta.state}` : ''}
                </div>
                {donors.length > 0 && <div style={{ fontSize: 12, color: '#9CA3AF' }}>Sorted by match score</div>}
              </div>

              {donors.length === 0 && (
                <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '48px', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 6 }}>No donors found</div>
                  <div style={{ fontSize: 13, color: '#9CA3AF' }}>Try searching state-wide or a different blood group</div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {donors.map(donor => {
                  const initials = donor.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                  const daysSince = donor.lastDonation ? Math.floor((new Date() - new Date(donor.lastDonation)) / (1000 * 60 * 60 * 24)) : null;
                  return (
                    <div key={donor._id} style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FFF0EF', border: '1.5px solid #FDE8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#8B0000', flexShrink: 0 }}>
                        {initials}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 3 }}>{donor.name}</div>
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 12, color: '#6B7280' }}>{donor.city}, {donor.state}</span>
                          <span style={{ fontSize: 12, color: '#6B7280' }}>{donor.donationCount} donations</span>
                          {daysSince !== null && <span style={{ fontSize: 12, color: '#6B7280' }}>Last donated {daysSince}d ago</span>}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                        <div>
                          <div style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4, textAlign: 'right' }}>Match</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 64, height: 4, background: '#F3F4F6', borderRadius: 2, overflow: 'hidden' }}>
                              <div style={{ height: '100%', borderRadius: 2, background: donor.score >= 80 ? '#16A34A' : donor.score >= 60 ? '#D97706' : '#8B0000', width: `${donor.score}%` }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>{donor.score}</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <div style={{ width: 7, height: 7, borderRadius: '50%', background: donor.isAvailable ? '#16A34A' : '#D1D5DB' }} />
                          <span style={{ fontSize: 12, color: donor.isAvailable ? '#16A34A' : '#9CA3AF', fontWeight: 500 }}>
                            {donor.isAvailable ? 'Available' : 'Unavailable'}
                          </span>
                        </div>

                        <div style={{ background: '#FFF0EF', border: '1.5px solid #FDE8E8', color: '#8B0000', fontWeight: 800, fontSize: 15, padding: '5px 10px', borderRadius: 8 }}>
                          {donor.bloodGroup}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}