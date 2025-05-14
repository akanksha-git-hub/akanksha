'use client';

import { useEffect, useState } from 'react';

export default function LogsPage() {
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/deploy-status', { cache: 'no-store' });
        const data = await res.json();
        if (res.ok) {
          setStatus(data.status || '');
          setIsError(false);
        } else {
          setStatus(data.error || 'Failed to load status.');
          setIsError(true);
        }
      } catch {
        setIsError(true);
        setStatus('❌ Error fetching deploy status.');
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const getColorClass = () => {
    if (status.includes('✅')) return 'text-green-400';
    if (status.includes('❌') || status.includes('ERROR')) return 'text-red-400';
    if (status.includes('🟡') || status.includes('Deploy started')) return 'text-yellow-400';
    return 'text-white';
  };

  return (
    <div className="bg-black text-sm font-mono p-6 h-screen text-white flex flex-col items-start">
      <h1 className="text-green-300 mb-4 text-lg flex items-center gap-2">
        🚀 Deploy Status
      </h1>
      <div className={`text-base whitespace-pre-wrap px-4 py-2 rounded-lg border ${getColorClass()} border-white/20 bg-white/5 shadow-inner`}>
        {isError ? '❌ ' + status : status}
      </div>
    </div>
  );
}
