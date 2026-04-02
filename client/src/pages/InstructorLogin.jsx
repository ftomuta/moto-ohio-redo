import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function InstructorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (ev) => {
    ev.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/instructor-dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Instructor Login</h2>
      <p>Sign in to access your instructor dashboard, class schedule, and instructor resources.</p>

      <form onSubmit={handleLogin} style={{ maxWidth: '420px' }}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="instructor@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.75rem' }} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>
        {error && <p style={{ color: 'var(--clr-red)', marginTop: '0.75rem' }}>{error}</p>}
      </form>

      <p style={{ marginTop: '1.25rem' }}>
        Not yet an instructor? <a href="/become-instructor">Learn how to get certified</a>.
      </p>
      <p>
        Having trouble signing in? <a href="/contact">Contact support</a>.
      </p>
    </section>
  );
}

