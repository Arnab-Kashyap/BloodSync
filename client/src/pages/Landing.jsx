import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#FFF8F8', minHeight: '100vh' }}>

      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 6%', height: 68,
        position: 'sticky', top: 0,
        background: 'rgba(255,248,248,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(204,0,0,0.08)',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="BloodSync" style={{ height: 160 }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[
            { label: 'About', to: '/' },
            { label: 'How It Works', to: '/#how' },
            { label: 'Requests', to: '/requests' },
            { label: 'Find Donors', to: '/search' },
          ].map(l => (
            <Link key={l.label} to={l.to} style={{
              fontSize: 14, color: '#444', textDecoration: 'none',
              padding: '7px 14px', borderRadius: 8, fontWeight: 500,
            }}>{l.label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/login" style={{
            fontSize: 14, color: '#111', textDecoration: 'none',
            padding: '8px 20px', borderRadius: 50,
            border: '1.5px solid #ddd', fontWeight: 500, background: 'white',
          }}>Sign In</Link>
          <Link to="/register" style={{
            fontSize: 14, color: 'white', textDecoration: 'none',
            padding: '8px 22px', borderRadius: 50,
            background: '#CC0000', fontWeight: 600,
          }}>Join as Donor →</Link>
        </div>
      </nav>

      <section style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '70px 6% 60px', maxWidth: 1280, margin: '0 auto', gap: 40,
      }}>
        <div style={{ flex: 1, maxWidth: 540 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'white', border: '1px solid #F5C6C2',
            borderRadius: 50, padding: '6px 16px', marginBottom: 28,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#CC0000">
              <path d="M12 2C12 2 4 9 4 14a8 8 0 0016 0C20 9 12 2 12 2z"/>
            </svg>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#CC0000', letterSpacing: 0.5 }}>
              REAL-TIME BLOOD MATCHING
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(44px, 5.5vw, 72px)', fontWeight: 900,
            lineHeight: 1.04, letterSpacing: '-2.5px', margin: '0 0 20px', color: '#0F0F0F',
          }}>
            Save Lives.<br />
            <span style={{ color: '#CC0000' }}>Find Donors.</span><br />
            Right Now.
          </h1>

          <p style={{
            fontSize: 16, color: '#6B7280', lineHeight: 1.75,
            maxWidth: 420, marginBottom: 36, fontWeight: 400,
          }}>
            BloodSync connects patients with compatible donors across India instantly. No waiting. No uncertainty. Just lives saved.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              textDecoration: 'none', padding: '14px 30px',
              background: '#CC0000', color: 'white',
              borderRadius: 50, fontSize: 15, fontWeight: 700,
            }}>I Am a Donor →</Link>
            <Link to="/search" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              textDecoration: 'none', padding: '14px 28px',
              background: 'white', color: '#111',
              borderRadius: 50, fontSize: 15, fontWeight: 600,
              border: '1.5px solid #E5E7EB',
            }}>🏥 Find Blood Now</Link>
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['Verified donors', 'Free forever', 'India-wide network'].map(t => (
              <span key={t} style={{ fontSize: 13, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: '#16A34A', fontWeight: 800 }}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: 520, position: 'relative', minHeight: 420 }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 340, height: 340, borderRadius: '50%',
            background: 'rgba(204,0,0,0.06)',
            border: '1px solid rgba(204,0,0,0.1)',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 240, height: 240, borderRadius: '50%',
            background: 'rgba(204,0,0,0.08)',
            border: '1px solid rgba(204,0,0,0.12)',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -58%)',
          }}>
            <svg width="110" height="140" viewBox="0 0 100 130">
              <path d="M50 5C50 5 8 52 8 78a42 42 0 0084 0C92 52 50 5 50 5z" fill="#CC0000" opacity="0.12"/>
              <path d="M50 5C50 5 8 52 8 78a42 42 0 0084 0C92 52 50 5 50 5z" fill="none" stroke="#CC0000" strokeWidth="2" opacity="0.3"/>
              <path d="M50 22C50 22 20 60 20 78a30 30 0 0060 0C80 60 50 22 50 22z" fill="#CC0000"/>
              <path d="M50 40C50 40 34 64 34 76a16 16 0 0032 0C66 64 50 40 50 40z" fill="#FF1A1A" opacity="0.55"/>
            </svg>
          </div>

          <div style={{ position: 'absolute', top: 24, right: 0, ...floatCard }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A' }} />
              <span style={{ fontSize: 13, fontWeight: 700 }}>Rahul S. — O+ — 2.3km</span>
            </div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 3 }}>Available now · Guwahati</div>
          </div>

          <div style={{ position: 'absolute', top: '40%', left: -16, ...floatCard }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>📍</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>3 donors nearby</span>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 80, right: -10, ...floatCard, borderColor: '#FDE8E8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#CC0000' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#CC0000' }}>CRITICAL — A− Needed</span>
            </div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 3 }}>GMCH Guwahati · 2 min ago</div>
          </div>

          <div style={{ position: 'absolute', bottom: 16, left: 0, ...floatCard, background: '#F0FDF4', borderColor: '#BBF7D0' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#16A34A' }}>✓ Donation Complete</span>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 3 }}>+1 life saved today</div>
          </div>
        </div>
      </section>

      <div style={{
        borderTop: '1px solid rgba(204,0,0,0.1)',
        borderBottom: '1px solid rgba(204,0,0,0.1)',
        padding: '28px 6%', background: 'white',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20,
        }}>
          {[
            { icon: '🩸', num: '12,450+ Lives' },
            { icon: '👥', num: '8,200+ Donors' },
            { icon: '🏥', num: '340 Hospitals' },
            { icon: '⚡', num: '< 8 min response' },
          ].map(s => (
            <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#CC0000' }}>{s.num}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="how" style={{ padding: '80px 6%', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={sectionBadge}>HOW IT WORKS</span>
          <h2 style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-1.5px', marginTop: 14, color: '#0F0F0F' }}>
            Find a donor in <span style={{ color: '#CC0000' }}>3 simple steps</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { step: '01', icon: '🔍', title: 'Search donors', desc: 'Enter blood group and city. Our smart algorithm ranks donors by availability, proximity, and reliability.' },
            { step: '02', icon: '🚨', title: 'Post emergency', desc: 'Need blood urgently? Post a request in seconds. Matching donors in your area are shown instantly.' },
            { step: '03', icon: '📞', title: 'Connect & save', desc: 'Call the donor directly. No middlemen, no delays. Real people helping real people.' },
          ].map(s => (
            <div key={s.step} style={{
              background: 'white', borderRadius: 20,
              border: '1px solid #F3F4F6', padding: '32px 28px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 16, right: 20,
                fontSize: 52, fontWeight: 900, color: '#FDE8E8',
                lineHeight: 1, letterSpacing: '-2px',
              }}>{s.step}</div>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, color: '#0F0F0F' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#FFF8F8', padding: '80px 6%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={sectionBadge}>FEATURES</span>
            <h2 style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-1.5px', marginTop: 14, color: '#0F0F0F' }}>
              Built for <span style={{ color: '#CC0000' }}>emergencies</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
            {[
              { icon: '🤖', title: 'AI Assistant', desc: 'Ask about compatibility, eligibility, and donation guidelines — powered by Gemini AI.' },
              { icon: '📊', title: 'Smart Matching', desc: 'Donors ranked by availability, proximity, cooldown status, and response rate.' },
              { icon: '🩸', title: 'Compatibility Logic', desc: 'O− donors appear in O+ searches. Full WHO compatibility built in.' },
              { icon: '📍', title: 'India-Wide', desc: 'All 28 states covered. City search with automatic state-wide fallback.' },
            ].map(f => (
              <div key={f.title} style={{ background: 'white', borderRadius: 16, border: '1px solid #F3F4F6', padding: '24px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: '#FFF0EF', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 14,
                }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 8, color: '#0F0F0F' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#CC0000', padding: '80px 6%', textAlign: 'center' }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, color: 'white', letterSpacing: '-1.5px', marginBottom: 14 }}>
          Ready to save a life?
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 36 }}>
          Join 8,200+ donors across India making a difference every day.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{
            textDecoration: 'none', padding: '14px 32px',
            background: 'white', color: '#CC0000',
            borderRadius: 50, fontSize: 15, fontWeight: 800,
          }}>Register as Donor →</Link>
          <Link to="/search" style={{
            textDecoration: 'none', padding: '14px 32px',
            background: 'transparent', color: 'white',
            borderRadius: 50, fontSize: 15, fontWeight: 600,
            border: '2px solid rgba(255,255,255,0.4)',
          }}>Find Donors</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: '#0F0F0F', padding: '32px 6%',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <span style={{ fontWeight: 800, fontSize: 16, color: 'white' }}>
          <span style={{ color: '#C0392B' }}>Blood</span>Sync
        </span>
        <span style={{ fontSize: 13, color: '#4B5563' }}>Built with ❤️ for saving lives · India · 2026</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {[{ label: 'Find Donors', to: '/search' }, { label: 'Requests', to: '/requests' }, { label: 'Register', to: '/register' }].map(l => (
            <Link key={l.label} to={l.to} style={{ fontSize: 13, color: '#6B7280', textDecoration: 'none' }}>{l.label}</Link>
          ))}
        </div>
      </footer>

    </div>
  );
}

const floatCard = {
  background: 'white', borderRadius: 14,
  padding: '12px 16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
  border: '1px solid #F3F4F6', minWidth: 180,
};

const sectionBadge = {
  display: 'inline-block',
  background: '#FFF0EF', color: '#CC0000',
  fontSize: 12, fontWeight: 700,
  padding: '5px 16px', borderRadius: 50,
  border: '1px solid #FDE8E8', letterSpacing: 0.5,
}; 