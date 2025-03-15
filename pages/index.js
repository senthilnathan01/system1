import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [profile, setProfile] = useState('');
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const response = await fetch('/api/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, profile, goal }),
    });
    const data = await response.json();
    
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>System 1 Thinking Simulator</h1>
      <p>Enter details to see what a System 1 thinker would do intuitively.</p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="url">Website URL:</label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
            placeholder="e.g., https://example.com"
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="profile">Your Profile:</label>
          <input
            id="profile"
            type="text"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
            placeholder="e.g., Sarah, 28, teacher, casual internet user"
            required
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="goal">Your Goal:</label>
          <input
            id="goal"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
            placeholder="e.g., Find contact info"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '10px 20px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Simulating...' : 'Simulate'}
        </button>
      </form>
      
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Simulation Result</h2>
          <p><strong>Intuitive Action:</strong> {result.action}</p>
          <p><strong>Reasoning:</strong> {result.reasoning}</p>
        </div>
      )}
    </div>
  );
}
