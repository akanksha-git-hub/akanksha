// /src/app/logs/page.jsx
'use client';

import { useEffect, useState } from 'react';

export default function LogsPage() {
  const [log, setLog] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await fetch('/api/deploy-log');
        const data = await res.json();
        if (res.ok) {
          const lines = data.log.split('\n').slice(-50); // Limit to last 50 lines
          setLog(lines.join('\n'));
          setIsError(false);
        } else {
          setLog(data.error || 'Failed to load log.');
          setIsError(true);
        }
      } catch {
        setIsError(true);
        setLog('Error fetching deploy log.');
      }
    };

    fetchLog();
    const interval = setInterval(fetchLog, 5000);
    return () => clearInterval(interval);
  }, []);

  // Utility: Add color for emojis like ✅ ❌ etc.
  const renderWithHighlight = (text) => {
    return text.split('\n').map((line, i) => {
      let color = 'text-green-400';
      if (line.includes('❌') || line.includes('ERROR')) color = 'text-red-400';
      else if (line.includes('🟡') || line.includes('🔄')) color = 'text-yellow-400';
      else if (line.includes('🛠️') || line.includes('📦')) color = 'text-blue-400';

      return (
        <p key={i} className={`whitespace-pre-wrap ${color}`}>
          {line}
        </p>
      );
    });
  };

  return (
    <div className="bg-black text-sm font-mono p-4 h-screen overflow-y-auto">
      <h1 className="text-green-300 mb-4 text-lg">🚀 Deploy Log Viewer</h1>
      {isError ? (
        <p className="text-red-500">{log}</p>
      ) : (
        <div>{renderWithHighlight(log)}</div>
      )}
    </div>
  );
}
