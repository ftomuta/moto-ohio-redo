import { useEffect, useState } from 'react';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/resources')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setResources(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading resources...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h2>Instructor Resources</h2>
      <p>Download forms, policy documents, and training materials for certified instructors.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
        {resources.map((resource) => (
          <article key={resource.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.url || '#'} target="_blank" rel="noreferrer" className="btn btn-primary">
              Open
            </a>
          </article>
        ))}
      </div>
      <p>Sign in at the <a href="/instructor-dashboard">Instructor Dashboard</a> for more tools.</p>
    </section>
  );
}
