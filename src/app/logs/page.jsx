'use client';

import { useEffect, useState } from 'react';

export default function LogsPage() {
  const [log, setLog] = useState('Loading log...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await fetch('/api/deploy-log');
        const data = await res.json();
        if (res.ok) setLog(data.log);
        else setError(data.error || 'Failed to fetch log.');
      } catch (err) {
        setError('Could not load log.');
      }
    };

    fetchLog(); // Initial fetch
    const interval = setInterval(fetchLog, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-black text-green-300 font-mono text-sm h-screen overflow-y-scroll whitespace-pre-wrap">
      {error ? <p className="text-red-400">{error}</p> : log}
    </div>
  );
}
