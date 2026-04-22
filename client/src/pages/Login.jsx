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
    width: '100%', padding: '11px 14px',
    border: '1.5px solid #E5E7EB', borderRadius: 8,
    fontSize: 14, fontFamily: 'inherit', outline: 'none',
    boxSizing: 'border-box', background: 'white', color: '#111',
  };

  const label = {
    fontSize: 11, fontWeight: 700, color: '#6B7280',
    display: 'block', marginBottom: 5, letterSpacing: 0.5,
  };

  return (
    <div style={{ height: '100vh', display: 'flex', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden' }}>

      <div style={{
        width: '50%', background: '#8B0000',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem 3.5rem', flexShrink: 0,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', bottom: -140, right: -140, width: 480, height: 480, borderRadius: '50%', background: 'rgba(0,0,0,0.2)' }} />
        <div style={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <img src="/logo.png" alt="BloodSync" style={{ height: 72, filter: 'brightness(0) invert(1)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, display: 'block', marginBottom: 20 }}>
            REAL-TIME BLOOD MATCHING
          </span>
          <h2 style={{ fontSize: 62, fontWeight: 900, color: 'white', letterSpacing: '-2.5px', lineHeight: 1.02, marginBottom: 24, margin: '0 0 24px' }}>
            Find Blood.<br />
            <span style={{ color: '#FFAAAA' }}>Save Lives.</span><br />
            Right Now.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 380, margin: 0 }}>
            India's real-time blood donor network connecting patients with verified donors across all 28 states.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', marginBottom: 24 }} />
          <div style={{ display: 'flex', gap: 40 }}>
            {[
              { num: '8,200+', label: 'Registered donors' },
              { num: '28', label: 'States covered' },
              { num: '94%', label: 'Requests fulfilled' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 26, fontWeight: 900, color: 'white', letterSpacing: '-1px' }}>{s.num}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 3, letterSpacing: 0.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: '50%', background: '#FFF8F8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E5E7EB', padding: '2.5rem', width: '100%', maxWidth: 420, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <img src="/logo.png" alt="BloodSync" style={{ height: 40 }} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0F0F0F', letterSpacing: '-0.5px' }}>Welcome back</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>Sign in to your donor account</div>
            </div>
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', color: '#8B0000', border: '1px solid #FDE8E8', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={label}>EMAIL ADDRESS</label>
              <input style={input} type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label style={label}>PASSWORD</label>
              <input style={input} type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px', background: '#8B0000', color: 'white',
              border: 'none', borderRadius: 50, fontSize: 15, fontWeight: 800,
              cursor: 'pointer', fontFamily: 'inherit', marginTop: 4, letterSpacing: '0.3px',
            }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div style={{ height: 1, background: '#F3F4F6', margin: '22px 0' }} />

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', margin: 0 }}>
            New donor?{' '}
            <Link to="/register" style={{ color: '#8B0000', fontWeight: 700, textDecoration: 'none' }}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}