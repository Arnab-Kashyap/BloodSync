import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import api from '../api/axios';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(user?.isAvailable ?? true);
  const [requests, setRequests] = useState([]);
  const [loadingToggle, setLoadingToggle] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await api.get('/requests');
        setRequests(data.requests.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequests();
  }, []);

  const handleToggle = async () => {
    setLoadingToggle(true);
    try {
      await api.put('/donors/availability', { isAvailable: !isAvailable });
      setIsAvailable(!isAvailable);
    } catch {
      setIsAvailable(prev => prev);
    } finally {
      setLoadingToggle(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const urgencyColor = (u) => {
    if (u === 'critical') return { bg: '#FEF2F2', color: '#CC0000', border: '#FDE8E8' };
    if (u === 'urgent') return { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' };
    return { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' };
  };

  const timeAgo = (date) => {
    const mins = Math.floor((new Date() - new Date(date)) / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 6%' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F0F0F', marginBottom: 3 }}>
              Good morning, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ fontSize: 14, color: '#6B7280' }}>Here's your donor activity overview</p>
          </div>
          <button onClick={handleLogout} style={{
            fontSize: 13, color: '#6B7280', background: 'white',
            border: '1px solid #E5E7EB', borderRadius: 50,
            padding: '7px 18px', cursor: 'pointer', fontFamily: 'inherit',
          }}>Logout</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Total donations', value: user?.donationCount ?? 0, color: '#CC0000' },
            { label: 'Lives impacted', value: (user?.donationCount ?? 0) * 3, color: '#16A34A' },
            { label: 'Response rate', value: `${Math.round((user?.responseRate ?? 1) * 100)}%`, color: '#0F0F0F' },
            { label: 'Blood group', value: user?.bloodGroup, color: '#CC0000' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'white', border: '1px solid #E5E7EB',
              borderRadius: 14, padding: '18px 20px',
            }}>
              <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F0F0F', marginBottom: 16 }}>Availability status</div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: isAvailable ? '#F0FDF4' : '#F9FAFB',
              border: `1.5px solid ${isAvailable ? '#BBF7D0' : '#E5E7EB'}`,
              borderRadius: 12, padding: '14px 16px', marginBottom: 14,
              transition: 'all 0.3s',
            }}>
              <div
                onClick={!loadingToggle ? handleToggle : undefined}
                style={{
                  width: 44, height: 24, borderRadius: 12,
                  background: isAvailable ? '#16A34A' : '#D1D5DB',
                  position: 'relative', cursor: 'pointer',
                  transition: 'background 0.3s', flexShrink: 0,
                }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'white', position: 'absolute',
                  top: 3, left: isAvailable ? 23 : 3,
                  transition: 'left 0.3s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: isAvailable ? '#166534' : '#6B7280' }}>
                  {isAvailable ? 'You are available' : 'You are unavailable'}
                </div>
                <div style={{ fontSize: 11, color: isAvailable ? '#4ADE80' : '#9CA3AF', marginTop: 1 }}>
                  {isAvailable ? 'Visible to requesters nearby' : 'Hidden from search results'}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6 }}>
              Your profile is visible in <strong style={{ color: '#444' }}>{user?.city}, {user?.state}</strong>. Toggle off anytime to pause.
            </div>
          </div>

          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F0F0F', marginBottom: 16 }}>My profile</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: '#FFF0EF', border: '2px solid #FDE8E8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 18, color: '#CC0000', flexShrink: 0,
              }}>{initials}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#0F0F0F' }}>{user?.name}</div>
                <div style={{ fontSize: 12, color: '#6B7280' }}>{user?.email}</div>
              </div>
              <div style={{
                marginLeft: 'auto',
                background: '#FFF0EF', border: '1.5px solid #FDE8E8',
                color: '#CC0000', fontWeight: 800, fontSize: 18,
                padding: '6px 12px', borderRadius: 8, lineHeight: 1,
              }}>{user?.bloodGroup}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'City', value: user?.city },
                { label: 'State', value: user?.state },
                { label: 'Phone', value: user?.phone },
                { label: 'Member since', value: new Date(user?.createdAt || Date.now()).getFullYear() },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#0F0F0F' }}>{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0F0F0F' }}>Recent emergency requests</div>
            <Link to="/requests" style={{ fontSize: 12, color: '#CC0000', textDecoration: 'none', fontWeight: 500 }}>View all</Link>
          </div>

          {requests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: '#9CA3AF', fontSize: 13 }}>
              No active requests right now
            </div>
          ) : (
            requests.map(req => {
              const uc = urgencyColor(req.urgency);
              return (
                <div key={req._id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 0', borderBottom: '1px solid #F3F4F6',
                }}>
                  <div style={{
                    background: '#FFF0EF', border: '1.5px solid #FDE8E8',
                    color: '#CC0000', fontWeight: 800, fontSize: 14,
                    padding: '5px 10px', borderRadius: 8, flexShrink: 0,
                  }}>{req.bloodGroup}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>{req.patientName} — {req.hospital}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>📍 {req.city}, {req.state} · {timeAgo(req.createdAt)}</div>
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 600,
                    padding: '3px 10px', borderRadius: 20,
                    background: uc.bg, color: uc.color, border: `1px solid ${uc.border}`,
                  }}>{req.urgency.charAt(0).toUpperCase() + req.urgency.slice(1)}</div>
                  <a href={`tel:${req.contactPhone}`} style={{
                    fontSize: 12, fontWeight: 600,
                    background: '#CC0000', color: 'white',
                    padding: '6px 14px', borderRadius: 20,
                    textDecoration: 'none',
                  }}>Call</a>
                </div>
              );
            })
          )}

          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <Link to="/emergency" style={{
              flex: 1, textAlign: 'center', textDecoration: 'none',
              background: '#CC0000', color: 'white',
              padding: '11px', borderRadius: 10, fontSize: 14, fontWeight: 600,
            }}>Post Emergency Request</Link>
            <Link to="/search" style={{
              flex: 1, textAlign: 'center', textDecoration: 'none',
              background: 'white', color: '#0F0F0F',
              padding: '11px', borderRadius: 10, fontSize: 14, fontWeight: 600,
              border: '1.5px solid #E5E7EB',
            }}>Find Donors</Link>
          </div>
        </div>

      </div>
    </div>
  );
}