import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', bloodGroup: '', state: '', city: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(form);
    if (result.success) navigate('/dashboard');
    else setError(result.message);
  };

  const input = {
    width: '100%', padding: '8px 12px',
    border: '1.5px solid #E5E7EB', borderRadius: 8,
    fontSize: 13, fontFamily: 'inherit', outline: 'none',
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
            <span style={{ fontSize: 12, fontWeight: 600, color: '#CC0000', letterSpacing: 0.5 }}>JOIN 8,200+ DONORS</span>
          </div>

          <svg width="90" height="115" viewBox="0 0 100 130" style={{ marginBottom: 20 }}>
            <path d="M50 5C50 5 8 52 8 78a42 42 0 0084 0C92 52 50 5 50 5z" fill="#CC0000" opacity="0.1"/>
            <path d="M50 5C50 5 8 52 8 78a42 42 0 0084 0C92 52 50 5 50 5z" fill="none" stroke="#CC0000" strokeWidth="2" opacity="0.2"/>
            <path d="M50 22C50 22 20 60 20 78a30 30 0 0060 0C80 60 50 22 50 22z" fill="#CC0000"/>
            <path d="M50 40C50 40 34 64 34 76a16 16 0 0032 0C66 64 50 40 50 40z" fill="#FF4444" opacity="0.5"/>
          </svg>

          <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1.5px', color: '#0F0F0F', marginBottom: 10, lineHeight: 1.1 }}>
            Become a<br /><span style={{ color: '#CC0000' }}>Lifesaver.</span>
          </h2>
          <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, marginBottom: 28 }}>
            Register as a donor and be ready when someone needs you the most.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
            {['Free to register — always', '1 donation saves up to 3 lives', 'Your data is private and secure'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#16A34A', fontWeight: 800, fontSize: 14 }}>✓</span>
                <span style={{ fontSize: 13, color: '#6B7280' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', top: 50, right: 20, zIndex: 3, background: 'white', borderRadius: 14, padding: '10px 14px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', border: '1px solid #F3F4F6', minWidth: 170 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A' }} />
            <span style={{ fontSize: 12, fontWeight: 700 }}>3 donors nearby</span>
          </div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>Guwahati, Assam</div>
        </div>

        <div style={{ position: 'absolute', bottom: 100, left: 20, zIndex: 3, background: '#F0FDF4', borderRadius: 14, padding: '10px 14px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', border: '1px solid #BBF7D0', minWidth: 160 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#16A34A' }}>✓ Donation Complete</span>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>+1 life saved today</div>
        </div>

        <div style={{ position: 'absolute', bottom: 160, right: 16, zIndex: 3, background: 'white', borderRadius: 14, padding: '10px 14px', boxShadow: '0 8px 32px rgba(0,0,0,0.10)', border: '1px solid #FDE8E8', minWidth: 160 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#CC0000' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#CC0000' }}>CRITICAL — O− Needed</span>
          </div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>GMCH · just now</div>
        </div>
      </div>

      <div style={{ flex: 1, background: '#FFF8F8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflow: 'hidden' }}>
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E5E7EB', padding: '2rem', width: '100%', maxWidth: 420, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <img src="/logo.png" alt="BloodSync" style={{ height: 36 }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0F0F0F' }}>Create account</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>Join as a blood donor</div>
            </div>
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', color: '#CC0000', border: '1px solid #FDE8E8', borderRadius: 8, padding: '8px 12px', fontSize: 12, marginBottom: 12 }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={label}>Full name</label>
                <input style={input} name="name" placeholder="Rahul Bora" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label style={label}>Phone</label>
                <input style={input} name="phone" placeholder="9876543210" value={form.phone} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label style={label}>Email</label>
              <input style={input} name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label style={label}>Password</label>
              <input style={input} name="password" type="password" placeholder="Min 6 characters" value={form.password} onChange={handleChange} required minLength={6} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={label}>Blood group</label>
                <select style={input} name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required>
                  <option value="">Select</option>
                  {BLOOD_GROUPS.map(bg => <option key={bg}>{bg}</option>)}
                </select>
              </div>
              <div>
                <label style={label}>State</label>
                <select style={input} name="state" value={form.state} onChange={handleChange} required>
                  <option value="">Select state</option>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={label}>City</label>
              <input style={input} name="city" placeholder="Guwahati" value={form.city} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '11px', background: '#CC0000', color: 'white', border: 'none', borderRadius: 50, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: 2 }}>
              {loading ? 'Creating account...' : 'Register as Donor →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#6B7280', marginTop: 14 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#CC0000', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}