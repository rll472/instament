// pages/index.tsx

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleConnect = async () => {
    try {
      const res = await fetch('/api/quickbooks/auth');
      const data = await res.json();
      if (data.url) {
        // Redirect the user to QuickBooks for authentication
        window.location.href = data.url;
      } else {
        console.error('No URL returned');
      }
    } catch (error) {
      console.error('Error fetching auth URL:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to ExpenseCat</h1>
      <button onClick={handleConnect}>
        Connect to QuickBooks
      </button>
    </div>
  );
}
