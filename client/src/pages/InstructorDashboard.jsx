import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const tabs = ['Overview', 'Schedule', 'Students', 'Settings'];

export default function InstructorDashboard() {
  const [active, setActive] = useState('Overview');
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <section>
        <h2>Instructor Dashboard</h2>
        <p>Please sign in to view dashboard details.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Instructor Dashboard</h2>
      <p>Welcome back, {user.name}. Access your schedule, rosters, certifications, and documents.</p>
      <button className="btn" style={{ marginBottom: '1rem' }} onClick={logout}>
        Logout
      </button>

      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            style={{
              padding: '0.55rem 0.8rem',
              border: active === tab ? '2px solid #0366d6' : '1px solid #ddd',
              borderRadius: '8px',
              background: active === tab ? '#f0f8ff' : '#fff',
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {active === 'Overview' && (
          <article>
            <h3>Welcome, Instructor</h3>
            <p>Your next course is scheduled for Saturday, June 14 at Franklin County training site.</p>
            <ul>
              <li>Pending approvals: 2</li>
              <li>New student signups: 18</li>
              <li>Required recertification: due Dec 31</li>
            </ul>
          </article>
        )}

        {active === 'Schedule' && (
          <article>
            <h3>Upcoming Classes</h3>
            <ul>
              <li>June 14, 2026 — BRC at Columbus East</li>
              <li>July 9, 2026 — ARC at Springfield</li>
              <li>Aug 17, 2026 — 3-Wheel at Cincinnati North</li>
            </ul>
          </article>
        )}

        {active === 'Students' && (
          <article>
            <h3>Student Roster</h3>
            <ol>
              <li>Jamie Lee</li>
              <li>Mark Santos</li>
              <li>Laney Nguyen</li>
              <li>Kendra Price</li>
            </ol>
          </article>
        )}

        {active === 'Settings' && (
          <article>
            <h3>Profile Settings</h3>
            <p>Update your contact details, teaching certifications, and notification preferences.</p>
            <p>Feature coming soon: fully integrated account management.</p>
          </article>
        )}
      </div>
    </section>
  );
}
