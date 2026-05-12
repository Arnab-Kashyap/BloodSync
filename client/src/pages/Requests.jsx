import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
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
    } catch { } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, [bloodGroup]);

  const urgencyColor = (u) => {
    if (u === 'critical') return { color: '#8B0000', bg: '#FEF2F2', border: '#FDE8E8' };
    if (u === 'urgent') return { color: '#92400E', bg: '#FFFBEB', border: '#FDE68A' };
    return { color: '#1E40AF', bg: '#EFF6FF', border: '#BFDBFE' };
  };

  const getExpiry = (createdAt) => {
    const hoursLeft = Math.max(0, Math.round((new Date(createdAt).getTime() + 86400000 - Date.now()) / 3600000));
    return { hoursLeft, urgent: hoursLeft < 3 };
  };

  return (
    <AppLayout title="Emergency Requests">
      <style>{`
        @media (max-width: 768px) {
          .req-header { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
          .req-filter-row { width: 100%; }
          .req-filter-row select { width: 100%; }
          .req-post-btn { width: 100%; justify-content: center; }
          .req-meta-row { flex-wrap: wrap; gap: 8px !important; }
          .req-posted-by { display: none !important; }
        }
      `}</style>

      <div className="req-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 10 }}>
        <div className="req-filter-row" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 500, whiteSpace: 'nowrap' }}>Filter:</span>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            style={{ padding: '6px 10px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none', background: 'white' }}
          >
            <option value="">All groups</option>
            {BLOOD_GROUPS.map(bg => <option key={bg}>{bg}</option>)}
          </select>
        </div>
        <Link to="/emergency" className="req-post-btn" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          textDecoration: 'none', background: '#8B0000', color: 'white',
          padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFAAAA' }} />
          Post Request
        </Link>
      </div>

      {loading && (
        <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#9CA3AF' }}>Loading requests...</div>
        </div>
      )}

      {!loading && requests.length === 0 && (
        <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '48px 32px', textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, background: '#FFF0EF', borderRadius: 12, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 6 }}>No active requests</div>
          <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 16 }}>There are no emergency requests right now</div>
          <Link to="/emergency" style={{ fontSize: 13, color: '#8B0000', textDecoration: 'none', fontWeight: 600 }}>Post the first request</Link>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {requests.map(req => {
          const uc = urgencyColor(req.urgency);
          const { hoursLeft, urgent: expiryUrgent } = getExpiry(req.createdAt);
          return (
            <div key={req._id} style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                  <div style={{ background: '#FFF0EF', border: '1.5px solid #FDE8E8', color: '#8B0000', fontWeight: 900, fontSize: 16, padding: '5px 10px', borderRadius: 8, flexShrink: 0, lineHeight: 1 }}>
                    {req.bloodGroup}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{req.patientName}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{req.hospital}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    color: expiryUrgent ? '#8B0000' : '#9CA3AF',
                    background: expiryUrgent ? '#FEF2F2' : '#F9FAFB',
                    border: `1px solid ${expiryUrgent ? '#FDE8E8' : '#F3F4F6'}`,
                    padding: '3px 8px', borderRadius: 20,
                  }}>
                    {hoursLeft > 0 ? `Expires in ${hoursLeft}h` : 'Expiring soon'}
                  </span>
                  <div style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, background: uc.bg, color: uc.color, border: `1px solid ${uc.border}`, whiteSpace: 'nowrap' }}>
                    {req.urgency.charAt(0).toUpperCase() + req.urgency.slice(1)}
                  </div>
                </div>
              </div>

              <div className="req-meta-row" style={{ display: 'flex', gap: 16, marginTop: 12, paddingTop: 12, borderTop: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: 12, color: '#6B7280' }}>{req.city}, {req.state}</span>
                <span style={{ fontSize: 12, color: '#6B7280' }}>{req.units} unit{req.units > 1 ? 's' : ''} needed</span>
                <span className="req-posted-by" style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 'auto' }}>Posted by {req.postedBy?.name}</span>
              </div>

              {req.message && (
                <div style={{ marginTop: 10, padding: '10px 12px', background: '#F9FAFB', borderRadius: 8, fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>
                  {req.message}
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <a href={`tel:${req.contactPhone}`} style={{
                  display: 'inline-block', textDecoration: 'none',
                  background: '#8B0000', color: 'white',
                  padding: '7px 20px', borderRadius: 6,
                  fontSize: 13, fontWeight: 700,
                }}>Call Now</a>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}