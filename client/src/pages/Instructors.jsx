import { useEffect, useState } from 'react';

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/instructors')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setInstructors(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading instructors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h2>Our Instructors</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
        {instructors.map((inst) => (
          <article key={inst.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
            <h3>{inst.name}</h3>
            <small>{inst.title} - {inst.location}</small>
            <p>{inst.bio}</p>
            <div style={{ fontSize: '2rem' }}>{inst.avatar}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
