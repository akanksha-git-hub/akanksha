'use client';

import { useEffect, useState } from 'react';
const convertToIST = (raw) => {
  const match = raw.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/);
  if (!match) return raw;

  const utcDate = new Date(match[1] + ' UTC'); // Force parse as UTC
  const istString = utcDate.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return `${istString} — ${raw.split('—')[1]?.trim() || ''}`;
};


export default function LogsPage() {
  const [status, setStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/deploy-status', { cache: 'no-store' });
        const data = await res.json();

        if (res.ok && data.status?.trim()) {
          setStatus(data.status.trim());
          setIsError(false);
        } else {
          setStatus(data.error || '⚠️ No deploy status available.');
          setIsError(true);
        }
      } catch {
        setIsError(true);
        setStatus('❌ Error fetching deploy status.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const getColorClass = () => {
    if (status.includes('✅')) return 'text-green-400';
    if (status.includes('❌') || status.includes('ERROR')) return 'text-red-400';
    if (status.includes('🟡') || status.includes('started')) return 'text-yellow-400';
    return 'text-white';
  };

  return (
    <div className="bg-black text-sm font-mono p-6 h-screen text-white flex flex-col items-start">
      <h1 className="text-green-300 mb-4 text-lg flex items-center gap-2">
        🚀 Deploy Status
      </h1>

      <div
        className={`text-base whitespace-pre-wrap px-4 py-2 rounded-lg border border-white/20 bg-white/5 shadow-inner min-w-[300px] min-h-[3rem] ${getColorClass()}`}
      >
         {isLoading ? (
    '⌛ Loading status...'
  ) : isError ? (
    '❌ ' + status
  ) : (
    <>
      <p className="mb-1">
        <span className="text-white/70">🕒 IST: </span>
        <span className={getColorClass()}>{convertToIST(status)}</span>
      </p>
    </>
  )}
      </div>
    </div>
  );
}
