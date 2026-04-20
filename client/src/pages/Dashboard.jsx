import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/AppLayout';
import api from '../api/axios';

export default function Dashboard() {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(user?.isAvailable ?? true);
  const [requests, setRequests] = useState([]);
  const [loadingToggle, setLoadingToggle] = useState(false);

  useEffect(() => {
    api.get('/requests').then(({ data }) => setRequests(data.requests.slice(0, 4))).catch(() => {});
  }, []);

  const handleToggle = async () => {
    setLoadingToggle(true);
    try {
      await api.put('/donors/availability', { isAvailable: !isAvailable });
      setIsAvailable(p => !p);
    } finally {
      setLoadingToggle(false);
    }
  };

  const timeAgo = (date) => {
    const mins = Math.floor((new Date() - new Date(date)) / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const urgencyColor = (u) => {
    if (u === 'critical') return { color: '#8B0000', bg: '#FEF2F2', border: '#FDE8E8' };
    if (u === 'urgent') return { color: '#92400E', bg: '#FFFBEB', border: '#FDE68A' };
    return { color: '#1E40AF', bg: '#EFF6FF', border: '#BFDBFE' };
  };

  const stats = [
    { label: 'Total donations', value: user?.donationCount ?? 0, sub: 'lifetime' },
    { label: 'Lives impacted', value: (user?.donationCount ?? 0) * 3, sub: 'estimated' },
    { label: 'Response rate', value: `${Math.round((user?.responseRate ?? 1) * 100)}%`, sub: 'all time' },
    { label: 'Blood group', value: user?.bloodGroup, sub: 'registered' },
  ];

  return (
    <AppLayout title="Dashboard">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: 0.5, marginBottom: 8, textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#111', letterSpacing: '-1px', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#C4C9D4', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16, letterSpacing: '-0.2px' }}>Availability</div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderRadius: 10,
            background: isAvailable ? '#F0FDF4' : '#F9FAFB',
            border: `1px solid ${isAvailable ? '#BBF7D0' : '#E5E7EB'}`,
            marginBottom: 14,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: isAvailable ? '#166534' : '#374151' }}>
                {isAvailable ? 'You are available' : 'You are unavailable'}
              </div>
              <div style={{ fontSize: 12, color: isAvailable ? '#4ADE80' : '#9CA3AF', marginTop: 2 }}>
                {isAvailable ? 'Visible to requesters in your area' : 'Hidden from all search results'}
              </div>
            </div>
            <div
              onClick={!loadingToggle ? handleToggle : undefined}
              style={{
                width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                background: isAvailable ? '#16A34A' : '#D1D5DB',
                position: 'relative', transition: 'background 0.25s', flexShrink: 0,
              }}>
              <div style={{
                width: 18, height: 18, background: 'white', borderRadius: '50%',
                position: 'absolute', top: 3, left: isAvailable ? 23 : 3,
                transition: 'left 0.25s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6 }}>
            Location: <span style={{ color: '#374151', fontWeight: 500 }}>{user?.city}, {user?.state}</span>
          </div>
        </div>

        <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16, letterSpacing: '-0.2px' }}>Profile summary</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: '#FFF0EF', border: '2px solid #FDE8E8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800, color: '#8B0000', flexShrink: 0,
            }}>
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{user?.name}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>{user?.email}</div>
            </div>
            <div style={{ background: '#FFF0EF', border: '1.5px solid #FDE8E8', color: '#8B0000', fontWeight: 800, fontSize: 16, padding: '5px 10px', borderRadius: 8 }}>
              {user?.bloodGroup}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'City', value: user?.city },
              { label: 'State', value: user?.state },
              { label: 'Phone', value: user?.phone },
              { label: 'Member since', value: new Date(user?.createdAt || Date.now()).getFullYear() },
            ].map(f => (
              <div key={f.label} style={{ background: '#F9FAFB', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#9CA3AF', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 3 }}>{f.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111', letterSpacing: '-0.2px' }}>Recent emergency requests</div>
          <Link to="/requests" style={{ fontSize: 12, color: '#8B0000', textDecoration: 'none', fontWeight: 600 }}>View all</Link>
        </div>

        {requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px', color: '#9CA3AF', fontSize: 13 }}>No active requests right now</div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px 120px 80px', gap: 12, padding: '0 12px 10px', borderBottom: '1px solid #F3F4F6', marginBottom: 4 }}>
              {['Group', 'Patient & Hospital', 'Location', 'Urgency', 'Action'].map(h => (
                <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: 0.5, textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {requests.map(req => {
              const uc = urgencyColor(req.urgency);
              return (
                <div key={req._id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px 120px 80px', gap: 12, alignItems: 'center', padding: '12px', borderRadius: 8, borderBottom: '1px solid #F9FAFB' }}>
                  <div style={{ background: '#FFF0EF', border: '1.5px solid #FDE8E8', color: '#8B0000', fontWeight: 800, fontSize: 14, padding: '4px 10px', borderRadius: 6, width: 'fit-content' }}>{req.bloodGroup}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{req.patientName}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{req.hospital}</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{req.city}, {req.state}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: uc.bg, color: uc.color, border: `1px solid ${uc.border}`, width: 'fit-content' }}>
                    {req.urgency.charAt(0).toUpperCase() + req.urgency.slice(1)}
                  </div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>{timeAgo(req.createdAt)}</div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
          <Link to="/emergency" style={{ textAlign: 'center', textDecoration: 'none', background: '#8B0000', color: 'white', padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
            Post Emergency Request
          </Link>
          <Link to="/search" style={{ textAlign: 'center', textDecoration: 'none', background: 'white', color: '#111', padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: '1px solid #E5E7EB' }}>
            Find Donors
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}