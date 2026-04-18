import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) navigate('/dashboard');
    else setError(result.message);
  };

  const input = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid #E5E7EB', borderRadius: 8,
    fontSize: 14, fontFamily: 'inherit', outline: 'none',
    boxSizing: 'border-box', background: 'white', color: '#111',
  };

  const label = {
    fontSize: 11, fontWeight: 600,
    color: '#6B7280', display: 'block', marginBottom: 4,
  };

  return (
    <div style={{ height: '100vh', display: 'flex', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden' }}>

      <div style={{
        width: '48%', background: '#FFF0EF',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem 2.5rem', flexShrink: 0,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 380, height: 380, borderRadius: '50%', background: 'rgba(204,0,0,0.05)', border: '1px solid rgba(204,0,0,0.08)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 270, height: 270, borderRadius: '50%', background: 'rgba(204,0,0,0.07)', border: '1px solid rgba(204,0,0,0.1)' }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 340 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #FDE8E8', borderRadius: 50, padding: '6px 16px', marginBottom: 24 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#CC0000' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#CC0000', letterSpacing: 0.5 }}>REAL-TIME BLOOD MATCHING</span>
          </div>

          <svg width="90" height="115" viewBox="0 0 100 130" style={{ marginBottom: 20 }}>
            <path d="M50 5C50 5 8 52 8 78a42 42 0 0084 0C92 52 50 5 50 5z" fill="#CC0000" opacity="0.1"/>
            <path d="M50 5C50 5 8 52 8 78a42 42 0 0084 0C92 52 50 5 50 5z" fill="none" stroke="#CC0000" strokeWidth="2" opacity="0.2"/>
            <path d="M50 22C50 22 20 60 20 78a30 30 0 0060 0C80 60 50 22 50 22z" fill="#CC0000"/>
            <path d="M50 40C50 40 34 64 34 76a16 16 0 0032 0C66 64 50 40 50 40z" fill="#FF4444" opacity="0.5"/>
          </svg>

          <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1.5px', color: '#0F0F0F', marginBottom: 10, lineHeight: 1.1 }}>
            Save Lives.<br /><span style={{ color: '#CC0000' }}>Sign In Now.</span>
          </h2>
          <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, marginBottom: 28 }}>
            Access your donor profile and connect with people who need your help today.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
            {['Verified donors', 'Free forever', 'India-wide network'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#16A34A', fontWeight: 800, fontSize: 14 }}>✓</span>
                <span style={{ fontSize: 13, color: '#6B7280' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', top: 60, right: 24, zIndex: 3, background: 'white', borderRadius: 14, padding: '10px 14px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', border: '1px solid #F3F4F6', minWidth: 170 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A' }} />
            <span style={{ fontSize: 12, fontWeight: 700 }}>Rahul S. — O+ available</span>
          </div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>Guwahati, Assam</div>
        </div>

        <div style={{ position: 'absolute', bottom: 100, left: 24, zIndex: 3, background: '#F0FDF4', borderRadius: 14, padding: '10px 14px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid #BBF7D0', minWidth: 160 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#16A34A' }}>✓ Donation Complete</span>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>+1 life saved today</div>
        </div>

        <div style={{ position: 'absolute', bottom: 160, right: 20, zIndex: 3, background: 'white', borderRadius: 14, padding: '10px 14px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', border: '1px solid #FDE8E8', minWidth: 160 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#CC0000' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#CC0000' }}>CRITICAL — A− Needed</span>
          </div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>GMCH · 2 min ago</div>
        </div>
      </div>

      <div style={{ flex: 1, background: '#FFF8F8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E5E7EB', padding: '2.5rem', width: '100%', maxWidth: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <img src="/logo.png" alt="BloodSync" style={{ height: 36 }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0F0F0F' }}>Welcome back</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>Sign in to your donor account</div>
            </div>
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', color: '#CC0000', border: '1px solid #FDE8E8', borderRadius: 8, padding: '8px 12px', fontSize: 12, marginBottom: 16 }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={label}>Email</label>
              <input style={input} type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label style={label}>Password</label>
              <input style={input} type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#CC0000', color: 'white', border: 'none', borderRadius: 50, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 4 }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', marginTop: 20 }}>
            New donor?{' '}
            <Link to="/register" style={{ color: '#CC0000', fontWeight: 600, textDecoration: 'none' }}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}