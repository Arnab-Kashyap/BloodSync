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
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    bloodGroup: '', state: '', city: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(form);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid #E5E7EB', borderRadius: 10,
    fontSize: 14, fontFamily: 'inherit', outline: 'none',
    boxSizing: 'border-box', background: 'white',
  };

  const labelStyle = {
    fontSize: 12, fontWeight: 600,
    color: '#6B7280', display: 'block', marginBottom: 5,
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#FFF8F8',
      display: 'flex', fontFamily: "'DM Sans', sans-serif",
    }}>

      <div style={{
        flex: 1, background: '#CC0000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem', color: 'white',
      }}>
        <div style={{ maxWidth: 360, textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 20 }}>🩸</div>
          <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.1 }}>
            Become a lifesaver today.
          </h2>
          <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.7, marginBottom: 32 }}>
            Register as a donor and be ready when someone needs you the most.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '✅', text: 'Free to register — always' },
              { icon: '🔒', text: 'Your data is private and secure' },
              { icon: '💪', text: '1 donation can save up to 3 lives' },
            ].map(f => (
              <div key={f.text} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 12, padding: '12px 16px', textAlign: 'left',
              }}>
                <span style={{ fontSize: 18 }}>{f.icon}</span>
                <span style={{ fontSize: 13, opacity: 0.9 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        flex: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: '2rem',
        overflowY: 'auto',
      }}>
        <div style={{
          background: 'white', borderRadius: 20,
          border: '1px solid #E5E7EB', padding: '2.5rem',
          width: '100%', maxWidth: 460,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img src="/logo.png" alt="BloodSync" style={{ height: 160, marginBottom: 8 }} />
            <p style={{ fontSize: 14, color: '#6B7280' }}>Create your donor account</p>
          </div>

          {error && (
            <div style={{
              background: '#FEF2F2', color: '#CC0000',
              border: '1px solid #FDE8E8', borderRadius: 10,
              padding: '10px 14px', fontSize: 13, marginBottom: 16,
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Full name</label>
                <input style={inputStyle} name="name" placeholder="Rahul Bora"
                  value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} name="phone" placeholder="9876543210"
                  value={form.phone} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} name="email" type="email" placeholder="you@email.com"
                value={form.email} onChange={handleChange} required />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input style={inputStyle} name="password" type="password" placeholder="Min 6 characters"
                value={form.password} onChange={handleChange} required minLength={6} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Blood group</label>
                <select style={inputStyle} name="bloodGroup" value={form.bloodGroup}
                  onChange={handleChange} required>
                  <option value="">Select</option>
                  {BLOOD_GROUPS.map(bg => <option key={bg}>{bg}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>State</label>
                <select style={inputStyle} name="state" value={form.state}
                  onChange={handleChange} required>
                  <option value="">Select state</option>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>City</label>
              <input style={inputStyle} name="city" placeholder="Guwahati"
                value={form.city} onChange={handleChange} required />
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '12px',
              background: '#CC0000', color: 'white',
              border: 'none', borderRadius: 50,
              fontSize: 15, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit', marginTop: 4,
            }}>
              {loading ? 'Creating account...' : 'Register as Donor →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', marginTop: 20 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#CC0000', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}